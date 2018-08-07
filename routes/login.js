const env = require("dotenv").config();
const express = require('express');
const router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

var User = require('../models/User')

// userSchema.plugin(findOrCreate);
// var User = mongoose.model('User', userSchema);

passport.use(new GoogleStrategy({
  clientID:process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  let userProfile = {firstName: profile.name.givenName,
    lastName: profile.name.familyName, email:profile.emails[0].value, _id: profile.id}

  console.log(userProfile)
  // return done()
  return done(null, profile);
    // User.findOrCreate({ firstName: profile.name.givenName }, { lastName: profile.name.familyName },
    //   { _id: profile.id }, function (err, user) {
    //     console.log(profile.id)
    //   return done(err, user);
    // });
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
});


router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res, next, userProfile) => {
  res.render('index', { user: req.user })
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('index', { user: req.user.name.givenName});
  });

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/google' }),
  (req, res) => {
    res.redirect('/login/profile')
  });



module.exports = router
