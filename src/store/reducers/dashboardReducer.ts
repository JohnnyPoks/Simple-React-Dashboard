import * as types from '../types';

const initialState: types.DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const dashboardReducer = (
  state = initialState,
  action: any
): types.DashboardState => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case types.FETCH_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
