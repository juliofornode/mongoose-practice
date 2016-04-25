var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/mongoose001';
mongoose.connect(dbUri);

//alternative:
//var dbUri2 = 'mongodb://localhost/mongoose002',
//var adminConnection = mongoose.createConnection(dbUri2);

//why it does not work:
//http://stackoverflow.com/questions/22786374/queries-hang-when-using-mongoose-createconnection-vs-mongoose-connect


mongoose.connection.on('connected', function() {
    console.log('the db is now connected.');
});

mongoose.connection.on('error', function() {
    console.log('error connecting the db.')
});

mongoose.connection.on('disconnected', function() {
    console.log('the db was disconnected.');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('db closed through app termination.');
        process.exit(0);
    });

});

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    createdOn: {type: Date, default: Date.now},
    modifiedOn: Date,
    lastLogin: Date
});

var User = mongoose.model('User', userSchema);

var projectSchema = new mongoose.Schema({
    projectName: String,
    cratedBy: String,
    tasks: String,
    modifiedOn: {type: Date, default: Date.now},
    createdOn: Date
    },
    {collection: 'projectsCollection'});

var Project = mongoose.model('Project', projectSchema);

var userOne = new User({
    name: "Julio",
    email: "juliofordevelopment@gmail.com"
});

console.log('the name of the userOne is ', userOne.name);

userOne.save(function() {
    console.log('userOne has been saved in the database.');
    User.find({}, function(err, result) {
        console.log('the users collection has now: ', JSON.stringify(result));
    });
});

User.create({
    name: 'Albert',
    email: 'albert.einstein@nasa.com'
}, function(err, result) {
    console.log(result.name + ' has been saved.');
});


var projectOne = new Project({
    projectName: 'proyecto uno'
});

projectOne.save(function(err, result) {
    Project.find({}, function(err, result) {
        console.log('the saved projects are: ', JSON.stringify(result));
    });
});





