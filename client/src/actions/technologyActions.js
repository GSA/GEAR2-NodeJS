import * as types from './actionTypes';

export function loadTechnologies() {
    return {type: types.LOAD_TECHNOLOGIES};
}

export const loadTechnologiesSuccess = (technologies) => {
    return {type: types.LOAD_TECHNOLOGIES_SUCCESS, technologies: technologies};
};

export const loadTechnologiesFailed = () => {
    return {type: types.LOAD_TECHNOLOGIES_FAILURE};
};