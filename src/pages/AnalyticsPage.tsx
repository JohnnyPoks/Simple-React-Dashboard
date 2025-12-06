import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Target,
  Trophy,
  Clock,
  BarChart3,
  PieChartIcon,
  Activity,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/utils/toast";
import { fetchAnalyticsRequest } from "@/store/actions";
import {
  selectAnalyticsData,
  selectAnalyticsLoading,
  selectAnalyticsTimeRange,
} from "@/store/selectors";
import { AnalyticsPageSkeleton } from "@/components/dashboard/Skeletons";

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const analyticsData = useSelector(selectAnalyticsData);
  const loading = useSelector(selectAnalyticsLoading);
  const timeRange = useSelector(selectAnalyticsTimeRange);

  useEffect(() => {
    dispatch(fetchAnalyticsRequest(timeRange));
  }, [dispatch, timeRange]);

  const handleTimeRangeChange = (newRange: "7d" | "30d" | "90d" | "1y") => {
    dispatch(fetchAnalyticsRequest(newRange));
  };

  const handleExport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Generating report...",
      success: "Report downloaded successfully",
      error: "Failed to generate report",
    });
  };

  // Show skeleton during loading
  if (loading && !analyticsData) {
    return <AnalyticsPageSkeleton />;
  }

  // Default data if analytics hasn't loaded yet
  const metrics = analyticsData?.metrics || {
    totalProfit: 0,
    totalProfitPercent: 0,
    winRate: 0,
    winRateChange: 0,
    totalTrades: 0,
    profitFactor: 0,
    avgTradeProfit: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
    bestTrade: 0,
    worstTrade: 0,
    avgHoldingTime: "0m",
  };

  const dailyPnLData = analyticsData?.dailyPnL || [];
  const cumulativePnLData = analyticsData?.cumulativePnL || [];
  const assetPerformanceData = analyticsData?.assetPerformance || [];
  const directionData = analyticsData?.directionData || [];
  const resultDistributionData = analyticsData?.resultDistribution || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            In-depth trading performance analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <Badge
                variant="outline"
                className="text-green-600 bg-green-50 dark:bg-green-900/20"
              >
                <ArrowUpRight className="h-3 w-3 mr-1" />+
                {metrics.totalProfitPercent}%
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className="text-2xl font-bold text-green-600">
                +${metrics.totalProfit.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <Badge
                variant="outline"
                className="text-blue-600 bg-blue-50 dark:bg-blue-900/20"
              >
                <ArrowUpRight className="h-3 w-3 mr-1" />+
                {metrics.winRateChange}%
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold">{metrics.winRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <Badge
                variant="outline"
                className="text-purple-600 bg-purple-50 dark:bg-purple-900/20"
              >
                {metrics.totalTrades}
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className="text-2xl font-bold">{metrics.totalTrades}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <Badge
                variant="outline"
                className="text-orange-600 bg-orange-50 dark:bg-orange-900/20"
              >
                {metrics.profitFactor}
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Profit Factor</p>
              <p className="text-2xl font-bold">{metrics.profitFactor}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cumulative P&L */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Equity Curve
            </CardTitle>
            <CardDescription>Account balance growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cumulativePnLData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Balance",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily P&L */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Daily P&L
            </CardTitle>
            <CardDescription>Profit and loss by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyPnLData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    `$${Math.abs(value).toFixed(2)}`,
                    "",
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="profit"
                  fill="#22c55e"
                  name="Profit"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="loss"
                  fill="#ef4444"
                  name="Loss"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Direction Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Trade Direction
            </CardTitle>
            <CardDescription>CALL vs PUT distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={directionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {directionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Win/Loss Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Win/Loss Ratio
            </CardTitle>
            <CardDescription>Trade outcome distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={resultDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {resultDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Best Trading Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Best Hours
            </CardTitle>
            <CardDescription>Highest win rate by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { hour: "10:00 - 11:00", winRate: 82, trades: 24 },
                { hour: "14:00 - 15:00", winRate: 78, trades: 31 },
                { hour: "09:00 - 10:00", winRate: 75, trades: 18 },
                { hour: "15:00 - 16:00", winRate: 73, trades: 28 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        index === 0
                          ? "bg-yellow-100 text-yellow-700"
                          : index === 1
                          ? "bg-gray-100 text-gray-700"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{item.hour}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.trades} trades
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {item.winRate}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Asset Performance
          </CardTitle>
          <CardDescription>
            Performance breakdown by trading asset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Asset
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Trades
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Win Rate
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Profit
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {assetPerformanceData.map((asset) => (
                  <tr key={asset.asset} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{asset.asset}</td>
                    <td className="py-3 px-4 text-right">{asset.trades}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge
                        variant="outline"
                        className={cn(
                          asset.winRate >= 70
                            ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                            : asset.winRate >= 60
                            ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
                            : "text-red-600 bg-red-50 dark:bg-red-900/20"
                        )}
                      >
                        {asset.winRate}%
                      </Badge>
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-right font-medium",
                        asset.profit >= 0 ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {asset.profit >= 0 ? "+" : ""}${asset.profit.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden ml-auto">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            asset.winRate >= 70
                              ? "bg-green-500"
                              : asset.winRate >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${asset.winRate}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Trading Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  label: "Best Trade",
                  value: `+$${metrics.bestTrade.toFixed(2)}`,
                  className: "text-green-600",
                },
                {
                  label: "Worst Trade",
                  value: `$${metrics.worstTrade.toFixed(2)}`,
                  className: "text-red-600",
                },
                {
                  label: "Average Trade Profit",
                  value: `+$${metrics.avgTradeProfit.toFixed(2)}`,
                  className: "text-green-600",
                },
                {
                  label: "Win Rate",
                  value: `${metrics.winRate}%`,
                  className: "text-green-600",
                },
                {
                  label: "Total Trades",
                  value: `${metrics.totalTrades}`,
                  className: "",
                },
                {
                  label: "Avg Holding Time",
                  value: metrics.avgHoldingTime,
                  className: "",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className={cn("font-medium", stat.className)}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  label: "Sharpe Ratio",
                  value: metrics.sharpeRatio.toFixed(2),
                  desc: "Risk-adjusted return",
                },
                {
                  label: "Max Drawdown",
                  value: `-${metrics.maxDrawdown}%`,
                  desc: "Largest peak to trough",
                },
                {
                  label: "Profit Factor",
                  value: metrics.profitFactor.toFixed(2),
                  desc: "Gross profit / gross loss",
                },
                {
                  label: "Expectancy",
                  value: `$${metrics.avgTradeProfit.toFixed(2)}`,
                  desc: "Expected profit per trade",
                },
                {
                  label: "Total P/L",
                  value: `+$${metrics.totalProfit.toLocaleString()}`,
                  desc: "Net realized profit",
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <span className="font-medium">{metric.label}</span>
                    <p className="text-xs text-muted-foreground">
                      {metric.desc}
                    </p>
                  </div>
                  <span className="font-bold text-lg">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
