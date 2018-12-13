import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as userActions from '../actions/userActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/organizations?count=10000';


function* fetchUsers(action) {
    try {
        let data = yield call(() => {
                return fetch(URL, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        data = sortArrayOfObjectByProp(data, 'keyname');
        yield put(userActions.loadUsersSuccess(data));
    } catch (error) {
        yield put(userActions.loadUsersFailed());
    }
}


export default function* watchGetUsers() {
    yield takeLatest(types.LOAD_USERS, fetchUsers);
}