/*eslint-disable no-console */
import * as types from './actionTypes';
import tweetsApi from '../api/tweets';

export function loadTweetsSuccess(tweets) {
    return { type: types.LOAD_TWEETS, tweets: tweets};
}

export function clearTweets() {
    return { type: types.CLEAR_TWEETS};
}

export function loadTweets() {
    return  (dispatch, getState) => {
        const token = getState().user.token;
        return tweetsApi.getTweets(token).then(tweets => {
            dispatch(loadTweetsSuccess(tweets));
        }).catch(error => {
            // throw(error);
            console.log(error);
        });
    };
}

export function loadMoreTweets() {
    return  (dispatch, getState) => {
        const token = getState().user.token;
        const tweets = getState().tweets;
        const maxId = tweets[tweets.length-1].id_str;
        return tweetsApi.getTweets(token, maxId).then(tweets => {
            dispatch(loadTweetsSuccess(tweets));
        }).catch(error => {
            // throw(error);
            console.log(error);
        });
    };
}
