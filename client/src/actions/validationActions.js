import * as types from './actionTypes';

export function doesExist(payload) {
    return {type: types.DOES_EXIST, payload};
}

export const doesExistSuccess = (doesExist, field) => {
    return {type: types.DOES_EXIST_SUCCESS, doesExist: doesExist, field: field};
};

export const doesExistFailure = () => {
    return {type: types.DOES_EXIST_FAILURE}
};

export const doesExistInitiate = (field) => {
    return {type: types.DOES_EXIST_INITIATE, field: field.field}
};