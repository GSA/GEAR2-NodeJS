import * as types from '../actions/actionTypes';

export default function appBusinessReducer(state = {
    userLocations: [],
    organizations: [],
    loading: false,
    loaded: false
}, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_BUSINESS_START:
            return Object.assign({}, state, {loading: true, loaded: false});

        case types.LOAD_APPLICATION_BUSINESS_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false, loaded: true});

        default:
            return state;
    }
}