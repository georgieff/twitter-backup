const LS_TWEETS_PROPERTY = 'tb_tweets';

let savedTweets = JSON.parse(window.localStorage.getItem(LS_TWEETS_PROPERTY)) || {};

class SavedTweets {
    static getAllSavedTweets(userId) {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], savedTweets[userId]).reverse());
            }, 500);
        });
    }

    static addSavedTweet(tweet, userId) {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                savedTweets[userId] = Object.assign([], savedTweets[userId]);
                if(savedTweets[userId].filter(savedTweet => savedTweet.id === tweet.id).length === 0) {
                    savedTweets[userId].push(tweet);
                    window.localStorage.setItem(LS_TWEETS_PROPERTY, JSON.stringify(savedTweets));
                    resolve(tweet);
                } else {
                    reject('Tweet already added');
                }
            }, 500);
        });
    }

    static removeSavedTweet({id}, userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(savedTweets[userId].filter(savedTweet => savedTweet.id === id).length === 1) {
                    savedTweets[userId] = savedTweets[userId].filter(savedTweet => savedTweet.id !== id);
                    window.localStorage.setItem(LS_TWEETS_PROPERTY, JSON.stringify(savedTweets));
                    resolve(id);
                } else {
                    reject('Tweet not found');
                }
            });
        });
    }
}

export default SavedTweets;
