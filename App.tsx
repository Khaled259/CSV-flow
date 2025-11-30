import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { PreviewTable } from './components/PreviewTable';
import { Stats } from './components/Stats';
import { parseCsvPreview, downloadCsv, CsvStats } from './utils/csv';

const App: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Memoize stats calculation to avoid re-parsing on every keystroke if not needed, 
  // though for text inputs usually we want live updates. 
  // We'll debounce this effectively by only calculating when content changes.
  const stats: CsvStats = useMemo(() => {
    return parseCsvPreview(content);
  }, [content]);

  const handleDownload = (filename: string) => {
    downloadCsv(content, filename);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all content?')) {
      setContent('');
      setActiveTab('editor');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 pb-20">
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        <Stats stats={stats} />

        <Toolbar 
          onDownload={handleDownload}
          onCopy={handleCopy}
          onClear={handleClear}
          hasContent={content.length > 0}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'editor' ? (
            <Editor content={content} onChange={setContent} />
          ) : (
            <PreviewTable data={stats.preview} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;