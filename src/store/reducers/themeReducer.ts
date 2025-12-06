import { SET_THEME } from '../types';
import type { ThemeState } from '../types';

interface ThemeAction {
  type: string;
  payload?: 'light' | 'dark';
}

// Get initial theme from localStorage or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

export const themeReducer = (
  state = initialState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case SET_THEME:
      if (action.payload) {
        localStorage.setItem('theme', action.payload);
        // Update document class for Tailwind dark mode
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return {
        ...state,
        mode: action.payload || state.mode,
      };
    default:
      return state;
  }
};
