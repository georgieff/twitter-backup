import {combineReducers} from 'redux';
import tweets from './tweetReducer';
import savedTweets from './savedTweetReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    tweets,
    savedTweets,
    user
});

export default rootReducer;
