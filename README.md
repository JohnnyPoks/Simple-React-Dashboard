# 📊 React Dashboard with Redux-Saga

A fully responsive, production-ready React dashboard built with TypeScript, Redux-Saga, and Tailwind CSS. This project demonstrates modern React development practices with state management, authentication, and dynamic data visualization.

## 🚀 Live Demo

**[View Live Demo](https://simple-react-dashboard.web.app)** _(Replace with your actual Firebase URL)_

## ✨ Features

- ✅ **Authentication System** - JWT-based login with protected routes
- ✅ **Redux + Redux-Saga** - Advanced state management with side effects
- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- ✅ **Dynamic Data** - Real-time data fetching with loading states
- ✅ **Interactive Charts** - Line charts, pie charts, and donut charts using Recharts
- ✅ **Modern UI** - Clean, professional design with Tailwind CSS
- ✅ **TypeScript** - Type-safe code throughout the application
- ✅ **Multiple Pages** - Dashboard, Profile, and placeholder pages
- ✅ **Activity Feed** - Track development activities and changes
- ✅ **Error Handling** - Graceful error states and loading indicators

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux** - State management
- **Redux-Saga** - Side effect management
- **React Router v6** - Client-side routing
- **Recharts** - Data visualization
- **Tailwind CSS 4** - Utility-first styling

### Build Tools
- **Vite** - Fast build tool and dev server
- **SWC** - Fast TypeScript/JavaScript compiler
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

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔐 Demo Credentials

Use these credentials to log in to the dashboard:

- **Email:** `admin@dashboard.com`
- **Password:** `admin123`

Alternative credentials:
- **Email:** `demo@dashboard.com`
- **Password:** `demo123`

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── ActivityFeed.tsx # Development activity table
│   │   ├── Charts.tsx       # Line, pie, and donut charts
│   │   └── StatCard.tsx     # Statistics cards
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Top navigation bar
│   │   └── Sidebar.tsx      # Side navigation menu
│   └── ProtectedRoute.tsx   # Authentication guard
├── pages/
│   ├── Dashboard.tsx        # Main dashboard page
│   ├── Login.tsx            # Login page
│   ├── Profile.tsx          # User profile page
│   └── NotFound.tsx         # 404 page
├── services/
│   └── api.ts               # Mock API service layer
├── store/
│   ├── actions.ts           # Redux action creators
│   ├── reducers/            # Redux reducers
│   │   ├── authReducer.ts
│   │   ├── dashboardReducer.ts
│   │   ├── userReducer.ts
│   │   └── index.ts
│   ├── sagas/               # Redux-Saga side effects
│   │   └── index.ts
│   ├── selectors.ts         # Redux selectors
│   ├── store.ts             # Redux store configuration
│   └── types.ts             # TypeScript types
├── App.tsx                  # Main app component with routing
├── main.tsx                 # App entry point
└── index.css                # Global styles

```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build locally

# Linting
npm run lint         # Run ESLint

# Deploy (Firebase)
npm run deploy       # Build and deploy to Firebase Hosting
```

## 🔄 State Management

This project uses **Redux with Redux-Saga** for state management:

### Redux Store Structure
- **Auth State** - User authentication, login/logout
- **Dashboard State** - Dashboard data, stats, charts
- **User State** - User profile information

### Saga Middleware
- Handles async operations (API calls)
- Manages side effects
- Provides better testability
- Example: Login saga, data fetching saga

## 📊 Dashboard Features

### Statistics Cards
- New Tickets with trend indicators
- Closed Today count
- New Replies tracking
- Followers count (27.3k)
- Daily Earnings ($95)
- Products inventory (621)

### Data Visualization
- **Line Chart** - Development activity over time
- **Pie Charts** - Project distribution
- **Donut Charts** - Technology stack breakdown

### Activity Feed
- Recent commits and activities
- User avatars and timestamps
- Action buttons for management

## 🎨 Design Highlights

- **Modern UI/UX** - Clean and intuitive interface
- **Responsive Design** - Works on all screen sizes
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages
- **Accessibility** - ARIA labels and keyboard navigation

## 🔒 Authentication Flow

1. User enters credentials on login page
2. Redux dispatches `loginRequest` action
3. Saga intercepts action and calls mock API
4. On success, user data and token stored in localStorage
5. Redux updates auth state
6. User redirected to dashboard
7. Protected routes check authentication status

## 🚢 Deployment

### Firebase Hosting

This project includes automatic deployment to Firebase Hosting:

```bash
# One-time setup
npm install -g firebase-tools
firebase login
firebase init hosting

# Deploy
npm run deploy
```

### Manual Build & Deploy

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Deploy to your hosting provider of choice
```

## 🧪 Testing

Mock API endpoints simulate real backend behavior:
- **Login:** Validates credentials against mock user database
- **Dashboard Data:** Returns mock statistics and chart data
- **User Profile:** Retrieves user information from localStorage

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Dashboard
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

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

## 🙏 Acknowledgments

- Design inspiration from Tobler Admin Template
- Built as part of a technical assessment for MavenCode LLC
- Icons by Heroicons
- Charts by Recharts

---

**⭐ If you find this project useful, please consider giving it a star!**
