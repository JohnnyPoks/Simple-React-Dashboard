import { useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PerformanceData, AssetPerformance, ChartDataPoint, ProfitHistoryPoint } from '@/store/types';

// Chart colors
const COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  cyan: '#06b6d4',
  gray: '#6b7280',
};

const PIE_COLORS = [COLORS.primary, COLORS.success, COLORS.warning, COLORS.purple, COLORS.pink];

// Profit Chart - Main dashboard chart
interface ProfitChartProps {
  data: ProfitHistoryPoint[];
}

export const ProfitChart: React.FC<ProfitChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.success} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          tickFormatter={(value) => value.slice(5)}
          className="text-muted-foreground"
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickFormatter={(value) => `$${value}`}
          className="text-muted-foreground"
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string) => [
            `$${value.toFixed(2)}`, 
            name === 'profit' ? 'Daily P&L' : 'Cumulative'
          ]}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="cumulative"
          stroke={COLORS.primary}
          strokeWidth={2}
          fill="url(#profitGradient)"
          name="Cumulative"
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke={COLORS.success}
          strokeWidth={2}
          dot={false}
          name="Daily P&L"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Win Rate Radial Chart - Dashboard version
// Using Recharts RadialBarChart with PolarGrid for proper circular visualization
interface WinRateRadialChartProps {
  winRate: number;
  totalTrades: number;
}

export const WinRateRadialChart: React.FC<WinRateRadialChartProps> = ({ winRate, totalTrades }) => {
  // Clamp winRate between 0 and 100
  const clampedWinRate = Math.max(0, Math.min(100, winRate));
  
  // Chart data for the radial bar
  const chartData = [
    {
      name: 'winRate',
      value: clampedWinRate,
      fill: COLORS.success,
    }
  ];

  // Calculate the end angle based on win rate (360 degrees = 100%)
  const endAngle = (clampedWinRate / 100) * 360;

  return (
    <div className="relative" style={{ width: 200, height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={20}
          data={chartData}
          startAngle={90}
          endAngle={90 - endAngle}
        >
          {/* Background circle grid */}
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="[&_.recharts-polar-grid-concentric-circle]:fill-muted/30"
            polarRadius={[70, 85]}
          />
          
          {/* The actual radial bar */}
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background={{ fill: 'hsl(var(--muted)/0.3)' }}
            className="[&_.recharts-radial-bar-background-sector]:fill-muted/30"
          />
          
          {/* Center label */}
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {clampedWinRate}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        {totalTrades} trades
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Assets Bar Chart - Dashboard version
interface AssetsBarChartProps {
  data: AssetPerformance[];
}

export const AssetsBarChart: React.FC<AssetsBarChartProps> = ({ data }) => {
  const sortedData = useMemo(() => 
    [...data].sort((a, b) => Math.abs(b.pnl) - Math.abs(a.pnl)).slice(0, 6),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={sortedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="asset" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string) => [
            `$${value.toFixed(2)}`, 
            name === 'pnl' ? 'P&L' : name
          ]}
        />
        <Bar dataKey="pnl" name="P&L" radius={[4, 4, 0, 0]}>
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? COLORS.success : COLORS.danger} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// Balance Line Chart
interface BalanceChartProps {
  data: PerformanceData[];
}

export const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Balance History</CardTitle>
            <CardDescription>Account balance over the last 30 days</CardDescription>
          </div>
          <Tabs defaultValue="30d" className="w-auto">
            <TabsList className="h-8">
              <TabsTrigger value="7d" className="text-xs px-2">7D</TabsTrigger>
              <TabsTrigger value="30d" className="text-xs px-2">30D</TabsTrigger>
              <TabsTrigger value="90d" className="text-xs px-2">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => value.slice(5)}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => `$${value}`}
              className="text-muted-foreground"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Balance']}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={COLORS.primary}
              strokeWidth={2}
              fill="url(#balanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Profit/Loss Bar Chart
interface PnLChartProps {
  data: PerformanceData[];
}

export const PnLChart: React.FC<PnLChartProps> = ({ data }) => {
  const chartData = useMemo(() => 
    data.map(d => ({
      ...d,
      net: d.profit - d.loss,
    })),
    [data]
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily P&L</CardTitle>
        <CardDescription>Profit and loss by day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }} 
              tickFormatter={(value) => value.slice(8)}
            />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`,
                name === 'profit' ? 'Profit' : name === 'loss' ? 'Loss' : 'Net'
              ]}
            />
            <Legend />
            <Bar dataKey="profit" fill={COLORS.success} radius={[4, 4, 0, 0]} />
            <Bar dataKey="loss" fill={COLORS.danger} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Win Rate Radial Chart
interface WinRateChartProps {
  winRate: number;
  totalTrades: number;
}

export const WinRateChart: React.FC<WinRateChartProps> = ({ winRate, totalTrades }) => {
  const data = [
    { name: 'Win Rate', value: winRate, fill: COLORS.success },
    { name: 'Loss Rate', value: 100 - winRate, fill: COLORS.danger },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Win Rate</CardTitle>
        <CardDescription>{totalTrades} total trades</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            barSize={20}
            data={[data[0]]}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background={{ fill: 'hsl(var(--muted))' }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="text-center -mt-16">
          <span className="text-4xl font-bold text-foreground">{winRate}%</span>
          <p className="text-sm text-muted-foreground">Win Rate</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Asset Distribution Pie Chart
interface AssetDistributionProps {
  data: ChartDataPoint[];
}

export const AssetDistribution: React.FC<AssetDistributionProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Asset Distribution</CardTitle>
        <CardDescription>Trades by asset</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Share']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Trade Results Donut Chart
interface TradeResultsProps {
  data: ChartDataPoint[];
}

export const TradeResults: React.FC<TradeResultsProps> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trade Results</CardTitle>
        <CardDescription>Win/Loss distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.name === 'Won' ? COLORS.success : 
                    entry.name === 'Lost' ? COLORS.danger : 
                    COLORS.warning
                  } 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {data.map((entry, index) => (
            <div key={index} className="text-center">
              <Badge 
                variant="outline" 
                className={
                  entry.name === 'Won' ? 'border-green-500 text-green-600' : 
                  entry.name === 'Lost' ? 'border-red-500 text-red-600' : 
                  'border-yellow-500 text-yellow-600'
                }
              >
                {entry.name}: {Math.round((entry.value / total) * 100)}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Asset Performance Table/Chart
interface AssetPerformanceChartProps {
  data: AssetPerformance[];
}

export const AssetPerformanceChart: React.FC<AssetPerformanceChartProps> = ({ data }) => {
  const sortedData = useMemo(() => 
    [...data].sort((a, b) => b.pnl - a.pnl).slice(0, 8),
    [data]
  );

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Asset Performance</CardTitle>
        <CardDescription>P&L by trading asset</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" tickFormatter={(value) => `$${value}`} />
            <YAxis type="category" dataKey="asset" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number, name: string) => [
                name === 'pnl' ? `$${value.toFixed(2)}` : `${value}%`,
                name === 'pnl' ? 'P&L' : 'Win Rate'
              ]}
            />
            <Bar 
              dataKey="pnl" 
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? COLORS.success : COLORS.danger} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Combined Line Chart for Multiple Metrics
interface MultiLineChartProps {
  data: PerformanceData[];
}

export const MultiLineChart: React.FC<MultiLineChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Trends</CardTitle>
        <CardDescription>Profit, loss, and trade count over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }} 
              tickFormatter={(value) => value.slice(8)}
            />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={COLORS.success}
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="loss"
              stroke={COLORS.danger}
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="trades"
              stroke={COLORS.primary}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default {
  ProfitChart,
  WinRateRadialChart,
  AssetsBarChart,
  BalanceChart,
  PnLChart,
  WinRateChart,
  AssetDistribution,
  TradeResults,
  AssetPerformanceChart,
  MultiLineChart,
};
