var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/persondb", {native_parser:true});

db.bind('peoples');

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.render('home');
  // res.json({mongo:'Mongoskin native driver'});
  db.peoples.find({},{_id:0}).toArray(function(err, items) {
  	    res.json(items);
  });
});

router.post('/insert', function(err,person){
    db.collection('peoples').insert({age: 77, name: 'heleleName', sex:true},
        function(err, result) {
            if (err) throw err;
            if (result) res.json(person);
        });
});

router.put('/update', function(err,person){
    db.peoples.update({age:77}, {$set:{age:1}}, function(err, result) {
    if (!err) console.log('Age updated!');
    });
});

router.delete('/delete', function(err,person){
    
    db.collection('peoples').remove({age:1}, function(err, result) {
    if (!err) console.log('Age:1 deleted!');
    });
});

module.exports = router;
