import * as types from './actionTypes';

export function loadParents() {
    return {type: types.LOAD_PARENTSYSTEMS};
}

export const loadParentsSuccess = (parents) => {
    return {type: types.LOAD_PARENTSYSTEMS_SUCCESS, parents: parents};
};

export const loadParentsFailed = () => {
    return {type: types.LOAD_PARENTSYSTEMS_FAILURE};
};