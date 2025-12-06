import { useState, useEffect, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { forgotPasswordRequest, clearAuthError } from "../store/actions";
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectForgotPasswordSuccess,
  selectTheme,
} from "../store/selectors";
import { setTheme } from "../store/actions";
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
  BarChart3,
  AlertCircle,
  ArrowLeft,
  Mail,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "@/utils/toast";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const forgotPasswordSuccess = useSelector(selectForgotPasswordSuccess);
  const theme = useSelector(selectTheme);

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Show success toast
  useEffect(() => {
    if (forgotPasswordSuccess) {
      toast.success(
        "Reset email sent! Check your inbox for password reset instructions."
      );
    }
  }, [forgotPasswordSuccess]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!email.trim()) {
      setValidationError("Please enter your email address");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setValidationError("Please enter a valid email address");
      return;
    }

    dispatch(forgotPasswordRequest(email));
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const displayError = validationError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 -z-10" />

      {/* Theme Toggle */}
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

      <Card className="w-full max-w-[400px] shadow-lg border-0 dark:border dark:border-border">
        <CardHeader className="text-center space-y-4 pb-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-primary p-3 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your email to receive reset instructions
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Message */}
          {forgotPasswordSuccess ? (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div className="text-green-800 dark:text-green-300">
                  <span className="font-semibold block mb-1">Email Sent!</span>
                  <span className="text-sm">
                    We've sent password reset instructions to{" "}
                    <span className="font-medium">{email}</span>. Please check
                    your inbox and spam folder.
                  </span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email?
                </p>
                <Button
                  variant="outline"
                  onClick={() => dispatch(forgotPasswordRequest(email))}
                  disabled={loading}
                >
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
                      Resending...
                    </span>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Email
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {displayError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span className="text-red-800 dark:text-red-300 text-sm">
                    {displayError}
                  </span>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="text-blue-800 dark:text-blue-300 text-sm">
                  Enter the email address associated with your account, and
                  we'll send you a link to reset your password.
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    autoFocus
                  />
                </div>

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
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
