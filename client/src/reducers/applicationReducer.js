import * as types from '../actions/actionTypes';

export default function applicationReducer(state=
                                               {application: {
                                                       technologies: [],
                                                       users: [],
                                                       capabilities: [],
                                                       business_pocs: [],
                                                       technical_pocs: []
                                                    },
                                                    technologies: [],
                                                    users: [],
                                                    capabilities: [],
                                                    pocs: [],
                                                    fismas: [],
                                                    platforms: [],
                                                    parents: [],
                                                    investments: [],
                                                    portfolios: [],
                                                    providers: [],
                                                    userlocations: []},
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

        case types.LOAD_POCS_SUCCESS:
            return Object.assign({}, state, {pocs: action.pocs});

        case types.LOAD_PLATFORMS_SUCCESS:
            return Object.assign({}, state, {platforms: action.platforms});

        case types.LOAD_FISMAS_SUCCESS:
            return Object.assign({}, state, {fismas: action.fismas});

        case types.LOAD_PARENTSYSTEMS_SUCCESS:
            return Object.assign({}, state, {parents: action.parents});

        case types.LOAD_INVESTMENTS_SUCCESS:
            return Object.assign({}, state, {investments: action.investments});

        case types.LOAD_PORTFOLIOS_SUCCESS:
            return Object.assign({}, state, {portfolios: action.portfolios});

        case types.LOAD_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {providers: action.providers});

        case types.LOAD_USER_LOCATIONS_SUCCESS:
            return Object.assign({}, state, {userlocations: action.userlocations});

        default:
            return state;
    }
}