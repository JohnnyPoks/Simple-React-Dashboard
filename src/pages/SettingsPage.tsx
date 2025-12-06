import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/actions';
import { selectTheme } from '../store/selectors';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bot,
  Bell,
  Shield,
  Palette,
  DollarSign,
  Save,
  RefreshCw,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Zap,
  Target,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { toast } from '@/utils/toast';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  
  // Bot Settings
  const [botSettings, setBotSettings] = useState({
    autoTrade: true,
    maxConcurrentTrades: 3,
    defaultAmount: 25,
    martinGale: false,
    martinGaleMultiplier: 2,
    takeProfit: 100,
    stopLoss: 50,
    tradingHours: {
      start: '09:00',
      end: '17:00',
    },
    preferredAssets: ['EUR/USD', 'GBP/USD'],
    minConfidence: 75,
    maxDailyTrades: 20,
    cooldownPeriod: 60,
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    tradeAlerts: true,
    signalAlerts: true,
    performanceAlerts: true,
    emailNotifications: false,
    soundEnabled: true,
    pushNotifications: true,
    dailyReport: true,
    weeklyReport: false,
  });

  // Display Settings (theme is managed by Redux)
  const [display, setDisplay] = useState({
    compactMode: false,
    showPnL: true,
    showBalanceOnDashboard: true,
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    chartStyle: 'candles',
  });

  const [isSaving, setIsSaving] = useState(false);

  // Handle theme change with Redux
  const handleThemeChange = (theme: 'light' | 'dark') => {
    dispatch(setTheme(theme));
    toast.success(`Theme changed to ${theme}. Your preference has been saved.`);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API save
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Settings saved successfully');
    setIsSaving(false);
  };

  const handleReset = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1000)),
      {
        loading: 'Resetting to defaults...',
        success: 'Settings reset to defaults',
        error: 'Failed to reset settings',
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your trading bot and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="bot" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="bot" className="gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Bot</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Display</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Bot Settings */}
        <TabsContent value="bot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Trading Automation
              </CardTitle>
              <CardDescription>
                Configure automatic trading behavior and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Auto Trade</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically execute trades based on signals
                  </p>
                </div>
                <Switch
                  checked={botSettings.autoTrade}
                  onCheckedChange={(checked) => setBotSettings(prev => ({ ...prev, autoTrade: checked }))}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Max Concurrent Trades</Label>
                  <span className="text-sm font-medium">{botSettings.maxConcurrentTrades}</span>
                </div>
                <Slider
                  value={[botSettings.maxConcurrentTrades]}
                  onValueChange={([value]) => setBotSettings(prev => ({ ...prev, maxConcurrentTrades: value }))}
                  max={10}
                  min={1}
                  step={1}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultAmount">Default Trade Amount ($)</Label>
                  <Input
                    id="defaultAmount"
                    type="number"
                    value={botSettings.defaultAmount}
                    onChange={(e) => setBotSettings(prev => ({ 
                      ...prev, 
                      defaultAmount: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDailyTrades">Max Daily Trades</Label>
                  <Input
                    id="maxDailyTrades"
                    type="number"
                    value={botSettings.maxDailyTrades}
                    onChange={(e) => setBotSettings(prev => ({ 
                      ...prev, 
                      maxDailyTrades: parseInt(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Martingale Strategy</Label>
                  <p className="text-sm text-muted-foreground">
                    Double stake after loss (risky)
                  </p>
                </div>
                <Switch
                  checked={botSettings.martinGale}
                  onCheckedChange={(checked) => setBotSettings(prev => ({ ...prev, martinGale: checked }))}
                />
              </div>

              {botSettings.martinGale && (
                <div className="space-y-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">High Risk Strategy Enabled</span>
                  </div>
                  <div className="space-y-2">
                    <Label>Multiplier: {botSettings.martinGaleMultiplier}x</Label>
                    <Slider
                      value={[botSettings.martinGaleMultiplier]}
                      onValueChange={([value]) => setBotSettings(prev => ({ ...prev, martinGaleMultiplier: value }))}
                      max={5}
                      min={1.5}
                      step={0.5}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Risk Management
              </CardTitle>
              <CardDescription>
                Set profit targets and loss limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="takeProfit" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Daily Take Profit ($)
                  </Label>
                  <Input
                    id="takeProfit"
                    type="number"
                    value={botSettings.takeProfit}
                    onChange={(e) => setBotSettings(prev => ({ 
                      ...prev, 
                      takeProfit: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stopLoss" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-red-500" />
                    Daily Stop Loss ($)
                  </Label>
                  <Input
                    id="stopLoss"
                    type="number"
                    value={botSettings.stopLoss}
                    onChange={(e) => setBotSettings(prev => ({ 
                      ...prev, 
                      stopLoss: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Minimum Signal Confidence</Label>
                  <span className="text-sm font-medium">{botSettings.minConfidence}%</span>
                </div>
                <Slider
                  value={[botSettings.minConfidence]}
                  onValueChange={([value]) => setBotSettings(prev => ({ ...prev, minConfidence: value }))}
                  max={100}
                  min={50}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Cooldown Between Trades (seconds)</Label>
                <Input
                  type="number"
                  value={botSettings.cooldownPeriod}
                  onChange={(e) => setBotSettings(prev => ({ 
                    ...prev, 
                    cooldownPeriod: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Trading Schedule
              </CardTitle>
              <CardDescription>
                Set active trading hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={botSettings.tradingHours.start}
                    onChange={(e) => setBotSettings(prev => ({ 
                      ...prev, 
                      tradingHours: { ...prev.tradingHours, start: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={botSettings.tradingHours.end}
                    onChange={(e) => setBotSettings(prev => ({ 
                      ...prev, 
                      tradingHours: { ...prev.tradingHours, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Preferences
              </CardTitle>
              <CardDescription>
                Choose which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: 'tradeAlerts', label: 'Trade Alerts', desc: 'Get notified when trades are executed' },
                { key: 'signalAlerts', label: 'Signal Alerts', desc: 'Receive alerts for new trading signals' },
                { key: 'performanceAlerts', label: 'Performance Alerts', desc: 'Daily P&L summary notifications' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive alerts via email' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications] as boolean}
                    onCheckedChange={(checked) => setNotifications(prev => ({ 
                      ...prev, 
                      [item.key]: checked 
                    }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {notifications.soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
                Sound Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for important events
                  </p>
                </div>
                <Switch
                  checked={notifications.soundEnabled}
                  onCheckedChange={(checked) => setNotifications(prev => ({ 
                    ...prev, 
                    soundEnabled: checked 
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Configure automated report delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Daily Report</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily trading summary at market close
                  </p>
                </div>
                <Switch
                  checked={notifications.dailyReport}
                  onCheckedChange={(checked) => setNotifications(prev => ({ 
                    ...prev, 
                    dailyReport: checked 
                  }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly performance analysis
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => setNotifications(prev => ({ 
                    ...prev, 
                    weeklyReport: checked 
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the dashboard looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose your preferred color scheme
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={currentTheme === 'light' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => handleThemeChange('light')}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={currentTheme === 'dark' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => handleThemeChange('dark')}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing for more content
                  </p>
                </div>
                <Switch
                  checked={display.compactMode}
                  onCheckedChange={(checked) => setDisplay(prev => ({ ...prev, compactMode: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Show P&L</Label>
                  <p className="text-sm text-muted-foreground">
                    Display profit/loss on trades
                  </p>
                </div>
                <Switch
                  checked={display.showPnL}
                  onCheckedChange={(checked) => setDisplay(prev => ({ ...prev, showPnL: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Show Balance</Label>
                  <p className="text-sm text-muted-foreground">
                    Display account balance on dashboard
                  </p>
                </div>
                <Switch
                  checked={display.showBalanceOnDashboard}
                  onCheckedChange={(checked) => setDisplay(prev => ({ 
                    ...prev, 
                    showBalanceOnDashboard: checked 
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select 
                    value={display.currency} 
                    onValueChange={(value) => setDisplay(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select 
                    value={display.timezone} 
                    onValueChange={(value) => setDisplay(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Chart Style</Label>
                <Select 
                  value={display.chartStyle} 
                  onValueChange={(value) => setDisplay(prev => ({ ...prev, chartStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candles">Candlestick</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bars">Bar Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              <Button onClick={() => toast.success('Password updated successfully')}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground">
                    Require authentication code on login
                  </p>
                </div>
                <Button variant="outline" onClick={() => toast.info('2FA setup coming soon')}>
                  Setup
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API access to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Trading Bot API Key</p>
                  <p className="text-sm text-muted-foreground font-mono">****-****-****-7f2d</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => toast.success('API key revoked')}
                >
                  Revoke
                </Button>
              </div>
              <Button variant="outline" onClick={() => toast.info('Generating new API key...')}>
                Generate New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
