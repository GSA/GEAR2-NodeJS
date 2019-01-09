import * as types from './actionTypes';

//action creator
export function saveApplication(id) {
    return {type: types.SAVE_APPLICATION, id};
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
};

export const saveNewApplicationFailed = (errMessage) => {
    return {type: types.SAVE_NEW_APPLICATION_FAILURE, errorMessage: errMessage};
};

export const saveApplicationSuccess = () => {
    return {type: types.SAVE_APPLICATION_SUCCESS};
};

export function loadApplicationGeneral(id) {
    return {type: types.LOAD_APPLICATION_GENERAL, id: id};
}

export const loadApplicationGeneralStart = () => {
    return {type: types.LOAD_APPLICATION_GENERAL_START};
};

export const loadApplicationGeneralSuccess = (application) => {
    return {type: types.LOAD_APPLICATION_GENERAL_SUCCESS, application: application}
};

export const loadApplicationGeneralFailed = () => {
    return {type: types.LOAD_APPLICATION_GENERAL_FAILURE};
};

export const saveApplicationGeneralFailed = (errMessage) => {
    return {type: types.SAVE_APPLICATION_GENERAL_FAILURE, errorMessage: errMessage};
};

export function loadApplicationBusiness(id) {
    return {type: types.LOAD_APPLICATION_BUSINESS, id: id};
}

export const loadApplicationBusinessStart = () => {
    return {type: types.LOAD_APPLICATION_BUSINESS_START};
};

export const loadApplicationBusinessSuccess = (application) => {
    return {type: types.LOAD_APPLICATION_BUSINESS_SUCCESS, application: application}
};

export const loadApplicationBusinessFailed = () => {
    return {type: types.LOAD_APPLICATION_BUSINESS_FAILURE};
};

export const saveApplicationBusinessFailed = (errMessage) => {
    return {type: types.SAVE_APPLICATION_BUSINESS_FAILURE, errorMessage: errMessage};
};

export function loadApplicationTechnology(id) {
    return {type: types.LOAD_APPLICATION_TECHNOLOGY, id: id};
}

export const loadApplicationTechnologyStart = () => {
    return {type: types.LOAD_APPLICATION_TECHNOLOGY_START};
};

export const loadApplicationTechnologySuccess = (application) => {
    return {type: types.LOAD_APPLICATION_TECHNOLOGY_SUCCESS, application: application}
};

export const loadApplicationTechnologyFailed = () => {
    return {type: types.LOAD_APPLICATION_TECHNOLOGY_FAILURE};
};

export const saveApplicationTechnologyFailed = (errMessage) => {
    return {type: types.SAVE_APPLICATION_TECHNOLOGY_FAILURE, errorMessage: errMessage};
};

export const updateFieldApp = (obj) => {
    return {type: types.UPDATE_FIELD_APP, obj: obj}
};

export const saveApplicationFailed = (errMessage) => {
    return {type: types.SAVE_APPLICATION_FAILED, errMessage: errMessage}
};

export const saveApplicationGeneralStart = () => {
    return {type: types.SAVE_APPLICATION_GENERAL_START}
};