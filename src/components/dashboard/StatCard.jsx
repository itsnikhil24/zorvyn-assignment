import React from 'react';

const StatCard = ({ title, amount, subtitle, icon, trendColor }) => {
  return (
    <div className="bg-[#13131a] p-5 rounded-xl border border-[#22222a]">
      <p className="text-gray-400 text-sm font-medium mb-1 uppercase">{title}</p>
      <h3 className={`text-2xl font-bold ${title.includes('Income') ? 'text-emerald-400' : title.includes('Expenses') ? 'text-red-400' : title.includes('Transactions') ? 'text-blue-400' : 'text-white'}`}>
        {amount}
      </h3>
      <p className={`text-sm mt-2 flex items-center ${trendColor}`}>
        {icon && <span className="mr-1">{icon}</span>}
        {subtitle}
      </p>
    </div>
  );
};

export default StatCard;