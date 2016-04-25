var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.create = function(req, res) {
    res.render('user-form', {title: "This is the text for the h1 tag", buttonText: "Hello!"});
};


exports.doCreate = function(req, res) {
  User.create({
      name: req.body.name,
      email: req.body.name,
      modifiedOn: Date.now(),
      lastLogin: Date.now()
    }, function(err, result) {
      console.log("user created ", result);
    });
};



//Routes

//1.Login

//2.Create User profile

//3.Display User profile

//4.Edit User profile

//5.Delete User profile

//6.Logout