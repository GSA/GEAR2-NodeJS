import * as types from './actionTypes';

//action creator
export function saveApplication(application) {
    return {type: types.SAVE_APPLICATION, application};
}

export function saveNewApplication(application) {
    return {type: types.SAVE_NEW_APPLICATION, application};
}

export function loadApplication(id) {
    return {type: types.LOAD_APPLICATION, id: id};
}

export const loadApplicationStart = () => {
    return {type: types.LOAD_APPLICATION_START};
};

export const loadApplicationSuccess = (application) => {
    return {type: types.LOAD_APPLICATION_SUCCESS, application: application};
};

export const loadApplicationFailed = () => {
    return {type: types.LOAD_APPLICATION_FAILURE};
};