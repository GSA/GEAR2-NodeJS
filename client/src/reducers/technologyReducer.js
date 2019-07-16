import * as types from '../actions/actionTypes';

export default function technologyReducer(state={application: {technologies: []}, technologies: []}, action) {

    switch(action.type) {
        case "BLAH":
            let tmp = {...Object.assign({}, state, {technologies: action.technologies})};
            console.log(tmp);
            return tmp;

        default:
            return state;
    }
}