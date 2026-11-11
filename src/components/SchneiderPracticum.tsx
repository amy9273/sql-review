import React, { useState, useEffect } from 'react';
import {
  SCHNEIDER_PRACTICUM_ACTIVITIES
} from '../data/schneiderCurriculum';
import { executeQuery, validateAnswer, type QueryResult } from '../lib/sqliteEngine';
import { SqlEditor } from './SqlEditor';
import confetti from 'canvas-confetti';
import {
  Play,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Terminal,
  Database,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react';

interface SchneiderPracticumProps {
  completedActivities: string[];
  onCompleteActivity: (activityId: string) => void;
}

export const SchneiderPracticum: React.FC<SchneiderPracticumProps> = ({
  completedActivities,
  onCompleteActivity
}) => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>(
    SCHNEIDER_PRACTICUM_ACTIVITIES[0].id
  );

  const [sqlDrafts, setSqlDrafts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('schneider_sql_drafts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [liveResult, setLiveResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    passed: boolean;
    message: string;
  } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const currentActivity =
    SCHNEIDER_PRACTICUM_ACTIVITIES.find((a) => a.id === selectedActivityId) ||
    SCHNEIDER_PRACTICUM_ACTIVITIES[0];

  const currentSql =
    sqlDrafts[currentActivity.id] ?? currentActivity.starterSql;

  useEffect(() => {
    localStorage.setItem('schneider_sql_drafts', JSON.stringify(sqlDrafts));
  }, [sqlDrafts]);

  useEffect(() => {
    setLiveResult(null);
    setValidationResult(null);
    setShowSolution(false);
  }, [selectedActivityId]);

  const handleSqlChange = (val: string) => {
    setSqlDrafts((prev) => ({
      ...prev,
      [currentActivity.id]: val
    }));
  };

  const handleRunSql = async () => {
    setIsRunning(true);
    setValidationResult(null);
    try {
      const res = await executeQuery(currentSql);
      setLiveResult(res);
    } catch (err: any) {
      setLiveResult({
        columns: [],
        values: [],
        executionTimeMs: 0,
        error: err?.message || 'SQL execution failed.'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      const userRes = await executeQuery(currentSql);
      setLiveResult(userRes);

      if (userRes.error) {
        setValidationResult({
          tested: true,
          passed: false,
          message: `Execution error: ${userRes.error}`
        });
        return;
      }

      const res = await validateAnswer(currentSql, currentActivity.expectedSql);
      setValidationResult({
        tested: true,
        passed: res.passed,
        message: res.message
      });

      if (res.passed) {
        onCompleteActivity(currentActivity.id);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10B981', '#059669', '#34D399', '#047857']
        });
      }
    } catch (err: any) {
      setValidationResult({
        tested: true,
        passed: false,
        message: `Validation error: ${err?.message || 'Check your SQL query.'}`
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleResetSql = () => {
    handleSqlChange(currentActivity.starterSql);
    setLiveResult(null);
    setValidationResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-100/40 via-teal-50/20 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
          <Terminal className="w-3.5 h-3.5" />
          Interactive SQLite Practicum
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Schneider Data Quality SQL Practicum
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
          Solve the 8 practical data cleaning, deduplication, and referential integrity challenges directly against real in-memory SQLite tables!
        </p>
      </div>

      {/* Main Layout: Left Activity Selector + Right SQL Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Activities List */}
        <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs p-3 space-y-1.5">
          <div className="px-3 py-2 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>8 Practicum Challenges</span>
            <span className="text-emerald-700 font-bold">
              {completedActivities.filter((id) =>
                SCHNEIDER_PRACTICUM_ACTIVITIES.some((a) => a.id === id)
              ).length}{' '}
              / {SCHNEIDER_PRACTICUM_ACTIVITIES.length}
            </span>
          </div>

          {SCHNEIDER_PRACTICUM_ACTIVITIES.map((act) => {
            const isSelected = act.id === currentActivity.id;
            const isDone = completedActivities.includes(act.id);

            return (
              <button
                key={act.id}
                onClick={() => setSelectedActivityId(act.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? 'border-emerald-500 text-emerald-700 bg-emerald-100'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {act.number}
                    </span>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs truncate">{act.title}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    Target: {act.targetTable}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right SQL Editor & Result Workspace */}
        <div className="flex-1 min-w-0 w-full space-y-5">
          {/* Challenge Description Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Activity #{currentActivity.number}
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                Table: <code className="text-slate-800">{currentActivity.targetTable}</code>
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {currentActivity.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {currentActivity.description}
            </p>
          </div>

          {/* SQL Editor Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                SQL Query Editor
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetSql}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors flex items-center gap-1"
                  title="Reset to starter query"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>

                <button
                  onClick={handleRunSql}
                  disabled={isRunning || isValidating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  Run SQL
                </button>

                <button
                  onClick={handleValidate}
                  disabled={isRunning || isValidating}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Validate Query
                </button>
              </div>
            </div>

            <SqlEditor value={currentSql} onChange={handleSqlChange} rows={6} />
          </div>

          {/* Validation Feedback Banner */}
          {validationResult && validationResult.tested && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                validationResult.passed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {validationResult.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm font-medium leading-relaxed">
                <div className="font-bold mb-0.5">
                  {validationResult.passed ? 'Challenge Passed!' : 'Output Mismatch'}
                </div>
                {validationResult.message}
              </div>
            </div>
          )}

          {/* Output Results Table */}
          {liveResult && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Query Result Output</span>
                {liveResult.values && (
                  <span className="text-slate-400 font-normal">
                    {liveResult.values.length} rows returned
                  </span>
                )}
              </div>

              {liveResult.error ? (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-mono text-rose-800">
                  {liveResult.error}
                </div>
              ) : liveResult.values.length === 0 ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 text-center">
                  Query executed successfully, but returned 0 rows.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        {liveResult.columns.map((col, idx) => (
                          <th key={idx} className="px-3.5 py-2 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {liveResult.values.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}
                        >
                          {row.map((val: any, cIdx: number) => (
                            <td key={cIdx} className="px-3.5 py-2 whitespace-nowrap">
                              {val === null ? (
                                <span className="text-amber-600 font-bold bg-amber-50 px-1 py-0.5 rounded text-[10px]">
                                  NULL
                                </span>
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

          {/* Solution & Explanation Toggle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Solution & Technical Explanation
              </span>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showSolution ? 'Hide Solution' : 'Reveal Expected SQL'}
              </button>
            </div>

            {showSolution && (
              <div className="space-y-3 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800">
                  {currentActivity.expectedSql}
                </pre>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {currentActivity.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
