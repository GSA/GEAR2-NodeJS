import { combineReducers } from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
    //this is the prop name in state referenced in mapStateToProps
    courses: courses
});

export default rootReducer;