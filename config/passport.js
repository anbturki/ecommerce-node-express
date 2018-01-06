const passport = require("passport");
const LocalStartegy = require("passport-local").Strategy;
const User = require("../models/user");
passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});

passport.use("local-login", new LocalStartegy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) return done(err);

    if (!user) {
      return done(null, false, req.flash("error", ["User doesn\'t exists"]));
    }

    if (!user.comparePassword(password)) {
      return done(null, false, req.flash("error", ["something went wrong!"]));
    }

    return done(null, user);

  });
}));


exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};