import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as portfolioActions from '../actions/portfolioActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/portfolios?count=10000';


function* fetchPortfolios(action) {
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
        yield put(portfolioActions.loadPortfoliosSuccess(data));
    } catch (error) {
        yield put(portfolioActions.loadPortfoliosFailed());
    }
}


export default function* watchGetParents() {
    yield takeLatest(types.LOAD_PORTFOLIOS, fetchPortfolios);
}