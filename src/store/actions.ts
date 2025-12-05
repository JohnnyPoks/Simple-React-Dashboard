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
