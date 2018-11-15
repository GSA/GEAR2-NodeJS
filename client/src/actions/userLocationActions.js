import * as types from './actionTypes';

export function loadUserLocations() {
    return {type: types.LOAD_USER_LOCATIONS};
}

export const loadUserLocationsSuccess = (userlocations) => {
    return {type: types.LOAD_USER_LOCATIONS_SUCCESS, userlocations: userlocations};
};

export const loadUserLocationsFailed = () => {
    return {type: types.LOAD_USER_LOCATIONS_FAILURE};
};