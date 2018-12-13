import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as fismaActions from '../actions/fismaActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/fismas?count=10000';


function* fetchFismas(action) {
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
        yield put(fismaActions.loadFismasSuccess(data));
    } catch (error) {
        yield put(fismaActions.loadFismasFailed());
    }
}


export default function* watchGetParents() {
    yield takeLatest(types.LOAD_FISMAS, fetchFismas);
}