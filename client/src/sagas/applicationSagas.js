import { call, put, takeEvery } from 'redux-saga/effects'
import * as appActions from '../actions/applicationActions';
import * as types from '../actions/actionTypes';

const applicationURL_dev = 'https://dev3.ea.gsa.gov/api/v1/applications/';
const applicationURL = 'http://localhost:3334/api/v1/applications/';

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

export default function* watchGetApplication(id) {
    yield takeEvery(types.LOAD_APPLICATION, fetchApplication);
}
