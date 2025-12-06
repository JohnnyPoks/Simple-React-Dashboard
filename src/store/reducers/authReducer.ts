import * as types from '../types';

const initialState: types.AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') as string) 
    : null,
  loading: false,
  error: null,
  token: localStorage.getItem('token'),
  registrationSuccess: false,
  forgotPasswordSuccess: false,
};

export const authReducer = (
  state = initialState,
  action: { type: string; payload?: unknown }
): types.AuthState => {
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        registrationSuccess: false,
        forgotPasswordSuccess: false,
      };

    case types.AUTH_LOGIN_SUCCESS: {
      const loginPayload = action.payload as { user: types.User; token: string };
      localStorage.setItem('token', loginPayload.token);
      localStorage.setItem('user', JSON.stringify(loginPayload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: loginPayload.user,
        token: loginPayload.token,
        loading: false,
        error: null,
      };
    }

    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    case types.AUTH_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        registrationSuccess: false,
      };

    case types.AUTH_REGISTER_SUCCESS: {
      const registerPayload = action.payload as { user: types.User; token: string };
      localStorage.setItem('token', registerPayload.token);
      localStorage.setItem('user', JSON.stringify(registerPayload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: registerPayload.user,
        token: registerPayload.token,
        loading: false,
        error: null,
        registrationSuccess: true,
      };
    }

    case types.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        registrationSuccess: false,
      };

    case types.AUTH_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        forgotPasswordSuccess: false,
      };

    case types.AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        forgotPasswordSuccess: true,
      };

    case types.AUTH_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
        forgotPasswordSuccess: false,
      };

    case types.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        registrationSuccess: false,
        forgotPasswordSuccess: false,
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
        registrationSuccess: false,
        forgotPasswordSuccess: false,
      };

    case types.UPDATE_USER_PROFILE: {
      const profilePayload = action.payload as { name: string; email: string };
      const updatedUser = state.user ? {
        ...state.user,
        ...profilePayload,
      } : null;
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return {
        ...state,
        user: updatedUser,
      };
    }

    default:
      return state;
  }
};
