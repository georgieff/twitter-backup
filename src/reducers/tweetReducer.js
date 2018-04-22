import * as types from '../actions/actionTypes';
export default function tweetReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_TWEETS:
            return Object.assign(Object.assign([], state), action.tweets);
        default:
            return state;
    }
}
