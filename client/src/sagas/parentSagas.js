import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import * as parentActions from '../actions/parentActions';
import * as host from './env';
import {sortArrayOfObjectByProp} from "../shared/utility";

const URL = host.target + '/api/v1/parent_systems?count=10000';


function* fetchParents(action) {
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
        yield put(parentActions.loadParentsSuccess(data));
    } catch (error) {
        yield put(parentActions.loadParentsFailed());
    }
}


export default function* watchGetParents() {
    yield takeLatest(types.LOAD_PARENTSYSTEMS, fetchParents);
}