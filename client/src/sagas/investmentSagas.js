import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as investmentActions from '../actions/investmentActions';
import * as host from './env';

const URL = host.target + '/api/v1/investments?count=10000';


function* fetchInvestments(action) {
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
        yield put(investmentActions.loadInvestmentsSuccess(data));
    } catch (error) {
        yield put(investmentActions.loadInvestmentsFailed());
    }
}


export default function* watchGetParents() {
    yield takeLatest(types.LOAD_INVESTMENTS, fetchInvestments);
}