// Action Types
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const FETCH_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

// TypeScript Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface DashboardStats {
  newTickets: number;
  newTicketsChange: number;
  closedToday: number;
  closedTodayChange: number;
  newReplies: number;
  newRepliesChange: number;
  followers: string;
  followersChange: number;
  dailyEarnings: string;
  dailyEarningsChange: number;
  products: number;
  productsChange: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  commit: string;
  date: string;
  avatar: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number; // Add index signature for Recharts compatibility
}

export interface DashboardData {
  stats: DashboardStats;
  activityFeed: ActivityItem[];
  developmentActivity: ChartDataPoint[];
  pieChartData: ChartDataPoint[];
  donutChartData: ChartDataPoint[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
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

export interface RootState {
  auth: AuthState;
  dashboard: DashboardState;
  user: UserState;
}
