var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res) {
//   // res.render('index.jade', { title: 'Express' });
//   res.json('home');
// });

var peopledb = require('./models/people')

var mongoose = require('mongoose');

var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(router).listen(2970);
var io = socketio.listen(server);


/* GET home page. */
router.get('/', function(req, res) {
// res.render('index.jade', { title: 'Express' });
// res.json('Single page app service : angular framework service');
// res.sendfile('./public/angular2/index.html')

	peopledb.getPerson(5, function(err, persons){
		res.json(persons);
	});

});


// router.get('/', function(req, res) {
// 	peopledb.getPerson2(res);
// })

mongoose.connection.close(function(){
	console.log('angular db connection closed!');
})

module.exports = router;