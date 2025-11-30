import React from 'react';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col group">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none rounded-xl" />
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your CSV content here...&#10;e.g.&#10;Name, Age, City&#10;John Doe, 30, New York&#10;Jane Smith, 25, London"
        className="w-full h-full min-h-[500px] p-6 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none shadow-inner placeholder-slate-600"
        spellCheck={false}
      />
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">
          Editable Raw Text
        </span>
      </div>
    </div>
  );
};