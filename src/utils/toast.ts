import { toast as sonnerToast } from 'sonner';
import { CheckCircle2, XCircle, AlertTriangle, Info, TrendingUp, TrendingDown, Bell, Bot } from 'lucide-react';
import React from 'react';

// Toast utility functions for trading platform
export const toast = {
  // Success toasts
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      icon: React.createElement(CheckCircle2, { className: 'h-5 w-5 text-green-500' }),
    });
  },

  // Error toasts
  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      icon: React.createElement(XCircle, { className: 'h-5 w-5 text-red-500' }),
    });
  },

  // Warning toasts
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      icon: React.createElement(AlertTriangle, { className: 'h-5 w-5 text-yellow-500' }),
    });
  },

  // Info toasts
  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      icon: React.createElement(Info, { className: 'h-5 w-5 text-blue-500' }),
    });
  },

  // Trading specific toasts
  tradeWon: (asset: string, profit: number) => {
    sonnerToast.success(`Trade Won! 🎉`, {
      description: `${asset} trade closed with +$${profit.toFixed(2)} profit`,
      icon: React.createElement(TrendingUp, { className: 'h-5 w-5 text-green-500' }),
      duration: 5000,
    });
  },

  tradeLost: (asset: string, loss: number) => {
    sonnerToast.error(`Trade Lost`, {
      description: `${asset} trade closed with -$${Math.abs(loss).toFixed(2)} loss`,
      icon: React.createElement(TrendingDown, { className: 'h-5 w-5 text-red-500' }),
      duration: 5000,
    });
  },

  tradeExecuted: (asset: string, direction: 'CALL' | 'PUT', amount: number) => {
    sonnerToast.success(`Trade Executed`, {
      description: `${asset} ${direction} trade placed with $${amount}`,
      icon: React.createElement(CheckCircle2, { className: 'h-5 w-5 text-green-500' }),
    });
  },

  signalReceived: (asset: string, direction: 'CALL' | 'PUT', confidence: number) => {
    sonnerToast(`New Signal: ${asset}`, {
      description: `${direction} signal with ${confidence}% confidence`,
      icon: React.createElement(Bell, { className: 'h-5 w-5 text-purple-500' }),
      duration: 8000,
    });
  },

  signalExecuted: (asset: string) => {
    sonnerToast.success(`Signal Executed`, {
      description: `${asset} signal has been executed successfully`,
      icon: React.createElement(CheckCircle2, { className: 'h-5 w-5 text-green-500' }),
    });
  },

  signalCancelled: (asset: string) => {
    sonnerToast.info(`Signal Cancelled`, {
      description: `${asset} signal has been cancelled`,
      icon: React.createElement(XCircle, { className: 'h-5 w-5 text-gray-500' }),
    });
  },

  botStarted: () => {
    sonnerToast.success(`Bot Started`, {
      description: 'Auto-trading bot is now active and monitoring signals',
      icon: React.createElement(Bot, { className: 'h-5 w-5 text-green-500' }),
    });
  },

  botStopped: () => {
    sonnerToast.info(`Bot Stopped`, {
      description: 'Auto-trading bot has been paused',
      icon: React.createElement(Bot, { className: 'h-5 w-5 text-gray-500' }),
    });
  },

  limitReached: (limitType: string) => {
    sonnerToast.warning(`Limit Reached`, {
      description: `${limitType} limit has been reached. Auto-trading paused.`,
      icon: React.createElement(AlertTriangle, { className: 'h-5 w-5 text-yellow-500' }),
      duration: 10000,
    });
  },

  balanceUpdate: (balance: number, change: number) => {
    const isPositive = change >= 0;
    sonnerToast(isPositive ? `Balance Increased` : `Balance Decreased`, {
      description: `New balance: $${balance.toFixed(2)} (${isPositive ? '+' : ''}$${change.toFixed(2)})`,
      icon: React.createElement(isPositive ? TrendingUp : TrendingDown, { 
        className: `h-5 w-5 ${isPositive ? 'text-green-500' : 'text-red-500'}` 
      }),
    });
  },

  // Promise toast for async operations
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return sonnerToast.promise(promise, messages);
  },

  // Dismiss all toasts
  dismiss: () => {
    sonnerToast.dismiss();
  },
};

export default toast;
