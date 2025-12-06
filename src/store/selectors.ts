import type { RootState } from './types';

// Auth Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectRegistrationSuccess = (state: RootState) => state.auth.registrationSuccess;
export const selectForgotPasswordSuccess = (state: RootState) => state.auth.forgotPasswordSuccess;

// Dashboard Selectors
export const selectDashboard = (state: RootState) => state.dashboard;
export const selectDashboardData = (state: RootState) => state.dashboard.data;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

// Bot Stats Selectors
export const selectBotStats = (state: RootState) => state.dashboard.data?.botStats;
export const selectPerformanceData = (state: RootState) => state.dashboard.data?.performanceData;
export const selectAssetPerformance = (state: RootState) => state.dashboard.data?.assetPerformance;
export const selectRecentSignals = (state: RootState) => state.dashboard.data?.recentSignals;
export const selectRecentTrades = (state: RootState) => state.dashboard.data?.recentTrades;

// User Selectors
export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Signals Selectors
export const selectSignals = (state: RootState) => state.signals.signals;
export const selectSignalsLoading = (state: RootState) => state.signals.loading;
export const selectSignalsError = (state: RootState) => state.signals.error;

// Trades Selectors
export const selectTrades = (state: RootState) => state.trades.trades;
export const selectTradesLoading = (state: RootState) => state.trades.loading;
export const selectTradesError = (state: RootState) => state.trades.error;

// Accounts Selectors
export const selectAccounts = (state: RootState) => state.accounts.accounts;
export const selectAccountsLoading = (state: RootState) => state.accounts.loading;
export const selectAccountsError = (state: RootState) => state.accounts.error;
export const selectDefaultAccount = (state: RootState) => 
  state.accounts.accounts.find(acc => acc.isDefault);

// Analytics Selectors
export const selectAnalyticsData = (state: RootState) => state.analytics.data;
export const selectAnalyticsLoading = (state: RootState) => state.analytics.loading;
export const selectAnalyticsError = (state: RootState) => state.analytics.error;
export const selectAnalyticsTimeRange = (state: RootState) => state.analytics.timeRange;

// Settings Selectors
export const selectSettings = (state: RootState) => state.settings.settings;
export const selectSettingsLoading = (state: RootState) => state.settings.loading;
export const selectSettingsError = (state: RootState) => state.settings.error;

// Theme Selectors
export const selectTheme = (state: RootState) => state.theme.mode;

// Contact Selectors
export const selectContactSubmitting = (state: RootState) => state.contact.submitting;
export const selectContactSubmitted = (state: RootState) => state.contact.submitted;
export const selectContactError = (state: RootState) => state.contact.error;
export const selectContactTicketId = (state: RootState) => state.contact.ticketId;
