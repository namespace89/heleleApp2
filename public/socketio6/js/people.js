var mongoose = require('mongoose');

var peopledb = mongoose.createConnection('mongodb://localhost:27017/peopledb');

var personSchema = mongoose.Schema({
	age: Number,
	name: String,
	sex: Boolean
});

var Persons = peopledb.model('persons', personSchema);


exports.getPerson = function(limit, persons){
   var query = Persons.find({});
   query.sort('-age').limit(limit).exec(function(err, docs){
      persons(err, docs);
   });
  // return query;
}

exports.getPerson2 = function(res){
	Persons.find(function(err, people){
		if(err)
			res.send(err);

		res.json(people);
		// return people;
	});
	
}
