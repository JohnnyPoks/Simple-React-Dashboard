import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardDataRequest,
  fetchSignalsRequest,
  fetchTradesRequest,
} from "../store/actions";
import {
  selectDashboardData,
  selectDashboardLoading,
  selectDashboardError,
  selectSignals,
  selectSignalsLoading,
  selectTrades,
  selectTradesLoading,
} from "../store/selectors";
import StatCard from "../components/dashboard/StatCard";
import {
  ProfitChart,
  WinRateRadialChart,
  AssetsBarChart,
} from "../components/dashboard/TradingCharts";
import { TradingActivityFeed } from "../components/dashboard/TradingActivityFeed";
import {
  PaginatedSignalsTable,
  PaginatedTradesTable,
} from "../components/dashboard/PaginatedTables";
import { BotStatusCard } from "../components/dashboard/BotStatusCard";
import { TradingDashboardSkeleton } from "../components/dashboard/Skeletons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  TrendingUp,
  BarChart3,
  Activity,
  Wallet,
  Target,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/utils/toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  const signals = useSelector(selectSignals);
  const signalsLoading = useSelector(selectSignalsLoading);
  const trades = useSelector(selectTrades);
  const tradesLoading = useSelector(selectTradesLoading);

  const [botRunning, setBotRunning] = useState(true);

  useEffect(() => {
    dispatch(fetchDashboardDataRequest());
    dispatch(fetchSignalsRequest());
    dispatch(fetchTradesRequest());
  }, [dispatch]);

  if (loading) {
    return <TradingDashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground">
              Error loading dashboard
            </p>
            <p className="text-muted-foreground mt-2">{error}</p>
            <Button
              onClick={() => dispatch(fetchDashboardDataRequest())}
              className="mt-4"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { stats, profitHistory, assetPerformance, activityFeed } =
    dashboardData;

  // Mock sparkline data for stat cards
  const profitSparkline = [120, 150, 180, 140, 200, 250, 300];
  const winRateSparkline = [65, 68, 72, 70, 75, 78, 76];
  const tradesSparkline = [45, 52, 48, 60, 55, 70, 67];
  const signalsSparkline = [8, 12, 10, 15, 18, 14, 16];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Trading Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor your trading bot performance and signals.
        </p>
      </div>

      {/* Bot Status Card */}
      <BotStatusCard
        isRunning={botRunning}
        onToggle={setBotRunning}
        balance={stats.accountBalance || 10000}
        todayPnL={stats.todayProfit || 287.5}
        activeSignals={stats.activeSignals || 0}
        openPositions={stats.openPositions || 0}
      />

      {/* Stats Grid - 6 columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Profit"
          value={`$${stats.totalProfit?.toLocaleString() || "0"}`}
          change={stats.profitChange || 0}
          icon={<DollarSign className="h-5 w-5" />}
          iconColor="text-green-500"
          variant="gradient"
          sparklineData={profitSparkline}
        />
        <StatCard
          title="Win Rate"
          value={`${stats.winRate || 0}%`}
          change={stats.winRateChange || 0}
          icon={<Target className="h-5 w-5" />}
          iconColor="text-blue-500"
          sparklineData={winRateSparkline}
        />
        <StatCard
          title="Total Trades"
          value={stats.totalTrades?.toLocaleString() || "0"}
          change={stats.tradesChange || 0}
          icon={<BarChart3 className="h-5 w-5" />}
          iconColor="text-purple-500"
          sparklineData={tradesSparkline}
        />
        <StatCard
          title="Active Signals"
          value={stats.activeSignals || 0}
          icon={<Activity className="h-5 w-5" />}
          iconColor="text-orange-500"
          sparklineData={signalsSparkline}
        />
        <StatCard
          title="Account Balance"
          value={`$${stats.accountBalance?.toLocaleString() || "0"}`}
          change={stats.balanceChange || 0}
          icon={<Wallet className="h-5 w-5" />}
          iconColor="text-emerald-500"
        />
        <StatCard
          title="Today's P&L"
          value={`$${stats.todayProfit?.toLocaleString() || "0"}`}
          change={stats.todayChange || 0}
          icon={<TrendingUp className="h-5 w-5" />}
          iconColor="text-cyan-500"
          variant="gradient"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profit History</CardTitle>
            <CardDescription>
              Your trading performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfitChart data={profitHistory || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Win Rate</CardTitle>
            <CardDescription>Overall trading success rate</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <WinRateRadialChart
              winRate={stats.winRate || 0}
              totalTrades={stats.totalTrades || 0}
            />
          </CardContent>
        </Card>
      </div>

      {/* Asset Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Asset Performance</CardTitle>
          <CardDescription>
            Profit/loss breakdown by trading asset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssetsBarChart data={assetPerformance || []} />
        </CardContent>
      </Card>

      {/* Signals & Trades Tabs with Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0">
          <Tabs defaultValue="signals" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="signals" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Active Signals
              </TabsTrigger>
              <TabsTrigger value="trades" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Trade History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signals" className="mt-4">
              <PaginatedSignalsTable
                signals={signals}
                loading={signalsLoading}
                onExecute={(signal) => {
                  toast.tradeExecuted(signal.asset, signal.direction, 25);
                }}
                onCancel={(id: string) => {
                  const signal = signals.find((s) => s.id === id);
                  if (signal) {
                    toast.signalCancelled(signal.asset);
                  }
                }}
                defaultPageSize={5}
              />
            </TabsContent>

            <TabsContent value="trades" className="mt-4">
              <PaginatedTradesTable
                trades={trades}
                loading={tradesLoading}
                defaultPageSize={5}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Activity Feed - Fixed height with internal scrolling */}
        <div className="h-fit overflow-hidden">
          <TradingActivityFeed activities={activityFeed || []} maxItems={10} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
