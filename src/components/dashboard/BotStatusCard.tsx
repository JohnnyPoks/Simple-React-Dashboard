import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bot, Power, Settings, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

interface BotStatusCardProps {
  isRunning: boolean;
  onToggle: (running: boolean) => void;
  balance: number;
  todayPnL: number;
  activeSignals: number;
  openPositions: number;
}

export const BotStatusCard: React.FC<BotStatusCardProps> = ({
  isRunning,
  onToggle,
  balance,
  todayPnL,
  activeSignals,
  openPositions,
}) => {
  const navigate = useNavigate();

  const handleToggle = (running: boolean) => {
    onToggle(running);
    if (running) {
      toast.botStarted();
    } else {
      toast.botStopped();
    }
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    toast.info("Opening bot settings");
  };

  return (
    <Card
      className={cn(
        "border-2 transition-all",
        isRunning
          ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
          : "border-muted"
      )}
    >
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Bot Info */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "relative p-3 rounded-full transition-colors",
                isRunning ? "bg-green-100 dark:bg-green-900/50" : "bg-muted"
              )}
            >
              <Bot
                className={cn(
                  "h-6 w-6 transition-colors",
                  isRunning ? "text-green-600" : "text-muted-foreground"
                )}
              />
              {isRunning && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Trading Bot</h3>
                <Badge
                  variant={isRunning ? "default" : "secondary"}
                  className={cn(
                    "text-xs",
                    isRunning && "bg-green-500 hover:bg-green-600"
                  )}
                >
                  {isRunning ? (
                    <>
                      <Activity className="h-3 w-3 mr-1 animate-pulse" />
                      Running
                    </>
                  ) : (
                    <>
                      <Power className="h-3 w-3 mr-1" />
                      Stopped
                    </>
                  )}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {isRunning
                  ? "Auto-trading is active. Monitoring signals..."
                  : "Bot is idle. Enable to start auto-trading."}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-semibold text-lg">
                  ${balance.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-xs">Balance</p>
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "font-semibold text-lg",
                    todayPnL >= 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {todayPnL >= 0 ? "+" : ""}${todayPnL.toFixed(2)}
                </p>
                <p className="text-muted-foreground text-xs">Today's P&L</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{activeSignals}</p>
                <p className="text-muted-foreground text-xs">Signals</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{openPositions}</p>
                <p className="text-muted-foreground text-xs">Open</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={handleSettingsClick}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Switch
                  checked={isRunning}
                  onCheckedChange={handleToggle}
                  className="data-[state=checked]:bg-green-500"
                />
                <Zap
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isRunning ? "text-green-500" : "text-muted-foreground"
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="font-semibold">${balance.toLocaleString()}</p>
            <p className="text-muted-foreground text-xs">Balance</p>
          </div>
          <div className="text-center">
            <p
              className={cn(
                "font-semibold",
                todayPnL >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {todayPnL >= 0 ? "+" : ""}${todayPnL.toFixed(2)}
            </p>
            <p className="text-muted-foreground text-xs">Today</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{activeSignals}</p>
            <p className="text-muted-foreground text-xs">Signals</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{openPositions}</p>
            <p className="text-muted-foreground text-xs">Open</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatusCard;
