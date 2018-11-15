import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import * as capabilitiesActions from "../actions/capabilitiesActions";

function* fetchBackground(dispatch) {
    try {
        yield put({type: types.LOAD_TECHNOLOGIES});
        yield put({type: types.LOAD_USERS});
        yield put({type: types.LOAD_POCS});
        yield put({type: types.LOAD_CAPABILITIES});
        yield put({type: types.LOAD_FISMAS});
        yield put({type: types.LOAD_PLATFORMS});
        yield put({type: types.LOAD_PARENTSYSTEMS});
        yield put({type: types.LOAD_INVESTMENTS});
        yield put({type: types.LOAD_PORTFOLIOS});
        yield put({type: types.LOAD_PROVIDERS});
        yield put({type: types.LOAD_USER_LOCATIONS});
    } catch (error) {
        yield put(capabilitiesActions.loadCapabilitiesFailed());
    }
}

export default function* watchEVERYTHING() {
    console.log('in here');
    yield takeLatest('RA/USER_CHECK', fetchBackground);
}
