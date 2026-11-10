import React, { useState } from 'react';
import { SEED_CSVS } from '../lib/pythonEngine';
import { FileSpreadsheet, Copy, Check, Table } from 'lucide-react';

interface PythonDatasetViewerProps {
  initialSelectedCsv?: string;
}

export const PythonDatasetViewer: React.FC<PythonDatasetViewerProps> = ({ initialSelectedCsv }) => {
  const filenames = Object.keys(SEED_CSVS);
  const [selectedFilename, setSelectedFilename] = useState<string>(
    initialSelectedCsv || filenames[0]
  );
  const [copied, setCopied] = useState(false);

  const rawContent = SEED_CSVS[selectedFilename as keyof typeof SEED_CSVS] || '';
  const lines = rawContent.trim().split('\n');
  const headers = lines[0]?.split(',') || [];
  const rows = lines.slice(1).map((l) => l.split(','));

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(`import pandas as pd\ndf = pd.read_csv('${selectedFilename}')\nprint(df.head())`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* CSV Dataset Selector Sidebar */}
      <div className="lg:col-span-4 bg-white border border-border-light rounded-2xl p-5 shadow-xs">
        <div className="pb-4 mb-4 border-b border-border-light">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Python CSV Datasets ({filenames.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-mounted into Pyodide virtual filesystem for instant pandas loading
          </p>
        </div>

        <div className="space-y-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
          {filenames.map((fname) => {
            const active = fname === selectedFilename;
            const rowCount = SEED_CSVS[fname as keyof typeof SEED_CSVS].trim().split('\n').length - 1;

            return (
              <button
                key={fname}
                onClick={() => setSelectedFilename(fname)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border text-xs ${
                  active
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="font-mono text-xs">{fname}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{rowCount} rows</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dataset Details & Preview */}
      <div className="lg:col-span-8 bg-white border border-border-light rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-light">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                {selectedFilename}
              </span>
              <span className="text-xs text-slate-500">
                {rows.length} rows • {headers.length} columns
              </span>
            </div>
          </div>

          <button
            onClick={handleCopySnippet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied code!' : 'Copy pd.read_csv() snippet'}</span>
          </button>
        </div>

        {/* Python Snippet Box */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-1">
            Usage in Python:
          </span>
          <code>import pandas as pd</code>
          <br />
          <code>df = pd.read_csv('{selectedFilename}')</code>
        </div>

        {/* Formatted Data Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Table className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dataset Records</span>
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="p-2.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-slate-700 whitespace-nowrap">
                        {cell === '' ? (
                          <span className="text-amber-600 italic font-semibold">NaN</span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
