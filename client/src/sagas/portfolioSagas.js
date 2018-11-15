import { call, put, takeEvery } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as portfolioActions from '../actions/portfolioActions';
import * as host from './env';

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
        yield put(portfolioActions.loadPortfoliosSuccess(data));
    } catch (error) {
        yield put(portfolioActions.loadPortfoliosFailed());
    }
}


export default function* watchGetParents() {
    yield takeEvery(types.LOAD_PORTFOLIOS, fetchPortfolios);
}