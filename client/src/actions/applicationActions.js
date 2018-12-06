import * as types from './actionTypes';

//action creator
export function saveApplication(application) {
    return {type: types.SAVE_APPLICATION, application};
}

export function saveNewApplication(application, updatedApplication) {
    return {type: types.SAVE_NEW_APPLICATION, application, updatedApplication};
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

export const saveApplicationStart = () => {
    return {type: types.SAVE_APPLICATION_START};
}

export const saveNewApplicationFailed = (errMessage) => {
    return {type: types.SAVE_NEW_APPLICATION_FAILURE, errorMessage: errMessage};
};

export const saveApplicationSuccess = () => {
    return {type: types.SAVE_APPLICATION_SUCCESS};
}