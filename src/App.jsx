import React, { useState, useMemo } from 'react';
import { LayoutDashboard, ArrowLeftRight, PieChart, TrendingUp, TrendingDown } from 'lucide-react';
import TopBar from './components/dashboard/TopBar';
import StatCard from './components/dashboard/StatCard';
import BalanceTrendChart from './components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from './components/dashboard/SpendingBreakdownChart';
import TransactionTable from './components/dashboard/TransactionsTable';
import Insights from './components/dashboard/Insights';
import TransactionModal from './components/dashboard/TransactionModal';

import { initialTransactions } from './data/dashboardData';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('overview');
  const [role, setRole] = useState('admin');
  const [transactions, setTransactions] = useState(initialTransactions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const deleteTransaction = (id) => {
    if (role === 'admin') {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    if (role !== 'admin') return;
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction) => {
    if (role !== 'admin') return;
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (formData) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t =>
        t.id === editingTransaction.id ? { ...formData, id: t.id } : t
      ));
    } else {
      const newTransaction = { ...formData, id: Date.now() };
      setTransactions([newTransaction, ...transactions]);
    }
  };

  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    dynamicBalanceTrend,
    dynamicCategoryData
  } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let runningBalance = 0;

    const trendMap = {};
    const categoryMap = {};

    const sortedTxns = [...transactions].sort((a, b) => a.date.localeCompare(b.date));

    sortedTxns.forEach(t => {
      if (t.type === 'income') {
        income += t.amount;
        runningBalance += t.amount;
      } else {
        expenses += t.amount;
        runningBalance -= t.amount;
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      }

      const shortDate = t.date.substring(5);
      trendMap[shortDate] = runningBalance;
    });

    const trendData = Object.entries(trendMap).map(([date, balance]) => ({ date, balance }));

    const colors = ['#10b981', '#f43f5e', '#3b82f6', '#a855f7', '#f59e0b'];
    const categoryData = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value], idx) => ({ name, value, color: colors[idx % colors.length] }));

    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: runningBalance,
      dynamicBalanceTrend: trendData,
      dynamicCategoryData: categoryData
    };
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Balance" amount={formatCurrency(totalBalance)} subtitle="Current net balance" icon={totalBalance >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} trendColor={totalBalance >= 0 ? "text-emerald-500" : "text-red-500"} />
            <StatCard title="Total Income" amount={formatCurrency(totalIncome)} subtitle="All time recorded" icon={<TrendingUp size={14} />} trendColor="text-emerald-500" />
            <StatCard title="Total Expenses" amount={formatCurrency(totalExpenses)} subtitle="All time recorded" icon={<TrendingDown size={14} />} trendColor="text-red-500" />
            <StatCard title="Transactions" amount={transactions.length} subtitle="Total records" trendColor="text-emerald-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BalanceTrendChart data={dynamicBalanceTrend} theme={theme} />
            <SpendingBreakdownChart data={dynamicCategoryData} theme={theme} />
          </div>

          <TransactionTable
            transactions={transactions}
            role={role}
            deleteTransaction={deleteTransaction}
            onEditClick={handleOpenEditModal}
            isOverview={true}
            onViewAll={() => setActiveTab('transactions')}
          />
        </div>
      );
    }

    if (activeTab === 'transactions') {
      return (
        <TransactionTable
          transactions={transactions}
          role={role}
          deleteTransaction={deleteTransaction}
          onEditClick={handleOpenEditModal}
          isOverview={false}
        />
      );
    }

    if (activeTab === 'insights') {
      return <Insights transactions={transactions} theme={theme} />;
    }
  };

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <div className="flex h-screen bg-gray-100 dark:bg-[#0a0a0f] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
        <aside className="w-64 border-r border-gray-200 dark:border-[#22222a] bg-white dark:bg-[#0a0a0f] flex flex-col hidden md:flex transition-colors duration-200">
          <div className="h-16 flex items-center px-6">
            <div className="flex items-center gap-2">
              <img
                src="./src/assets/logo.png"   
                alt="Zorvyn Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          <div className="px-4 py-6 flex-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-4 px-2 tracking-wider">MENU</p>
            <nav className="space-y-1">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-gray-100 dark:bg-[#1a1a24] text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#13131a]'}`}>
                <LayoutDashboard size={18} /> Overview
              </button>
              <button onClick={() => setActiveTab('transactions')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'transactions' ? 'bg-gray-100 dark:bg-[#1a1a24] text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#13131a]'}`}>
                <ArrowLeftRight size={18} /> Transactions
              </button>
              <button onClick={() => setActiveTab('insights')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'insights' ? 'bg-gray-100 dark:bg-[#1a1a24] text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#13131a]'}`}>
                <PieChart size={18} /> Insights
              </button>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-[#22222a] transition-colors duration-200">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-[#13131a] rounded-full border border-gray-200 dark:border-[#22222a] w-max cursor-help transition-colors duration-200" title="Current Role">
              <div className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
              <span className="text-xs font-medium capitalize text-gray-600 dark:text-gray-300">{role}</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <TopBar
            activeTab={activeTab}
            role={role}
            setRole={setRole}
            theme={theme}
            toggleTheme={toggleTheme}
            onAddClick={handleOpenAddModal}
          />

          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      
      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTransaction}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  );
};

export default App;