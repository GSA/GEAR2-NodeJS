import * as types from './actionTypes';

export function loadBusinessPOCs() {
    return {type: types.LOAD_BUSINESS_POC};
}

export const loadBusinessPOCsSuccess = (pocs) => {
    return {type: types.LOAD_BUSINESS_POC_SUCCESS, businesspocs: pocs};
};

export const loadBusinessPOCsFailed = () => {
    return {type: types.LOAD_BUSINESS_POC_FAILURE};
};