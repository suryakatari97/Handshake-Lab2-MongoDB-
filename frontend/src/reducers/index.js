import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import educationReducer from "./educationReducer";
import experienceReducer from "./experienceReducer";
import jobReducer from "./jobReducer";
import eventReducer from "./eventReducer";
import studentjob from "./studentjob";
import studentevent from "./studentevent";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  education: educationReducer,
  experience: experienceReducer,
  companyjobs: jobReducer,
  companyevents: eventReducer,
  studentjob: studentjob,
  studentevent: studentevent
});