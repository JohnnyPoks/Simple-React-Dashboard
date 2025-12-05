import * as types from '../types';

const initialState: types.AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') as string) 
    : null,
  loading: false,
  error: null,
  token: localStorage.getItem('token'),
};

export const authReducer = (
  state = initialState,
  action: any
): types.AuthState => {
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.AUTH_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.AUTH_LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
