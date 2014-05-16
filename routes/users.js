var express = require('express');
var router = express.Router();

var mongoose   = require('mongoose');

var persondb = mongoose.createConnection('mongodb://localhost:27017/persondb')

var Schema = mongoose.Schema;   // Dx operation...controller service

var PersonSchema = new Schema({
    age: Number,
    name: String,
    sex: Boolean
});

PeoplesModel = persondb.model('peoples', PersonSchema);

//mongoose.connect('mongodb://localhost:27017/persondb');   // connect to our database

router.param('name', function(req,res,next,name){

    PeoplesModel.find({name:name},function(err,persons){

        req.person=persons[0];

        next();
    });
});

router.get('/new', function(req,res){
    res.render('newperson', {layout:false, person:req.person});
});

router.post('/', function(req,res){
    var bd=req.body;

    new PeoplesModel({
            age: bd.age,
            name: bd.name,
            sex: bd.sex
    }).save(function(err,person){

        if(err) res.json(err);

        res.redirect('/users/' + person.name);
    })
});

router.get('/:name', function(req,res){
    res.render('showperson', {layout:false, person:req.person});
});

router.get('/:name/edit', function(req,res){
    res.render('editperson', {layout:false, person:req.person});
});

router.put('/:name/edit',function(req,res){
    var bd=req.body;
    PeoplesModel.update(
        {name:req.params.name},
        {age:bd.age,name:bd.name,sex:bd.sex},
        function(err){
            res.redirect('/users/'+bd.name)
        }
    );
});

router.delete('/:name', function(req,res){
   PeoplesModel.remove(
   {name:req.params.name},
   function(err){
        res.redirect('/users');
   });
});

/* GET users listing. */
router.get('/', function(req, res) {
    PeoplesModel.find(function(err, people) {
            if (err)
                res.send(err);

            // res.json(people);
            res.render('people',{layout:false, people:people});
    });
});
  // res.json({user:'respond with a resource', age:11, name:'sung1', sex:true});
  // res.render('hevele.jade',
  // 	{ layout: false,
  // 		user:'respond with a resource', age:11, name:'sung1', sex:true});
  // res.render('ham');
// });

mongoose.connection.close(function(){
  console.log('persondb database connection closed!');
})

module.exports = router;
