var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.render('home');
  res.sendfile('./views/index2.html')
});

module.exports = router;