import { call, put, takeLatest, delay } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import * as api from '../../services/api';

// Auth Sagas
function* loginSaga(action: ReturnType<typeof actions.loginRequest>): Generator<any, void, any> {
  try {
    yield delay(800); // Simulate network delay
    const response = yield call(api.login, action.payload.email, action.payload.password);
    yield put(actions.loginSuccess(response.user, response.token));
  } catch (error: any) {
    yield put(actions.loginFailure(error.message || 'Login failed'));
  }
}

// Dashboard Sagas
function* fetchDashboardDataSaga(): Generator<any, void, any> {
  try {
    yield delay(600); // Simulate network delay
    const data = yield call(api.fetchDashboardData);
    yield put(actions.fetchDashboardDataSuccess(data));
  } catch (error: any) {
    yield put(actions.fetchDashboardDataFailure(error.message || 'Failed to fetch dashboard data'));
  }
}

// User Profile Sagas
function* fetchUserProfileSaga(): Generator<any, void, any> {
  try {
    yield delay(500); // Simulate network delay
    const profile = yield call(api.fetchUserProfile);
    yield put(actions.fetchUserProfileSuccess(profile));
  } catch (error: any) {
    yield put(actions.fetchUserProfileFailure(error.message || 'Failed to fetch user profile'));
  }
}

// Root Saga
export default function* rootSaga() {
  yield takeLatest(types.AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.FETCH_DASHBOARD_DATA_REQUEST, fetchDashboardDataSaga);
  yield takeLatest(types.FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga);
}
