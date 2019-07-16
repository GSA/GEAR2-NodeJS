import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as pocActions from '../actions/pocActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/pocs?count=10000';


function* fetchPOCs(action) {
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
        yield put(pocActions.loadPOCsSuccess(data));
    } catch (error) {
        yield put(pocActions.loadPOCsFailed());
    }
}


export default function* watchGetPOCs() {
    yield takeLatest(types.LOAD_POCS, fetchPOCs);
}