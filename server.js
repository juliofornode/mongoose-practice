//1. dependencies
var express = require('express');
//var mongoose = require('mongoose');
//var bodyParser = require('body-parser');
//var cookie = require('cookie-parser');
//var session = require('express-session');


//custom modules
//var routes = require('./routes');


//2. db connection


//3. app instantiation
var app = express();


//4. app configuration (app.set)
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
var port = app.get('port');

//5. middleware definition (app.use)
app.use(express.static('/public'));


//6. routes
app.get('/', function(req, res) {
    res.send('this is the home page.');
});


//catch-all route
app.all('*', function(req, res) {
    res.status(404).send('this is the 404 error page.');
});



//7. app server starts in host and port
app.listen(port, function() {
    console.log('server listening on port ', port);
});

