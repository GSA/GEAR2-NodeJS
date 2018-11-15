import * as types from './actionTypes';

export function loadPOCs() {
    return {type: types.LOAD_POCS};
}

export const loadPOCsSuccess = (pocs) => {
    return {type: types.LOAD_POCS_SUCCESS, pocs: pocs};
};

export const loadPOCsFailed = () => {
    return {type: types.LOAD_POCS_FAILURE};
};