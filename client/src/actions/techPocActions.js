import * as types from './actionTypes';

export function loadTechPOCs() {
    return {type: types.LOAD_TECH_POC};
}

export const loadTechPOCsSuccess = (pocs) => {
    return {type: types.LOAD_TECH_POC_SUCCESS, techpocs: pocs};
};

export const loadTechPOCsFailed = () => {
    return {type: types.LOAD_TECH_POC_FAILURE};
};