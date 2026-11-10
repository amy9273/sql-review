import React, { useState } from 'react';
import { executeQuery, resetDatabase, type QueryResult } from '../lib/sqliteEngine';
import { SqlEditor } from './SqlEditor';
import { Terminal, Play, RotateCcw, Download, Sparkles } from 'lucide-react';

interface PlaygroundProps {
  initialSql?: string;
}

const TEMPLATES = [
  {
    title: 'Regional Revenue Aggregation',
    sql: `-- Calculate revenue metrics grouped by region
SELECT 
    region,
    COUNT(*) AS total_orders,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    ROUND(AVG(sale_amount), 2) AS avg_order_amount
FROM sales
GROUP BY region
ORDER BY total_revenue DESC;`,
  },
  {
    title: 'Window Function: Department Ranking',
    sql: `-- Window Functions: Rank employees within each department
SELECT 
    name,
    department_id,
    salary,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank_in_dept
FROM employees;`,
  },
  {
    title: 'Multi-Step CTE Pipeline',
    sql: `-- Multi-stage aggregation with CTE
WITH customer_spending AS (
    SELECT 
        customer_id,
        COUNT(*) AS order_count,
        ROUND(SUM(sale_amount), 2) AS total_spent
    FROM sales
    GROUP BY customer_id
)
SELECT 
    c.first_name || ' ' || c.last_name AS full_name,
    c.city,
    COALESCE(cs.order_count, 0) AS total_orders,
    COALESCE(cs.total_spent, 0.00) AS total_spent
FROM customers c
LEFT JOIN customer_spending cs ON c.customer_id = cs.customer_id
ORDER BY total_spent DESC;`,
  },
  {
    title: 'Data Cleaning: Missing Emails Audit',
    sql: `-- Identify missing data and empty strings across customer contacts
SELECT 
    customer_id,
    first_name,
    last_name,
    CASE 
        WHEN email IS NULL THEN 'MISSING (NULL)'
        WHEN TRIM(email) = '' THEN 'BLANK STRING'
        ELSE 'VALID EMAIL'
    END AS email_status
FROM customers;`,
  },
];

export const Playground: React.FC<PlaygroundProps> = ({ initialSql }) => {
  const [sql, setSql] = useState<string>(
    initialSql ||
      `-- Free SQL Playground (Connected to SQLite 3 in WebAssembly)
-- Write any query, JOIN, CTE, or Window function below:

SELECT 
    region,
    COUNT(*) AS total_orders,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    ROUND(AVG(sale_amount), 2) AS avg_sale
FROM sales
GROUP BY region
ORDER BY total_revenue DESC;`
  );

  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const handleRunQuery = async () => {
    setIsRunning(true);
    const res = await executeQuery(sql);
    setResult(res);
    setIsRunning(false);
  };

  const handleResetDb = async () => {
    if (confirm('Are you sure you want to re-seed the in-memory database to default?')) {
      setIsResetting(true);
      await resetDatabase();
      setIsResetting(false);
      handleRunQuery();
    }
  };

  const exportAsCsv = () => {
    if (!result || result.values.length === 0) return;
    const header = result.columns.join(',');
    const rows = result.values.map((row) =>
      row
        .map((cell) => {
          if (cell === null) return '';
          const str = String(cell);
          return str.includes(',') ? `"${str}"` : str;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sql_query_result.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border-light rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border-light">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Interactive Console
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-brand-600" />
              SQL Playground
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Write and execute custom SQL statements against the pre-seeded SQLite database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDb}
              disabled={isResetting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs text-slate-600 hover:text-slate-900 border border-slate-300 shadow-xs transition-colors"
              title="Reset in-memory database"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isResetting ? 'Resetting...' : 'Reset Seed Data'}</span>
            </button>
          </div>
        </div>

        {/* Quick Query Templates */}
        <div className="my-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1 text-xs flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Presets:
          </span>
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => setSql(tmpl.sql)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors whitespace-nowrap text-xs font-medium"
            >
              {tmpl.title}
            </button>
          ))}
        </div>

        {/* SQL Editor Area with Tab, quote auto-wrap, and autocomplete */}
        <div className="space-y-3">
          <SqlEditor
            value={sql}
            onChange={setSql}
            onRun={handleRunQuery}
            rows={12}
            placeholder="-- Write your SQL query here..."
          />

          <div className="flex items-center justify-end pt-1">

            <div className="flex items-center gap-3">
              {result && result.values.length > 0 && (
                <button
                  onClick={exportAsCsv}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              )}

              <button
                onClick={handleRunQuery}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Running...' : 'Execute Query'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output Table */}
        {result && (
          <div className="mt-6 pt-5 border-t border-border-light space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
              <span>Execution Time: <strong className="text-slate-900 font-mono">{result.executionTimeMs} ms</strong></span>
              <span>Returned: <strong className="text-slate-900 font-mono">{result.values.length} rows</strong></span>
            </div>

            {result.error ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                {result.error}
              </div>
            ) : result.values.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                Query executed successfully. 0 rows returned.
              </div>
            ) : (
              <div className="max-h-96 overflow-auto rounded-xl border border-border-light bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-border-light">
                    <tr>
                      {result.columns.map((col, i) => (
                        <th key={i} className="p-3 font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {result.values.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="p-3 text-slate-800">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};
