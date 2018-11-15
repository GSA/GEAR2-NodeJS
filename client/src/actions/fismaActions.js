import * as types from './actionTypes';

export function loadFismas() {
    return {type: types.LOAD_FISMAS};
}

export const loadFismasSuccess = (fismas) => {
    return {type: types.LOAD_FISMAS_SUCCESS, fismas: fismas};
};

export const loadFismasFailed = () => {
    return {type: types.LOAD_FISMAS_FAILURE};
};