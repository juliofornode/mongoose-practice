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
    User.findOne({'email': req.body.Email},
        '_id name email',
        function(err, result) {
        console.log("result :" + result);
        if(err) {
            res.send('email not found, try again');
        } else {
            req.session.user = {
                name: result.name,
                email: result.email,
                id: result._id
            };
            console.log("Your data are: " + req.session.user);
        }
    });

};















