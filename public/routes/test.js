var express = require('express');

var app = require('express')();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.render('home');
  res.sendfile('./public/sockettest/index.html');

  // res.sendfile(__dirname + './public/socketTest/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = router;