import * as types from '../actions/actionTypes';

export default function applicationReducer(state={application: {technologies: []}, technologies: []}, action) {

    switch(action.type) {
        case types.SAVE_APPLICATION_SUCCESS:
            return Object.assign({},
                ...state, ...action.application);

        case types.LOAD_APPLICATION_SUCCESS:
            console.log("added the app");
            let tmp = Object.assign({}, state, {application: action.application});
            console.log(tmp);
            return tmp;

        case types.LOAD_APPLICATION:
            return {...Object.assign({},
                {technologies: state.technologies},
                {application: Object.assign({}, state.application, {id: action.id})})};

        case types.LOAD_TECHNOLOGIES_SUCCESS:
            console.log("here");
            let tmp1 = Object.assign({}, state, {technologies: action.technologies});
            console.log(tmp1);
            return tmp1;

        default:
            return state;
    }
}