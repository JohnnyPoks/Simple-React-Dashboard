import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
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
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TradingSignal, Trade } from "@/store/types";
import { SignalsTableSkeleton, TradesTableSkeleton } from "./Skeletons";

// ============ SIGNALS TABLE ============

interface PaginatedSignalsTableProps {
  signals: TradingSignal[];
  loading?: boolean;
  onExecute?: (signal: TradingSignal) => void;
  onCancel?: (signalId: string) => void;
  title?: string;
  description?: string;
  defaultPageSize?: number;
}

export const PaginatedSignalsTable: React.FC<PaginatedSignalsTableProps> = ({
  signals,
  loading,
  onExecute,
  onCancel,
  title = "Active Signals",
  description = "Trading signals from all sources",
  defaultPageSize = 5,
}) => {
  const [executingId, setExecutingId] = React.useState<string | null>(null);

  const handleExecute = async (signal: TradingSignal) => {
    setExecutingId(signal.id);
    await new Promise((r) => setTimeout(r, 500));
    onExecute?.(signal);
    setExecutingId(null);
  };

  const columns: ColumnDef<TradingSignal>[] = [
    {
      accessorKey: "asset",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asset" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-sm">{row.getValue("asset")}</span>
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
              "flex items-center gap-1 font-medium text-sm",
              direction === "CALL" ? "text-green-600" : "text-red-600"
            )}
          >
            {direction === "CALL" ? (
              <ArrowUpCircle className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownCircle className="h-3.5 w-3.5" />
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
            <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  confidence >= 80
                    ? "bg-green-500"
                    : confidence >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                )}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{confidence}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as TradingSignal["status"];
        const config = {
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
        }[status];

        return (
          <Badge
            variant="outline"
            className={cn("text-xs gap-1", config.className)}
          >
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
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="default"
              className="h-6 px-2 text-xs"
              onClick={() => handleExecute(signal)}
              disabled={executingId === signal.id}
            >
              {executingId === signal.id ? (
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
              className="h-6 px-1.5"
              onClick={() => onCancel?.(signal.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <SignalsTableSkeleton />;
  }

  const pendingCount = signals.filter((s) => s.status === "pending").length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {pendingCount} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-0 px-5">
        <DataTable
          columns={columns}
          data={signals}
          showSearch={false}
          showColumnToggle={false}
          defaultPageSize={defaultPageSize}
          pageSizeOptions={[5, 10, 20]}
          className="border-0"
        />
      </CardContent>
    </Card>
  );
};

// ============ TRADES TABLE ============

interface PaginatedTradesTableProps {
  trades: Trade[];
  loading?: boolean;
  title?: string;
  description?: string;
  defaultPageSize?: number;
}

export const PaginatedTradesTable: React.FC<PaginatedTradesTableProps> = ({
  trades,
  loading,
  title = "Trade History",
  description = "Recent trading activity",
  defaultPageSize = 5,
}) => {
  const columns: ColumnDef<Trade>[] = [
    {
      accessorKey: "asset",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asset" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-sm">{row.getValue("asset")}</span>
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
              "flex items-center gap-1 font-medium text-sm",
              direction === "CALL" ? "text-green-600" : "text-red-600"
            )}
          >
            {direction === "CALL" ? (
              <ArrowUpCircle className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownCircle className="h-3.5 w-3.5" />
            )}
            {direction}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">${row.getValue("amount")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Result" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as Trade["status"];
        const config = {
          won: {
            className:
              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            icon: <CheckCircle2 className="h-3 w-3" />,
          },
          lost: {
            className:
              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            icon: <X className="h-3 w-3" />,
          },
          open: {
            className:
              "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            icon: <Clock className="h-3 w-3" />,
          },
          cancelled: {
            className:
              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
            icon: <AlertCircle className="h-3 w-3" />,
          },
        }[status];

        return (
          <Badge
            variant="outline"
            className={cn("text-xs gap-1", config.className)}
          >
            {config.icon}
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pnl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="P&L" />
      ),
      cell: ({ row }) => {
        const pnl = row.getValue("pnl") as number;
        return (
          <span
            className={cn(
              "font-medium text-sm",
              pnl >= 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {pnl >= 0 ? "+" : ""}
            {pnl.toFixed(2)}
          </span>
        );
      },
    },
  ];

  if (loading) {
    return <TradesTableSkeleton />;
  }

  const wonTrades = trades.filter((t) => t.status === "won").length;
  const totalTrades = trades.filter(
    (t) => t.status !== "open" && t.status !== "cancelled"
  ).length;
  const winRate =
    totalTrades > 0 ? Math.round((wonTrades / totalTrades) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {winRate}% win rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-0 px-5">
        <DataTable
          columns={columns}
          data={trades}
          showSearch={false}
          showColumnToggle={false}
          defaultPageSize={defaultPageSize}
          pageSizeOptions={[5, 10, 20]}
          className="border-0"
        />
      </CardContent>
    </Card>
  );
};

export default { PaginatedSignalsTable, PaginatedTradesTable };
