import { select, put, take, takeLatest } from 'redux-saga/effects';
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

function* whatUp(state) {
    switch(state.meta.resource) {
        case 'pocs':
            console.log('getting pocs');
            yield put({type: types.LOAD_POCS});
            break;
        default:
            break;
    }
}

export default function* watchEVERYTHING() {
    yield takeLatest('RA/SET_SIDEBAR_VISIBILITY', fetchBackground);
    yield takeLatest('RA/CRUD_UPDATE_SUCCESS', whatUp);
}

