import * as types from '../actions/actionTypes';

export default function appTechnologyReducer(state = {
    technology_pocs: [],
    technologies: [],
    loading: false,
    called: false,
    saved: false,
    errorMessage: null
}, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_TECHNOLOGY_START:
            return Object.assign({}, state, {loading: true, called: false});

        case types.LOAD_APPLICATION_TECHNOLOGY_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false, called: true});

        case types.SAVE_APPLICATION_TECHNOLOGY_FAILURE:
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

        case types.SAVE_APPLICATION_TECHNOLOGY_START:
            return Object.assign({}, state, {saved: false});

        case types.SAVE_APPLICATION_TECHNOLOGY_SUCCESS:
            return Object.assign({}, state, {saved: true});

        case 'RA/RESET_FORM':
            return Object.assign({}, state, {called: false});

        default:
            return state;
    }
}