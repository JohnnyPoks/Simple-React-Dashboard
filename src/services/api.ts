import type { 
  User, 
  DashboardData, 
  TradingSignal, 
  Trade, 
  TradingAccount,
  TradingSettings,
  ActivityItem,
  PerformanceData,
  AssetPerformance,
  ProfitHistoryPoint,
  AnalyticsData,
} from '../store/types';

// Mock Users Database
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@dashboard.com',
    password: 'admin123',
    name: 'Lilian Trader',
    role: 'Administrator',
    avatar: 'https://ui-avatars.com/api/?name=Lilian+Trader&background=4f46e5&color=fff',
  },
  {
    id: '2',
    email: 'demo@dashboard.com',
    password: 'demo123',
    name: 'John Doe',
    role: 'Trader',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=059669&color=fff',
  },
];

// Trading Assets
const ASSETS = ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD', 'GOLD', 'AUDUSD', 'NZDUSD'];

// Generate random data helpers
const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(randomBetween(min, max));
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate mock signals
const generateSignals = (count: number): TradingSignal[] => {
  const statuses: TradingSignal['status'][] = ['pending', 'executed', 'expired', 'cancelled'];
  const directions: TradingSignal['direction'][] = ['CALL', 'PUT'];
  const sources = ['Premium Channel', 'VIP Signals', 'AI Bot', 'Manual Analysis'];
  
  return Array.from({ length: count }, (_, i) => {
    const status = randomChoice(statuses);
    const direction = randomChoice(directions);
    return {
      id: `sig-${1000 + i}`,
      asset: randomChoice(ASSETS),
      direction,
      confidence: randomInt(65, 98),
      entryPrice: parseFloat(randomBetween(1.0, 2000).toFixed(5)),
      expiryTime: new Date(Date.now() + randomInt(60, 3600) * 1000).toISOString(),
      source: randomChoice(sources),
      status,
      createdAt: new Date(Date.now() - randomInt(0, 86400000)).toISOString(),
      profit: status === 'executed' ? parseFloat(randomBetween(-50, 100).toFixed(2)) : undefined,
    };
  });
};

// Generate mock trades
const generateTrades = (count: number): Trade[] => {
  const statuses: Trade['status'][] = ['open', 'won', 'lost', 'cancelled'];
  const directions: Trade['direction'][] = ['CALL', 'PUT'];
  
  return Array.from({ length: count }, (_, i) => {
    const status = randomChoice(statuses);
    const direction = randomChoice(directions);
    const amount = randomChoice([5, 10, 25, 50, 100]);
    const entryPrice = parseFloat(randomBetween(1.0, 2000).toFixed(5));
    const pnl = status === 'won' ? amount * 0.85 : status === 'lost' ? -amount : 0;
    
    return {
      id: `trade-${2000 + i}`,
      signalId: Math.random() > 0.3 ? `sig-${1000 + randomInt(0, 20)}` : undefined,
      asset: randomChoice(ASSETS),
      direction,
      amount,
      entryPrice,
      exitPrice: status !== 'open' ? parseFloat((entryPrice + randomBetween(-0.001, 0.001)).toFixed(5)) : undefined,
      expiryTime: new Date(Date.now() + randomInt(60, 3600) * 1000).toISOString(),
      status,
      pnl,
      createdAt: new Date(Date.now() - randomInt(0, 604800000)).toISOString(),
      closedAt: status !== 'open' ? new Date(Date.now() - randomInt(0, 86400000)).toISOString() : undefined,
    };
  });
};

// Generate mock accounts
const generateAccounts = (): TradingAccount[] => [
  {
    id: 'acc-1',
    name: 'Demo Practice',
    type: 'demo',
    accountType: 'demo',
    broker: 'Quotex',
    balance: 50000.00,
    equity: 52340.00,
    currency: 'USD',
    status: 'connected',
    isDefault: false,
    totalTrades: 156,
    winRate: 68.5,
    totalPnL: 2340.00,
    profit: 2340.00,
    profitPercent: 4.68,
    lastSync: '2024-01-15T10:28:00Z',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'acc-2',
    name: 'Primary Trading',
    type: 'live',
    accountType: 'live',
    broker: 'Quotex',
    balance: 10432.50,
    equity: 10890.25,
    currency: 'USD',
    status: 'connected',
    isDefault: true,
    totalTrades: 89,
    winRate: 72.1,
    totalPnL: 2890.25,
    profit: 2890.25,
    profitPercent: 38.5,
    lastSync: '2024-01-15T10:30:00Z',
    createdAt: '2024-06-01T08:30:00Z',
  },
  {
    id: 'acc-3',
    name: 'IQ Option Live',
    type: 'live',
    accountType: 'live',
    broker: 'IQ Option',
    balance: 5200.00,
    equity: 5420.00,
    currency: 'USD',
    status: 'disconnected',
    isDefault: false,
    totalTrades: 45,
    winRate: 55.6,
    totalPnL: 420.00,
    profit: 420.00,
    profitPercent: 8.4,
    lastSync: '2024-01-14T18:00:00Z',
    createdAt: '2024-09-10T14:00:00Z',
  },
];

// Generate performance data for charts
const generatePerformanceData = (): PerformanceData[] => {
  const days = 30;
  let balance = 2000;
  const data: PerformanceData[] = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const profit = parseFloat(randomBetween(0, 150).toFixed(2));
    const loss = parseFloat(randomBetween(0, 100).toFixed(2));
    balance = balance + profit - loss;
    
    data.push({
      date: date.toISOString().split('T')[0],
      profit,
      loss,
      balance: parseFloat(balance.toFixed(2)),
      trades: randomInt(5, 25),
    });
  }
  
  return data;
};

// Generate asset performance
const generateAssetPerformance = (): AssetPerformance[] => {
  return ASSETS.map(asset => ({
    asset,
    trades: randomInt(10, 100),
    winRate: parseFloat(randomBetween(50, 85).toFixed(1)),
    pnl: parseFloat(randomBetween(-200, 500).toFixed(2)),
    volume: randomInt(500, 5000),
  }));
};

// Generate activity feed
const generateActivityFeed = (): ActivityItem[] => {
  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      type: 'trade',
      title: 'Trade Won',
      description: 'EURUSD CALL trade closed with +$8.50 profit',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'success',
      metadata: { asset: 'EURUSD', pnl: 8.5 },
    },
    {
      id: 'act-2',
      type: 'signal',
      title: 'New Signal',
      description: 'BTCUSD PUT signal received with 85% confidence',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'info',
      metadata: { asset: 'BTCUSD', confidence: 85 },
    },
    {
      id: 'act-3',
      type: 'trade',
      title: 'Trade Lost',
      description: 'GBPUSD PUT trade closed with -$10.00 loss',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      status: 'error',
      metadata: { asset: 'GBPUSD', pnl: -10 },
    },
    {
      id: 'act-4',
      type: 'system',
      title: 'Bot Started',
      description: 'Auto-trading bot started successfully',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: 'success',
    },
    {
      id: 'act-5',
      type: 'account',
      title: 'Balance Updated',
      description: 'Account balance updated to $2,547.83',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'info',
      metadata: { balance: 2547.83 },
    },
    {
      id: 'act-6',
      type: 'signal',
      title: 'Signal Executed',
      description: 'GOLD CALL signal executed with $25 amount',
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      status: 'success',
      metadata: { asset: 'GOLD', amount: 25 },
    },
    {
      id: 'act-7',
      type: 'system',
      title: 'Daily Limit Warning',
      description: 'Approaching daily loss limit (80% used)',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'warning',
    },
    {
      id: 'act-8',
      type: 'trade',
      title: 'Trade Won',
      description: 'USDJPY CALL trade closed with +$17.00 profit',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      status: 'success',
      metadata: { asset: 'USDJPY', pnl: 17 },
    },
  ];
  
  return activities;
};

// Mock API: Login
export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pwd, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
  };
};

// Mock API: Register
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if user already exists
  const existingUser = MOCK_USERS.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('An account with this email already exists');
  }

  // Validate password
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Create new user (in a real app, this would save to database)
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name,
    role: 'Trader',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff`,
  };

  return {
    user: newUser,
    token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
  };
};

// Mock API: Forgot Password
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Check if email exists (in a real app, you wouldn't reveal this)
  const user = MOCK_USERS.find((u) => u.email === email);
  
  // Simulate success even if email doesn't exist for security
  // In this mock, we'll always succeed
  if (!email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }

  // Simulate sending email
  console.log(`Password reset email sent to: ${email}`);
  
  return {
    message: user 
      ? 'Password reset instructions sent to your email'
      : 'If an account exists, password reset instructions have been sent',
  };
};

// Mock API: Fetch Dashboard Data
export const fetchDashboardData = async (): Promise<DashboardData> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const recentSignals = generateSignals(10);
  const recentTrades = generateTrades(15);
  const performanceData = generatePerformanceData();
  
  // Calculate stats from data
  const todayTrades = recentTrades.filter(t => {
    const today = new Date().toDateString();
    return new Date(t.createdAt).toDateString() === today;
  });
  
  const wonTrades = recentTrades.filter(t => t.status === 'won');
  const totalPnL = recentTrades.reduce((sum, t) => sum + t.pnl, 0);
  const todayPnL = todayTrades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = parseFloat(((wonTrades.length / recentTrades.length) * 100).toFixed(1));
  
  // Generate profit history for chart
  const profitHistory: ProfitHistoryPoint[] = performanceData.map((d, i, arr) => ({
    date: d.date,
    profit: d.profit - d.loss,
    cumulative: arr.slice(0, i + 1).reduce((sum, p) => sum + p.profit - p.loss, 0),
  }));

  return {
    stats: {
      totalProfit: parseFloat(totalPnL.toFixed(2)),
      profitChange: 12.5,
      winRate,
      winRateChange: 2.3,
      totalTrades: recentTrades.length,
      tradesChange: 8,
      activeSignals: recentSignals.filter(s => s.status === 'pending').length,
      accountBalance: 2547.83,
      balanceChange: 5.2,
      todayProfit: parseFloat(todayPnL.toFixed(2)),
      todayChange: todayPnL >= 0 ? 15.3 : -8.7,
      openPositions: recentTrades.filter(t => t.status === 'open').length,
    },
    botStats: {
      totalBalance: 2547.83,
      todayPnL: parseFloat(todayPnL.toFixed(2)),
      todayPnLPercent: parseFloat(((todayPnL / 2547.83) * 100).toFixed(2)),
      totalTrades: recentTrades.length,
      todayTrades: todayTrades.length,
      winRate,
      activeSignals: recentSignals.filter(s => s.status === 'pending').length,
      openPositions: recentTrades.filter(t => t.status === 'open').length,
      maxDrawdown: 8.5,
      profitFactor: 1.85,
      isRunning: true,
    },
    activityFeed: generateActivityFeed(),
    recentSignals,
    recentTrades,
    performanceData,
    assetPerformance: generateAssetPerformance(),
    profitHistory,
    developmentActivity: performanceData.map(d => ({
      name: d.date.slice(5),
      value: d.balance,
      profit: d.profit,
      loss: d.loss,
    })),
    pieChartData: [
      { name: 'EURUSD', value: 28.5 },
      { name: 'BTCUSD', value: 22.3 },
      { name: 'GBPUSD', value: 18.7 },
      { name: 'GOLD', value: 15.2 },
      { name: 'Others', value: 15.3 },
    ],
    donutChartData: [
      { name: 'Won', value: 68 },
      { name: 'Lost', value: 27 },
      { name: 'Pending', value: 5 },
    ],
  };
};

// Mock API: Fetch Signals
export const fetchSignals = async (): Promise<TradingSignal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return generateSignals(50);
};

// Mock API: Fetch Trades
export const fetchTrades = async (): Promise<Trade[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return generateTrades(100);
};

// Mock API: Fetch Accounts
export const fetchAccounts = async (): Promise<TradingAccount[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return generateAccounts();
};

// Mock API: Update Settings
export const updateSettings = async (settings: TradingSettings): Promise<TradingSettings> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return settings;
};

// Mock API: Fetch User Profile
export const fetchUserProfile = async (): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser);
  }

  throw new Error('User not found');
};

// Mock API: Fetch Analytics Data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchAnalytics = async (_timeRange?: '7d' | '30d' | '90d' | '1y'): Promise<AnalyticsData> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  return {
    metrics: {
      totalProfit: 2847.50,
      totalProfitPercent: 12.5,
      winRate: 68.5,
      winRateChange: 3.2,
      totalTrades: 145,
      profitFactor: 1.85,
      avgTradeProfit: 19.64,
      maxDrawdown: 8.2,
      sharpeRatio: 1.45,
      bestTrade: 245.00,
      worstTrade: -89.00,
      avgHoldingTime: '4m 32s',
    },
    dailyPnL: [
      { date: 'Mon', profit: 120, loss: -45 },
      { date: 'Tue', profit: 85, loss: -30 },
      { date: 'Wed', profit: 200, loss: -80 },
      { date: 'Thu', profit: 150, loss: -25 },
      { date: 'Fri', profit: 180, loss: -60 },
      { date: 'Sat', profit: 90, loss: -20 },
      { date: 'Sun', profit: 45, loss: -15 },
    ],
    cumulativePnL: [
      { date: 'Week 1', pnl: 250, balance: 10250 },
      { date: 'Week 2', pnl: 450, balance: 10700 },
      { date: 'Week 3', pnl: 320, balance: 11020 },
      { date: 'Week 4', pnl: 580, balance: 11600 },
    ],
    assetPerformance: [
      { asset: 'EUR/USD', trades: 45, winRate: 72, profit: 580 },
      { asset: 'GBP/USD', trades: 32, winRate: 68, profit: 320 },
      { asset: 'USD/JPY', trades: 28, winRate: 75, profit: 410 },
      { asset: 'AUD/USD', trades: 22, winRate: 64, profit: 180 },
      { asset: 'USD/CAD', trades: 18, winRate: 78, profit: 290 },
    ],
    directionData: [
      { name: 'CALL', value: 58, color: '#22c55e' },
      { name: 'PUT', value: 42, color: '#ef4444' },
    ],
    resultDistribution: [
      { name: 'Wins', value: 68, color: '#22c55e' },
      { name: 'Losses', value: 32, color: '#ef4444' },
    ],
  };
};

// Submit Contact Form
export const submitContactForm = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ticketId: string }> => {
  // Generate a unique ticket ID
  const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  // Simulate saving the contact form (in a real app, this would go to an API)
  console.log('Contact form submitted:', { ...data, ticketId });
  
  return { ticketId };
};
