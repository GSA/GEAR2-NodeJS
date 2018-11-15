import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import * as capabilitiesActions from "../actions/capabilitiesActions";

function* fetchBackground(dispatch) {
    try {
        yield put({type: types.LOAD_TECHNOLOGIES});
        yield put({type: types.LOAD_USERS});
        yield put({type: types.LOAD_TECH_POC});
        yield put({type: types.LOAD_BUSINESS_POC});
        yield put({type: types.LOAD_CAPABILITIES});
    } catch (error) {
        yield put(capabilitiesActions.loadCapabilitiesFailed());
    }
}

export default function* watchEVERYTHING() {
    console.log('in here');
    yield takeLatest('RA/USER_CHECK', fetchBackground);
}
