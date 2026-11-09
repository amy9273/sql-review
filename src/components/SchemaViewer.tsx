import React, { useState } from 'react';
import { SAMPLE_SCHEMAS } from '../data/curriculum';
import { executeQuery, type QueryResult } from '../lib/sqliteEngine';
import { Database, Table, Key, Eye } from 'lucide-react';

interface SchemaViewerProps {
  initialSelectedTable?: string;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({ initialSelectedTable }) => {
  const [selectedTable, setSelectedTable] = useState<string>(
    initialSelectedTable || SAMPLE_SCHEMAS[0].tableName
  );
  const [previewData, setPreviewData] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const currentSchema =
    SAMPLE_SCHEMAS.find((s) => s.tableName === selectedTable) || SAMPLE_SCHEMAS[0];

  const handlePreviewTable = async (tableName: string) => {
    setLoading(true);
    const result = await executeQuery(`SELECT * FROM ${tableName} LIMIT 15;`);
    setPreviewData(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Table Selection Sidebar */}
      <div className="lg:col-span-4 bg-white border border-border-light rounded-2xl p-5 shadow-sm">
        <div className="pb-4 mb-4 border-b border-border-light">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-600" />
            Database Tables ({SAMPLE_SCHEMAS.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Click a table to inspect its schema and data</p>
        </div>

        <div className="space-y-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
          {SAMPLE_SCHEMAS.map((schema) => {
            const active = schema.tableName === selectedTable;
            return (
              <button
                key={schema.tableName}
                onClick={() => {
                  setSelectedTable(schema.tableName);
                  setPreviewData(null);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border text-xs ${
                  active
                    ? 'bg-brand-50 border-brand-200 text-brand-700 font-semibold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-slate-400" />
                  <span className="font-mono font-medium">{schema.tableName}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {schema.columns.length} columns
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Schema Specifications */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white border border-border-light rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border-light">
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                SQLite In-Memory
              </span>
              <h1 className="text-2xl font-bold font-mono text-slate-900 mt-2 tracking-tight flex items-center gap-2">
                <Table className="w-5 h-5 text-brand-600" />
                {currentSchema.tableName}
              </h1>
              <p className="text-sm text-slate-500 mt-1">{currentSchema.description}</p>
            </div>

            <button
              onClick={() => handlePreviewTable(currentSchema.tableName)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{loading ? 'Fetching...' : 'Preview Live Rows (Top 15)'}</span>
            </button>
          </div>

          {/* Columns Table */}
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Column Definitions
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border-light bg-white">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 text-slate-700 border-b border-border-light font-semibold">
                  <tr>
                    <th className="p-3">Column Name</th>
                    <th className="p-3">Data Type</th>
                    <th className="p-3">Constraints & Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {currentSchema.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-slate-900 font-semibold flex items-center gap-2">
                        {col.notes?.toLowerCase().includes('primary key') && (
                          <span title="Primary Key">
                            <Key className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          </span>
                        )}
                        <span>{col.name}</span>
                      </td>
                      <td className="p-3 text-brand-600 font-semibold">{col.type}</td>
                      <td className="p-3 text-slate-500 font-sans">{col.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Data Snapshot */}
          {previewData && (
            <div className="mt-8 pt-6 border-t border-border-light space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-bold text-slate-900 uppercase tracking-wider">
                  Live Snapshot ({previewData.values.length} records)
                </span>
                <span>Execution: <strong className="text-slate-900 font-mono">{previewData.executionTimeMs} ms</strong></span>
              </div>

              <div className="max-h-80 overflow-auto rounded-xl border border-border-light bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-border-light">
                    <tr>
                      {previewData.columns.map((col, i) => (
                        <th key={i} className="p-2.5 font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {previewData.values.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="p-2.5 text-slate-800">
                            {val === null ? (
                              <span className="text-amber-600 font-semibold italic">NULL</span>
                            ) : (
                              String(val)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
