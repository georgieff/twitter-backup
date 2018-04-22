import * as types from '../actions/actionTypes';
export default function userReducer(state = {}, action) {
    switch(action.type) {
        case types.LOAD_USER:
            return action.user;

        case types.AUTH_USER:
            return action.user;

        case types.LOGOUT_USER:
            return {};

        default:
            return state;
    }
}
