import * as types from './types';

// Auth Actions
export const loginRequest = (email: string, password: string) => ({
  type: types.AUTH_LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (user: types.User, token: string) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error: string) => ({
  type: types.AUTH_LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: types.AUTH_LOGOUT,
});

// Register Actions
export const registerRequest = (name: string, email: string, password: string) => ({
  type: types.AUTH_REGISTER_REQUEST,
  payload: { name, email, password },
});

export const registerSuccess = (user: types.User, token: string) => ({
  type: types.AUTH_REGISTER_SUCCESS,
  payload: { user, token },
});

export const registerFailure = (error: string) => ({
  type: types.AUTH_REGISTER_FAILURE,
  payload: error,
});

// Forgot Password Actions
export const forgotPasswordRequest = (email: string) => ({
  type: types.AUTH_FORGOT_PASSWORD_REQUEST,
  payload: { email },
});

export const forgotPasswordSuccess = () => ({
  type: types.AUTH_FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (error: string) => ({
  type: types.AUTH_FORGOT_PASSWORD_FAILURE,
  payload: error,
});

// Clear Auth Error
export const clearAuthError = () => ({
  type: types.AUTH_CLEAR_ERROR,
});

// Dashboard Actions
export const fetchDashboardDataRequest = () => ({
  type: types.FETCH_DASHBOARD_DATA_REQUEST,
});

export const fetchDashboardDataSuccess = (data: types.DashboardData) => ({
  type: types.FETCH_DASHBOARD_DATA_SUCCESS,
  payload: data,
});

export const fetchDashboardDataFailure = (error: string) => ({
  type: types.FETCH_DASHBOARD_DATA_FAILURE,
  payload: error,
});

// User Profile Actions
export const fetchUserProfileRequest = () => ({
  type: types.FETCH_USER_PROFILE_REQUEST,
});

export const fetchUserProfileSuccess = (profile: types.User) => ({
  type: types.FETCH_USER_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchUserProfileFailure = (error: string) => ({
  type: types.FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

// Update User Profile
export const updateUserProfile = (profile: { name: string; email: string }) => ({
  type: types.UPDATE_USER_PROFILE,
  payload: profile,
});

// Signals Actions
export const fetchSignalsRequest = () => ({
  type: types.FETCH_SIGNALS_REQUEST,
});

export const fetchSignalsSuccess = (signals: types.TradingSignal[]) => ({
  type: types.FETCH_SIGNALS_SUCCESS,
  payload: signals,
});

export const fetchSignalsFailure = (error: string) => ({
  type: types.FETCH_SIGNALS_FAILURE,
  payload: error,
});

// Trades Actions
export const fetchTradesRequest = () => ({
  type: types.FETCH_TRADES_REQUEST,
});

export const fetchTradesSuccess = (trades: types.Trade[]) => ({
  type: types.FETCH_TRADES_SUCCESS,
  payload: trades,
});

export const fetchTradesFailure = (error: string) => ({
  type: types.FETCH_TRADES_FAILURE,
  payload: error,
});

// Accounts Actions
export const fetchAccountsRequest = () => ({
  type: types.FETCH_ACCOUNTS_REQUEST,
});

export const fetchAccountsSuccess = (accounts: types.TradingAccount[]) => ({
  type: types.FETCH_ACCOUNTS_SUCCESS,
  payload: accounts,
});

export const fetchAccountsFailure = (error: string) => ({
  type: types.FETCH_ACCOUNTS_FAILURE,
  payload: error,
});

// Analytics Actions
export const fetchAnalyticsRequest = (timeRange?: '7d' | '30d' | '90d' | '1y') => ({
  type: types.FETCH_ANALYTICS_REQUEST,
  payload: { timeRange },
});

export const fetchAnalyticsSuccess = (data: types.AnalyticsData) => ({
  type: types.FETCH_ANALYTICS_SUCCESS,
  payload: data,
});

export const fetchAnalyticsFailure = (error: string) => ({
  type: types.FETCH_ANALYTICS_FAILURE,
  payload: error,
});

// Settings Actions
export const updateSettingsRequest = (settings: types.TradingSettings) => ({
  type: types.UPDATE_SETTINGS_REQUEST,
  payload: settings,
});

export const updateSettingsSuccess = (settings: types.TradingSettings) => ({
  type: types.UPDATE_SETTINGS_SUCCESS,
  payload: settings,
});

export const updateSettingsFailure = (error: string) => ({
  type: types.UPDATE_SETTINGS_FAILURE,
  payload: error,
});

// Bot Actions
export const toggleBotStatus = (isRunning: boolean) => ({
  type: types.TOGGLE_BOT_STATUS,
  payload: isRunning,
});

// Theme Actions
export const setTheme = (mode: 'light' | 'dark') => ({
  type: types.SET_THEME,
  payload: mode,
});

// Contact/Support Actions
export const submitContactRequest = (data: types.ContactFormData) => ({
  type: types.SUBMIT_CONTACT_REQUEST,
  payload: data,
});

export const submitContactSuccess = (ticketId: string) => ({
  type: types.SUBMIT_CONTACT_SUCCESS,
  payload: ticketId,
});

export const submitContactFailure = (error: string) => ({
  type: types.SUBMIT_CONTACT_FAILURE,
  payload: error,
});

export const clearContactStatus = () => ({
  type: types.CLEAR_CONTACT_STATUS,
});
