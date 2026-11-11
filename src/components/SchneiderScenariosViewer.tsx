import React, { useState } from 'react';
import {
  SCHNEIDER_QUALITY_SCENARIOS,
  type QualityScenario
} from '../data/schneiderCurriculum';
import {
  ShieldCheck,
  Database,
  Copy,
  Check,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Table
} from 'lucide-react';

export const SchneiderScenariosViewer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    SCHNEIDER_QUALITY_SCENARIOS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);

  const scenario: QualityScenario =
    SCHNEIDER_QUALITY_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    SCHNEIDER_QUALITY_SCENARIOS[0];

  const handleCopySql = () => {
    navigator.clipboard.writeText(scenario.recommendedSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-100/40 via-teal-50/20 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Enterprise Data Quality & Governance Lab
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          The 7 Real-World Quality Scenarios
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
          Deep dive into the 7 enterprise data anomalies highlighted in the Schneider Electric job description. Examine sample records, diagnose root causes, and master standard SQL solutions.
        </p>
      </div>

      {/* Main Grid: Left Selector Sidebar + Right Detail Panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Scenarios Selector */}
        <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs p-3 space-y-1.5">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            7 Scenarios from Part 5.4
          </div>
          {SCHNEIDER_QUALITY_SCENARIOS.map((sc) => {
            const isSelected = sc.id === scenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {sc.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs truncate">{sc.title}</div>
                  <div className="text-[11px] text-emerald-700 font-medium truncate mt-0.5">
                    {sc.dimension}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Scenario Overview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Scenario #{scenario.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                  {scenario.dimension}
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {scenario.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {scenario.description}
            </p>

            {/* Problem Statement Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  The Core Problem & Business Risk
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
                  {scenario.problemStatement}
                </p>
              </div>
            </div>
          </div>

          {/* Sample Data Viewer */}
          {scenario.sampleData.map((data, dIdx) => (
            <div
              key={dIdx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Table className="w-4 h-4 text-emerald-600" />
                <span>Source Dataset: {data.system}</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      {data.columns.map((col, cIdx) => (
                        <th key={cIdx} className="px-3.5 py-2.5 font-semibold text-slate-900">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-[11px]">
                    {data.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3.5 py-2 text-slate-700 whitespace-nowrap">
                            {cell === null ? (
                              <span className="text-amber-600 font-bold bg-amber-50 px-1 py-0.5 rounded text-[10px]">
                                NULL
                              </span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Investigation & Resolution Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Step-by-Step Investigation & Resolution Workflow</span>
            </h3>

            <div className="space-y-2.5">
              {scenario.investigationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended SQL Solution */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                Recommended SQL Diagnostic Query
              </span>
              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy SQL'}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {scenario.recommendedSql}
            </pre>
          </div>

          {/* How to Answer in the Interview */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white rounded-2xl border border-emerald-200 p-6 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>How to Answer This in the Interview</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed pt-1">
              "{scenario.interviewAnswer}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
