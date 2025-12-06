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
  Play, 
  X, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TradingSignal } from '@/store/types';
import { SignalsTableSkeleton } from './Skeletons';

interface SignalsTableProps {
  signals: TradingSignal[];
  compact?: boolean;
  loading?: boolean;
  onExecute?: (signal: TradingSignal) => void;
  onCancel?: (signalId: string) => void;
}

const getStatusBadge = (status: TradingSignal['status']) => {
  const statusConfig = {
    pending: { 
      className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      icon: <Clock className="h-3 w-3" />
    },
    executed: { 
      className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      icon: <CheckCircle2 className="h-3 w-3" />
    },
    expired: { 
      className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      icon: <AlertCircle className="h-3 w-3" />
    },
    cancelled: { 
      className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      icon: <X className="h-3 w-3" />
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

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const SignalsTable: React.FC<SignalsTableProps> = ({ 
  signals, 
  compact = false,
  onExecute,
  onCancel,
  loading
}) => {
  const displaySignals = compact ? signals.slice(0, 5) : signals;

  if (loading) {
    return <SignalsTableSkeleton />;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Signals</CardTitle>
            <CardDescription>Latest trading signals from all sources</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {signals.filter(s => s.status === 'pending').length} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Asset</TableHead>
              <TableHead className="w-20">Direction</TableHead>
              <TableHead className="w-24">Confidence</TableHead>
              {!compact && <TableHead>Source</TableHead>}
              <TableHead className="w-20">Time</TableHead>
              <TableHead className="w-24">Status</TableHead>
              {!compact && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displaySignals.map((signal) => (
              <TableRow key={signal.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{signal.asset}</TableCell>
                <TableCell>
                  <div className={cn(
                    'flex items-center gap-1 font-medium',
                    signal.direction === 'CALL' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {signal.direction === 'CALL' ? (
                      <ArrowUpCircle className="h-4 w-4" />
                    ) : (
                      <ArrowDownCircle className="h-4 w-4" />
                    )}
                    {signal.direction}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          'h-full rounded-full transition-all',
                          signal.confidence >= 80 ? 'bg-green-500' :
                          signal.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        )}
                        style={{ width: `${signal.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{signal.confidence}%</span>
                  </div>
                </TableCell>
                {!compact && (
                  <TableCell className="text-muted-foreground">{signal.source}</TableCell>
                )}
                <TableCell className="text-muted-foreground text-sm">
                  {formatTime(signal.createdAt)}
                </TableCell>
                <TableCell>{getStatusBadge(signal.status)}</TableCell>
                {!compact && (
                  <TableCell className="text-right">
                    {signal.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          className="h-7 px-2"
                          onClick={() => onExecute?.(signal)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Execute
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 px-2"
                          onClick={() => onCancel?.(signal.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {compact && signals.length > 5 && (
          <div className="p-3 text-center border-t">
            <Button variant="link" size="sm">
              View all {signals.length} signals
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SignalsTable;
