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
      },

      function(err, result) {

        if(err) console.log("error " + err.code);

        console.log("user created: " + result);

        req.session.user = {
            name: req.body.name,
            email: req.body.email,
            id: req.body._id
        };

        req.session.loggedIn = true;
        res.redirect('/user');
      });
};

exports.index = function(req, res) {
  if(req.session.loggedIn === true) {
      res.render('user-page', {
          name: req.session.user.name,
          email: req.session.user.email
      })
  } else {
      res.redirect('/login');
  }
};

exports.login = function(req, res) {
    res.render('login');
};

exports.doLogin = function(req, res) {
    console.log("you have entered: " + req.body.Email + " and our records show: " + req.session.user.email);
    if(req.body.Email === req.session.user.email) {
        res.send('you are loged in');
    } else {
        res.redirect('/login');
  };
};















