import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setTheme, fetchDashboardDataRequest, fetchSignalsRequest, fetchTradesRequest } from '../store/actions';
import { selectTheme } from '../store/selectors';
import { toast } from '@/utils/toast';

interface KeyboardShortcutsOptions {
  onToggleBot?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenHelp?: () => void;
}

/**
 * Custom hook for global keyboard shortcuts
 * Only active on desktop devices (screen width > 1024px)
 */
export const useKeyboardShortcuts = (options: KeyboardShortcutsOptions = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme = useSelector(selectTheme);

  const isDesktop = useCallback(() => {
    return window.innerWidth >= 1024;
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only handle shortcuts on desktop
    if (!isDesktop()) return;

    // Don't trigger shortcuts when typing in input fields
    const target = event.target as HTMLElement;
    const isInputField = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.isContentEditable ||
      target.closest('[role="textbox"]');

    // Allow Escape to work even in input fields
    if (event.key === 'Escape') {
      // Close any open modals - this is handled by individual modals
      return;
    }

    // Skip shortcuts when typing in input fields
    if (isInputField) return;

    const ctrlOrCmd = event.ctrlKey || event.metaKey;

    // Ctrl/Cmd + D: Toggle dark/light mode
    if (ctrlOrCmd && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      dispatch(setTheme(newTheme));
      toast.success(`Switched to ${newTheme} mode`);
      return;
    }

    // Ctrl/Cmd + B: Toggle sidebar (navigate to dashboard or back)
    if (ctrlOrCmd && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      // Since we don't have a sidebar anymore, we'll toggle mobile menu or navigate
      toast.info('Sidebar toggle - navigating to dashboard');
      if (location.pathname !== '/dashboard') {
        navigate('/dashboard');
      }
      return;
    }

    // Ctrl/Cmd + S: Start/Stop bot
    if (ctrlOrCmd && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (options.onToggleBot) {
        options.onToggleBot();
      } else {
        // Dispatch a custom event that Dashboard can listen to
        window.dispatchEvent(new CustomEvent('toggleBot'));
        toast.info('Bot toggle triggered');
      }
      return;
    }

    // Ctrl/Cmd + R: Refresh data
    if (ctrlOrCmd && event.key.toLowerCase() === 'r') {
      event.preventDefault();
      dispatch(fetchDashboardDataRequest());
      dispatch(fetchSignalsRequest());
      dispatch(fetchTradesRequest());
      toast.success('Refreshing data...');
      return;
    }

    // Ctrl/Cmd + /: Open help
    if (ctrlOrCmd && event.key === '/') {
      event.preventDefault();
      if (options.onOpenHelp) {
        options.onOpenHelp();
      } else {
        navigate('/help');
        toast.info('Opening help center');
      }
      return;
    }

    // Ctrl/Cmd + K: Open command palette
    if (ctrlOrCmd && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (options.onOpenCommandPalette) {
        options.onOpenCommandPalette();
      } else {
        // Dispatch custom event for command palette
        window.dispatchEvent(new CustomEvent('openCommandPalette'));
        toast.info('Command palette (coming soon)');
      }
      return;
    }
  }, [currentTheme, dispatch, navigate, location.pathname, isDesktop, options]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isDesktop,
  };
};

/**
 * Hook to check if the device is desktop
 * Uses both screen width and pointer type for accurate detection
 */
export const useIsDesktop = () => {
  const checkIsDesktop = useCallback(() => {
    // Check screen width
    const isLargeScreen = window.innerWidth >= 1024;
    
    // Check for coarse pointer (touch devices)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    // Check for hover capability (most desktop devices have hover)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    // Desktop: large screen AND (has hover OR no coarse pointer)
    return isLargeScreen && (hasHover || !hasCoarsePointer);
  }, []);

  return checkIsDesktop;
};

export default useKeyboardShortcuts;
