var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.create = function(req, res) {
    res.render('user-form', {title: "This is the text for the h1 tag", buttonText: "Hello!"});
};


exports.doCreate = function(req, res) {
  var user = {};
    user.name = req.session.name;
    user.email = req.session.name;
};



//Routes

//1.Login

//2.Create User profile

//3.Display User profile

//4.Edit User profile

//5.Delete User profile

//6.Logout