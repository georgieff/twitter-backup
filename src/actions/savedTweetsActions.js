import * as types from './actionTypes';
/*eslint-disable no-console */
import savedTweetsApi from '../api/savedTweets';

export function loadSavedTweetsSuccess(savedTweets) {
    return { type: types.LOAD_SAVED_TWEETS, savedTweets: savedTweets};
}

export function addSavedTweetSuccess(savedTweet) {
    return { type: types.ADD_SAVED_TWEET, savedTweet: savedTweet};
}

export function removeSavedTweetSuccess(tweetId) {
    return { type: types.REMOVE_SAVED_TWEET, tweetId: tweetId};
}

export function loadSavedTweets() {
    return  (dispatch, getState) => {
        const userId = getState().user.id;
        return savedTweetsApi.getAllSavedTweets(userId).then(savedTweets => {
            dispatch(loadSavedTweetsSuccess(savedTweets));
        }).catch(error => {
            console.log(error);
            // throw(error);
        });
    };
}

export function addSavedTweet(tweet) {
    return  (dispatch, getState) => {
        const userId = getState().user.id;
        return savedTweetsApi.addSavedTweet(tweet, userId).then(savedTweet => {
            dispatch(addSavedTweetSuccess(savedTweet));
        }).catch(error => {
            console.log(error);
            // throw(error);
        });
    };
}

export function removeSavedTweet(tweet) {
    return  (dispatch, getState) => {
        const userId = getState().user.id;
        return savedTweetsApi.removeSavedTweet(tweet, userId).then(id => {
            dispatch(removeSavedTweetSuccess(id));
        }).catch(error => {
            console.log(error);
            // throw(error);
        });
    };
}
