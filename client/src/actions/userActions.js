import * as types from './actionTypes';

export function loadUsers() {
    return {type: types.LOAD_USERS};
}

export const loadUsersSuccess = (users) => {
    return {type: types.LOAD_USERS_SUCCESS, users: users};
};

export const loadUsersFailed = () => {
    return {type: types.LOAD_USERS_FAILURE};
};