import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as appActions from '../actions/applicationActions';
import * as types from '../actions/actionTypes';
import * as host from './env';

const applicationURL = host.target + '/api/v1/applications/';
const applicationGeneralURL = host.target + '/api/v1/appsGeneral/';
const applicationBusinessURL = host.target + '/api/v1/appsBusiness/';
const applicationTechnologyURL = host.target + '/api/v1/appsTechnology/';

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
    const payloadGen = {...state.appGeneral};
    const payloadBus = {...state.appBusiness};
    const payloadTech = {...state.appTechnology};

    const [general, business, technical] = yield all ([
        call(() => {
                return fetch(applicationGeneralURL + action.id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),

                    body: JSON.stringify(payloadGen)
                })
                    .then(res => {
                        if (res.status !== 200) {
                            return {errors: 'error'};
                        } else {
                            return res.json();
                        }
                    })
            }
        ),
        call(() => {
                return fetch(applicationBusinessURL + action.id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(payloadBus)
                })
                    .then(res => {
                        if (res.status !== 200) {
                            return {errors: 'error'};
                        } else {
                            return res.json();
                        }
                    })
            }
        ),
        call(() => {
                return fetch(applicationTechnologyURL + action.id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(payloadTech)
                })
                    .then(res => {
                        if (res.status !== 200) {
                            return {errors: 'error'};
                        } else {
                            return res.json();
                        }
                    })
            }
        )
    ]);

    let errMessage = null;

    if (general.errors) {
        errMessage = 'err';
        yield put(appActions.saveApplicationGeneralFailed('General'));
    }
    if (technical.errors) {
        errMessage = 'err';
        yield put(appActions.saveApplicationTechnologyFailed('Technology'));
    }
    if (business.errors) {
        errMessage = 'err';
        yield put(appActions.saveApplicationBusinessFailed('Businesss'))
    }

    if (!errMessage) {
        yield put(appActions.saveApplicationSuccess());
    }



    /*
    } catch (error) {
        if (error.error === 'dataGeneral') yield put(appActions.saveApplicationGeneralFailed(error));
        else if (error.error === 'dataBusiness') yield put(appActions.saveApplicationBusinessFailed(error));
        else if (error.error === 'dataTech') yield put(appActions.saveApplicationTechnologyFailed(error));
        else put(appActions.saveApplicationFailed(error));
    }
    */
}

/**
 * Makes two API calls to save a new application
 * @param action
 * @returns {IterableIterator<*>}
 */
function* saveNewApplication(action) {
    const state = yield select();
    const payloadGen = {...state.appGeneral};
    const payloadBus = {...state.appBusiness};
    const payloadTech = {...state.appTechnology};

    const general = yield call(() => {
            return fetch(applicationGeneralURL, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.jwt,
                    "Content-Type": "application/json; charset=utf-8"
                }),
                body: JSON.stringify(payloadGen)
            })
                .then(res => {
                    if (res.status !== 201) {
                        return {errors: 'error'};
                    } else {
                        return res.json();
                    }
                })
        }
    );

    const id = general.id;

    const [ business, technical ] = yield all ([
        call(() => {
                return fetch(applicationBusinessURL + id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(payloadBus)
                })
                    .then(res => {
                        if (res.status !== 200) {
                            return {errors: 'error'};
                        } else {
                            return res.json();
                        }
                    })
            }
        ),
        call(() => {
                return fetch(applicationTechnologyURL + id, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt,
                        "Content-Type": "application/json; charset=utf-8"
                    }),
                    body: JSON.stringify(payloadTech)
                })
                    .then(res => {
                        if (res.status !== 200) {
                            return {errors: 'error'};
                        } else {
                            return res.json();
                        }
                    })
            }
        )
    ]);

    let errMessage = null;

    if (general.errors) {
        errMessage = 'err';
        yield put(appActions.saveApplicationGeneralFailed('General'));
        yield put(appActions.saveApplicationTechnologyFailed('Technology'));
        yield put(appActions.saveApplicationBusinessFailed('Businesss'));
    }
    if (technical.errors) {
        errMessage = 'err';
        yield put(appActions.saveApplicationTechnologyFailed('Technology'));
    }
    if (business.errors) {
        errMessage = 'err';
        yield put(appActions.saveApplicationBusinessFailed('Businesss'))
    }

    if (!errMessage) {
        yield put(appActions.saveApplicationSuccess());
    }

}

function* loadApplicationGeneral (action) {
    try {
        //const state = yield select(); <- if we need anything from the store here

        const data = yield call(() => {
                return fetch(applicationGeneralURL + action.id, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        yield put(appActions.loadApplicationGeneralSuccess(data));
    } catch (error) {
        yield put(appActions.loadApplicationGeneralFailed());
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

function* loadApplicationTechnology (action) {
    try {
        //const state = yield select(); <- if we need anything from the store here

        const data = yield call(() => {
                return fetch(applicationTechnologyURL + action.id, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        yield put(appActions.loadApplicationTechnologySuccess(data));
    } catch (error) {
        yield put(appActions.loadApplicationTechnologyFailed());
    }
}


export default function* watchGetApplication(data) {
    yield takeLatest(types.LOAD_APPLICATION, fetchApplication);
    yield takeLatest(types.LOAD_APPLICATION_BUSINESS, loadApplicationBusiness);
    yield takeLatest(types.LOAD_APPLICATION_GENERAL, loadApplicationGeneral);
    yield takeLatest(types.LOAD_APPLICATION_TECHNOLOGY, loadApplicationTechnology);
    yield takeLatest(types.SAVE_APPLICATION, saveApplication);
    yield takeLatest(types.SAVE_NEW_APPLICATION, saveNewApplication);
}