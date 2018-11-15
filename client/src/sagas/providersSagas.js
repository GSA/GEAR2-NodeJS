import { call, put, takeEvery } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as providerActions from '../actions/providerActions';
import * as host from './env';

const URL = host.target + '/api/v1/app_hostingproviders?count=10000';


function* fetchProviders(action) {
    try {
        const data = yield call(() => {
                return fetch(URL, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        yield put(providerActions.loadProvidersSuccess(data));
    } catch (error) {
        yield put(providerActions.loadProvidersFailed());
    }
}


export default function* watchGetUsers() {
    yield takeEvery(types.LOAD_PROVIDERS, fetchProviders);
}