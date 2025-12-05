import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { dashboardReducer } from './dashboardReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  user: userReducer,
});

export default rootReducer;
