import React, { useState, useMemo } from 'react';
import { Search, Download, Trash2, Edit2, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

const TransactionTable = ({ transactions, role, deleteTransaction, onEditClick, isOverview = false, onViewAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All types');
  const [filterCategory, setFilterCategory] = useState('All categories');
  const [filterMonth, setFilterMonth] = useState('All months');

  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const uniqueCategories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return ['All categories', ...Array.from(cats).sort()];
  }, [transactions]);

  const uniqueMonths = useMemo(() => {
    const months = new Set(transactions.map(t => t.date.substring(0, 7)));
    return ['All months', ...Array.from(months).sort().reverse()];
  }, [transactions]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const processedTransactions = useMemo(() => {
    let filtered = transactions;

    if (!isOverview) {
      filtered = transactions.filter(txn => {
        const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'All types' || txn.type === filterType.toLowerCase();
        const matchesCategory = filterCategory === 'All categories' || txn.category === filterCategory;
        const matchesMonth = filterMonth === 'All months' || txn.date.startsWith(filterMonth);

        return matchesSearch && matchesType && matchesCategory && matchesMonth;
      });
    } else {
      filtered = [...transactions];
    }

    return filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [transactions, isOverview, searchTerm, filterType, filterCategory, filterMonth, sortConfig]);

  const totalPages = Math.ceil(processedTransactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    if (isOverview) {
      return processedTransactions.slice(0, 5);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [processedTransactions, isOverview, currentPage]);

  return (
    <div className={`space-y-6 animate-fade-in ${isOverview ? 'bg-white dark:bg-[#13131a] rounded-xl border border-gray-200 dark:border-[#22222a] overflow-hidden' : ''} transition-colors duration-200`}>

      {!isOverview && (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-[#0a0a0f] p-1 transition-colors duration-200">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-white dark:bg-[#13131a] border border-gray-200 dark:border-[#22222a] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6] text-gray-900 dark:text-white transition-colors"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select
              className="bg-white dark:bg-[#13131a] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#8b5cf6] cursor-pointer transition-colors"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All types">All types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <select
              className="bg-white dark:bg-[#13131a] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#8b5cf6] cursor-pointer transition-colors"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="bg-white dark:bg-[#13131a] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#8b5cf6] cursor-pointer transition-colors"
              value={filterMonth}
              onChange={(e) => {
                setFilterMonth(e.target.value);
                setCurrentPage(1);
              }}
            >
              {uniqueMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <button className="flex items-center gap-2 bg-white dark:bg-[#13131a] border border-gray-200 dark:border-[#22222a] hover:bg-gray-50 dark:hover:bg-[#1a1a24] text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg text-sm transition-colors font-medium">
              <Download size={16} /> CSV
            </button>
          </div>
        </div>
      )}

      {isOverview && (
        <div className="p-5 border-b border-gray-200 dark:border-[#22222a] flex justify-between items-center transition-colors duration-200">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h4>
          <button
            onClick={onViewAll}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            View all →
          </button>
        </div>
      )}

      <div className={`${!isOverview ? 'bg-white dark:bg-[#13131a] rounded-xl border border-gray-200 dark:border-[#22222a] flex flex-col' : ''} overflow-x-auto transition-colors duration-200`}>
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-[#13131a] text-gray-500 dark:text-gray-400 text-xs uppercase border-b border-gray-200 dark:border-[#22222a] transition-colors duration-200">
            <tr>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1.5">
                  DATE <ArrowUpDown size={12} className="opacity-50 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('description')}>
                <div className="flex items-center gap-1.5">
                  DESCRIPTION <ArrowUpDown size={12} className="opacity-50 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-1.5">
                  CATEGORY <ArrowUpDown size={12} className="opacity-50 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('type')}>
                <div className="flex items-center gap-1.5">
                  TYPE <ArrowUpDown size={12} className="opacity-50 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-right cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1.5">
                  AMOUNT <ArrowUpDown size={12} className="opacity-50 group-hover:opacity-100" />
                </div>
              </th>
              {!isOverview && role === 'admin' && <th className="px-6 py-4 font-semibold text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' && !isOverview ? 6 : 5} className="text-center py-10 text-gray-500">
                  No transactions found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-200 dark:border-[#22222a] hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{txn.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{txn.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 dark:bg-[#1f1f2e] text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs border border-gray-200 dark:border-[#22222a] whitespace-nowrap transition-colors">
                      {txn.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${txn.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500' : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500'}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-medium whitespace-nowrap ${txn.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {txn.type === 'income' ? '+' : '-'}${txn.amount.toFixed(2)}
                  </td>
                  {!isOverview && role === 'admin' && (
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onEditClick && onEditClick(txn)}
                          className="p-1.5 bg-gray-100 dark:bg-[#1f1f2e] rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-[#22222a]"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(txn.id)}
                          className="p-1.5 bg-gray-100 dark:bg-[#1f1f2e] rounded text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-[#22222a]"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!isOverview && processedTransactions.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-[#22222a] bg-gray-50 dark:bg-[#13131a] mt-auto transition-colors duration-200">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-900 dark:text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, processedTransactions.length)}</span> of <span className="font-medium text-gray-900 dark:text-white">{processedTransactions.length}</span> results
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-white dark:bg-[#1f1f2e] text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#2a2a35] transition-colors border border-gray-200 dark:border-[#22222a]"
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <div className="px-2 text-sm text-gray-500 dark:text-gray-400">
                Page <span className="text-gray-900 dark:text-white">{currentPage}</span> of {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-white dark:bg-[#1f1f2e] text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#2a2a35] transition-colors border border-gray-200 dark:border-[#22222a]"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;