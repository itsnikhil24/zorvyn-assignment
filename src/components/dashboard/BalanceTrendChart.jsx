import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceTrendChart = ({ data }) => {
  return (
    <div className="bg-[#13131a] p-6 rounded-xl border border-[#22222a] lg:col-span-2">
      <h4 className="text-lg font-semibold mb-1">Balance Trend</h4>
      <p className="text-sm text-gray-400 mb-6">Running balance over time</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#22222a" vertical={false} />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip contentStyle={{ backgroundColor: '#13131a', borderColor: '#22222a' }} />
            <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrendChart;