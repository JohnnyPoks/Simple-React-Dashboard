import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp,
  TrendingDown,
  Bell,
  Wallet,
  Bot,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityItem as ActivityItemType } from "@/store/types";

// Re-export ActivityItem type for convenience
export type ActivityItem = ActivityItemType;

interface TradingActivityFeedProps {
  activities: ActivityItemType[];
  maxHeight?: number;
  maxItems?: number;
}

const getActivityIcon = (
  type: ActivityItem["type"],
  status?: ActivityItem["status"]
) => {
  const iconClass = "h-4 w-4";

  switch (type) {
    case "trade":
      if (status === "success")
        return <TrendingUp className={cn(iconClass, "text-green-500")} />;
      if (status === "error")
        return <TrendingDown className={cn(iconClass, "text-red-500")} />;
      return <TrendingUp className={cn(iconClass, "text-blue-500")} />;
    case "signal":
      return <Bell className={cn(iconClass, "text-purple-500")} />;
    case "account":
      return <Wallet className={cn(iconClass, "text-blue-500")} />;
    case "system":
      if (status === "warning")
        return <AlertTriangle className={cn(iconClass, "text-yellow-500")} />;
      if (status === "error")
        return <XCircle className={cn(iconClass, "text-red-500")} />;
      return <Bot className={cn(iconClass, "text-green-500")} />;
    default:
      return <Info className={cn(iconClass, "text-gray-500")} />;
  }
};

const getStatusBadge = (status?: ActivityItem["status"]) => {
  if (!status) return null;

  const variants: Record<string, { className: string; icon: React.ReactNode }> =
    {
      success: {
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: <CheckCircle2 className="h-3 w-3" />,
      },
      warning: {
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
      error: {
        className:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        icon: <XCircle className="h-3 w-3" />,
      },
      info: {
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        icon: <Info className="h-3 w-3" />,
      },
    };

  const variant = variants[status] || variants.info;

  return (
    <Badge variant="outline" className={cn("text-xs gap-1", variant.className)}>
      {variant.icon}
      {status}
    </Badge>
  );
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

export const TradingActivityFeed: React.FC<TradingActivityFeedProps> = ({
  activities,
  maxHeight = 400,
  maxItems,
}) => {
  const displayActivities = maxItems
    ? activities.slice(0, maxItems)
    : activities;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Activity Feed</CardTitle>
            <CardDescription>
              Recent trading activity and notifications
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {displayActivities.length} events
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 border-t-2 border-border">
        <ScrollArea style={{ height: maxHeight }}>
          <div className="divide-y divide-border">
            {displayActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="shrink-0 mt-0.5 p-2 rounded-full bg-muted">
                  {getActivityIcon(activity.type, activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-foreground truncate">
                      {activity.title}
                    </span>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {activity.description}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                {activity.metadata?.pnl !== undefined && (
                  <div
                    className={cn(
                      "shrink-0 font-semibold text-sm",
                      Number(activity.metadata.pnl) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {Number(activity.metadata.pnl) >= 0 ? "+" : ""}$
                    {activity.metadata.pnl}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TradingActivityFeed;
