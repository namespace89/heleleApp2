var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var users2 = require('./routes/users2');
var users3 = require('./routes/users3');
var angular = require('./routes/angular');
var angular2 = require('./routes/angular2');
var angulartest = require('./routes/angulartest');
var angulartest2 = require('./routes/angulartest2');
var angulartest3 = require('./routes/angulartest3');
var ember = require('./routes/ember');
var backbone = require('./routes/backbone');
var test = require('./routes/test');
var test2 = require('./routes/test2');
var test3 = require('./routes/test3');
var test4 = require('./routes/test4');
var test5 = require('./routes/test5');
var socket6 = require('./routes/socket6');
var users4 = require('./routes/users4');
// var test33 = require('./routes/test33');
var exphbs  = require('express3-handlebars');

var methodOverride = require('method-override');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(methodOverride()); // simulate DELETE and PUT

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/users2', users2);
app.use('/users3', users3);
app.use('/angular', angular);
app.use('/angular2', angular2);
app.use('/angulartest', angulartest);
app.use('/angulartest2', angulartest2);
app.use('/angulartest3', angulartest3);
app.use('/ember', ember);
app.use('/backbone', backbone);
app.use('/test', test);
app.use('/test2', test2);
app.use('/test3', test3);
app.use('/test4', test4);
app.use('/test5', test5);
app.use('/socket6', socket6);
app.use('/users4', users4);
// app.use('/test33', test33);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
