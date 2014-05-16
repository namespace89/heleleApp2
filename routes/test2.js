var express = require('express');
var router = express.Router();
var http = require('http');
var socketio = require('socket.io');

var db = require('./models/chat')

var server = http.createServer(router).listen(3020);

// var server = http.createServer(router).listen('3000', '127.0.0.1'); 

var io = socketio.listen(server);


// maps socket.id to user's nickname
var nicknames = {};
// list of socket ids
var clients = [];
var namesUsed = [];

io.sockets.on('connection', function(socket){
    initializeConnection(socket);
    handleChoosingNicknames(socket);
    handleClientDisconnections(socket);
    handleMessageBroadcasting(socket);
    handlePrivateMessaging(socket);
  });

function initializeConnection(socket){
  showActiveUsers(socket);
  showOldMsgs(socket);
}

function showActiveUsers(socket){
  var activeNames = [];
  var usersInRoom = io.sockets.clients();
  for (var index in usersInRoom){
    var userSocketId = usersInRoom[index].id;
    if (userSocketId !== socket.id && nicknames[userSocketId]){
      var name = nicknames[userSocketId];
      activeNames.push({id: namesUsed.indexOf(name), nick: name});
    }
  }
  socket.emit('names', activeNames);
}

function showOldMsgs(socket){
  db.getOldMsgs(5, function(err, docs){
    socket.emit('load old msgs', docs);
  });
}

function handleChoosingNicknames(socket){
  socket.on('choose nickname', function(nick, cb) {
    if (namesUsed.indexOf(nick) !== -1) {
      cb('That name is already taken!  Please choose another one.');
      return;
    }
    var ind = namesUsed.push(nick) - 1;
    clients[ind] = socket;
    nicknames[socket.id] = nick;
    cb(null);
    io.sockets.emit('new user', {id: ind, nick: nick});
  });
}

function handleMessageBroadcasting(socket){
  socket.on('message', function(msg){
    var nick = nicknames[socket.id];
    db.saveMsg({nick: nick, msg: msg}, function(err){
      if(err) throw err;
      io.sockets.emit('message', {nick: nick, msg: msg});
    });
  });
}

function handlePrivateMessaging(socket){
  socket.on('private message', function(data){
    var from = nicknames[socket.id];
    clients[data.userToPM].emit('private message', {from: from, msg: data.msg});
  });
}

function handleClientDisconnections(socket){
  socket.on('disconnect', function(){
    var ind = namesUsed.indexOf(nicknames[socket.id]);
    delete namesUsed[ind];
    delete clients[ind];
    delete nicknames[socket.id];
    io.sockets.emit('user disconnect', ind);
  });
}

/* GET home page. */

router.get('/',function(req,res){
   res.sendfile( './public/socketio2/index.html')
});

module.exports = router;