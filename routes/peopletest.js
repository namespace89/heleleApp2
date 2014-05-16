var express = require('express');
var router = express.Router();

var Todo= require('./models/todo')

var mongoose = require('mongoose');




/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.jade', { title: 'Express' });
  // res.json('Single page app service : angular framework service');
  res.sendfile('./public/angular/index.html')
});

router.get('/todos', function(req,res){
	Todo.find(function(err,todos){
		if(err)
			res.send(err)

			res.json(todos);
	})
})

router.post('/todos', function(req, res) {

	// create a todo, information comes from AJAX request from Angular
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});

});

// delete a todo
router.delete('/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});

mongoose.connection.close(function(){
  console.log('persondb database connection closed!');
})

module.exports = router;
