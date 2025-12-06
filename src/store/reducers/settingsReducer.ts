import {
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
} from '../types';
import type { SettingsState, TradingSettings } from '../types';

interface SettingsAction {
  type: string;
  payload?: TradingSettings | string;
}

const initialState: SettingsState = {
  settings: {
    defaultAmount: 10,
    maxDailyLoss: 100,
    maxDailyTrades: 50,
    allowedAssets: ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD'],
    minConfidence: 70,
    autoTrading: true,
    martingale: false,
    martingaleMultiplier: 2,
    maxMartingaleSteps: 3,
    tradingHoursStart: '09:00',
    tradingHoursEnd: '17:00',
  },
  loading: false,
  error: null,
};

export const settingsReducer = (
  state = initialState,
  action: SettingsAction
): SettingsState => {
  switch (action.type) {
    case UPDATE_SETTINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        settings: action.payload as TradingSettings,
        error: null,
      };
    case UPDATE_SETTINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
