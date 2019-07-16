import * as types from '../actions/actionTypes';

export default function appTechnologyReducer(state = {
    technical_pocs: [],
    technologies: [],
    loading: false,
    called: false,
    saved: false,
    errorMessage: null,
    saveFailed: false
}, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_TECHNOLOGY_START:
            return Object.assign({}, state, {loading: true, called: false});

        case types.LOAD_APPLICATION_TECHNOLOGY_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false, called: true});

        case types.SAVE_APPLICATION_TECHNOLOGY_FAILURE:
            return Object.assign({}, state, {errorMessage: action.errorMessage, saveFailed: true});

        case 'RA/HIDE_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case 'RA/SHOW_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case types.UPDATE_FIELD_APP:
            if (action.obj) {
                const key = Object.keys(action.obj)[0];
                if (action.obj[key].value === ' ') action.obj[key].value = null;
                return Object.assign({}, state, {[key]: action.obj[key].value})
            } else {
                return state;
            }

        case types.SAVE_APPLICATION_TECHNOLOGY_START:
            return Object.assign({}, state, {saved: false});

        case types.SAVE_APPLICATION_TECHNOLOGY_SUCCESS:
            return Object.assign({}, state, {saved: true, saveFailed: false});

        case 'RA/RESET_FORM':
            return Object.assign({}, {
                technical_pocs: [],
                technologies: [],
                loading: false,
                called: false,
                saved: false,
                errorMessage: null,
                saveFailed: false
            });

        default:
            return state;
    }
}