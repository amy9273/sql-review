import React, { useState, useEffect } from 'react';
import { executePythonCode, type PythonExecutionResult } from '../lib/pythonEngine';
import { PythonEditor } from './PythonEditor';
import {
  Play,
  Terminal,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';

interface PythonPlaygroundProps {
  initialCode?: string;
}

const DEFAULT_PLAYGROUND_CODE = `# Interactive Python 3 Playground (pandas, numpy, matplotlib)
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 1. Load sales transactions
sales = pd.read_csv('sales.csv')
print("Loaded sales shape:", sales.shape)
print()

# 2. Regional summary
summary = sales.groupby('region')['sale_amount'].agg(['count', 'sum', 'mean']).round(2)
print("Regional Sales Breakdown:")
print(summary)
print()

# 3. Create a clean bar chart
plt.figure(figsize=(6, 3))
summary['sum'].plot(kind='bar', color='#10B981', edgecolor='black')
plt.title('Total Revenue by Region')
plt.ylabel('Revenue ($)')
plt.xlabel('Region')
plt.tight_layout()
plt.show()
`;

export const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ initialCode }) => {
  const [code, setCode] = useState<string>(() => {
    return initialCode || localStorage.getItem('python_playground_code') || DEFAULT_PLAYGROUND_CODE;
  });

  const [execResult, setExecResult] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  useEffect(() => {
    localStorage.setItem('python_playground_code', code);
  }, [code]);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await executePythonCode(code);
      setExecResult(result);
    } catch (err: any) {
      setExecResult({
        stdout: '',
        error: err.message || 'Execution error',
        plots: [],
        executionTimeMs: 0
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset playground to default template?')) {
      setCode(DEFAULT_PLAYGROUND_CODE);
      setExecResult(null);
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-border-light rounded-2xl shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Python 3 Data Playground
            </h1>
            <p className="text-xs text-slate-500">
              In-browser WebAssembly runtime pre-loaded with pandas, numpy, and matplotlib
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running Python...' : 'Run Script (Ctrl+Enter)'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Reset code template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor & Execution Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Editor */}
        <div className="lg:col-span-6 bg-white border border-border-light rounded-2xl p-4 shadow-xs">
          <PythonEditor
            value={code}
            onChange={setCode}
            onRun={handleRun}
            onReset={handleReset}
            rows={14}
          />
        </div>

        {/* Output */}
        <div className="lg:col-span-6 bg-white border border-border-light rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border-light text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Execution Output</span>
            </span>
            {execResult && (
              <span className="font-mono text-[11px] text-slate-400">
                {execResult.executionTimeMs} ms
              </span>
            )}
          </div>

          {execResult ? (
            <div className="space-y-4">
              {execResult.error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl font-mono text-xs text-rose-700 whitespace-pre-wrap">
                  {execResult.error}
                </div>
              )}

              {execResult.stdout && (
                <div className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed shadow-inner max-h-[260px]">
                  {execResult.stdout}
                </div>
              )}

              {execResult.plots.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Matplotlib Visualization:</span>
                  </span>
                  {execResult.plots.map((plot, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-center">
                      <img
                        src={`data:image/png;base64,${plot}`}
                        alt="Matplotlib visualization"
                        className="max-h-[320px] object-contain rounded"
                      />
                    </div>
                  ))}
                </div>
              )}

              {execResult.dataframe && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold">Evaluated DataFrame:</span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {execResult.dataframe.shape[0]} rows × {execResult.dataframe.shape[1]} cols
                    </span>
                  </div>
                  <div className="overflow-auto max-h-[220px] bg-white rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-slate-200 font-semibold">
                        <tr>
                          {execResult.dataframe.columns.map((c, i) => (
                            <th key={i} className="p-2 whitespace-nowrap">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {execResult.dataframe.values.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 text-slate-700 whitespace-nowrap">
                                {cell}
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
          ) : (
            <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center justify-center">
              <Play className="w-6 h-6 stroke-[1.5] mb-2 opacity-40 text-emerald-600" />
              <p>Click &quot;Run Script&quot; to execute your Python code in WebAssembly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
