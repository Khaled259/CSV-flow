import React from 'react';

interface PreviewTableProps {
  data: string[][];
}

export const PreviewTable: React.FC<PreviewTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-slate-900/50 border border-slate-700 border-dashed rounded-xl text-slate-500">
        <p>No valid data to preview.</p>
      </div>
    );
  }

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="w-full h-[500px] overflow-auto bg-slate-900 border border-slate-700 rounded-xl shadow-inner">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-sm">
          <tr>
            <th className="sticky left-0 w-12 p-3 text-xs font-mono text-slate-500 text-center border-b border-r border-slate-700 bg-slate-800">
              #
            </th>
            {headers.map((header, idx) => (
              <th 
                key={idx} 
                className="p-3 text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-r border-slate-700 min-w-[150px] whitespace-nowrap"
              >
                {header || `Column ${idx + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-800/30 transition-colors">
              <td className="sticky left-0 p-3 text-xs font-mono text-slate-600 text-center border-r border-slate-700 bg-slate-900">
                {rowIdx + 1}
              </td>
              {row.map((cell, cellIdx) => (
                <td 
                  key={cellIdx} 
                  className="p-3 text-sm text-slate-400 border-r border-slate-800/50 whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-[300px]"
                  title={cell}
                >
                  {cell}
                </td>
              ))}
              {/* Fill remaining cells if row is short */}
              {Array.from({ length: Math.max(0, headers.length - row.length) }).map((_, i) => (
                <td key={`empty-${i}`} className="border-r border-slate-800/50 bg-slate-900/20" />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-800">
        Showing first {data.length} rows. Download to see full file.
      </div>
    </div>
  );
};