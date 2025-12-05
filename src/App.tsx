import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState } from 'react';
import store from './store/store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/selectors';

// Layout wrapper component
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/interface" element={<ComingSoon page="Interface" />} />
            <Route path="/components" element={<ComingSoon page="Components" />} />
            <Route path="/pages" element={<ComingSoon page="Pages" />} />
            <Route path="/forms" element={<ComingSoon page="Forms" />} />
            <Route path="/gallery" element={<ComingSoon page="Gallery" />} />
            <Route path="/docs" element={<ComingSoon page="Documentation" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Coming Soon placeholder component
const ComingSoon = ({ page }: { page: string }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="bg-indigo-100 p-6 rounded-full inline-block mb-4">
          <svg
            className="h-16 w-16 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{page} - Coming Soon</h1>
        <p className="text-gray-600">This page is under construction and will be available soon.</p>
      </div>
    </div>
  );
};

// Root App component with Router wrapper
const AppContent = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
