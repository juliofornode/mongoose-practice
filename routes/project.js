var mongoose = require('mongoose');
var Project = mongoose.model('Project');

exports.create = function(req, res) {
  res.render('project-form');
};

exports.doCreate = function(req, res) {
    Project.create({
        name: req.body.name
    }, function(err, result) {
        console.log('project created');
        res.redirect('/');
    });
};