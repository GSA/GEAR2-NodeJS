import * as host from './env';
import * as validationActions from '../actions/validationActions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';

const URL = host.target + '/api/v1';

function* doesExist(action) {
    try {
        const data = yield call(() => {
            return fetch (`${URL}/${action.payload.modelInstance}?${action.payload.field}=${action.payload.target}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.jwt
                })
            } )
                .then(res => res.json())
        });
        yield put(validationActions.doesExistSuccess(data.length > 0, action.payload.field))
    } catch (err) {
        yield put(validationActions.doesExistFailure());
    }
}

export default function* watchValidation() {
    yield takeLatest(types.DOES_EXIST, doesExist);
}