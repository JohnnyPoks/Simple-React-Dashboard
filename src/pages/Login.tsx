import { useState, useRef, useEffect, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginRequest, setTheme, clearAuthError } from "../store/actions";
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectTheme,
} from "../store/selectors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  BarChart3,
  Info,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";

// Field error type
interface FieldErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const theme = useSelector(selectTheme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Refs for focus management
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  // Validate email
  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  // Validate password
  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 4) {
      return "Password must be at least 4 characters";
    }
    return undefined;
  };

  // Handle field blur for validation
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    if (field === "email") {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === "password") {
      setFieldErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setFieldErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    // Focus first invalid field
    if (emailError) {
      emailRef.current?.focus();
      return false;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(loginRequest(email, password));
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Matching gradient background like Register page */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-blue-950/50 dark:to-slate-900" />
      
      {/* Circuit board pattern overlay for tech feel */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      <Card className="relative z-10 w-full max-w-[420px] shadow-xl border border-border/50 dark:border-white/10 dark:shadow-2xl dark:shadow-black/30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/20">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground dark:text-gray-400">
              Sign in to access your dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo Credentials Alert */}
          <div 
            className="bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-800/50 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm"
            role="note"
            aria-label="Demo credentials information"
          >
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-blue-800 dark:text-blue-300 text-sm">
              <span className="font-semibold block mb-1">
                Demo Credentials:
              </span>
              <span className="text-sm">
                Email: <span className="font-medium">demo@dashboard.com</span>
              </span>
              <br />
              <span className="text-sm">
                Password: <span className="font-medium">demo123</span>
              </span>
            </div>
          </div>

          {/* Server Error Message */}
          {error && (
            <div 
              className="bg-red-50/80 dark:bg-red-900/30 border border-red-200/80 dark:border-red-800/50 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <span className="text-red-800 dark:text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) {
                    setFieldErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                  }
                }}
                onBlur={() => handleBlur("email")}
                required
                autoComplete="email"
                aria-invalid={touched.email && !!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={touched.email && fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {touched.email && fieldErrors.email && (
                <p id="email-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (touched.password) {
                      setFieldErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                    }
                  }}
                  onBlur={() => handleBlur("password")}
                  required
                  autoComplete="current-password"
                  aria-invalid={touched.password && !!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                  className={`pr-10 ${touched.password && fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {touched.password && fieldErrors.password && (
                <p id="password-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Create Account Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground dark:text-gray-400">
              Don't have an account?
            </span>{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
