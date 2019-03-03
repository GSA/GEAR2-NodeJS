import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as fismaActions from '../actions/fismaActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/fismas?count=10000';


function* fetchFismas(action) {
    try {
        let data = yield call(() => {
                return fetch(URL, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.jwt
                    })
                })
                    .then(res => res.json())
            }
        );
        let activeFismas = [], inactiveFismas = [];

        data.forEach(function (item) {
            if (item.status === 'Active') {
                activeFismas.push(item);
            } else {
                inactiveFismas.push (item);
            }
        });
        activeFismas = sortArrayOfObjectByProp(activeFismas, 'keyname');
        yield put(fismaActions.loadFismasSuccess(activeFismas, inactiveFismas));
    } catch (error) {
        yield put(fismaActions.loadFismasFailed());
    }
}


export default function* watchGetParents() {
    yield takeLatest(types.LOAD_FISMAS, fetchFismas);
}