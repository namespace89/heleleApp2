var express = require('express');
var router = express.Router();

var Todo= require('./models/todo')

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.json('Single page app service : angular framework service');
  res.sendfile('./public/backbone/index.html')
});

module.exports = router;
