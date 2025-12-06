import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardDataRequest } from '../store/actions';
import {
  selectDashboardData,
  selectDashboardLoading,
  selectDashboardError,
} from '../store/selectors';
import StatCard from '../components/dashboard/StatCard';
import Charts from '../components/dashboard/Charts';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, Ticket, CheckCircle2, Mail, Users, DollarSign, Package, Info } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchDashboardDataRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground">Error loading dashboard</p>
            <p className="text-muted-foreground mt-2">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { stats, activityFeed, developmentActivity, pieChartData, donutChartData } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid - 6 columns like template */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="New Tickets"
          value={stats.newTickets}
          change={stats.newTicketsChange}
          icon={<Ticket className="h-6 w-6" />}
          iconColor="text-green-500"
        />
        <StatCard
          title="Closed Today"
          value={stats.closedToday}
          change={stats.closedTodayChange}
          icon={<CheckCircle2 className="h-6 w-6" />}
          iconColor="text-red-500"
        />
        <StatCard
          title="New Replies"
          value={stats.newReplies}
          change={stats.newRepliesChange}
          icon={<Mail className="h-6 w-6" />}
          iconColor="text-blue-500"
        />
        <StatCard
          title="Followers"
          value={stats.followers}
          change={stats.followersChange}
          icon={<Users className="h-6 w-6" />}
          iconColor="text-green-500"
        />
        <StatCard
          title="Daily earnings"
          value={stats.dailyEarnings}
          change={stats.dailyEarningsChange}
          icon={<DollarSign className="h-6 w-6" />}
          iconColor="text-red-500"
        />
        <StatCard
          title="Products"
          value={stats.products}
          change={stats.productsChange}
          icon={<Package className="h-6 w-6" />}
          iconColor="text-red-500"
        />
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              <span className="font-medium">Read our documentation</span> with code samples.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Charts
        lineData={developmentActivity}
        pieData={pieChartData}
        donutData={donutChartData}
      />

      {/* Activity Feed */}
      <ActivityFeed activities={activityFeed} />
    </div>
  );
};

export default Dashboard;
