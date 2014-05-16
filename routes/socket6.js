var express = require('express');
var router = express.Router();

var http = require('http');
var socketio = require('socket.io');
var server = http.createServer(router).listen(3001);
var io = socketio.listen(server);

var mongoose = require('mongoose');

var peopleDb = require('./models/people');

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.json('socket6');

  // peopleDb.getPerson(5,function(err,persons){
  // 	res.json(person);
  // })

  // module.exports = function (socket) {
  //   socket.emit('send:name', {
  //     name: 'Bob'
  //   });

  //   setInterval(function () {
  //     socket.emit('send:time', {
  //       time: (new Date()).toString()
  //     });
  //   }, 1000);
  // };

  res.sendfile('./public/socketio6/index.html')
});

io.sockets.on('connection', function (socket) {

  socket.emit('send:name', {
    name: 'Bob2'
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
});


module.exports = router;