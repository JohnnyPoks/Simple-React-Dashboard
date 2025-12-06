import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import TopNavbar from "./components/layout/TopNavbar";
import SignalsPage from "./pages/SignalsPage";
import TradesPage from "./pages/TradesPage";
import AccountsPage from "./pages/AccountsPage";
import SettingsPage from "./pages/SettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HelpPage from "./pages/HelpPage";
import ContactPage from "./pages/ContactPage";

// Layout wrapper component with top navbar
const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="px-4 md:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto py-4">
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="signals" element={<SignalsPage />} />
            <Route path="trades" element={<TradesPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Root App component with Router wrapper
const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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

// Responsive Toaster component that changes position based on screen size
const ResponsiveToaster = () => {
  // Use CSS to handle responsive positioning with a single Toaster instance
  return (
    <Toaster
      position="bottom-right"
      expand={true}
      richColors
      closeButton
      gap={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 4px 12px hsl(var(--foreground) / 0.1)",
        },
        classNames: {
          toast: "group toast",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          closeButton: "bg-background border-border hover:bg-muted",
          success: "border-green-500/50 [&>svg]:text-green-500",
          error: "border-red-500/50 [&>svg]:text-red-500",
          warning: "border-amber-500/50 [&>svg]:text-amber-500",
          info: "border-blue-500/50 [&>svg]:text-blue-500",
        },
      }}
      // Mobile-specific positioning handled via CSS
      className="toaster-container"
    />
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
        <ResponsiveToaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
