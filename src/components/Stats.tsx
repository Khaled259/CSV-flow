import React from 'react';
import { Database, LayoutGrid } from 'lucide-react';
import { CsvStats } from '../utils/csv';

interface StatsProps {
  stats: CsvStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Database className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Rows</p>
          <p className="text-xl font-bold text-white">{stats.rows.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <LayoutGrid className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Columns (Est.)</p>
          <p className="text-xl font-bold text-white">{stats.cols.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};