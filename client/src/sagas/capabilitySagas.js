import { call, put, takeEvery } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as capabilitiesActions from '../actions/capabilitiesActions';

const URL_dev = 'https://dev3.ea.gsa.gov/api/v1/capabilities?count=10000';
const URL = 'http://localhost:3334/api/v1/capabilities?count=10000';


function* fetchCapabilities(action) {
    try {
        console.log('getting capabilities');
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
        yield put(capabilitiesActions.loadCapabilitiesSuccess(data));
    } catch (error) {
        yield put(capabilitiesActions.loadCapabilitiesFailed());
    }
}


export default function* watchGetCapabilities() {
    yield takeEvery(types.LOAD_CAPABILITIES, fetchCapabilities);
}