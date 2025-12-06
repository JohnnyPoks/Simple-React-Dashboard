import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { dashboardReducer } from './dashboardReducer';
import { userReducer } from './userReducer';
import { signalsReducer } from './signalsReducer';
import { tradesReducer } from './tradesReducer';
import { accountsReducer } from './accountsReducer';
import { settingsReducer } from './settingsReducer';
import { themeReducer } from './themeReducer';
import { analyticsReducer } from './analyticsReducer';
import contactReducer from './contactReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  user: userReducer,
  signals: signalsReducer,
  trades: tradesReducer,
  accounts: accountsReducer,
  settings: settingsReducer,
  theme: themeReducer,
  analytics: analyticsReducer,
  contact: contactReducer,
});

export default rootReducer;
