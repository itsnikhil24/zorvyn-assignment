import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingBreakdownChart = ({ data }) => {
  return (
    <div className="bg-[#13131a] p-6 rounded-xl border border-[#22222a]">
      <h4 className="text-lg font-semibold mb-1">Spending by Category</h4>
      <p className="text-sm text-gray-400 mb-6">Current month breakdown</p>
      <div className="h-48 relative flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#13131a', borderColor: '#22222a' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
            <span className="text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;