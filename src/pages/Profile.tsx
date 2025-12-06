import { useState, useEffect, useRef, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/selectors";
import { updateUserProfile } from "../store/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  Pencil,
  Save,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { toast } from "@/utils/toast";

// Types
interface ProfileFormData {
  name: string;
  email: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<FieldErrors>({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Refs for focus management
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  // Sync form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Profile validation
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validateProfileForm = (): boolean => {
    const errors: FieldErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
    };
    setFieldErrors(errors);
    return !errors.name && !errors.email;
  };

  // Password validation
  const validateCurrentPassword = (password: string): string | undefined => {
    if (!password) return "Current password is required";
    return undefined;
  };

  const validateNewPassword = (password: string): string | undefined => {
    if (!password) return "New password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Must contain a number";
    return undefined;
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    newPassword: string
  ): string | undefined => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== newPassword) return "Passwords do not match";
    return undefined;
  };

  const validatePasswordForm = (): boolean => {
    const errors: FieldErrors = {
      currentPassword: validateCurrentPassword(passwordData.currentPassword),
      newPassword: validateNewPassword(passwordData.newPassword),
      confirmPassword: validateConfirmPassword(
        passwordData.confirmPassword,
        passwordData.newPassword
      ),
    };
    setPasswordErrors(errors);
    return !errors.currentPassword && !errors.newPassword && !errors.confirmPassword;
  };

  // Get password strength
  const getPasswordStrength = (password: string): { label: string; color: string; width: string } => {
    if (!password) return { label: "", color: "", width: "0%" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  // Handlers
  const handleStartEdit = () => {
    setIsEditing(true);
    setFieldErrors({});
    // Focus name field after state update
    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFieldErrors({});
    // Reset form data to current user
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      // Focus first error field
      if (fieldErrors.name) {
        nameRef.current?.focus();
      } else if (fieldErrors.email) {
        emailRef.current?.focus();
      }
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Dispatch update action
      dispatch(
        updateUserProfile({
          name: formData.name.trim(),
          email: formData.email.trim(),
        })
      );
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      // Focus first error field
      if (passwordErrors.currentPassword) {
        currentPasswordRef.current?.focus();
      }
      return;
    }

    setIsChangingPassword(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate password verification (in real app, this would be server-side)
      // For demo, we'll accept any "current password" that's at least 1 char
      if (passwordData.currentPassword.length < 1) {
        setPasswordErrors({ currentPassword: "Incorrect current password" });
        setIsChangingPassword(false);
        return;
      }
      
      setIsPasswordModalOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
      toast.success("Password changed successfully");
    } catch {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({});
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto border-4 border-primary mb-4">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground">
                {user?.name || "User"}
              </h2>
              <Badge variant="secondary" className="mt-1">
                {user?.role || "Member"}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">{user?.email}</p>

              <Separator className="my-6" />

              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <Button
                      className="w-full"
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" onClick={handleStartEdit}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsPasswordModalOpen(true)}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      ref={nameRef}
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onBlur={() => {
                        if (isEditing) {
                          setFieldErrors({
                            ...fieldErrors,
                            name: validateName(formData.name),
                          });
                        }
                      }}
                      disabled={!isEditing}
                      className={`${!isEditing ? "bg-muted" : ""} ${
                        fieldErrors.name ? "border-destructive" : ""
                      }`}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    />
                    {fieldErrors.name && (
                      <p
                        id="name-error"
                        className="text-sm text-destructive flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      ref={emailRef}
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onBlur={() => {
                        if (isEditing) {
                          setFieldErrors({
                            ...fieldErrors,
                            email: validateEmail(formData.email),
                          });
                        }
                      }}
                      disabled={!isEditing}
                      className={`${!isEditing ? "bg-muted" : ""} ${
                        fieldErrors.email ? "border-destructive" : ""
                      }`}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    />
                    {fieldErrors.email && (
                      <p
                        id="email-error"
                        className="text-sm text-destructive flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={user?.role || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Contact support to change your role
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      value={user?.id || ""}
                      disabled
                      className="bg-muted font-mono text-sm"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-primary/5 dark:bg-primary/10 border-0">
                  <CardContent className="p-4 text-center">
                    <Briefcase className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">127</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/20 border-0">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      84
                    </p>
                    <p className="text-sm text-muted-foreground">Tasks</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-0">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      45
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/20 border-0">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      12
                    </p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Updated profile picture", time: "2 hours ago" },
                  { action: 'Completed task "Dashboard Design"', time: "5 hours ago" },
                  { action: "Added new team member", time: "1 day ago" },
                  { action: 'Created new project "Mobile App"', time: "2 days ago" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <span className="text-sm text-foreground">{item.action}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Change Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={handlePasswordModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new secure password.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  ref={currentPasswordRef}
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  onBlur={() =>
                    setPasswordErrors({
                      ...passwordErrors,
                      currentPassword: validateCurrentPassword(
                        passwordData.currentPassword
                      ),
                    })
                  }
                  className={
                    passwordErrors.currentPassword ? "border-destructive pr-10" : "pr-10"
                  }
                  aria-invalid={!!passwordErrors.currentPassword}
                  aria-describedby={
                    passwordErrors.currentPassword ? "current-password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p
                  id="current-password-error"
                  className="text-sm text-destructive flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  onBlur={() =>
                    setPasswordErrors({
                      ...passwordErrors,
                      newPassword: validateNewPassword(passwordData.newPassword),
                    })
                  }
                  className={
                    passwordErrors.newPassword ? "border-destructive pr-10" : "pr-10"
                  }
                  aria-invalid={!!passwordErrors.newPassword}
                  aria-describedby="new-password-requirements"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordData.newPassword && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength.label === "Weak"
                          ? "text-red-500"
                          : passwordStrength.label === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                </div>
              )}
              {passwordErrors.newPassword && (
                <p
                  className="text-sm text-destructive flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {passwordErrors.newPassword}
                </p>
              )}
              <p
                id="new-password-requirements"
                className="text-xs text-muted-foreground"
              >
                Must be 8+ characters with uppercase, lowercase, and a number
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  onBlur={() =>
                    setPasswordErrors({
                      ...passwordErrors,
                      confirmPassword: validateConfirmPassword(
                        passwordData.confirmPassword,
                        passwordData.newPassword
                      ),
                    })
                  }
                  className={
                    passwordErrors.confirmPassword ? "border-destructive pr-10" : "pr-10"
                  }
                  aria-invalid={!!passwordErrors.confirmPassword}
                  aria-describedby={
                    passwordErrors.confirmPassword ? "confirm-password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="text-sm text-destructive flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handlePasswordModalClose}
                disabled={isChangingPassword}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
