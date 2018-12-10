import * as types from './actionTypes';

export function loadPOCs() {
    return {type: types.LOAD_POCS};
}

export const loadPOCsSuccess = (pocs) => {
    return {type: types.LOAD_POCS_SUCCESS, pocs: pocs};
};

export const updatePOCSuccess = (poc) => {
    console.log(poc);
    return {type: types.UPDATE_POC_SUCCESS, poc: poc};
};

export const loadPOCsFailed = () => {
    return {type: types.LOAD_POCS_FAILURE};
};