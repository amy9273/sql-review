import React, { useState } from 'react';
import { SAMPLE_SCHEMAS } from '../data/curriculum';
import { executeQuery, type QueryResult } from '../lib/sqliteEngine';
import { Database, Table, Key, Play, Eye } from 'lucide-react';

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
      {/* Table List Sidebar */}
      <div className="lg:col-span-4 bg-surface-card border border-surface-border rounded-2xl p-4 shadow-xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-surface-muted flex items-center gap-2 pb-3 mb-3 border-b border-surface-border">
          <Database className="w-4 h-4 text-electric-lavender" />
          Available Schemas ({SAMPLE_SCHEMAS.length})
        </h2>

        <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {SAMPLE_SCHEMAS.map((schema) => {
            const active = schema.tableName === selectedTable;
            return (
              <button
                key={schema.tableName}
                onClick={() => {
                  setSelectedTable(schema.tableName);
                  setPreviewData(null);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                  active
                    ? 'bg-aubergine-light text-white border-royal-violet shadow-md'
                    : 'bg-surface-elevated/40 text-surface-muted hover:bg-surface-elevated hover:text-white border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Table className="w-4 h-4 text-electric-lavender" />
                  <span className="font-mono text-xs font-medium">{schema.tableName}</span>
                </div>
                <span className="text-[10px] font-mono text-surface-muted">
                  {schema.columns.length} cols
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schema Details & Sample Data */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-surface-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-royal-violet/30 text-lilac-pale border border-royal-violet/40">
                  SQLite In-Memory
                </span>
              </div>
              <h1 className="text-2xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                <Table className="w-5 h-5 text-electric-lavender" />
                {currentSchema.tableName}
              </h1>
              <p className="text-xs text-surface-muted mt-1">{currentSchema.description}</p>
            </div>

            <button
              onClick={() => handlePreviewTable(currentSchema.tableName)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-royal-violet hover:bg-royal-glow text-white text-xs font-semibold shadow-md shadow-royal-violet/20 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{loading ? 'Fetching...' : 'Preview Live Rows (Top 15)'}</span>
            </button>
          </div>

          {/* Column Definitions Table */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-muted mb-3">
              Column Specifications
            </h3>
            <div className="overflow-x-auto rounded-xl border border-surface-border">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-void/80 text-lilac-pale">
                  <tr>
                    <th className="p-3 border-b border-surface-border">Column</th>
                    <th className="p-3 border-b border-surface-border">Type</th>
                    <th className="p-3 border-b border-surface-border">Constraints & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {currentSchema.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-aubergine/40 transition-colors">
                      <td className="p-3 text-white font-semibold flex items-center gap-2">
                        {col.notes?.toLowerCase().includes('primary key') && (
                          <Key className="w-3.5 h-3.5 text-neon-amber flex-shrink-0" />
                        )}
                        <span>{col.name}</span>
                      </td>
                      <td className="p-3 text-electric-lavender">{col.type}</td>
                      <td className="p-3 text-surface-muted">
                        {col.notes || <span className="opacity-40">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Data Preview */}
          {previewData && (
            <div className="mt-8 pt-6 border-t border-surface-border">
              <div className="flex items-center justify-between pb-3 mb-3 text-xs">
                <span className="font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-neon-emerald fill-current" />
                  Live Table Snapshot ({previewData.values.length} records)
                </span>
                <span className="text-surface-muted font-mono">{previewData.executionTimeMs} ms</span>
              </div>

              <div className="max-h-80 overflow-auto rounded-xl border border-surface-border">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-void/90 text-lilac-pale sticky top-0">
                    <tr>
                      {previewData.columns.map((col, i) => (
                        <th key={i} className="p-2.5 border-b border-surface-border font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {previewData.values.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-aubergine/40 transition-colors">
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="p-2.5 text-slate-300">
                            {val === null ? (
                              <span className="text-neon-amber italic">NULL</span>
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
