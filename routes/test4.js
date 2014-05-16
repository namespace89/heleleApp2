var express = require('express');
var router = express.Router();
// var app = express();
var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(router).listen(2990);
var io = socketio.listen(server);

var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});

var db = new Db('crud', server, {safe: true});

// var db = require('./models/crud')

db.open(function(err, db) {
      if(!err) {
        console.log("Connected to 'cruddb' database");

    db.collection('crudCollections', {safe:true}, function(err, collection) {
      if (err) {
        console.log("The 'cruddb' collection doesn't exist. Creating it with sample data...");
        //populateDB();
       }
    });
   }
});

/* GET home page. */
router.get('/', function(req, res) {
  // res.json('index.jade');
  // res.render('home');
    // db.collection('crudCollections', function(err, collection) {
    //     collection.find().toArray(function(err, items) {
    //        // res.json(items);

    //     });
    // });
    db.collection('crudCollections', function(err, collection) {
        collection.find().toArray(function(err, i) {
			result = i;
			res.render('index.ejs', {items : i, error:''} );	//get all data from db and render on index page	
        });
    });
});

io.sockets.on('connection', function (socket) {	
	// router.get('/', function(req, res) {
	//     db.collection('crudCollections', function(err, collection) {
 //    	    collection.find().toArray(function(err, i) {
	// 			result = i;
	// 			res.render('index.ejs', {items : i, error:''} );	//get all data from db and render on index page	
	//         });
	//     });
	// });
	<!-- insertion function   -->
	router.post('/add', function(req, res){ 
		
		var things = req.body;
		
		var name = req.param('name', null);
		var price = req.param('price', null);
		var qty = req.param('qty', null);
			
		var letters = /^[A-Za-z0-9]+$/;  
		var numbers = /^[0-9]+$/;	
	
		if(name.match(letters) && name.length <=15 && price.match(numbers) && price.length <=5 && qty.match(numbers) && qty.length <=3)  
		{
			<!-- add item into db. -->
			db.collection('crudCollections', function(err, collection) {
				collection.insert(things, function(err, result) {	// insert item into db
					if (err) {
						res.send({'error':'An error has occurred'});
					}

					socket.broadcast.emit('item',{msg : result});	// broadcast item.
					console.log("1 row inserted.");
					res.send(200);				
				});
			});
		}  
		else  
		{
			// give response if validation is not fulfill.
			res.send(false);
		}
	});
	
	<!-- deletion function -->
	router.get('/:id', function(req, res){
		  var id = req.params.id;
		  
		  <!-- remove item from db -->  
		  db.collection('crudCollections', function(err, collection) {
			collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) { // remove item
				if (err) {
					res.send({'error':'An error has occurred - ' + err});
				} else {
					console.log('' + result + ' row deleted');
					socket.broadcast.emit('id',{id : id}); // broadcast id 
					res.send(200);				
				}
			});
		});
	});
	
	<!-- update function -->
	router.post('/edit/:id', function(req, res){
		var things = req.body;
		var id = req.body.hide;
		
		var name = req.body.name;
		var price = req.body.price;
		var qty = req.body.qty;
		var letters = /^[A-Za-z0-9]+$/;  
		var numbers = /^[0-9]+$/;
		
		if(name.match(letters) && name.length <=15 && price.match(numbers) && price.length <=5 && qty.match(numbers) && qty.length <=3)  
		{
			<!-- update item from db -->
			db.collection('crudCollections', function(err, collection) {
				collection.update({'_id':new BSON.ObjectID(id)}, things, {safe:true}, function(err, result) {
					if (err) {
						res.send({'error':'An error has occurred'});
					} else {
						console.log('' + result + ' document(s) updated');					
						collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
							socket.broadcast.emit('update',{ item : [item]}); // broadcast updated item.
							res.send(200);				
						});					
					}
				});
			});
		}  
		else  
		{		
			// give response if validation is not fulfill.
			res.send(false);
		}
	});

});

// router.get('/', function(req, res) {
//     db.collection('peoples', function(err, collection) {
//        collection.find().toArray(function(err, items) {
//        res.json(items);
//      });
//    });
// });

module.exports = router;