import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import employees from './employees';

export default combineReducers({ alert, auth, employees });
