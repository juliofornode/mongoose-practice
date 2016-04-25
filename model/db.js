var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/mongoose001';
mongoose.connect(dbUri);

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