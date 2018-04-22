/*eslint-disable no-console */
import * as types from './actionTypes';
import usersApi from '../api/users';

export function loadUserSuccess(user) {
    return { type: types.LOAD_USER, user: user};
}

export function authUserSuccess(user) {
    return { type: types.AUTH_USER, user: user};
}

export function logoutUserSuccess() {
    return { type: types.LOGOUT_USER};
}

export function loadUser() {
    return dispatch => {
        return usersApi.getUser().then(user => {
            dispatch(loadUserSuccess(user));
        }).catch(error => {
            console.log(error);
            // throw(error);
        });
    };
}

export function authUser(user) {
    return dispatch => {
        return usersApi.authUser(user).then(user => {
            dispatch(authUserSuccess(user));
        }).catch(error => {
            console.log(error);
            // throw(error);
        });
    };
}

export function logoutUser(user) {
    return dispatch => {
        return usersApi.logoutUser(user).then(() => {
            dispatch(logoutUserSuccess());
        }).catch(error => {
            console.log(error);
            // throw(error);
        });
    };
}
