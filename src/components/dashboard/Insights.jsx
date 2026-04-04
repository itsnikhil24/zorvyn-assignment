import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Trophy, TrendingDown, TrendingUp, Lightbulb } from 'lucide-react';

const Insights = ({ transactions = [], theme = 'dark' }) => {
  const isDark = theme === 'dark';

  // Process the raw transactions data into chart-friendly formats
  const { 
    topCategories, 
    monthlyData, 
    observations,
    currentMonthExpense,
    lastMonthExpense
  } = useMemo(() => {
    
    // --- 1. Top Spending Categories ---
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = {};
    expenses.forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    
    const colors = ['#10b981', '#f43f5e', '#3b82f6', '#a855f7', '#f59e0b'];
    const topCategories = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5) // Top 5 categories
      .map((cat, idx) => ({ ...cat, color: colors[idx % colors.length] }));

    // --- 2. Monthly Comparison Data ---
    const monthMap = {};
    transactions.forEach(t => {
      const month = t.date.substring(0, 7); // Extract YYYY-MM
      if (!monthMap[month]) monthMap[month] = { name: month, income: 0, expense: 0 };
      if (t.type === 'income') monthMap[month].income += t.amount;
      if (t.type === 'expense') monthMap[month].expense += t.amount;
    });

    // Sort chronologically and grab up to the last 6 months
    const monthlyData = Object.values(monthMap)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(-6);

    // --- 3. Dynamic Observations ---
    const highestCategory = topCategories.length > 0 ? topCategories[0] : null;
    const incomeSourcesCount = transactions.filter(t => t.type === 'income').length;
    
    let currentExp = 0;
    let lastExp = 0;
    let expenseTrend = { diff: 0, text: "Not enough data to compare expenses.", isDown: true };

    if (monthlyData.length >= 2) {
      currentExp = monthlyData[monthlyData.length - 1].expense;
      lastExp = monthlyData[monthlyData.length - 2].expense;
      const diff = lastExp - currentExp; // Positive if expenses went down
      
      if (diff > 0) {
        expenseTrend = { diff, text: `Expenses decreased by $${diff.toFixed(0)} compared to last month.`, isDown: true };
      } else if (diff < 0) {
        expenseTrend = { diff: Math.abs(diff), text: `Expenses increased by $${Math.abs(diff).toFixed(0)} compared to last month.`, isDown: false };
      } else {
        expenseTrend = { diff: 0, text: "Expenses were exactly the same as last month.", isDown: true };
      }
    } else if (monthlyData.length === 1) {
      currentExp = monthlyData[0].expense;
    }

    return { 
      topCategories, 
      monthlyData, 
      currentMonthExpense: currentExp,
      lastMonthExpense: lastExp,
      observations: {
        highestCategory,
        incomeSourcesCount,
        expenseTrend
      }
    };
  }, [transactions]);

  const maxCategoryValue = topCategories.length > 0 ? topCategories[0].value : 1;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Spending Categories */}
        <div className="bg-white dark:bg-[#13131a] p-6 rounded-xl border border-gray-200 dark:border-[#22222a] transition-colors duration-300">
          <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Top Spending Categories</h4>
          <div className="space-y-5">
            {topCategories.length === 0 ? (
              <p className="text-sm text-gray-500">No expenses recorded yet.</p>
            ) : (
              topCategories.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">{cat.name}</span>
                    <span className="font-medium text-emerald-500 dark:text-emerald-400">${cat.value.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-[#1a1a24] rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${(cat.value / maxCategoryValue) * 100}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white dark:bg-[#13131a] p-6 rounded-xl border border-gray-200 dark:border-[#22222a] transition-colors duration-300">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Comparison</h4>
          <div className="flex gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase">This Month</p>
              <p className="text-xl font-bold text-red-500 dark:text-red-400">${currentMonthExpense.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Last Month</p>
              <p className="text-xl font-bold text-gray-400 dark:text-gray-300">${lastMonthExpense.toFixed(0)}</p>
            </div>
          </div>
          <div className="h-48">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData.slice(-4)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#22222a" : "#e5e7eb"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12}} tickFormatter={(val) => val.split('-')[1]} />
                  <RechartsTooltip 
                    cursor={{fill: isDark ? '#1a1a24' : '#f3f4f6'}} 
                    contentStyle={{backgroundColor: isDark ? '#13131a' : '#ffffff', border: `1px solid ${isDark ? '#22222a' : '#e5e7eb'}`, borderRadius: '8px', color: isDark ? '#f3f4f6' : '#111827'}} 
                  />
                  <Bar dataKey="income" fill="#10b981" radius={[2, 2, 0, 0]} barSize={12} />
                  <Bar dataKey="expense" fill="#f43f5e" radius={[2, 2, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-full flex items-center justify-center text-gray-500 text-sm">No data available</div>
            )}
          </div>
        </div>

        {/* Observations */}
        <div className="bg-white dark:bg-[#13131a] p-6 rounded-xl border border-gray-200 dark:border-[#22222a] flex flex-col gap-4 transition-colors duration-300">
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Observations</h4>
          
          {observations.highestCategory && (
            <div className="bg-gray-50 dark:bg-[#1a1a24] p-4 rounded-lg border border-gray-200 dark:border-[#22222a] flex gap-3 items-start transition-colors duration-300">
              <Trophy className="text-yellow-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-bold text-gray-900 dark:text-white">{observations.highestCategory.name}</span> is your highest spending category at <span className="font-bold text-gray-900 dark:text-white">${observations.highestCategory.value.toFixed(0)}</span> total.
              </p>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-[#1a1a24] p-4 rounded-lg border border-gray-200 dark:border-[#22222a] flex gap-3 items-start transition-colors duration-300">
            {observations.expenseTrend.isDown ? (
              <TrendingDown className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
            ) : (
              <TrendingUp className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" size={18} />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300">{observations.expenseTrend.text}</p>
          </div>

          <div className="bg-gray-50 dark:bg-[#1a1a24] p-4 rounded-lg border border-gray-200 dark:border-[#22222a] flex gap-3 items-start transition-colors duration-300">
            <Lightbulb className="text-amber-500 dark:text-amber-200 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You have <span className="font-bold text-gray-900 dark:text-white">{observations.incomeSourcesCount}</span> income records across all time.
            </p>
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="bg-white dark:bg-[#13131a] p-6 rounded-xl border border-gray-200 dark:border-[#22222a] transition-colors duration-300">
        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Income vs Expenses — Monthly</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">6-month timeline view</p>
        
        {/* Custom Legend */}
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-sm border-2 border-[#10b981] bg-[#10b981]/20"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-sm border-2 border-[#f43f5e] bg-[#f43f5e]/20"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Expenses</span>
          </div>
        </div>

        <div className="h-72">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#22222a" : "#e5e7eb"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                <RechartsTooltip contentStyle={{backgroundColor: isDark ? '#13131a' : '#ffffff', border: `1px solid ${isDark ? '#22222a' : '#e5e7eb'}`, borderRadius: '8px', color: isDark ? '#f3f4f6' : '#111827'}} />
                
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" dot={{ r: 4, fill: isDark ? '#13131a' : '#ffffff', stroke: '#f43f5e', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" dot={{ r: 4, fill: isDark ? '#13131a' : '#ffffff', stroke: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">No timeline data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;