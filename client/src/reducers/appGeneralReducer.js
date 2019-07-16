import * as types from '../actions/actionTypes';

export default function appGeneralReducer(state = {
    loading: false,
    called: false,
    saved: false,
    errorMessage: null,
    saveFailed: false,
    exists: false,
    existsField: null
}, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_GENERAL_START:
            return Object.assign({}, state, {loading: true, called: false});

        case types.LOAD_APPLICATION_GENERAL_SUCCESS:
            return Object.assign({}, state, action.application, {loading: false, called: true});

        case types.SAVE_APPLICATION_GENERAL_FAILURE:
            return Object.assign({}, state, {errorMessage: action.errorMessage, saveFailed: true});

        case 'RA/HIDE_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case 'RA/SHOW_NOTIFICATION':
            return Object.assign({}, state, {errorMessage: null});

        case types.DOES_EXIST_INITIATE:
            return Object.assign({}, state, {exists: false, existsField: action.field});

        case types.DOES_EXIST_SUCCESS:
            return Object.assign({}, state, {exists: action.doesExist, existsField: action.field});

        case types.DOES_EXIST_FAILURE:
            return Object.assign({}, state, {exists: false});

        case types.UPDATE_FIELD_APP:
            if (action.obj) {
                const key = Object.keys(action.obj)[0];
                if (action.obj[key].value === ' ') action.obj[key].value = null;
                return Object.assign({}, state, {[key]: action.obj[key].value})
            } else {
                return state;
            }

        case types.SAVE_APPLICATION_GENERAL_START:
            return Object.assign({}, state, {saved: false});

        case types.SAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {saved: true, saveFailed: false});

        case 'RA/RESET_FORM':
            return Object.assign({}, {
                loading: false,
                called: false,
                saved: false,
                errorMessage: null,
                saveFailed: false,
                exists: false,
                existsField: null
            });

        case types.SAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {errorMessage: action.errorMessage});

        default:
            return state;
    }
}