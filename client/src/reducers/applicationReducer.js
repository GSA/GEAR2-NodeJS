import * as types from '../actions/actionTypes';

export default function applicationReducer(state=
                                               {application: {
                                                       technologies: [],
                                                       users: [],
                                                       capabilities: [],
                                                       businesspocs: [],
                                                       techpocs: []
                                                   },
                                                   technologies: [],
                                                   users: [],
                                                   capabilities: [],
                                                   businesspocs: [],
                                                   techpocs: []},
                                           action) {

    switch(action.type) {
        case types.LOAD_APPLICATION_SUCCESS:
            return Object.assign({}, state, {application: action.application});

        case types.LOAD_TECHNOLOGIES_SUCCESS:
            return Object.assign({}, state, {technologies: action.technologies});

        case types.LOAD_USERS_SUCCESS:
            return Object.assign({}, state, {users: action.users});

        case types.LOAD_CAPABILITIES_SUCCESS:
            return Object.assign({}, state, {capabilities: action.capabilities});

        case types.LOAD_BUSINESS_POC_SUCCESS:
            return Object.assign({}, state, {businesspocs: action.businesspocs});

        case types.LOAD_TECH_POC_SUCCESS:
            return Object.assign({}, state, {techpocs: action.techpocs});
        default:
            return state;
    }
}