import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowUpCircle, 
  ArrowDownCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Trade } from '@/store/types';
import { TradesTableSkeleton } from './Skeletons';

interface TradesTableProps {
  trades: Trade[];
  compact?: boolean;
  loading?: boolean;
}

const getStatusBadge = (status: Trade['status']) => {
  const statusConfig = {
    open: { 
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      icon: <Clock className="h-3 w-3" />
    },
    won: { 
      className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      icon: <CheckCircle2 className="h-3 w-3" />
    },
    lost: { 
      className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      icon: <XCircle className="h-3 w-3" />
    },
    cancelled: { 
      className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      icon: <Minus className="h-3 w-3" />
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={cn('text-xs gap-1 capitalize', config.className)}>
      {config.icon}
      {status}
    </Badge>
  );
};

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const TradesTable: React.FC<TradesTableProps> = ({ 
  trades, 
  compact = false,
  loading
}) => {
  if (loading) {
    return <TradesTableSkeleton />;
  }

  const displayTrades = compact ? trades.slice(0, 5) : trades;
  
  // Calculate summary stats
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const wonTrades = trades.filter(t => t.status === 'won').length;
  const lostTrades = trades.filter(t => t.status === 'lost').length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Trades</CardTitle>
            <CardDescription>
              {wonTrades}W / {lostTrades}L · Total P&L: 
              <span className={cn(
                'ml-1 font-semibold',
                totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </span>
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              'text-xs',
              trades.filter(t => t.status === 'open').length > 0 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : ''
            )}
          >
            {trades.filter(t => t.status === 'open').length} open
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Asset</TableHead>
              <TableHead className="w-20">Direction</TableHead>
              <TableHead className="w-20">Amount</TableHead>
              {!compact && <TableHead>Entry Price</TableHead>}
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="text-right w-24">P&L</TableHead>
              {!compact && <TableHead className="w-28">Time</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTrades.map((trade) => (
              <TableRow key={trade.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{trade.asset}</TableCell>
                <TableCell>
                  <div className={cn(
                    'flex items-center gap-1 font-medium',
                    trade.direction === 'CALL' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {trade.direction === 'CALL' ? (
                      <ArrowUpCircle className="h-4 w-4" />
                    ) : (
                      <ArrowDownCircle className="h-4 w-4" />
                    )}
                    {trade.direction}
                  </div>
                </TableCell>
                <TableCell>${trade.amount}</TableCell>
                {!compact && (
                  <TableCell className="text-muted-foreground">
                    {trade.entryPrice.toFixed(5)}
                  </TableCell>
                )}
                <TableCell>{getStatusBadge(trade.status)}</TableCell>
                <TableCell className="text-right">
                  <span className={cn(
                    'font-semibold',
                    trade.pnl > 0 ? 'text-green-600' : 
                    trade.pnl < 0 ? 'text-red-600' : 'text-muted-foreground'
                  )}>
                    {trade.pnl > 0 ? '+' : ''}{trade.pnl === 0 ? '-' : `$${trade.pnl.toFixed(2)}`}
                  </span>
                </TableCell>
                {!compact && (
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDateTime(trade.createdAt)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {compact && trades.length > 5 && (
          <div className="p-3 text-center border-t">
            <Button variant="link" size="sm">
              View all {trades.length} trades
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradesTable;
