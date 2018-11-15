import { call, put, takeEvery } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as userActions from '../actions/userActions';
import * as host from './env';

const URL = host.target + '/api/v1/organizations?count=10000';


function* fetchUsers(action) {
    try {
        const data = yield call(() => {
                return fetch(URL, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        yield put(userActions.loadUsersSuccess(data));
    } catch (error) {
        yield put(userActions.loadUsersFailed());
    }
}


export default function* watchGetUsers() {
    yield takeEvery(types.LOAD_USERS, fetchUsers);
}