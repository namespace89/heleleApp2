var express = require('express');
var router = express.Router();
// var routes = require('./routes');
var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(router).listen(3010);
var mongoose = require('mongoose');



// var angularDb = require('./models/angulardb');
var heleleDb = require('./models/chat2');

// var server = http.createServer(router).listen('3000', '127.0.0.1'); 

var io = socketio.listen(server);

/* GET home page. */
// router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.render('home');

  // res.json('aaa')
  // res.sendfile('./public/socketio3/index.html')
  // res.render('angular.jade')

// });

router.get('/',function(req, res){
	res.render('index');
});
router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

var userNames = (function () {
  var names = {};

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());



io.sockets.on('connection', function (socket) {
  var name = userNames.getGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    // socket.broadcast.emit('send:message', {
    //   user: name,
    //   text: data.message
    // });
    heleleDb.saveMsg({user: name, msg: data.message}, function(err){
      if(err) throw err;
      // io.sockets.emit('message', {nick: nick, msg: msg});
      socket.broadcast.emit('send:message', {
        user: name,
        text: data.message
      });
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;
      
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
});

mongoose.connection.close(function(){
	console.log('angular db connection closed!');
})

module.exports = router;