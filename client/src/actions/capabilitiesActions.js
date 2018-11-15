import * as types from './actionTypes';

export function loadCapabilities() {
    return {type: types.LOAD_CAPABILITIES};
}

export const loadCapabilitiesSuccess = (capabilities) => {
    return {type: types.LOAD_CAPABILITIES_SUCCESS, capabilities: capabilities};
};

export const loadCapabilitiesFailed = () => {
    return {type: types.LOAD_CAPABILITIES_FAILURE};
};