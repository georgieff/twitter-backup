const passport = require('passport');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const usersManager = require('./usersManager');
const passportConfig = require('./passport');
const tokenManager = require('./tokenManager');
const twitterManager = require('./twitterManager');
require('dotenv-safe').config();

//setup configuration for facebook login
passportConfig();

const app = express();

// enable cors
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.route('/auth/twitter/reverse')
  .post(function(req, res) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: process.env.callback_url, //frontend
        consumer_key: process.env.tw_key,
        consumer_secret: process.env.tw_secret,
      }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: e.message });
      }

      const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

router.route('/auth/twitter')
  .post((req, res, next) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: process.env.tw_key,
        consumer_secret: process.env.tw_secret,
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
      if (!req.user) {
        return res.status(401).json({message: 'User Not Authenticated'});
      }

      // prepare token for API
      req.auth = {
        id: req.user.id
      };

      return next();
  }, tokenManager.generateToken, tokenManager.sendToken);

const getCurrentUser = function(req, res, next) {
  usersManager.getUser(req.auth.id).then((user) => {
    req.user = user;
    next();
  }).catch((err) => {
    res.status(401).json({message: 'User Not Authenticated'});
  });
};

router.route('/auth/me')
  .get(tokenManager.authenticate, getCurrentUser, usersManager.getVerification);

router.route('/gettweets')
  .get(tokenManager.authenticate, getCurrentUser, twitterManager.getUserTweets);

router.route('/retweet')
  .post(tokenManager.authenticate, getCurrentUser, twitterManager.retweet);

app.use('/api/v1', router);

app.listen(process.env.port);
module.exports = app;

console.log(`Server running at http://localhost:${process.env.port}/`);
