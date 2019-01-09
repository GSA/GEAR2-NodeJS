import { combineReducers } from 'redux';
import application from './staticRepoReducer';
import technology from "./technologyReducer";
import appBusiness from './appBusinessReducer';

//not in use
//react-admin doesn't work with combined reducers
const rootReducer = combineReducers({
    //this is the prop name in state referenced in mapStateToProps
    application: application,
    technology: technology,
    appBusiness: appBusiness
});

export default rootReducer;