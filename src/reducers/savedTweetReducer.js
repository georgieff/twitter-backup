import * as types from '../actions/actionTypes';
export default function savedTweetReducer(state = [], action) {
    switch(action.type) {

        case types.LOAD_SAVED_TWEETS:
            return action.savedTweets;

        case types.ADD_SAVED_TWEET:
            return [
                Object.assign({}, action.savedTweet),
                ...state
            ];

        case types.REMOVE_SAVED_TWEET:
            return [
                ...state.filter(tweet => tweet.id !== action.tweetId)
            ];

        case types.CLEAR_SAVED_TWEETS:
            return [];

        default:
            return state;
    }
}
