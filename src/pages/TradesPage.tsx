import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ColumnDef } from '@tanstack/react-table';
import { fetchTradesRequest } from '../store/actions';
import { selectTrades, selectTradesLoading } from '../store/selectors';
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  RefreshCw,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Trophy,
  Target,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Trade } from '@/store/types';
import { toast } from '@/utils/toast';
import { TradesPageSkeleton } from '@/components/dashboard/Skeletons';

const TradesPage = () => {
  const dispatch = useDispatch();
  const trades = useSelector(selectTrades);
  const loading = useSelector(selectTradesLoading);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  useEffect(() => {
    dispatch(fetchTradesRequest());
  }, [dispatch]);

  // Show skeleton on initial load
  if (loading && trades.length === 0) {
    return <TradesPageSkeleton />;
  }

  const handleRefresh = () => {
    dispatch(fetchTradesRequest());
    toast.info('Trades refreshed');
  };

  // Calculate stats
  const wonTrades = trades.filter(t => t.status === 'won').length;
  const lostTrades = trades.filter(t => t.status === 'lost').length;
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = trades.length > 0 ? Math.round((wonTrades / trades.length) * 100) : 0;
  const avgProfit = wonTrades > 0 
    ? trades.filter(t => t.status === 'won').reduce((sum, t) => sum + t.pnl, 0) / wonTrades 
    : 0;

  const columns: ColumnDef<Trade>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trade ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          #{row.getValue('id')}
        </span>
      ),
    },
    {
      accessorKey: 'asset',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asset" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue('asset')}</span>
      ),
    },
    {
      accessorKey: 'direction',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Direction" />
      ),
      cell: ({ row }) => {
        const direction = row.getValue('direction') as string;
        return (
          <div className={cn(
            'flex items-center gap-1 font-medium',
            direction === 'CALL' ? 'text-green-600' : 'text-red-600'
          )}>
            {direction === 'CALL' ? (
              <ArrowUpCircle className="h-4 w-4" />
            ) : (
              <ArrowDownCircle className="h-4 w-4" />
            )}
            {direction}
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">${(row.getValue('amount') as number).toFixed(2)}</span>
      ),
    },
    {
      accessorKey: 'entryPrice',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Entry" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{(row.getValue('entryPrice') as number).toFixed(5)}</span>
      ),
    },
    {
      accessorKey: 'exitPrice',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Exit" />
      ),
      cell: ({ row }) => {
        const exitPrice = row.getValue('exitPrice') as number | null;
        return exitPrice ? (
          <span className="font-mono text-sm">{exitPrice.toFixed(5)}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
    },
    {
      accessorKey: 'pnl',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="P&L" />
      ),
      cell: ({ row }) => {
        const pnl = row.getValue('pnl') as number;
        return (
          <span className={cn(
            'font-medium',
            pnl >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
          </span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const statusConfig: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
          won: { 
            className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            icon: <TrendingUp className="h-3 w-3" />,
            label: 'WON'
          },
          lost: { 
            className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            icon: <TrendingDown className="h-3 w-3" />,
            label: 'LOST'
          },
          open: { 
            className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            icon: <RefreshCw className="h-3 w-3 animate-spin" />,
            label: 'OPEN'
          },
          cancelled: { 
            className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
            icon: <TrendingDown className="h-3 w-3" />,
            label: 'CANCELLED'
          },
        };
        const config = statusConfig[status] || statusConfig.open;
        return (
          <Badge variant="outline" className={cn('gap-1', config.className)}>
            {config.icon}
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Opened" />
      ),
      cell: ({ row }) => {
        const timestamp = row.getValue('createdAt') as string;
        return (
          <span className="text-sm text-muted-foreground">
            {new Date(timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        );
      },
    },
  ];

  if (loading && trades.length === 0) {
    return <TradesPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trade History</h1>
          <p className="text-muted-foreground mt-1">View and analyze your complete trade history</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            {(['today', 'week', 'month', 'all'] as const).map((range) => (
              <Button
                key={range}
                variant={dateRange === range ? 'default' : 'ghost'}
                size="sm"
                className="text-xs capitalize"
                onClick={() => setDateRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Target className="h-4 w-4" />
              Total Trades
            </div>
            <p className="text-2xl font-bold">{trades.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Trophy className="h-4 w-4" />
              Win Rate
            </div>
            <p className="text-2xl font-bold text-green-600">{winRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <DollarSign className="h-4 w-4" />
              Total P&L
            </div>
            <p className={cn('text-2xl font-bold', totalPnL >= 0 ? 'text-green-600' : 'text-red-600')}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              Won
            </div>
            <p className="text-2xl font-bold text-green-600">{wonTrades}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingDown className="h-4 w-4" />
              Lost
            </div>
            <p className="text-2xl font-bold text-red-600">{lostTrades}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Wallet className="h-4 w-4" />
              Avg Profit
            </div>
            <p className="text-2xl font-bold text-green-600">${avgProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Trades Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Trades
          </CardTitle>
          <CardDescription>
            Complete trade history with P&L details. Click on column headers to sort.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={trades}
            searchPlaceholder="Search trades..."
            showColumnToggle
            showPagination
            showSearch
            showExport
            expandable
            defaultPageSize={10}
            onExport={() => toast.info('Exporting trades...')}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TradesPage;
