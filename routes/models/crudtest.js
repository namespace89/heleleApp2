var mongoose = require('mongoose');

var peopletestdb = mongoose.createConnection('mongodb://localhost:27017/peopletestdb');

module.exports = peopletestdb.model('Todo',{
   age: Number,
   text: String,
   sex: Boolean,
   done: Boolean
});

