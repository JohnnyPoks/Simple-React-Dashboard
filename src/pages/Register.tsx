import { useState, useEffect, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { registerRequest, clearAuthError } from "../store/actions";
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectRegistrationSuccess,
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
  AlertCircle,
  Check,
  TrendingUp,
  Shield,
  Zap,
  Sun,
  Moon,
  Sparkles,
  BarChart2,
  Activity,
  Quote,
} from "lucide-react";
import { useSelector as useThemeSelector } from "react-redux";
import { selectTheme } from "../store/selectors";
import { setTheme } from "../store/actions";
import { toast } from "@/utils/toast";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const registrationSuccess = useSelector(selectRegistrationSuccess);
  const theme = useThemeSelector(selectTheme);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Show success toast on registration
  useEffect(() => {
    if (registrationSuccess) {
      toast.success(
        "Account created successfully! Welcome to the Trading Bot Dashboard."
      );
    }
  }, [registrationSuccess]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!name.trim()) {
      setValidationError("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setValidationError("Please enter your email address");
      return;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    dispatch(registerRequest(name, email, password));
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      iconColor: "text-emerald-400",
      bgColor: "from-emerald-500/20 to-emerald-500/5",
      title: "Advanced Trading Bot",
      description: "Smart algorithms that adapt to market conditions in real-time",
    },
    {
      icon: <Activity className="h-5 w-5" />,
      iconColor: "text-amber-400",
      bgColor: "from-amber-500/20 to-amber-500/5",
      title: "Real-time Signals",
      description: "Instant notifications with confidence ratings for every opportunity",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      iconColor: "text-rose-400",
      bgColor: "from-rose-500/20 to-rose-500/5",
      title: "Risk Management",
      description: "Built-in stop-loss, daily limits, and portfolio protection",
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      iconColor: "text-violet-400",
      bgColor: "from-violet-500/20 to-violet-500/5",
      title: "Analytics Dashboard",
      description: "Comprehensive performance tracking and detailed reporting",
    },
  ];

  const displayError = validationError || error;

  return (
    <div className="min-h-screen flex bg-background dark:bg-gray-950">
      {/* Theme Toggle - Fixed position */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      {/* Left Column - Marketing Content (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Deep blue gradient background with texture */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900" />
        
        {/* Circuit board pattern overlay for tech feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 text-white w-full">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/30">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">TradingBot</span>
          </div>

          {/* Hero Content */}
          <div className="space-y-6 max-w-md">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-white/90">Trusted by 10,000+ traders worldwide</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
                Trade Smarter,{" "}
                <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h1>
              <p className="text-base text-white/70 leading-relaxed">
                Automate your trading strategy with AI-powered signals. 
                Join the future of intelligent investing.
              </p>
            </div>

            {/* Feature List - Now with colored icons per help.md */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br ${feature.bgColor} border border-white/10 group-hover:border-white/20 transition-colors shrink-0`}>
                    <span className={feature.iconColor}>{feature.icon}</span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex gap-6 pt-4 border-t border-white/10">
              <div>
                <div className="text-xl font-bold text-emerald-400">98.5%</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Uptime</div>
              </div>
              <div>
                <div className="text-xl font-bold text-cyan-400">0.01s</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Execution</div>
              </div>
              <div>
                <div className="text-xl font-bold text-amber-400">24/7</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>

          {/* Bottom Testimonial - Updated per help.md for better distinction */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 relative">
            <Quote className="absolute top-3 left-3 h-6 w-6 text-white/10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center font-semibold text-lg shadow-lg">
                  JS
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm leading-relaxed italic mb-2">
                  "The automated signals have transformed my portfolio. Up 47% in just 3 months!"
                </p>
                {/* Speaker name with distinct styling per help.md */}
                <p className="font-bold text-amber-300 text-sm">Sameza J.</p>
                <p className="text-[11px] text-white/50">Verified Trader • Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        {/* Matching gradient background for right side */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Ambient gradient orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        
        <Card className="relative z-10 w-full max-w-[450px] shadow-xl border border-border/50 dark:border-white/10 dark:shadow-2xl dark:shadow-black/30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-4">
            {/* Mobile Logo */}
            <div className="flex justify-center lg:hidden">
              <div className="bg-primary p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Create Account
              </CardTitle>
              <CardDescription className="text-muted-foreground dark:text-gray-400">
                Sign up to start trading with automated signals
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Message */}
            {displayError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <span className="text-red-800 dark:text-red-300 text-sm">
                  {displayError}
                </span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {/* Password strength indicator */}
                {password && (
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`h-1 flex-1 rounded ${
                        password.length >= 6 ? "bg-green-500" : "bg-red-400"
                      }`}
                    />
                    <div
                      className={`h-1 flex-1 rounded ${
                        password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-1 flex-1 rounded ${
                        password.length >= 10 && /[A-Z]/.test(password)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-muted-foreground ml-1">
                      {password.length < 6
                        ? "Weak"
                        : password.length < 8
                        ? "Fair"
                        : password.length < 10
                        ? "Good"
                        : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {confirmPassword && password && (
                  <div className="flex items-center gap-1 text-xs">
                    {password === confirmPassword ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <span className="text-red-600 dark:text-red-400">
                          Passwords don't match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{" "}
                <Link to="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?
              </span>{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Features Section (shown below form on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary/95 dark:bg-primary/80 text-white p-4 backdrop-blur">
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Auto Trading</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Risk Control</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
