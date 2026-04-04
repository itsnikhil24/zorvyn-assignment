import React from 'react';
import { Moon, Plus } from 'lucide-react';

const TopBar = ({ activeTab, role, setRole }) => {
  return (
    <header className="h-16 border-b border-[#22222a] bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
      <h1 className="text-xl font-bold capitalize text-white">{activeTab}</h1>
      
      <div className="flex items-center gap-3">
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="bg-[#13131a] border border-[#22222a] rounded-full px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-[#8b5cf6] appearance-none cursor-pointer hidden sm:block"
        >
          <option value="admin">Admin View</option>
          <option value="viewer">Viewer View</option>
        </select>

        <button className="p-2 border border-[#22222a] rounded-full hover:bg-[#13131a] transition-colors text-gray-300">
          <Moon size={16} />
        </button>

        {role === 'admin' && (
          <button className="flex items-center gap-1.5 bg-[#8b5cf6] hover:bg-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-[#8b5cf6]/20">
            <Plus size={16} /> Add
          </button>
        )}
      </div>
    </header>
  );
};

export default TopBar;