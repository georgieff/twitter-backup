const request = require('request');
const Twitter = require('twitter');
require('dotenv-safe').config();

const twitterManager = {

    getUserTweets: (req, res) => {
        const client = twitterManager.newClient(req.user);
        const params = {count: 11};
        if(req.query.maxId !== '0') {
            params.max_id = req.query.maxId;
        }

        client.get('statuses/home_timeline', params, function(error, tweets, response) {
            if (!error) {

                res.json(tweets.filter(tweet => tweet.id_str !== req.query.maxId).slice(0, 10));
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
