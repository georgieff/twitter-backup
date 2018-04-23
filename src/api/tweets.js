import axios from 'axios';
import mockedTweets from './mockTweets';

import envConfig from '../config';

class Tweets {
    static getTweets(token, maxId = 0) {
        return new Promise ((resolve, reject) => {
            axios({
                method:'get',
                url:`${envConfig.GET_TWEETS}?maxId=${maxId}`,
                headers: {'x-auth-token': token}
            })
            .then(function (tweets) {
                const cleanedTweets = Tweets.cleanTweets(tweets.data);
                resolve(Object.assign([], cleanedTweets));
            })
            .catch(function (error) {
                reject(error);
            });
            // resolve(Object.assign([], mockedTweets));
        });
    }

    static cleanTweets(tweets) {
        return tweets.map(tweet => {
            return {
                created_at: tweet.created_at,
                id: tweet.id,
                id_str: tweet.id_str,
                text: tweet.text,
                entities: tweet.entities,
                user: {
                    id: tweet.user.id,
                    id_str: tweet.user.id_str,
                    name: tweet.user.name,
                    screen_name: tweet.user.screen_name,
                    profile_image_url: tweet.user.profile_image_url
                }
            };
        });
    }
}

export default Tweets;
