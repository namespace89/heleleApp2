// var mongoose = require('mongoose');

// var angularDB = mongoose.createConnection('mongodb://localhost:27017/angularDB');

// // Subdocument schema for votes
// var personSchema = new mongoose.Schema({
//  age: Number,
//  name: String,
//  sex: Boolean
// });

// var Peoples = angularDB.model('peoples', personSchema)

// exports.getPersons = function(limit, person){
// 	var query = Peoples.find({});

// 	query.sort('-age').limit(limit).exec(function(err, docs){
// 		person(err, docs);
// 	});
// }







// exports.saveMsg = function(data, cb){
// 	var newMsg = new Chat({msg: data.msg, nick: data.nick});
// 	newMsg.save(function(err){
// 		cb(err);
// 	});
// };



var mongoose = require('mongoose');

// Subdocument schema for votes
var voteSchema = new mongoose.Schema({ ip: 'String' });

// Subdocument schema for poll choices
var choiceSchema = new mongoose.Schema({ 
	text: String,
	votes: [voteSchema]
});

// Document schema for polls
exports.PollSchema = new mongoose.Schema({
	question: { type: String, required: true },
	choices: [choiceSchema]
});