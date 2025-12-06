import { call, put, takeLatest, delay } from 'redux-saga/effects';
import type { CallEffect, PutEffect } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import * as api from '../../services/api';

type SagaGenerator = Generator<CallEffect | PutEffect | ReturnType<typeof delay>, void, unknown>;

// Auth Sagas
function* loginSaga(action: ReturnType<typeof actions.loginRequest>): SagaGenerator {
  try {
    yield delay(800);
    const response = (yield call(api.login, action.payload.email, action.payload.password)) as { user: types.User; token: string };
    yield put(actions.loginSuccess(response.user, response.token));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    yield put(actions.loginFailure(errorMessage));
  }
}

// Register Saga
function* registerSaga(action: ReturnType<typeof actions.registerRequest>): SagaGenerator {
  try {
    yield delay(1000);
    const response = (yield call(api.register, action.payload.name, action.payload.email, action.payload.password)) as { user: types.User; token: string };
    yield put(actions.registerSuccess(response.user, response.token));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    yield put(actions.registerFailure(errorMessage));
  }
}

// Forgot Password Saga
function* forgotPasswordSaga(action: ReturnType<typeof actions.forgotPasswordRequest>): SagaGenerator {
  try {
    yield delay(1200);
    yield call(api.forgotPassword, action.payload.email);
    yield put(actions.forgotPasswordSuccess());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
    yield put(actions.forgotPasswordFailure(errorMessage));
  }
}

// Dashboard Sagas
function* fetchDashboardDataSaga(): SagaGenerator {
  try {
    yield delay(600);
    const data = (yield call(api.fetchDashboardData)) as types.DashboardData;
    yield put(actions.fetchDashboardDataSuccess(data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard data';
    yield put(actions.fetchDashboardDataFailure(errorMessage));
  }
}

// User Profile Sagas
function* fetchUserProfileSaga(): SagaGenerator {
  try {
    yield delay(500);
    const profile = (yield call(api.fetchUserProfile)) as types.User;
    yield put(actions.fetchUserProfileSuccess(profile));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user profile';
    yield put(actions.fetchUserProfileFailure(errorMessage));
  }
}

// Signals Sagas
function* fetchSignalsSaga(): SagaGenerator {
  try {
    yield delay(600);
    const signals = (yield call(api.fetchSignals)) as types.TradingSignal[];
    yield put(actions.fetchSignalsSuccess(signals));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch signals';
    yield put(actions.fetchSignalsFailure(errorMessage));
  }
}

// Trades Sagas
function* fetchTradesSaga(): SagaGenerator {
  try {
    yield delay(600);
    const trades = (yield call(api.fetchTrades)) as types.Trade[];
    yield put(actions.fetchTradesSuccess(trades));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch trades';
    yield put(actions.fetchTradesFailure(errorMessage));
  }
}

// Accounts Sagas
function* fetchAccountsSaga(): SagaGenerator {
  try {
    yield delay(400);
    const accounts = (yield call(api.fetchAccounts)) as types.TradingAccount[];
    yield put(actions.fetchAccountsSuccess(accounts));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch accounts';
    yield put(actions.fetchAccountsFailure(errorMessage));
  }
}

// Analytics Sagas
function* fetchAnalyticsSaga(action: ReturnType<typeof actions.fetchAnalyticsRequest>): SagaGenerator {
  try {
    yield delay(800);
    const data = (yield call(api.fetchAnalytics, action.payload?.timeRange)) as types.AnalyticsData;
    yield put(actions.fetchAnalyticsSuccess(data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch analytics';
    yield put(actions.fetchAnalyticsFailure(errorMessage));
  }
}

// Settings Sagas
function* updateSettingsSaga(action: ReturnType<typeof actions.updateSettingsRequest>): SagaGenerator {
  try {
    yield delay(500);
    const settings = (yield call(api.updateSettings, action.payload)) as types.TradingSettings;
    yield put(actions.updateSettingsSuccess(settings));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update settings';
    yield put(actions.updateSettingsFailure(errorMessage));
  }
}

// Contact Form Saga
function* submitContactSaga(action: ReturnType<typeof actions.submitContactRequest>): SagaGenerator {
  try {
    yield delay(1000); // Simulate API call
    const response = (yield call(api.submitContactForm, action.payload)) as { ticketId: string };
    yield put(actions.submitContactSuccess(response.ticketId));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit contact form';
    yield put(actions.submitContactFailure(errorMessage));
  }
}

// Root Saga
export default function* rootSaga() {
  yield takeLatest(types.AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.AUTH_REGISTER_REQUEST, registerSaga);
  yield takeLatest(types.AUTH_FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeLatest(types.FETCH_DASHBOARD_DATA_REQUEST, fetchDashboardDataSaga);
  yield takeLatest(types.FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga);
  yield takeLatest(types.FETCH_SIGNALS_REQUEST, fetchSignalsSaga);
  yield takeLatest(types.FETCH_TRADES_REQUEST, fetchTradesSaga);
  yield takeLatest(types.FETCH_ACCOUNTS_REQUEST, fetchAccountsSaga);
  yield takeLatest(types.FETCH_ANALYTICS_REQUEST, fetchAnalyticsSaga);
  yield takeLatest(types.UPDATE_SETTINGS_REQUEST, updateSettingsSaga);
  yield takeLatest(types.SUBMIT_CONTACT_REQUEST, submitContactSaga);
}
