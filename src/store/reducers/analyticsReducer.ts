import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
} from '../types';
import type { AnalyticsState, AnalyticsData } from '../types';

interface AnalyticsAction {
  type: string;
  payload?: AnalyticsData | string | { timeRange?: '7d' | '30d' | '90d' | '1y' };
}

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
  timeRange: '30d',
};

export const analyticsReducer = (
  state = initialState,
  action: AnalyticsAction
): AnalyticsState => {
  switch (action.type) {
    case FETCH_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        timeRange: (action.payload as { timeRange?: '7d' | '30d' | '90d' | '1y' })?.timeRange || state.timeRange,
      };
    case FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload as AnalyticsData,
        error: null,
      };
    case FETCH_ANALYTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
