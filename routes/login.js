const env = require("dotenv").config();
const express = require('express');
const router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

var User = require('../models/User')
// var userSchema = mongoose.Schema
// schema.plugin(findOrCreate);
// var findOrCreate = require('mongoose-findorcreate')
// var ClickSchema = new Schema({ ... });
// ClickSchema.plugin(findOrCreate);
// var Click = mongoose.model('Click', ClickSchema);


passport.use(new GoogleStrategy({
  clientID:process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile.name.givenName)
    console.log(profile.emails)
    // let parseEmail = JSON.parse(profile.emails);
    // console.log(parseEmail['value'])
    User.findOrCreate({ firstName: profile.name.givenName }, { lastName: profile.name.familyName },
      { _id: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test page' });
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/callback', passport.authenticate('google', function(req, res, next) {

}));



module.exports = router
