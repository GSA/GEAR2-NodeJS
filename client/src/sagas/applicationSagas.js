import { call, put, takeLatest } from 'redux-saga/effects'
import * as appActions from '../actions/applicationActions';
import * as types from '../actions/actionTypes';
import * as host from './env';

const applicationURL = host.target + '/api/v1/applications/';

function* fetchApplication(action) {
    try {
        //const state = yield select(); <- if we need anything from the store here
        const data = yield call(() => {
                return fetch(applicationURL + action.id, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        yield put(appActions.loadApplicationSuccess(data));
    } catch (error) {
        yield put(appActions.loadApplicationFailed());
    }
}

function* saveApplication(action) {
    try {
        const data = yield call(() => {
                return fetch(applicationURL + action.application.id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(action.application)
                })
                    .then(res => res.json())
            }
        );
        if (data.errors ) {
            throw data;
        }
        //
        yield put(appActions.saveApplicationSuccess());
        yield put({type: 'RA/REFRESH_VIEW'})
    } catch (error) {
        yield put(appActions.saveNewApplicationFailed(error.errors[0].message));
    }
}

/**
 * Makes two API calls to save a new application
 * @param action
 * @returns {IterableIterator<*>}
 */
function* saveNewApplication(action) {
    // Save the new application without the one-to-many fields
    try {
        const data = yield call(() => {
                return fetch(applicationURL, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(action.application)
                })
                    .then(res => res.json())
            }
        );
        const id = data.id;
        // merge the saved app with one to many relationships and save it again.
        const updatedData = {...data, ...action.updatedApplication};
        const newData = yield call(() => {
                return fetch(applicationURL + id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(updatedData)
                })
                    .then(res => res.json())
            }
        );
        if (data.errors || newData.errors) {
            throw data.errors ? data : newData;
        }
        yield put(appActions.saveApplicationSuccess());
        yield put({type: 'RA/REFRESH_VIEW'})
    } catch (error) {
        yield put(appActions.saveNewApplicationFailed(error.errors[0].message));
    }
}

export default function* watchGetApplication(data) {
    yield takeLatest(types.LOAD_APPLICATION, fetchApplication);
    yield takeLatest(types.SAVE_APPLICATION, saveApplication);
    yield takeLatest(types.SAVE_NEW_APPLICATION, saveNewApplication);
}