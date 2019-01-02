import * as types from '../actions/actionTypes';

export default function staticRepoReducer(state=
                                               {
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
                                                    userlocations: [],
                                                    loading: false,
                                                    errorMessage: null,
                                                   saved: false
                                               },
                                           action) {

    switch(action.type) {

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

        case types.UPDATE_TECHNOLOGIES:
            if(action.newItem) {
                return Object.assign({}, state, {
                    technologies: [...state.technologies, action]
                });
            } else {
                return Object.assign({}, state, {
                    technologies: [...state.technologies.filter(technology => {
                        return (technology.id !== action.id)
                    }), action]
                });
            }

        case types.UPDATE_FISMAS:
            if(action.newItem) {
                return Object.assign({}, state, {
                    fismas: [...state.fismas, action]
                });
            } else {
                return Object.assign({}, state, {
                    fismas: [...state.fismas.filter(fisma => {
                        return (fisma.id !== action.id)
                    }), action]
                });
            }

        case types.UPDATE_CAPABILITIES:
            if(action.newItem) {
                return Object.assign({}, state, {
                    capabilities: [...state.capabilities, action]
                });
            } else {
                return Object.assign({}, state, {
                    capabilities: [...state.capabilities.filter(capability => {
                        return (capability.id !== action.id)
                    }), action]
                });
            }

        case types.UPDATE_INVESTMENTS:
            if(action.newItem) {
                return Object.assign({}, state, {
                    investments: [...state.investments, action]
                });
            } else {
                return Object.assign({}, state, {
                    investments: [...state.investments.filter(investment => {
                        return (investment.id !== action.id)
                    }), action]
                });
            }

        case types.UPDATE_PARENTSYSTEMS:
            if(action.newItem) {
                return Object.assign({}, state, {
                    parents: [...state.parents, action]
                });
            } else {
                return Object.assign({}, state, {parents: [...state.parents.filter(parent => {
                        return (parent.id !== action.id)}), action]});
            }


        case types.UPDATE_POCS:
            //TODO is this so much optimization it's actually hurts performance?
            //TODO ... if/else should be much faster than a filter
            if(action.newItem) {
                return Object.assign({}, state, {
                    pocs: [...state.pocs, action]
                });
            } else {
                return Object.assign({}, state, {
                    pocs: [...state.pocs.filter(poc => {
                        return (poc.id !== action.id)
                    }), action]
                });
            }

        default:
            return state;
    }
}