import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as appActions from '../actions/applicationActions';
import * as types from '../actions/actionTypes';
import * as host from './env';

const applicationURL = host.target + '/api/v1/applications/';
const applicationBusinessURL = host.target + '/api/v1/appmultiselects/';

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
    const state = yield select();
    try {
        if (state.application.called) {
            const payloadGen = {...state.application};
            delete payloadGen.loading;
            delete payloadGen.errorMessage;
            delete payloadGen.saved;
            delete payloadGen.called;
            const dataGeneral = yield call(() => {
                    return fetch(applicationURL + action.id, {
                        method: 'PUT',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.jwt,
                            "Content-Type": "application/json; charset=utf-8"
                        }),

                        body: JSON.stringify(payloadGen)
                    })
                        .then(res => {
                            console.log('saved');
                            return res.json()
                        })
                }
            );
            if (dataGeneral.errors) {
                dataGeneral.errors[0].message = "Application General Cannot Be Saved";
                throw dataGeneral;
            }
        }

        if (state.appBusiness.called) {
            const payloadBus = {...state.appBusiness};
            delete payloadBus.loading;
            delete payloadBus.called;
            const dataBusiness = yield call(() => {
                debugger;
                    return fetch(applicationBusinessURL + action.id, {
                        method: 'PUT',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.jwt,
                            "Content-Type": "application/json; charset=utf-8"
                        }),
                        body: JSON.stringify(payloadBus)
                    })
                        .then(res => {
                            console.log('saved');
                            return res.json()
                        })
                }
            );
            if (dataBusiness.errors) {
                dataBusiness.errors[0].message = "Application Business Cannot Be Saved";
                throw dataBusiness;
            }
        }
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

function* loadApplicationBusiness (action) {
    try {
        //const state = yield select(); <- if we need anything from the store here

        const data = yield call(() => {
                return fetch(applicationBusinessURL + action.id, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        yield put(appActions.loadApplicationBusinessSuccess(data));
    } catch (error) {
        yield put(appActions.loadApplicationBusinessFailed());
    }
}



export default function* watchGetApplication(data) {
    yield takeLatest(types.LOAD_APPLICATION, fetchApplication);
    yield takeLatest(types.LOAD_APPLICATION_BUSINESS, loadApplicationBusiness)
    yield takeLatest(types.SAVE_APPLICATION, saveApplication);
    yield takeLatest(types.SAVE_NEW_APPLICATION, saveNewApplication);
}