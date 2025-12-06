import {
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
} from '../types';
import type { AccountsState, TradingAccount } from '../types';

interface AccountsAction {
  type: string;
  payload?: TradingAccount[] | string;
}

const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
};

export const accountsReducer = (
  state = initialState,
  action: AccountsAction
): AccountsState => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload as TradingAccount[],
        error: null,
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
