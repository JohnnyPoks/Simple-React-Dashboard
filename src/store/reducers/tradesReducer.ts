import {
  FETCH_TRADES_REQUEST,
  FETCH_TRADES_SUCCESS,
  FETCH_TRADES_FAILURE,
} from '../types';
import type { TradesState, Trade } from '../types';

interface TradesAction {
  type: string;
  payload?: Trade[] | string;
}

const initialState: TradesState = {
  trades: [],
  loading: false,
  error: null,
};

export const tradesReducer = (
  state = initialState,
  action: TradesAction
): TradesState => {
  switch (action.type) {
    case FETCH_TRADES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        trades: action.payload as Trade[],
        error: null,
      };
    case FETCH_TRADES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
