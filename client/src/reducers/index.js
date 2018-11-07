import { combineReducers } from 'redux';
import application from './applicationReducer';

const rootReducer = combineReducers({
    //this is the prop name in state referenced in mapStateToProps
    application: application
});

export default rootReducer;