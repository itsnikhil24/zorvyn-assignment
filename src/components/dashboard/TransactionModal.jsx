import React, { useState } from 'react';
import { X } from 'lucide-react';

const TransactionModal = ({ onClose, onSave, editingTransaction }) => {
  // Initialize state directly! Because this component will mount fresh every time it opens, 
  // we don't need a useEffect to watch for changes.
  const [formData, setFormData] = useState(() => {
    if (editingTransaction) {
      return {
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        date: editingTransaction.date,
        type: editingTransaction.type,
        category: editingTransaction.category
      };
    }
    return {
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      category: 'Shopping'
    };
  });

  const categories = ['Housing', 'Food & Dining', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Utilities', 'Salary', 'Freelance', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount) // Ensure amount is passed back as a number
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#13131a] w-full max-w-md rounded-2xl border border-gray-200 dark:border-[#22222a] shadow-2xl overflow-hidden transition-colors duration-200">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-[#22222a] transition-colors duration-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input 
              required
              type="text" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Groceries, Rent, Salary..."
              className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8b5cf6] text-gray-900 dark:text-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  min="0"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#22222a] rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#8b5cf6] text-gray-900 dark:text-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input 
                required
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8b5cf6] text-gray-900 dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8b5cf6] text-gray-900 dark:text-white transition-colors cursor-pointer"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#22222a] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8b5cf6] text-gray-900 dark:text-white transition-colors cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-200 dark:border-[#22222a] transition-colors duration-200">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a24] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#8b5cf6] hover:bg-violet-600 transition-colors shadow-lg shadow-[#8b5cf6]/20"
            >
              {editingTransaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;