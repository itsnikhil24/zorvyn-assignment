import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const BalanceTrendChart = ({ data, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="bg-white dark:bg-[#13131a] p-6 rounded-xl border border-gray-200 dark:border-[#22222a] lg:col-span-2 transition-colors duration-300">
      <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Balance Trend</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Running balance over time</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#22222a" : "#e5e7eb"}
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke={isDark ? "#6b7280" : "#9ca3af"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }
            />

            <YAxis
              stroke={isDark ? "#6b7280" : "#9ca3af"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={5}
              tickFormatter={(val) => `$${val}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#13131a' : '#ffffff',
                borderColor: isDark ? '#22222a' : '#e5e7eb',
                color: isDark ? '#f3f4f6' : '#111827',
                borderRadius: '8px'
              }}
              labelFormatter={(date) =>
                new Date(date).toLocaleDateString()
              }
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#8b5cf6', stroke: isDark ? '#13131a' : '#ffffff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrendChart;