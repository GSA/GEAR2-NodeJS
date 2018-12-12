import * as types from './actionTypes';

export function doesExist(payload) {
    return {type: types.DOES_EXIST, payload};
}

export const doesExistSuccess = (doesExist) => {
    return {type: types.DOES_EXIST_SUCCESS, doesExist: doesExist};
};

export const doesExistFailure = () => {
    return {type: types.DOES_EXIST_FAILURE}
};

export const doesExistInitiate = () => {
    return {type: types.DOES_EXIST_INITIATE}
};