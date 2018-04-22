const request = require('request');
const Twitter = require('twitter');
require('dotenv-safe').config();

const twitterManager = {

    getUserTweets: (req, res) => {
        const client = twitterManager.newClient(req.user);
        // console.log(req.query);
        const params = {count: 10};

        client.get('statuses/home_timeline', params, function(error, tweets, response) {
            if (!error) {
                res.json(tweets);
            } else {
                return res.status(500).json({ message: error });
            }
        });
    },

    newClient: (user) => {
        return new Twitter({
            consumer_key: process.env.tw_key,
            consumer_secret: process.env.tw_secret,
            access_token_key: user.token,
            access_token_secret: user.tokenSecret
        });
    }
};

module.exports = twitterManager;
