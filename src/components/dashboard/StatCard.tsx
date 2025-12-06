import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: React.ReactNode;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, iconColor = 'text-blue-500' }) => {
  const isPositive = change >= 0;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  'inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded',
                  isPositive 
                    ? 'text-green-700 bg-green-50' 
                    : 'text-red-700 bg-red-50'
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
          {icon && (
            <div className={cn('flex-shrink-0', iconColor)}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
