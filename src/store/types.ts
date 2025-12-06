// Action Types
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

// Register Action Types
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE';

// Forgot Password Action Types
export const AUTH_FORGOT_PASSWORD_REQUEST = 'AUTH_FORGOT_PASSWORD_REQUEST';
export const AUTH_FORGOT_PASSWORD_SUCCESS = 'AUTH_FORGOT_PASSWORD_SUCCESS';
export const AUTH_FORGOT_PASSWORD_FAILURE = 'AUTH_FORGOT_PASSWORD_FAILURE';

// Clear Auth Error
export const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR';

export const FETCH_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

// Trading Action Types
export const FETCH_SIGNALS_REQUEST = 'FETCH_SIGNALS_REQUEST';
export const FETCH_SIGNALS_SUCCESS = 'FETCH_SIGNALS_SUCCESS';
export const FETCH_SIGNALS_FAILURE = 'FETCH_SIGNALS_FAILURE';

export const FETCH_TRADES_REQUEST = 'FETCH_TRADES_REQUEST';
export const FETCH_TRADES_SUCCESS = 'FETCH_TRADES_SUCCESS';
export const FETCH_TRADES_FAILURE = 'FETCH_TRADES_FAILURE';

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

// Analytics Action Types
export const FETCH_ANALYTICS_REQUEST = 'FETCH_ANALYTICS_REQUEST';
export const FETCH_ANALYTICS_SUCCESS = 'FETCH_ANALYTICS_SUCCESS';
export const FETCH_ANALYTICS_FAILURE = 'FETCH_ANALYTICS_FAILURE';

export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

export const TOGGLE_BOT_STATUS = 'TOGGLE_BOT_STATUS';
export const SET_THEME = 'SET_THEME';

// Contact/Support Action Types
export const SUBMIT_CONTACT_REQUEST = 'SUBMIT_CONTACT_REQUEST';
export const SUBMIT_CONTACT_SUCCESS = 'SUBMIT_CONTACT_SUCCESS';
export const SUBMIT_CONTACT_FAILURE = 'SUBMIT_CONTACT_FAILURE';
export const CLEAR_CONTACT_STATUS = 'CLEAR_CONTACT_STATUS';

// TypeScript Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

// Trading Signal Types
export type SignalDirection = 'CALL' | 'PUT';
export type SignalStatus = 'pending' | 'executed' | 'expired' | 'cancelled';

export interface TradingSignal {
  id: string;
  asset: string;
  direction: SignalDirection;
  confidence: number;
  entryPrice: number;
  expiryTime: string;
  source: string;
  status: SignalStatus;
  createdAt: string;
  profit?: number;
}

// Trade Types
export type TradeStatus = 'open' | 'won' | 'lost' | 'cancelled';

export interface Trade {
  id: string;
  signalId?: string;
  asset: string;
  direction: SignalDirection;
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  expiryTime: string;
  status: TradeStatus;
  pnl: number;
  createdAt: string;
  closedAt?: string;
}

// Account Types
export type AccountType = 'demo' | 'live';
export type AccountStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface TradingAccount {
  id: string;
  name: string;
  type: AccountType;
  accountType: 'demo' | 'live';
  broker: string;
  balance: number;
  equity: number;
  currency: string;
  status: AccountStatus;
  isDefault: boolean;
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  profit: number;
  profitPercent: number;
  lastSync: string;
  createdAt: string;
}

// Bot Statistics
export interface BotStats {
  totalBalance: number;
  todayPnL: number;
  todayPnLPercent: number;
  totalTrades: number;
  todayTrades: number;
  winRate: number;
  activeSignals: number;
  openPositions: number;
  maxDrawdown: number;
  profitFactor: number;
  isRunning: boolean;
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface PerformanceData {
  date: string;
  profit: number;
  loss: number;
  balance: number;
  trades: number;
}

export interface AssetPerformance {
  asset: string;
  trades: number;
  winRate: number;
  pnl: number;
  volume: number;
}

// Activity Feed
export interface ActivityItem {
  id: string;
  type: 'trade' | 'signal' | 'system' | 'account';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  metadata?: Record<string, string | number>;
}

// Trading Settings
export interface TradingSettings {
  defaultAmount: number;
  maxDailyLoss: number;
  maxDailyTrades: number;
  allowedAssets: string[];
  minConfidence: number;
  autoTrading: boolean;
  martingale: boolean;
  martingaleMultiplier: number;
  maxMartingaleSteps: number;
  tradingHoursStart: string;
  tradingHoursEnd: string;
}

// Dashboard Trading Stats
export interface DashboardStats {
  // Trading specific stats
  totalProfit: number;
  profitChange: number;
  winRate: number;
  winRateChange: number;
  totalTrades: number;
  tradesChange: number;
  activeSignals: number;
  accountBalance: number;
  balanceChange: number;
  todayProfit: number;
  todayChange: number;
  openPositions: number;
  
  // Legacy stats (keeping for backward compatibility)
  newTickets?: number;
  newTicketsChange?: number;
  closedToday?: number;
  closedTodayChange?: number;
  newReplies?: number;
  newRepliesChange?: number;
  followers?: string;
  followersChange?: number;
  dailyEarnings?: string;
  dailyEarningsChange?: number;
  products?: number;
  productsChange?: number;
}

// Profit History Data Point
export interface ProfitHistoryPoint {
  date: string;
  profit: number;
  cumulative: number;
}

export interface DashboardData {
  stats: DashboardStats;
  botStats: BotStats;
  activityFeed: ActivityItem[];
  recentSignals: TradingSignal[];
  recentTrades: Trade[];
  performanceData: PerformanceData[];
  assetPerformance: AssetPerformance[];
  profitHistory: ProfitHistoryPoint[];
  developmentActivity: ChartDataPoint[];
  pieChartData: ChartDataPoint[];
  donutChartData: ChartDataPoint[];
}

// State Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  registrationSuccess: boolean;
  forgotPasswordSuccess: boolean;
}

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

export interface SignalsState {
  signals: TradingSignal[];
  loading: boolean;
  error: string | null;
}

export interface TradesState {
  trades: Trade[];
  loading: boolean;
  error: string | null;
}

export interface AccountsState {
  accounts: TradingAccount[];
  loading: boolean;
  error: string | null;
}

export interface SettingsState {
  settings: TradingSettings | null;
  loading: boolean;
  error: string | null;
}

export interface ThemeState {
  mode: 'light' | 'dark';
}

// Analytics Data Types
export interface DailyPnLData {
  date: string;
  profit: number;
  loss: number;
}

export interface CumulativePnLData {
  date: string;
  pnl: number;
  balance: number;
}

export interface AssetPerformanceData {
  asset: string;
  trades: number;
  winRate: number;
  profit: number;
}

export interface DirectionData {
  name: 'CALL' | 'PUT';
  value: number;
  color: string;
}

export interface ResultDistributionData {
  name: 'Wins' | 'Losses';
  value: number;
  color: string;
}

export interface AnalyticsMetrics {
  totalProfit: number;
  totalProfitPercent: number;
  winRate: number;
  winRateChange: number;
  totalTrades: number;
  profitFactor: number;
  avgTradeProfit: number;
  maxDrawdown: number;
  sharpeRatio: number;
  bestTrade: number;
  worstTrade: number;
  avgHoldingTime: string;
}

export interface AnalyticsData {
  metrics: AnalyticsMetrics;
  dailyPnL: DailyPnLData[];
  cumulativePnL: CumulativePnLData[];
  assetPerformance: AssetPerformanceData[];
  directionData: DirectionData[];
  resultDistribution: ResultDistributionData[];
}

export interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  timeRange: '7d' | '30d' | '90d' | '1y';
}

// Contact/Support Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactTicket extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'pending' | 'in-progress' | 'resolved';
}

export interface ContactState {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  ticketId: string | null;
}

export interface RootState {
  auth: AuthState;
  dashboard: DashboardState;
  user: UserState;
  signals: SignalsState;
  trades: TradesState;
  accounts: AccountsState;
  settings: SettingsState;
  theme: ThemeState;
  analytics: AnalyticsState;
  contact: ContactState;
}
