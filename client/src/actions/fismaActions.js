import * as types from './actionTypes';

export function loadFismas() {
    return {type: types.LOAD_FISMAS};
}

export const loadFismasSuccess = (activeFismas, inactiveFismas) => {
    return {type: types.LOAD_FISMAS_SUCCESS, activeFismas: activeFismas, inactiveFismas: inactiveFismas};
};

export const loadFismasFailed = () => {
    return {type: types.LOAD_FISMAS_FAILURE};
};