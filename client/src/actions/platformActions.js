import * as types from './actionTypes';

export function loadPlatforms() {
    return {type: types.LOAD_PLATFORMS};
}

export const loadPlatformsSuccess = (platforms) => {
    return {type: types.LOAD_PLATFORMS_SUCCESS, platforms: platforms};
};

export const loadPlatformsFailed = () => {
    return {type: types.LOAD_PLATFORMS_FAILURE};
};