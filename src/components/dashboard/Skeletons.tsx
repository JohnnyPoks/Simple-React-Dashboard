import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Pre-calculated heights for chart bars to avoid Math.random() during render
const chartHeights = [65, 45, 80, 50, 70, 40, 55, 75, 60, 85, 48, 72];

export const StatCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-4">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-8 w-24 mb-2" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-14 rounded" />
        <Skeleton className="h-3 w-16" />
      </div>
    </CardContent>
  </Card>
);

export const ChartSkeleton = ({ height = 200 }: { height?: number }) => (
  <Card className="animate-pulse">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </CardHeader>
    <CardContent>
      <div style={{ height }} className="flex items-end gap-1 pt-4">
        {chartHeights.map((h, i) => (
          <Skeleton 
            key={i} 
            className="flex-1 rounded-t" 
            style={{ height: `${h}%` }} 
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

export const AreaChartSkeleton = () => (
  <Card className="col-span-full lg:col-span-2 animate-pulse">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-10 rounded-md" />
          <Skeleton className="h-8 w-10 rounded-md" />
          <Skeleton className="h-8 w-10 rounded-md" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] relative">
        <Skeleton className="absolute inset-0 rounded" />
      </div>
    </CardContent>
  </Card>
);

export const PieChartSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-2">
      <Skeleton className="h-5 w-32 mb-1" />
      <Skeleton className="h-4 w-24" />
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center py-4">
      <Skeleton className="h-40 w-40 rounded-full" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
    </CardContent>
  </Card>
);

export const RadialChartSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-2">
      <Skeleton className="h-5 w-24 mb-1" />
      <Skeleton className="h-4 w-32" />
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <div className="relative h-[200px] w-full flex items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-4 w-16 mt-1" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Card className="animate-pulse">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-20 rounded" />
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="border-t">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 bg-muted/30">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-t">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded" />
            <div className="flex items-center gap-2 w-24">
              <Skeleton className="h-2 w-full rounded" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-4 w-24 flex-1" />
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const ActivityFeedSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-28 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-20 rounded" />
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 px-6 py-4">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const NavbarSkeleton = () => (
  <div className="bg-background border-b animate-pulse">
    {/* Top bar */}
    <div className="flex items-center justify-between h-16 px-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-28 rounded-md hidden sm:block" />
        <Skeleton className="h-9 w-20 rounded-md hidden sm:block" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="hidden md:block">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
      </div>
    </div>
    {/* Tab bar */}
    <div className="hidden lg:flex items-center gap-1 px-6 pb-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-24 rounded-md" />
      ))}
    </div>
  </div>
);

export const BotStatusSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

export const TradingDashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>

    {/* Bot Status */}
    <BotStatusSkeleton />

    {/* Stats Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <AreaChartSkeleton />
      <RadialChartSkeleton />
    </div>

    {/* Tables & Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TableSkeleton rows={5} />
      <TableSkeleton rows={5} />
    </div>

    {/* Bottom Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChartSkeleton height={250} />
      <PieChartSkeleton />
      <ActivityFeedSkeleton />
    </div>
  </div>
);

// Legacy export for backward compatibility
export const DashboardSkeleton = TradingDashboardSkeleton;

// Alias exports for trading tables
export const SignalsTableSkeleton = () => <TableSkeleton rows={7} />;
export const TradesTableSkeleton = () => <TableSkeleton rows={7} />;

// Page-specific skeletons
export const SignalsPageSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Table */}
    <TableSkeleton rows={10} />
  </div>
);

export const TradesPageSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Table */}
    <TableSkeleton rows={10} />
  </div>
);

export const AccountsPageSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      <Skeleton className="h-10 w-36 rounded-md" />
    </div>

    {/* Account Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16 rounded" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const AnalyticsPageSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AreaChartSkeleton />
      <ChartSkeleton height={300} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PieChartSkeleton />
      <ChartSkeleton height={250} />
      <ChartSkeleton height={250} />
    </div>
  </div>
);

export const SettingsPageSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>

    {/* Tabs */}
    <Skeleton className="h-10 w-[400px] rounded-md" />

    {/* Settings Cards */}
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default {
  StatCardSkeleton,
  ChartSkeleton,
  AreaChartSkeleton,
  PieChartSkeleton,
  RadialChartSkeleton,
  TableSkeleton,
  ActivityFeedSkeleton,
  NavbarSkeleton,
  BotStatusSkeleton,
  TradingDashboardSkeleton,
  DashboardSkeleton,
  SignalsTableSkeleton,
  TradesTableSkeleton,
  SignalsPageSkeleton,
  TradesPageSkeleton,
  AccountsPageSkeleton,
  AnalyticsPageSkeleton,
  SettingsPageSkeleton,
};
