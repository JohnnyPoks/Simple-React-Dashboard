import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Wallet,
  TrendingUp,
  Link2,
  RefreshCw,
  Settings,
  Trash2,
  CheckCircle2,
  XCircle,
  Activity,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/utils/toast';
import { fetchAccountsRequest } from '@/store/actions';
import { selectAccounts, selectAccountsLoading } from '@/store/selectors';
import { AccountsPageSkeleton } from '@/components/dashboard/Skeletons';
import type { TradingAccount } from '@/store/types';

const AccountsPage = () => {
  const dispatch = useDispatch();
  const reduxAccounts = useSelector(selectAccounts);
  const loading = useSelector(selectAccountsLoading);
  
  // Local state for UI modifications (connect, disconnect, add, delete)
  const [localModifications, setLocalModifications] = useState<Map<string, Partial<TradingAccount>>>(new Map());
  const [addedAccounts, setAddedAccounts] = useState<TradingAccount[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  // Fetch accounts on mount
  useEffect(() => {
    dispatch(fetchAccountsRequest());
  }, [dispatch]);

  // Merge Redux data with local modifications
  const accounts = [
    ...reduxAccounts
      .filter(acc => !deletedIds.has(acc.id))
      .map(acc => {
        const mods = localModifications.get(acc.id);
        return mods ? { ...acc, ...mods } : acc;
      }),
    ...addedAccounts,
  ];

  // Show skeleton during initial loading
  if (loading && reduxAccounts.length === 0) {
    return <AccountsPageSkeleton />;
  }

  const handleConnectAccount = async (accountId: string) => {
    setIsConnecting(accountId);
    
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLocalModifications(prev => {
      const next = new Map(prev);
      next.set(accountId, { 
        ...prev.get(accountId), 
        status: 'connected' as const, 
        lastSync: new Date().toISOString() 
      });
      return next;
    });
    
    setIsConnecting(null);
    toast.success('Account connected successfully');
  };

  const handleDisconnectAccount = (accountId: string, accountName: string) => {
    setLocalModifications(prev => {
      const next = new Map(prev);
      next.set(accountId, { 
        ...prev.get(accountId), 
        status: 'disconnected' as const 
      });
      return next;
    });
    toast.info(`Disconnected from ${accountName}`);
  };

  const handleSyncAccount = async (accountId: string, accountName: string) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: `Syncing ${accountName}...`,
        success: 'Account synced successfully',
        error: 'Failed to sync account',
      }
    );
    
    setTimeout(() => {
      setLocalModifications(prev => {
        const next = new Map(prev);
        next.set(accountId, { 
          ...prev.get(accountId), 
          lastSync: new Date().toISOString() 
        });
        return next;
      });
    }, 1500);
  };

  const handleDeleteAccount = (accountId: string, accountName: string) => {
    // Check if it's a locally added account
    if (addedAccounts.some(acc => acc.id === accountId)) {
      setAddedAccounts(prev => prev.filter(acc => acc.id !== accountId));
    } else {
      setDeletedIds(prev => new Set(prev).add(accountId));
    }
    toast.success(`${accountName} removed`);
  };

  const handleAddAccount = () => {
    const newAccount: TradingAccount = {
      id: Date.now().toString(),
      name: 'New Account',
      type: 'demo',
      accountType: 'demo',
      broker: 'Quotex',
      balance: 10000,
      equity: 10000,
      currency: 'USD',
      status: 'disconnected',
      isDefault: false,
      totalTrades: 0,
      winRate: 0,
      totalPnL: 0,
      profit: 0,
      profitPercent: 0,
      lastSync: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    
    setAddedAccounts(prev => [...prev, newAccount]);
    setIsAddDialogOpen(false);
    toast.success('Account added successfully');
  };

  // Calculate totals
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalEquity = accounts.reduce((sum, acc) => sum + acc.equity, 0);
  const connectedAccounts = accounts.filter(acc => acc.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trading Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage your connected broker accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Trading Account</DialogTitle>
              <DialogDescription>
                Connect a new broker account to start automated trading.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input id="accountName" placeholder="e.g., Primary Trading" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="broker">Broker</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select broker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quotex">Quotex</SelectItem>
                    <SelectItem value="iqoption">IQ Option</SelectItem>
                    <SelectItem value="olymptrade">Olymp Trade</SelectItem>
                    <SelectItem value="binomo">Binomo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" type="password" placeholder="Enter your API key" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAccount}>
                <Link2 className="h-4 w-4 mr-2" />
                Connect Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold">${totalBalance.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Equity</p>
              <p className="text-2xl font-bold">${totalEquity.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Connected</p>
              <p className="text-2xl font-bold">{connectedAccounts} / {accounts.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accounts.map(account => (
          <Card key={account.id} className={cn(
            'relative overflow-hidden transition-all duration-200',
            account.status === 'connected' && 'ring-2 ring-green-500/20'
          )}>
            {/* Status indicator bar */}
            <div className={cn(
              'absolute top-0 left-0 right-0 h-1',
              account.status === 'connected' ? 'bg-green-500' :
              account.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
            )} />
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {account.name}
                    <Badge variant={account.accountType === 'live' ? 'default' : 'secondary'}>
                      {account.accountType}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    {account.broker}
                    <ExternalLink className="h-3 w-3" />
                  </CardDescription>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'gap-1',
                    account.status === 'connected' 
                      ? 'text-green-600 border-green-200 dark:border-green-800'
                      : account.status === 'error'
                      ? 'text-red-600 border-red-200 dark:border-red-800'
                      : 'text-gray-600 border-gray-200 dark:border-gray-700'
                  )}
                >
                  {account.status === 'connected' ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {account.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="text-xl font-bold">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Equity</p>
                  <p className="text-xl font-bold">
                    ${account.equity.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Profit/Loss</p>
                  <p className={cn(
                    'font-semibold flex items-center gap-1',
                    account.profit >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {account.profit >= 0 ? '+' : ''}${account.profit.toLocaleString()}
                    <span className="text-xs">
                      ({account.profitPercent >= 0 ? '+' : ''}{account.profitPercent}%)
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Sync</p>
                  <p className="text-sm">
                    {new Date(account.lastSync).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="gap-2 pt-0">
              {account.status === 'connected' ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleSyncAccount(account.id, account.name)}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Sync
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDisconnectAccount(account.id, account.name)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleConnectAccount(account.id)}
                  disabled={isConnecting === account.id}
                >
                  {isConnecting === account.id ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Link2 className="h-4 w-4 mr-1" />
                  )}
                  {isConnecting === account.id ? 'Connecting...' : 'Connect'}
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast.info('Account settings coming soon')}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDeleteAccount(account.id, account.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
