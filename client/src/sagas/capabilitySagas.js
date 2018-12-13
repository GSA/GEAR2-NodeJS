import { call, put, select, takeLatest, cancel } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as capabilitiesActions from '../actions/capabilitiesActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/capabilities?count=10000';

function* fetchCapabilities(action) {
    try {
        const state = yield select();
        if(state.application.capabilities.length > 0) {
            cancel();
        }
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
        yield put(capabilitiesActions.loadCapabilitiesSuccess(data));
    } catch (error) {
        yield put(capabilitiesActions.loadCapabilitiesFailed());
    }
}


export default function* watchGetCapabilities() {
    yield takeLatest(types.LOAD_CAPABILITIES, fetchCapabilities);
}