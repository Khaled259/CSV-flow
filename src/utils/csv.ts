export interface CsvStats {
  rows: number;
  cols: number;
  preview: string[][];
}

/**
 * A simple CSV parser for preview purposes.
 * It handles basic comma separation and quoted fields roughly.
 * For robust parsing in a production app, a library like PapaParse is recommended,
 * but this suffices for a simple preview/stats view.
 */
export const parseCsvPreview = (content: string, previewRows = 20): CsvStats => {
  if (!content.trim()) {
    return { rows: 0, cols: 0, preview: [] };
  }

  // Split by newline, handling basic CRLF
  const lines = content.split(/\r?\n/);
  const rows = lines.length;
  
  // Parse first few lines for preview to avoid performance hits on massive pastes
  const previewData: string[][] = [];
  let cols = 0;

  const limit = Math.min(lines.length, previewRows);

  for (let i = 0; i < limit; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Simple regex to match CSV values including quoted strings containing commas
    const regex = /(?:^|,)(\s*(?:"([^"]*(?:""[^"]*)*)"|([^,]*))\s*)/g;
    const row: string[] = [];
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      // Group 2 is quoted value, Group 3 is unquoted value
      let value = match[2] ? match[2].replace(/""/g, '"') : match[3];
      row.push(value || '');
    }
    
    if (row.length > 0) {
      previewData.push(row);
      cols = Math.max(cols, row.length);
    }
  }

  return {
    rows,
    cols,
    preview: previewData,
  };
};

export const downloadCsv = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const finalFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  
  link.href = url;
  link.setAttribute('download', finalFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};