import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as platformActions from '../actions/platformActions';
import * as host from './env';

const URL = host.target + '/api/v1/app_platforms?count=10000';


function* fetchPlatforms(action) {
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
        yield put(platformActions.loadPlatformsSuccess(data));
    } catch (error) {
        yield put(platformActions.loadPlatformsFailed());
    }
}


export default function* watchGetUsers() {
    yield takeLatest(types.LOAD_PLATFORMS, fetchPlatforms);
}