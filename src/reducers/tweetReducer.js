import * as types from '../actions/actionTypes';
export default function tweetReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_TWEETS:
            return [
                ...state,
                ...action.tweets
            ];
        default:
            return state;
    }
}
