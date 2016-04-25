//1. dependencies
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');

var db = require('./model/db.js');
var routes = require('./routes');
var user = require('./routes/user.js');
var project = require('./routes/project.js');
//var bodyParser = require('body-parser');
//var cookie = require('cookie-parser');
//var session = require('express-session');


//custom modules
//var routes = require('./routes');


//2. db connection


//3. app instantiation
var app = express();


//4. app configuration (app.set)
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
var port = app.get('port');

//5. middleware definition (app.use)
app.use(express.static('/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookie('cookie-secret-key'));
app.use(session({
    secret: 'session-secret-key',
    resave: true,
    saveUninitialized: true
}));


//6. routes

//GENERIC ROUTES
app.get('/', routes.index);



//USER ROUTES - current user is stored in session, so we do not need to use :user_id

//Create User profile
app.get('/user/new', user.create);
app.post('/user/new', user.doCreate);


//Display Current User profile
app.get('/user', user.index);


//PROJECT ROUTES - projects are not stored in sessions, so we do will need to use :project_id

//create new project
app.get('/project/new', project.create);
app.post('/project/new', project.doCreate);


//USER ROUTES - current user is stored in session, so we do not need to use :user_id

/*//1.Login
app.get('/login', user.login);
app.post('/login', user.doLogin);

//2.Create User profile
app.get('/user/new', user.create);
app.post('/user/new', user.doCreate);

//3.Display Current User profile
app.get('/user', user.index);

//4.Edit Current User profile
app.get('/user/edit', user.edit);
app.post('/user/edit', user.doEdit);

//5.Delete Current User profile
app.get('/user/delete', user.confirmDelete);
app.post('/user/delete', user.doDelete);

//6.Logout
app.get('/logout', user.logout);*/


//PROJECT ROUTES - projects are not stored in sessions, so we do will need to use :project_id

/*//1. create new project
app.get('/project/new', project.create);
app.post('/project/new', project.doCreate);

//2. display one project
app.get('/project/:id', project.displayInfo);

//3. edit one project
app.get('/project/edit/:id', project.edit);
app.post('/project/edit/:id', project.doEdit);

//4. delete one project
app.get('/project/delete/:id', project.delete);
app.post('/project/delete/:id', project.doDelete);*/













//catch-all route
app.all('*', function(req, res) {
    res.status(404).send('this is the 404 error page.');
});



//7. app server starts in host and port
app.listen(port, function() {
    console.log('server listening on port ', port);
});

