import {
  FETCH_SIGNALS_REQUEST,
  FETCH_SIGNALS_SUCCESS,
  FETCH_SIGNALS_FAILURE,
} from '../types';
import type { SignalsState, TradingSignal } from '../types';

interface SignalsAction {
  type: string;
  payload?: TradingSignal[] | string;
}

const initialState: SignalsState = {
  signals: [],
  loading: false,
  error: null,
};

export const signalsReducer = (
  state = initialState,
  action: SignalsAction
): SignalsState => {
  switch (action.type) {
    case FETCH_SIGNALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SIGNALS_SUCCESS:
      return {
        ...state,
        loading: false,
        signals: action.payload as TradingSignal[],
        error: null,
      };
    case FETCH_SIGNALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
