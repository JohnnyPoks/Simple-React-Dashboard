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
import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

// Coming Soon placeholder component
const ComingSoon = ({ page }: { page: string }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="bg-primary/10 p-6 rounded-full inline-block mb-4">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{page}</h1>
          <p className="text-muted-foreground">
            This page is under construction and will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Settings page
const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center py-8">
            Settings page coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Layout wrapper component
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Fixed on desktop, slide-in on mobile */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="interface" element={<ComingSoon page="Interface" />} />
              <Route path="components" element={<ComingSoon page="Components" />} />
              <Route path="pages" element={<ComingSoon page="Pages" />} />
              <Route path="forms" element={<ComingSoon page="Forms" />} />
              <Route path="gallery" element={<ComingSoon page="Gallery" />} />
              <Route path="docs" element={<ComingSoon page="Documentation" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

// Root App component with Router wrapper
const AppContent = () => {
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
