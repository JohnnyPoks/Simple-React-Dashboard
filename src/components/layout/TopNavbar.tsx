import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setTheme } from "../../store/actions";
import { selectCurrentUser, selectTheme } from "../../store/selectors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  LayoutGrid,
  Box,
  Sliders,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  Code,
  Sun,
  Moon,
  Bot,
  Wallet,
  MessageSquare,
} from "lucide-react";
import { toast } from "@/utils/toast";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Signals", path: "/signals", icon: LayoutGrid },
  { name: "Trades", path: "/trades", icon: Box },
  { name: "Accounts", path: "/accounts", icon: Wallet },
  { name: "Settings", path: "/settings", icon: Sliders },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Help", path: "/help", icon: HelpCircle },
  { name: "Contact", path: "/contact", icon: MessageSquare },
];

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const themeMode = useSelector(selectTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply theme class to document
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    dispatch(setTheme(themeMode === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSourceCode = () => {
    window.open(
      "https://github.com/JohnnyPoks/Simple-React-Dashboard",
      "_blank"
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-linear-to-br from-primary to-primary/80 p-1.5 rounded-md">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              TradingBot
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Source Code Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSourceCode}
              className="hidden sm:flex gap-2"
            >
              <Code className="h-4 w-4" />
              Source code
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-colors"
            >
              {themeMode === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => toast.info("No new notifications")}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-1.5 h-auto"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user?.name ? getInitials(user.name) : "JP"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">
                      {user?.name || "Jane Pearson"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role || "Administrator"}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Tabs - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 px-4 lg:px-6 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t bg-background px-4 py-2">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </NavLink>
                );
              })}

              <div className="flex gap-2 mt-2 sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSourceCode}
                  className="flex-1 gap-2"
                >
                  <Code className="h-4 w-4" />
                  Source code
                </Button>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default TopNavbar;
