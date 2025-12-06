import * as types from '../types';

const initialState: types.UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: { type: string; payload?: unknown }
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
        profile: action.payload as types.User,
        loading: false,
        error: null,
      };

    case types.FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    default:
      return state;
  }
};
