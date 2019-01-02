import * as types from '../actions/actionTypes';

export default function applicationReducer(state = {
    technologies: [],
    users: [],
    capabilities: [],
    business_pocs: [],
    technical_pocs: [],
    loading: false,
    errorMessage: null,
    saved: false
}, action) {
    switch (action.type) {
        case
        types.LOAD_APPLICATION_START
        :
            return Object.assign({}, state, {loading: true});

        case types.SAVE_NEW_APPLICATION_FAILURE:
            return Object.assign({}, state, {errorMessage: action.errorMessage});

        case types.SAVE_APPLICATION_START:
            return Object.assign({}, state, {saved: false});

        case types.SAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {saved: true});

        case 'RA/HIDE_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case types.LOAD_APPLICATION_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false});

        case types.DOES_EXIST_INITIATE:
            return Object.assign({}, state, {exists: false});

        case types.DOES_EXIST_SUCCESS:
            return Object.assign({}, state, {exists: action.doesExist});

        case types.DOES_EXIST_FAILURE:
            return Object.assign({}, state, {exists: false});
        default:
            return state;
    }
}