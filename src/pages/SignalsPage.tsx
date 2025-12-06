import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ColumnDef } from "@tanstack/react-table";
import { fetchSignalsRequest } from "../store/actions";
import { selectSignals, selectSignalsLoading } from "../store/selectors";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
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
  ArrowUpCircle,
  ArrowDownCircle,
  Play,
  X,
  RefreshCw,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TradingSignal } from "@/store/types";
import { toast } from "@/utils/toast";
import { SignalsPageSkeleton } from "@/components/dashboard/Skeletons";

const SignalsPage = () => {
  const dispatch = useDispatch();
  const signals = useSelector(selectSignals);
  const loading = useSelector(selectSignalsLoading);
  const [isExecuting, setIsExecuting] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSignalsRequest());
  }, [dispatch]);

  // Show skeleton on initial load
  if (loading && signals.length === 0) {
    return <SignalsPageSkeleton />;
  }

  const handleExecuteSignal = async (signal: TradingSignal) => {
    setIsExecuting(signal.id);

    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.tradeExecuted(signal.asset, signal.direction, 25);
    setIsExecuting(null);

    // Refresh signals
    dispatch(fetchSignalsRequest());
  };

  const handleCancelSignal = (_signalId: string, asset: string) => {
    toast.signalCancelled(asset);
    // In real app, dispatch action to cancel signal
  };

  const handleRefresh = () => {
    dispatch(fetchSignalsRequest());
    toast.info("Signals refreshed");
  };

  // Stats calculations
  const pendingSignals = signals.filter((s) => s.status === "pending").length;
  const executedSignals = signals.filter((s) => s.status === "executed").length;
  const avgConfidence =
    signals.length > 0
      ? Math.round(
          signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length
        )
      : 0;

  const columns: ColumnDef<TradingSignal>[] = [
    {
      accessorKey: "asset",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asset" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("asset")}</span>
      ),
    },
    {
      accessorKey: "direction",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Direction" />
      ),
      cell: ({ row }) => {
        const direction = row.getValue("direction") as string;
        return (
          <div
            className={cn(
              "flex items-center gap-1 font-medium",
              direction === "CALL" ? "text-green-600" : "text-red-600"
            )}
          >
            {direction === "CALL" ? (
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
      accessorKey: "confidence",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Confidence" />
      ),
      cell: ({ row }) => {
        const confidence = row.getValue("confidence") as number;
        return (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  confidence >= 80
                    ? "bg-green-500"
                    : confidence >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                )}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">{confidence}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "source",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Source" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("source")}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Time" />
      ),
      cell: ({ row }) => {
        const timestamp = row.getValue("createdAt") as string;
        return (
          <span className="text-sm text-muted-foreground">
            {new Date(timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const statusConfig: Record<
          string,
          { className: string; icon: React.ReactNode }
        > = {
          pending: {
            className:
              "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
            icon: <Clock className="h-3 w-3" />,
          },
          executed: {
            className:
              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            icon: <CheckCircle2 className="h-3 w-3" />,
          },
          expired: {
            className:
              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
            icon: <AlertCircle className="h-3 w-3" />,
          },
          cancelled: {
            className:
              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            icon: <X className="h-3 w-3" />,
          },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Badge variant="outline" className={cn("gap-1", config.className)}>
            {config.icon}
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const signal = row.original;
        if (signal.status !== "pending") return null;

        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="default"
              className="h-7 px-2"
              onClick={() => handleExecuteSignal(signal)}
              disabled={isExecuting === signal.id}
            >
              {isExecuting === signal.id ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Execute
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2"
              onClick={() => handleCancelSignal(signal.id, signal.asset)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading && signals.length === 0) {
    return <SignalsPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Trading Signals
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and execute trading signals from all sources
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Signals</p>
              <p className="text-2xl font-bold">{pendingSignals}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Executed Today</p>
              <p className="text-2xl font-bold">{executedSignals}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Confidence</p>
              <p className="text-2xl font-bold">{avgConfidence}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Signals
          </CardTitle>
          <CardDescription>
            View and manage all trading signals. Click on column headers to
            sort.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={signals}
            searchPlaceholder="Search signals..."
            showColumnToggle
            showPagination
            showSearch
            showExport
            expandable
            defaultPageSize={10}
            onExport={() => toast.info("Exporting signals...")}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignalsPage;
