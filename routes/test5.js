var express = require('express');
var router = express.Router();

var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(router).listen(2980);
var io = socketio.listen(server);

var mongoose = require('mongoose');

var AngularDb = require('./models/crudAngular');

var socketBusiness = require('./business/socketbusiness')

/* GET home page. */
// router.get('/', function(req, res) {
//   res.json('index.jade');
//   // res.render('home');
// });

// router.set('port', process.env.PORT || 3000);

// serve index and view partials
router.get('/', function(req, res){
  res.render('index2.jade');
});

router.get('/:name', function (req, res) {
  var name = req.params.name;
  res.render('/partials2/' + name);
});

// JSON API
router.get('/name', function (req, res) {
  res.json({
  	name: 'Bob'
  });
});

// redirect all others to the index (HTML5 history)
router.get('*', function(req, res){
  res.render('index2.jade');
});

// Socket.io Communication
io.sockets.on('connection', function (socket) {
  socket.emit('send:name', {
    name: 'Bob'
  });

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);
});

/**
 * Start Server
 */

// server.listen(app.get('port'), function () {
//   console.log('Express server listening on port ' + app.get('port'));
// });

mongoose.connection.close(function(){
	console.log('angular db connection closed!');
})

module.exports = router;


