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
            yield put({type: types.LOAD_POCS});
            break;
        //case 'application_interfaces':
            //TODO after we remove react-admin from the app interfaces forms
            //break;
        //case 'application_rationalizations':
            //TODO after we remove react-admin from the app rationalization forms
            //break;
        case 'capabilities':
            yield put({type: types.LOAD_CAPABILITIES});
            break;
        case 'fismas':
            yield put({type: types.LOAD_FISMAS});
            break;
        //case 'fisma_artifacts':
            //TODO after we remove react-admin from the FISMA forms
            //break;
        case 'investments':
            yield put({type: types.LOAD_INVESTMENTS});
            break;
        case 'parent_systems':
            yield put({type: types.LOAD_PARENTSYSTEMS});
            break;
        case 'technologies':
            yield put({type: types.LOAD_TECHNOLOGIES});
            break;
        default:
            break;
    }
}

export default function* watchEVERYTHING() {
    yield takeLatest('RA/SET_SIDEBAR_VISIBILITY', fetchBackground);
    yield takeLatest('RA/CRUD_UPDATE_SUCCESS', whatUp);
}

