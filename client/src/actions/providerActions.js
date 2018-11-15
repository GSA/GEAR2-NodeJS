import * as types from './actionTypes';

export function loadProviders() {
    return {type: types.LOAD_PROVIDERS};
}

export const loadProvidersSuccess = (providers) => {
    return {type: types.LOAD_PROVIDERS_SUCCESS, providers: providers};
};

export const loadProvidersFailed = () => {
    return {type: types.LOAD_PROVIDERS_FAILURE};
};