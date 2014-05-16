var mongoose = require('mongoose');

var tododb = mongoose.createConnection('mongodb://localhost:27017/todo');

module.exports = tododb.model('Todo',{
   text: String,
   done : Boolean
});

