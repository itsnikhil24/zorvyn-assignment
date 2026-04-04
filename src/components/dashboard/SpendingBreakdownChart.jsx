import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingBreakdownChart = ({ data, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="bg-white dark:bg-[#13131a] p-6 rounded-xl border border-gray-200 dark:border-[#22222a] transition-colors duration-300">
      <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Spending by Category</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Current month breakdown</p>
      <div className="h-48 relative flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#13131a' : '#ffffff', 
                borderColor: isDark ? '#22222a' : '#e5e7eb',
                color: isDark ? '#f3f4f6' : '#111827',
                borderRadius: '8px'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
            <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;