var mongoose = require('mongoose');

var chatdb = mongoose.createConnection('mongodb://localhost:27017/chat');

// mongoose.connect('mongodb://localhost:27017/chat', function(err){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log('Connected to mongodb!');
// 	}
// });

var chatSchema = mongoose.Schema({
	nick: String,
	msg: String,
	created: {type: Date, default: Date.now}
});

var Chat = chatdb.model('Message', chatSchema);

exports.getOldMsgs = function(limit, cb){
	var query = Chat.find({});
	query.sort('-created').limit(limit).exec(function(err, docs){
		cb(err, docs);
	});
}

exports.saveMsg = function(data, cb){
	var newMsg = new Chat({msg: data.msg, nick: data.nick});
	newMsg.save(function(err){
		cb(err);
	});
};

mongoose.connection.close(function(){
	console.log('chat db connection closed!');
})