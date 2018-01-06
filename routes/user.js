const _ = require("lodash");
const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../config/passport");

var User = require("../models/user");

// Application routes
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});
router.post("/signup", (req, res, next) => {
  User.findOne({email: req.body.email}, (err, isUserExists) => {
    if (err) return next(err); 
    if (isUserExists) {
      req.flash("error", [`${req.body.email} is already exists`]);
      return res.redirect("/signup");
    } else {
      var data = _.pick(req.body, ['email', 'password']);
      var user = new User(data);
      user.profile.name = req.body.name;
      user.save((err, user) => {
        if (err) return next(err);
        req.flash("success", [`${req.body.email} has been added successfuly`]);
        return res.redirect('/profile');
      });
    }

  });  

});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  }
  res.render("auth/login");
});

router.post("/login", passport.authenticate("local-login", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/profile", (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) return next(err);
    res.render("auth/profile",{user});
  });
});

module.exports = router;
