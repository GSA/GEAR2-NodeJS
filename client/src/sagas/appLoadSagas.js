import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import * as capabilitiesActions from "../actions/capabilitiesActions";
import {updatePOCSuccess} from '../actions/pocActions';

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


function* updateResourcesWithNew(state) {
    yield updateResources(state, true);
}

function* updateResourcesExisting(state) {
    yield updateResources(state, false);
}

//TODO after we remove react-admin also add for application_interfaces, application_rationalizations and fisma_artifacts
function* updateResources(state, newItem) {
    console.log(state);
    switch(state.meta.resource) {
        case 'pocs':
            yield put({type: types.UPDATE_POCS, ...Object.assign({}, state.payload.data, {newItem: newItem})});
            break;
        case 'capabilities':
            yield put({type: types.UPDATE_CAPABILITIES, ...state.payload.data});
            break;
        case 'fismas':
            yield put({type: types.UPDATE_FISMAS, ...state.payload.data});
            break;
        case 'investments':
            yield put({type: types.UPDATE_INVESTMENTS, ...state.payload.data});
            break;
        case 'parent_systems':
            yield put({type: types.UPDATE_PARENTSYSTEMS, ...state.payload.data});
            break;
        case 'technologies':
            yield put({type: types.UPDATE_TECHNOLOGIES, ...state.payload.data});
            break;
        default:
            break;
    }
}

export default function* watchEVERYTHING() {
    yield takeLatest('RA/SET_SIDEBAR_VISIBILITY', fetchBackground);
    yield takeLatest('RA/CRUD_UPDATE_SUCCESS', updateResourcesExisting);
    yield takeLatest('RA/CRUD_CREATE_SUCCESS', updateResourcesWithNew);
}

