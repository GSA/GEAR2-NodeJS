import { combineReducers } from 'redux';
import application from './applicationReducer';
import technology from "./technologyReducer";

//not in use
//react-admin doesn't work with combined reducers
const rootReducer = combineReducers({
    //this is the prop name in state referenced in mapStateToProps
    application: application,
    technology: technology
});

export default rootReducer;