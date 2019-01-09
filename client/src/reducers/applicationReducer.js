import * as types from '../actions/actionTypes';

export default function applicationReducer(state = {
    technologies: [],
    users: [],
    capabilities: [],
    business_pocs: [],
    technical_pocs: [],
    loading: false,
    errorMessage: null,
    called: false,
    saved: false
}, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_START:
            return Object.assign({}, state, {loading: true, called: false});

        case types.SAVE_NEW_APPLICATION_FAILURE:
            return Object.assign({}, state, {errorMessage: action.errorMessage});

        case types.SAVE_APPLICATION_START:
            return Object.assign({}, state, {saved: false});

        case types.SAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {saved: true});

        case 'RA/HIDE_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case types.LOAD_APPLICATION_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false, called: true});

        case types.DOES_EXIST_INITIATE:
            return Object.assign({}, state, {exists: false});

        case types.DOES_EXIST_SUCCESS:
            return Object.assign({}, state, {exists: action.doesExist});

        case types.DOES_EXIST_FAILURE:
            return Object.assign({}, state, {exists: false});

        case types.UPDATE_FIELD_APP:
            if (action.obj) {
                const key = Object.keys(action.obj)[0];
                return Object.assign({}, state, {[key]: action.obj[key].value})
            } else {
                return state;
            }

        case 'RA/RESET_FORM':
            return Object.assign({}, state, {called: false});

        default:
            return state;
    }
}