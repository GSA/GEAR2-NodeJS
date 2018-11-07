import * as types from './actionTypes';

//action creator
export function saveApplication(application) {
    return {type: types.SAVE_APPLICATION, application};
}

export function loadApplication(id) {
    return {type: types.LOAD_APPLICATION, id: id};
}

export const loadApplicationSuccess = (application) => {
    return {type: types.LOAD_APPLICATION_SUCCESS, application: application};
};

export const loadApplicationFailed = () => {
    return {type: types.LOAD_APPLICATION_FAILURE};
};