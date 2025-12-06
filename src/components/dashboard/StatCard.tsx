import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'gradient';
  sparklineData?: number[];
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  iconColor = 'text-blue-500',
  trend,
  subtitle,
  variant = 'default',
  sparklineData,
}) => {
  const isPositive = trend === 'up' || (change !== undefined && change >= 0);
  const isNeutral = trend === 'neutral' || change === 0;

  const variantStyles: Record<string, string> = {
    default: '',
    success: 'border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20',
    danger: 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20',
    warning: 'border-yellow-200 dark:border-yellow-900 bg-yellow-50/50 dark:bg-yellow-950/20',
    gradient: 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20',
  };

  // Prepare sparkline data
  const chartData = sparklineData?.map((value, index) => ({ value, index }));

  return (
    <Card className={cn('border shadow-sm transition-all hover:shadow-md relative overflow-hidden', variantStyles[variant])}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate mb-1">{title}</p>
            <p className="text-2xl lg:text-3xl font-bold text-foreground mb-1 truncate">{value}</p>
            <div className="flex items-center gap-2">
              {change !== undefined && (
                <span
                  className={cn(
                    'inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded',
                    isNeutral
                      ? 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800'
                      : isPositive 
                        ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/50' 
                        : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/50'
                  )}
                >
                  {isNeutral ? (
                    <Minus className="h-3 w-3 mr-0.5" />
                  ) : isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {isPositive && change > 0 ? '+' : ''}{change}%
                </span>
              )}
              {subtitle && (
                <span className="text-xs text-muted-foreground truncate">{subtitle}</span>
              )}
            </div>
          </div>
          {icon && (
            <div className={cn('shrink-0 p-2 rounded-lg bg-muted/50', iconColor)}>
              {icon}
            </div>
          )}
        </div>
        
        {/* Sparkline Chart */}
        {sparklineData && chartData && (
          <div className="absolute bottom-0 left-0 right-0 h-12 opacity-30">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`sparklineGradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#10b981' : '#ef4444'}
                  strokeWidth={1.5}
                  fill={`url(#sparklineGradient-${title.replace(/\s/g, '')})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
