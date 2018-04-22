const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const usersManager = require('./usersManager');

require('dotenv-safe').config();

const localStorage = require('localStorage');

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
      consumerKey: process.env.tw_key,
      consumerSecret: process.env.tw_secret
    },
    function (token, tokenSecret, profile, done) {
      usersManager.saveUser({id: profile.id, token: token, tokenSecret: tokenSecret}).then((user) => {
          return done(null, profile);
        });
    }));

};
