var express = require('express');
var router = express.Router();

// var routes = require('./business/socketbusiness');
// var api = require('./business/api');
// var http = require('http');
// var socketio = require('socket.io');

// var server = http.createServer(router).listen(2980);
// var io = socketio.listen(server);

// var mongoose = require('mongoose');

// var AngularDb = require('./models/crudAngular');

// var businessModel = require('./business/socketbusiness')

router.get('/', function(req, res){
  res.render('index3.jade');
});

router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

var api = require('./business/api.js');

// JSON API
router.get('/name', function (req, res) {
  res.json({
    name: 'Bob'
  });
});
// router.get('/name', api.name);

// redirect all others to the index (HTML5 history)
router.get('*', function(req, res){
  res.render('index3.jade');
});

module.exports = router;