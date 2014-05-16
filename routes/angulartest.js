var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.render('home');
  res.sendfile('./public/angulartest/index.html')
});

module.exports = router;