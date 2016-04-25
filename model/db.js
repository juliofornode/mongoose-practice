var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/mongoose001';
mongoose.connect(dbUri);
//mongoose.createConnection(dbUri);

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
});

var Project = mongoose.model('Project', projectSchema);

var userOne = new User({
    name: "Julio",
    email: "juliofordevelopment@gmail.com"
});

console.log('the name of the userOne is ', userOne.name);