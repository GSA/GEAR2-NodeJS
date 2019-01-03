import * as types from '../actions/actionTypes';

export default function appBusinessReducer(state = {
    userLocations: [],
    organizations: [],
    loading: false,
    called: false,
    saved: false
}, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_BUSINESS_START:
            return Object.assign({}, state, {loading: true, called: true});

        case types.LOAD_APPLICATION_BUSINESS_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false});

        case types.SAVE_NEW_APPLICATION_FAILURE:
            return Object.assign({}, state, {errorMessage: action.errorMessage});

        case 'RA/HIDE_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case types.UPDATE_FIELD_APP:
            if (action.obj) {
                const key = Object.keys(action.obj)[0];
                return Object.assign({}, state, {[key]: action.obj[key].value})
            } else {
                return state;
            }

        case types.SAVE_APPLICATION_START:
            return Object.assign({}, state, {saved: false});

        case types.SAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {saved: true});

        case 'RA/RESET_FORM':
            return Object.assign({}, state, {called: false});

        default:
            return state;
    }
}