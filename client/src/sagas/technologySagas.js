import { call, put, takeEvery } from 'redux-saga/effects'
import * as techActions from '../actions/technologyActions';
import * as types from '../actions/actionTypes';

const URL = 'http://localhost:3334/api/v1/technologies';

function* fetchTechnologies(action) {
    try {
        const data = yield call(() => {
                return fetch(URL)
                    .then(res => res.json())
            }
        );
        yield put(techActions.loadTechnologiesSuccess(data));
    } catch (error) {
        yield put(techActions.loadTechnologiesFailed());
    }
}


export default function* watchGetTechnologies() {
    yield takeEvery(types.LOAD_TECHNOLOGIES, fetchTechnologies);
}