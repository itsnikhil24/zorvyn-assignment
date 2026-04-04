import React from 'react';
import { Moon, Sun, Plus } from 'lucide-react';

const TopBar = ({ activeTab, role, setRole, theme, toggleTheme, onAddClick }) => {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-[#22222a] bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 transition-colors duration-200">
      <h1 className="text-xl font-bold capitalize text-gray-900 dark:text-white">{activeTab}</h1>
      
      <div className="flex items-center gap-3">
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-50 dark:bg-[#13131a] border border-gray-200 dark:border-[#22222a] rounded-full px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6] appearance-none cursor-pointer hidden sm:block transition-colors"
        >
          <option value="admin">Admin View</option>
          <option value="viewer">Viewer View</option>
        </select>

        <button 
          onClick={toggleTheme}
          className="p-2 border border-gray-200 dark:border-[#22222a] rounded-full hover:bg-gray-100 dark:hover:bg-[#13131a] transition-colors text-gray-600 dark:text-gray-300"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {role === 'admin' && (
          <button onClick={onAddClick} className="flex items-center gap-1.5 bg-[#8b5cf6] hover:bg-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-[#8b5cf6]/20">
            <Plus size={16} /> Add
          </button>
        )}
      </div>
    </header>
  );
};

export default TopBar;