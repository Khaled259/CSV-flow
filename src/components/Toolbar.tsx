import React, { useState } from 'react';
import { Download, Copy, Trash2, Check, FileType } from 'lucide-react';

interface ToolbarProps {
  onDownload: (filename: string) => void;
  onCopy: () => void;
  onClear: () => void;
  hasContent: boolean;
  activeTab: 'editor' | 'preview';
  setActiveTab: (tab: 'editor' | 'preview') => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ 
  onDownload, 
  onCopy, 
  onClear, 
  hasContent,
  activeTab,
  setActiveTab
}) => {
  const [filename, setFilename] = useState('data');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky top-4 z-20 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl mb-6">
      
      {/* View Toggle */}
      <div className="flex p-1 bg-slate-900/50 rounded-lg border border-white/5">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'editor' 
              ? 'bg-slate-700 text-white shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          disabled={!hasContent}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'preview' 
              ? 'bg-slate-700 text-white shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          Table Preview
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="flex-1 md:flex-initial relative group">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Filename"
            className="w-full md:w-40 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-500"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-xs text-slate-500">.csv</span>
          </div>
        </div>

        <button
          onClick={() => onDownload(filename || 'data')}
          disabled={!hasContent}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Download className="w-4 h-4" />
          Download
        </button>

        <div className="h-6 w-px bg-slate-700 hidden md:block mx-1"></div>

        <button
          onClick={handleCopy}
          disabled={!hasContent}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors disabled:opacity-30"
          title="Copy to Clipboard"
        >
          {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
        </button>

        <button
          onClick={onClear}
          disabled={!hasContent}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30"
          title="Clear All"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};