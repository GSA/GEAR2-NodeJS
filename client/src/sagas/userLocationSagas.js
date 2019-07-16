import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as userLocations from '../actions/userLocationActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/user_locations?count=10000';


function* fetchUserLocations(action) {
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
        yield put(userLocations.loadUserLocationsSuccess(data));
    } catch (error) {
        yield put(userLocations.loadUserLocationsFailed());
    }
}


export default function* watchGetUserLocations() {
    yield takeLatest(types.LOAD_USER_LOCATIONS, fetchUserLocations);
}