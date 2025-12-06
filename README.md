# 🤖 Trading Bot Dashboard

A fully responsive, production-ready React trading bot dashboard built with TypeScript, Redux-Saga, Tailwind CSS, and shadcn/ui. This project demonstrates modern React development practices with state management, real-time trading signals, and comprehensive analytics.

## 🚀 Live Demo

**[View Live Demo](https://simple-react-dashboard.web.app)**

### Demo Credentials
- **Email:** admin@dashboard.com
- **Password:** admin123

## ✨ Features

### Core Features
- ✅ **Authentication System** - JWT-based login with protected routes
- ✅ **Redux + Redux-Saga** - Advanced state management with side effects
- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- ✅ **Dark/Light Mode** - Theme toggle with localStorage persistence
- ✅ **TypeScript** - Type-safe code throughout the application

### Trading Features
- 🤖 **Bot Status Control** - Start/Stop trading bot with real-time status
- 📊 **Trading Signals** - Real-time signals with confidence scores
- 📈 **Trade History** - Complete trade history with P&L tracking
- 💼 **Account Management** - Multiple broker account support
- 📉 **Analytics Dashboard** - Comprehensive performance metrics
- 🔔 **Toast Notifications** - Real-time alerts for trades and signals

### UI/UX Features
- 📊 **Interactive Charts** - Profit curves, win rate radials, asset performance
- 📋 **Advanced Data Tables** - Pagination, sorting, column visibility, search
- 🎨 **Modern UI** - Clean, professional design with shadcn/ui
- 🎭 **Glass-morphism Design** - Modern glass effects with animated gradient backgrounds
- 💬 **Live Chat Modal** - Real-time chat with minimize/expand functionality
- 📱 **Responsive Layout** - Optimized for all screen sizes
- ⚙️ **Comprehensive Settings** - Bot configuration, notifications, display preferences
- 👤 **Profile Management** - Edit profile info with password change functionality
- ❓ **Help Center** - FAQ, keyboard shortcuts, documentation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux** - State management
- **Redux-Saga** - Side effect management
- **React Router v6** - Client-side routing

### UI Components
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible primitives
- **Tailwind CSS 4** - Utility-first styling
- **Lucide Icons** - Beautiful icons

### Data & Charts
- **Recharts** - Data visualization
- **TanStack Table** - Advanced data tables with sorting, filtering, pagination
- **Sonner** - Toast notifications

### Build Tools
- **Vite 7.2** - Fast build tool and dev server
- **ESLint** - Code linting

### Deployment
- **Firebase Hosting** - Deployed with CI/CD automation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnnyPoks/Simple-React-Dashboard.git
   cd Simple-React-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Trading dashboard components
│   │   ├── BotStatusCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── TradingCharts.tsx
│   │   ├── SignalsTable.tsx
│   │   ├── TradesTable.tsx
│   │   └── TradingActivityFeed.tsx
│   ├── layout/             # Layout components
│   │   └── TopNavbar.tsx
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── data-table.tsx  # Advanced DataTable with pagination
│   │   └── ...
│   ├── ChatModal.tsx       # Live chat with minimize/expand
│   └── HelpModal.tsx
├── pages/
│   ├── Dashboard.tsx       # Main trading dashboard
│   ├── SignalsPage.tsx     # Trading signals management
│   ├── TradesPage.tsx      # Trade history
│   ├── AccountsPage.tsx    # Broker accounts management
│   ├── SettingsPage.tsx    # Bot and app settings
│   ├── AnalyticsPage.tsx   # Performance analytics
│   ├── ContactPage.tsx     # Contact with live chat
│   ├── HelpPage.tsx        # Help center
│   ├── Login.tsx           # Authentication with glass-morphism design
│   ├── Register.tsx        # User registration
│   └── Profile.tsx         # User profile with edit functionality
├── store/
│   ├── actions.ts          # Redux actions
│   ├── reducers.ts         # Redux reducers
│   ├── sagas.ts            # Redux-Saga effects
│   ├── selectors.ts        # Memoized selectors
│   └── types.ts            # TypeScript interfaces
├── services/
│   └── tradingApi.ts       # Trading API service
├── utils/
│   └── toast.ts            # Toast notification utilities
└── App.tsx                 # Main app with routing
```

## 🎯 Pages Overview

### Dashboard (`/dashboard`)
- Bot status control with start/stop toggle
- Real-time stats: profit, win rate, trades, signals
- Profit history chart
- Win rate radial chart
- Asset performance bar chart
- Active signals table with execute/cancel actions
- Trade history table
- Live activity feed

### Signals (`/signals`)
- All trading signals with status
- Execute signals manually
- Cancel pending signals
- Filter and search signals
- Confidence level indicators

### Trades (`/trades`)
- Complete trade history
- P&L tracking
- Direction indicators (CALL/PUT)
- Date range filtering
- Export functionality

### Accounts (`/accounts`)
- Connected broker accounts
- Account balance and equity
- Connect/disconnect accounts
- Sync account data
- Demo/Live account badges

### Settings (`/bot-settings`)
- **Bot Settings**: Auto-trade, max trades, Martingale strategy
- **Risk Management**: Take profit, stop loss, confidence thresholds
- **Notifications**: Trade alerts, signal alerts, sound settings
- **Display**: Theme, timezone, currency, chart style
- **Security**: Password change, 2FA, API keys

### Analytics (`/analytics`)
- Equity curve chart
- Daily P&L breakdown
- Trade direction distribution (CALL/PUT)
- Win/Loss ratio
- Best trading hours
- Asset performance comparison
- Profit statistics
- Risk metrics (Sharpe ratio, max drawdown, etc.)

### Help (`/help`)
- Quick start guide
- FAQ with categories
- Keyboard shortcuts
- Resource links
- Support contact

### Contact (`/contact`)
- Contact form submission
- Live chat modal with real-time messaging
- Minimize/expand chat functionality
- FAQ quick links
- Social media links

### Profile (`/profile`)
- View and edit user profile information
- Change password with strength indicator
- Two-factor authentication settings
- Profile photo management
- Email change functionality

## 🎨 UI Components

### Advanced DataTable
The `DataTable` component provides:
- Pagination with configurable page sizes (5, 10, 20, 50, 100)
- Column visibility toggle
- Sorting (ascending, descending, none)
- Global search/filter
- Row expansion
- Row selection
- Export functionality

### Toast Notifications
Trading-specific toasts:
- `toast.tradeWon(asset, amount)` - Green success toast
- `toast.tradeLost(asset, amount)` - Red error toast
- `toast.signalReceived(asset, direction)` - Info toast
- `toast.signalExecuted(asset)` - Success toast
- `toast.botStarted()` - Bot running notification
- `toast.botStopped()` - Bot stopped notification

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + D` | Toggle dark/light mode |
| `Ctrl + B` | Toggle sidebar |
| `Ctrl + S` | Start/Stop bot |
| `Ctrl + R` | Refresh data |
| `Ctrl + /` | Open help |
| `Esc` | Close modal |

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

The project is configured for Firebase Hosting:

```bash
# Build and deploy
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Pokam Ngouffo Tanekou**
- Email: johnpokam95@gmail.com
- GitHub: [@JohnnyPoks](https://github.com/JohnnyPoks)

---
