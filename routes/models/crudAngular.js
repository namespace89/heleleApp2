var mongoose = require('mongoose');

var Angulardb = mongoose.createConnection('mongodb://localhost:27017/crudAngular');

var AngularSchema = mongoose.Schema({
	nick: String,
	msg: String,
	created: {type: Date, default: Date.now}
});

var Angular = Angulardb.model('Message', AngularSchema);

exports.getOldMsgs = function(limit, cb){
	var query = Angular.find({});
	query.sort('-created').limit(limit).exec(function(err, docs){
		cb(err, docs);
	});
}

exports.saveMsg = function(data, cb){
	var newMsg = new Angular({msg: data.msg, nick: data.nick});
	newMsg.save(function(err){
		cb(err);
	});
};