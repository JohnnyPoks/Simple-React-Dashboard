import * as types from '../types';

const initialState: types.UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: any
): types.UserState => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null,
      };

    case types.FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
