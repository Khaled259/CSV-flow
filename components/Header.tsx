import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-3 py-6 mb-4">
      <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
        <FileSpreadsheet className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          CSV Flow
        </h1>
        <p className="text-sm text-slate-400">
          Paste content, preview structure, and export to CSV.
        </p>
      </div>
    </header>
  );
};