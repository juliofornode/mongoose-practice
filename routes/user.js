var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.create = function(req, res) {
    res.render('user-form', {title: "This is the text for the h1 tag", buttonText: "Hello!"});
};

exports.doCreate = function(req, res) {
  User.create({
      name: req.body.name,
      email: req.body.email,
      modifiedOn: Date.now(),
      lastLogin: Date.now()
      },

      function(err, result) {

        if(err) {
            console.log("error " + err.code);
        } else {
            console.log("user created: " + result);

            req.session.user = {
                name: req.body.name,
                email: req.body.email,
                id: req.body._id
            };

            req.session.loggedIn = true;
            res.redirect('/user');
        }

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
    if(req.body.Email) {
        User.findOne(
            {"email": req.body.Email},
            '_id name email',
            function(err, recordedUser) {
                if(!err) {
                    if(!recordedUser) {
                        res.redirect('/login?404=recordedUser')
                    } else {
                        req.session.user = {
                            "name": recordedUser.name,
                            "email": recordedUser.email,
                            "_id": recordedUser._id
                        };
                        req.session.loggedIn = true;
                        console.log('Logged in user: ', recordedUser);
                        res.redirect('/user');
                    }
                } else {
                    res.redirect('/login?404=error');
                }
            }
        )
    } else {
        res.redirect('/login?404=error');
    }

};















