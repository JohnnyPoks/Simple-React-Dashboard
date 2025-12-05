import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { ChartDataPoint } from '../../store/types';

interface ChartsProps {
  lineData: ChartDataPoint[];
  pieData: ChartDataPoint[];
  donutData: ChartDataPoint[];
}

const Charts: React.FC<ChartsProps> = ({ lineData, pieData, donutData }) => {
  const COLORS = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd'];
  const PIE_COLORS = ['#22c55e', '#86efac', '#dcfce7'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Line Chart - Development Activity */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Development Activity</h3>
          <div className="flex items-center mt-2">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Purchases</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart title</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ value }) => `${value.toFixed(1)}%`}
            >
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart title</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ value }) => `${value.toFixed(1)}%`}
            >
              {donutData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Placeholder Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">New feedback</p>
          <p className="text-sm text-gray-500">No new feedback available</p>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">Today profit</p>
          <p className="text-sm text-gray-500">Loading profit data...</p>
        </div>
      </div>
    </div>
  );
};

export default Charts;
