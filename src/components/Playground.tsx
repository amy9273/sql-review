import React, { useState } from 'react';
import { executeQuery, resetDatabase, type QueryResult } from '../lib/sqliteEngine';
import { Terminal, Play, RotateCcw, Download, Sparkles } from 'lucide-react';

interface PlaygroundProps {
  initialSql?: string;
}

const TEMPLATES = [
  {
    title: 'Department Salary Windowing',
    sql: `-- Window Functions: Top earner per department using DENSE_RANK()
SELECT 
    name,
    department_id,
    salary,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_in_dept
FROM employees;`,
  },
  {
    title: 'Customer Sales Summary CTE',
    sql: `-- Multi-stage aggregation with CTE
WITH customer_spending AS (
    SELECT 
        customer_id,
        COUNT(*) as order_count,
        ROUND(SUM(sale_amount), 2) as total_spent
    FROM sales
    GROUP BY customer_id
)
SELECT 
    c.first_name || ' ' || c.last_name as full_name,
    c.city,
    COALESCE(cs.order_count, 0) as total_orders,
    COALESCE(cs.total_spent, 0.00) as total_spent
FROM customers c
LEFT JOIN customer_spending cs ON c.customer_id = cs.customer_id
ORDER BY total_spent DESC;`,
  },
  {
    title: 'Data Cleaning: Finding Missing or Dirty Records',
    sql: `-- Identify missing data and empty strings across customer contacts
SELECT 
    customer_id,
    first_name,
    last_name,
    CASE 
        WHEN email IS NULL THEN 'MISSING (NULL)'
        WHEN TRIM(email) = '' THEN 'BLANK STRING'
        ELSE 'VALID'
    END as email_status
FROM customers;`,
  },
  {
    title: 'Facebook Anti-Join (Unliked Pages)',
    sql: `-- Meta Interview: Unliked Pages
SELECT 
    p.page_id,
    p.page_name
FROM pages p
LEFT JOIN page_likes l ON p.page_id = l.page_id
WHERE l.page_id IS NULL;`,
  },
];

export const Playground: React.FC<PlaygroundProps> = ({ initialSql }) => {
  const [sql, setSql] = useState<string>(
    initialSql ||
      `-- Free SQL Playground (Connected to in-memory SQLite WASM)
-- Write any query, JOIN, CTE, or Window function below:

SELECT 
    region,
    COUNT(*) as total_sales_count,
    ROUND(SUM(sale_amount), 2) as total_revenue,
    ROUND(AVG(sale_amount), 2) as avg_order_value
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunQuery();
    }
  };

  const handleResetDb = async () => {
    if (confirm('Are you sure you want to re-seed and reset the in-memory database?')) {
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
      {/* Playground Header Card */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-royal-violet/30 text-lilac-pale border border-royal-violet/40">
                SQLite 3 WebAssembly
              </span>
              <span className="text-xs text-surface-muted font-mono">Real In-Browser Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-electric-lavender" />
              Interactive SQL Console
            </h1>
            <p className="text-xs text-surface-muted mt-1">
              Experiment with complex joins, window functions, and CTEs with instant sub-millisecond execution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDb}
              disabled={isResetting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-elevated hover:bg-aubergine text-xs text-surface-muted hover:text-white border border-surface-border transition-colors"
              title="Reset Database to default seed records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isResetting ? 'Resetting...' : 'Reset Seed Data'}</span>
            </button>
          </div>
        </div>

        {/* Quick Query Templates */}
        <div className="my-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-surface-muted font-mono flex items-center gap-1 text-[11px] flex-shrink-0">
            <Sparkles className="w-3 h-3 text-electric-lavender" />
            Quick Presets:
          </span>
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => setSql(tmpl.sql)}
              className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-aubergine-light text-slate-300 hover:text-white border border-surface-border transition-colors whitespace-nowrap text-[11px]"
            >
              {tmpl.title}
            </button>
          ))}
        </div>

        {/* Editor Box */}
        <div className="space-y-3">
          <div className="relative rounded-xl border border-surface-border focus-within:border-royal-violet transition-all overflow-hidden bg-void shadow-inner">
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={11}
              className="code-editor w-full p-4 bg-transparent text-lilac-pale text-xs sm:text-sm outline-none resize-y leading-relaxed font-mono"
              placeholder="-- Write your SQL query here..."
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-surface-muted font-mono">Tip: Press Ctrl + Enter to run</span>

            <div className="flex items-center gap-3">
              {result && result.values.length > 0 && (
                <button
                  onClick={exportAsCsv}
                  className="flex items-center gap-1 text-xs text-surface-muted hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              )}

              <button
                onClick={handleRunQuery}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-royal-violet to-electric-lavender hover:opacity-95 text-white text-xs font-semibold shadow-lg shadow-royal-violet/25 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Running...' : 'Execute Query'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Query Output View */}
        {result && (
          <div className="mt-6 pt-5 border-t border-surface-border">
            <div className="flex items-center justify-between pb-2 mb-2 text-xs">
              <span className="text-surface-muted">
                Execution Time:{' '}
                <span className="text-neon-emerald font-mono font-medium">{result.executionTimeMs} ms</span>
              </span>
              <span className="text-surface-muted">
                Rows: <span className="text-white font-mono font-medium">{result.values.length}</span>
              </span>
            </div>

            {result.error ? (
              <div className="p-4 rounded-xl bg-neon-rose/10 border border-neon-rose/30 text-neon-rose text-xs font-mono">
                {result.error}
              </div>
            ) : result.values.length === 0 ? (
              <div className="p-4 text-center text-xs text-surface-muted bg-surface-elevated rounded-xl">
                Query executed successfully. 0 rows returned.
              </div>
            ) : (
              <div className="max-h-96 overflow-auto rounded-xl border border-surface-border">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-void/90 text-lilac-pale sticky top-0">
                    <tr>
                      {result.columns.map((col, i) => (
                        <th key={i} className="p-3 border-b border-surface-border font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {result.values.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-aubergine/40 transition-colors">
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="p-3 text-slate-300">
                            {val === null ? <span className="text-neon-amber italic">NULL</span> : String(val)}
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
