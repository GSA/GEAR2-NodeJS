import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as providerActions from '../actions/providerActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

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
        sortArrayOfObjectByProp(data, 'keyname');
        yield put(providerActions.loadProvidersSuccess(data));
    } catch (error) {
        yield put(providerActions.loadProvidersFailed());
    }
}


export default function* watchGetUsers() {
    yield takeLatest(types.LOAD_PROVIDERS, fetchProviders);
}