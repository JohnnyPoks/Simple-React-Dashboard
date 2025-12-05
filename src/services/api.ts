import type { User, DashboardData } from '../store/types';

// Mock Users Database
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@dashboard.com',
    password: 'admin123',
    name: 'Jane Pearson',
    role: 'Administrator',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Pearson&background=4f46e5&color=fff',
  },
  {
    id: '2',
    email: 'demo@dashboard.com',
    password: 'demo123',
    name: 'John Doe',
    role: 'Developer',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=059669&color=fff',
  },
];

// Mock API: Login
export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
  };
};

// Mock API: Fetch Dashboard Data
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    stats: {
      newTickets: 43,
      newTicketsChange: 6,
      closedToday: 17,
      closedTodayChange: -3,
      newReplies: 7,
      newRepliesChange: 9,
      followers: '27.3k',
      followersChange: 3,
      dailyEarnings: '$95',
      dailyEarningsChange: -2,
      products: 621,
      productsChange: -1,
    },
    activityFeed: [
      {
        id: '1',
        user: 'Ronald Bradley',
        commit: 'Initial commit',
        date: 'May 6, 2018',
        avatar: 'https://ui-avatars.com/api/?name=Ronald+Bradley&background=ef4444&color=fff',
      },
      {
        id: '2',
        user: 'Russell Gibson',
        commit: 'Main structure',
        date: 'April 22, 2018',
        avatar: 'https://ui-avatars.com/api/?name=Russell+Gibson&background=3b82f6&color=fff',
      },
      {
        id: '3',
        user: 'Beverly Armstrong',
        commit: 'Left sidebar adjustments',
        date: 'April 15, 2018',
        avatar: 'https://ui-avatars.com/api/?name=Beverly+Armstrong&background=8b5cf6&color=fff',
      },
      {
        id: '4',
        user: 'Alice Johnson',
        commit: 'Fixed responsive layout',
        date: 'April 10, 2018',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=ec4899&color=fff',
      },
      {
        id: '5',
        user: 'Michael Chen',
        commit: 'Added chart components',
        date: 'April 5, 2018',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff',
      },
    ],
    developmentActivity: [
      { name: 'Jan', value: 20 },
      { name: 'Feb', value: 45 },
      { name: 'Mar', value: 80 },
      { name: 'Apr', value: 55 },
      { name: 'May', value: 95 },
      { name: 'Jun', value: 70 },
      { name: 'Jul', value: 120 },
      { name: 'Aug', value: 85 },
      { name: 'Sep', value: 110 },
      { name: 'Oct', value: 95 },
      { name: 'Nov', value: 130 },
      { name: 'Dec', value: 100 },
    ],
    pieChartData: [
      { name: 'Frontend', value: 47.4 },
      { name: 'Backend', value: 33.1 },
      { name: 'DevOps', value: 9.6 },
      { name: 'Testing', value: 9.9 },
    ],
    donutChartData: [
      { name: 'React', value: 37.6 },
      { name: 'TypeScript', value: 25.0 },
      { name: 'Node.js', value: 20.0 },
      { name: 'Others', value: 17.4 },
    ],
  };
};

// Mock API: Fetch User Profile
export const fetchUserProfile = async (): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser);
  }

  throw new Error('User not found');
};
