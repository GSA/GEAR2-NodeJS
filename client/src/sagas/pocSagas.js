import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as pocActions from '../actions/pocActions';
import * as host from './env';

const URL = host.target + '/api/v1/pocs?count=10000';


function* fetchPOCs(action) {
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
        yield put(pocActions.loadPOCsSuccess(data));
    } catch (error) {
        yield put(pocActions.loadPOCsFailed());
    }
}


export default function* watchGetPOCs() {
    yield takeLatest(types.LOAD_POCS, fetchPOCs);
}