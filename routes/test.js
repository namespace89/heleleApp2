// var express = require('express');

// // var app = require('express')();

// var router = express.Router();

// var server = require('http').createServer(router);

// var io = require('socket.io').listen(server);

// /* GET home page. */
// router.get('/', function(req, res) {
//   // res.render('index.jade', { title: 'Express' });
//   // res.render('home');
//   res.sendfile('./public/sockettest/index.html');

//   // res.sendfile(__dirname + './public/socketTest/index.html');
// });

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// module.exports = router;


var socketio = require('socket.io');
var express = require('express');
var http = require('http');

var router = express.Router();

var server = http.createServer(router).listen(3030);

var io = socketio.listen(server);

router.get('/',function(req,res){
   res.sendfile( './public/socketio/index.html')
});

// var chat = io
//   .of('/chat')
//   .on('connection', function (socket) {
//     socket.emit('a message', {
//         that: 'only'
//       , '/chat': 'will get'
//     });
//     chat.emit('a message', {
//         everyone: 'in'
//       , '/chat': 'will get'
//     });
//   });

// var news = io
//   .of('/news')
//   .on('connection', function (socket) {
//     socket.emit('item', { news: 'item' });
//   });

// var socket_ids = [];
// var count = 0;
 
// function registerUser(socket,nickname){
//     // socket_id와 nickname 테이블을 셋업
//     socket.get('nickname',function(err,pre_nick){
//         if(pre_nick != undefined ) delete socket_ids[pre_nick];
//         socket_ids[nickname] = socket.id
//         socket.set('nickname',nickname,function(){
//             io.sockets.emit('userlist',{users:Object.keys(socket_ids)});
//         });
 
//     });
// }

var count = 0;
var rooms = [];
 
router.get('/:room',function(req,res){
    console.log('room name is :'+req.params.room);
    res.render('index',{room:req.params.room});
});

io.sockets.on('connection',function (socket) {

    socket.on('joinroom',function(data){
        socket.join(data.room);
 
        socket.set('room', data.room,function() {
            var room = data.room;
            var nickname = '손님-'+count;
            socket.set('nickname',nickname,function(){
                socket.emit('changename', {nickname: nickname});
 
                // Create Room
                if (rooms[room] == undefined) {
                    console.log('room create :' + room);
                    rooms[room] = new Object();
                    rooms[room].socket_ids = new Object();
                }
                // Store current user's nickname and socket.id to MAP
                rooms[room].socket_ids[nickname] = socket.id
 
                // broad cast join message
                data = {msg: nickname + ' 님이 입장하셨습니다.'};
                io.sockets.in(room).emit('broadcast_msg', data);
 
                // broadcast changed user list in the room
                io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
                count++;
            });
        });
 
    });
 
    socket.on('changename',function(data){
        socket.get('room',function(err,room){
            socket.get('nickname',function(err,pre_nick) {
                var nickname = data.nickname;
                // if user changes name get previous nickname from nicknames MAP
                if (pre_nick != undefined) {
                    delete rooms[room].socket_ids[pre_nick];
                }
                rooms[room].socket_ids[nickname] = socket.id
                socket.set('nickname',nickname,function() {
                    data = {msg: pre_nick + ' 님이 ' + nickname + '으로 대화명을 변경하셨습니다.'};
                    io.sockets.in(room).emit('broadcast_msg', data);
 
                    // send changed user nickname lists to clients
                    io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
                });
            });
 
        });
    });
 
 
    socket.on('disconnect',function(data){
        socket.get('room',function(err,room) {
            if(err) throw err;
            if(room != undefined
                && rooms[room] != undefined){
 
                socket.get('nickname',function(err,nickname) {
                    console.log('nickname ' + nickname + ' has been disconnected');
                    // 여기에 방을 나갔다는 메세지를 broad cast 하기
                    if (nickname != undefined) {
                        if (rooms[room].socket_ids != undefined
                            && rooms[room].socket_ids[nickname] != undefined)
                            delete rooms[room].socket_ids[nickname];
                    }// if
                    data = {msg: nickname + ' 님이 나가셨습니다.'};
 
                    io.sockets.in(room).emit('broadcast_msg', data);
                    io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
                });
            }
        }); //get
    });
 
    socket.on('send_msg',function(data){
        socket.get('room',function(err,room) {
            socket.get('nickname',function(err,nickname) {
                console.log('in send msg room is ' + room);
                data.msg = nickname + ' : ' + data.msg;
                if (data.to == 'ALL') socket.broadcast.to(room).emit('broadcast_msg', data); // 자신을 제외하고 다른 클라이언트에게 보냄
                else {
                    // 귓속말
                    socket_id = rooms[room].socket_ids[data.to];
                    if (socket_id != undefined) {
 
                        data.msg = '귓속말 :' + data.msg;
                        io.sockets.socket(socket_id).emit('broadcast_msg', data);
                    }// if
                }
                socket.emit('broadcast_msg', data);
            });
        });
    })
 	// socket.emit('new',{nickname:'GUEST-'+count});
  //   registerUser(socket,'GUEST-'+count);
  //   count++;

  //   socket.on('changename',function(data){
  //       registerUser(socket,data.nickname);
  //   });

  //   socket.on('disconnect',function(data){
  //       socket.get('nickname',function(err,nickname){
  //           if(nickname != undefined){
  //               delete socket_ids[nickname];
  //               io.sockets.emit('userlist',{users:Object.keys(socket_ids)});
                                
  //           }// if
  //       });
  //   });

  //   socket.on('send_msg',function(data){
  //       socket.get('nickname',function(err,nickname){
 
  //           data.msg = nickname + ' : '+data.msg;
  //           if(data.to =='ALL') socket.broadcast.emit('broadcast_msg',data); // 자신을 제외하고 다른 클라이언트에게 보냄
  //           else{
  //               socket_id = socket_ids[data.to];
  //               if(socket_id != undefined){
  //                   io.sockets.socket(socket_id).emit('broadcast_msg',data);
  //               }// if
  //           }
  //           socket.emit('broadcast_msg',data);
  //       });
  //   });


  // socket.emit('toclient',{msg:'Welcome !'});
  //  socket.on('fromclient',function(data){
  //      socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
  //      socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
  //      console.log('Message from client :'+data.msg);
  //  })
  // socket.on('set nickname', function (name) {
  //   socket.set('nickname', name, function () {
  //     socket.emit('ready');
  //   });
  // });

  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

  // socket.on('msg', function () {
  //   socket.get('nickname', function (err, name) {
  //     console.log('Chat message by ', name);
  //   });
  // });
});



module.exports = router;