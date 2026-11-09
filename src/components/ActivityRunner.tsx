import React, { useState, useEffect } from 'react';
import { ACTIVITIES } from '../data/curriculum';
import { executeQuery, validateAnswer, type QueryResult } from '../lib/sqliteEngine';
import confetti from 'canvas-confetti';
import {
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Database,
  ArrowRight,
  ArrowLeft,
  Table,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface ActivityRunnerProps {
  completedActivities: string[];
  onCompleteActivity: (activityId: string) => void;
  onOpenSchemaForTable: (tableName: string) => void;
}

export const ActivityRunner: React.FC<ActivityRunnerProps> = ({
  completedActivities,
  onCompleteActivity,
  onOpenSchemaForTable,
}) => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>(ACTIVITIES[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [userSql, setUserSql] = useState<string>(ACTIVITIES[0].starterCode);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationState, setValidationState] = useState<{
    tested: boolean;
    passed: boolean;
    message: string;
  } | null>(null);

  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const currentActivity = ACTIVITIES.find((a) => a.id === selectedActivityId) || ACTIVITIES[0];
  const currentIndex = ACTIVITIES.findIndex((a) => a.id === selectedActivityId);
  const isCompleted = completedActivities.includes(currentActivity.id);

  // Sync starter code when switching exercises
  useEffect(() => {
    setUserSql(currentActivity.starterCode);
    setQueryResult(null);
    setValidationState(null);
    setActiveHintIndex(-1);
    setShowSolution(false);
  }, [selectedActivityId]);

  // Handle Ctrl+Enter shortcut to run query
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunQuery();
    }
  };

  const handleRunQuery = async () => {
    setIsRunning(true);
    setValidationState(null);
    const result = await executeQuery(userSql);
    setQueryResult(result);
    setIsRunning(false);
  };

  const handleValidateAnswer = async () => {
    setIsValidating(true);
    const enforceOrder = currentActivity.expectedQuery.toLowerCase().includes('order by');
    const result = await validateAnswer(userSql, currentActivity.expectedQuery, enforceOrder);

    setQueryResult(result.userResult || null);
    setValidationState({
      tested: true,
      passed: result.passed,
      message: result.message,
    });

    if (result.passed) {
      onCompleteActivity(currentActivity.id);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#4F46E5', '#10B981', '#6366F1', '#34D399'],
      });
    }

    setIsValidating(false);
  };

  const handleResetStarter = () => {
    setUserSql(currentActivity.starterCode);
    setQueryResult(null);
    setValidationState(null);
  };

  const goToNext = () => {
    if (currentIndex < ACTIVITIES.length - 1) {
      setSelectedActivityId(ACTIVITIES[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedActivityId(ACTIVITIES[currentIndex - 1].id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Exercise Navigation Sidebar - Collapsible */}
      {isSidebarOpen && (
        <div className="lg:col-span-3 bg-white border border-border-light rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border-light">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Practical Exercises ({ACTIVITIES.length})</span>
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Collapse Exercises Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mb-3 font-medium">
            Solved: <strong className="text-emerald-700">{completedActivities.length}</strong> of {ACTIVITIES.length}
          </p>

          <div className="space-y-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
            {ACTIVITIES.map((act) => {
              const active = act.id === selectedActivityId;
              const completed = completedActivities.includes(act.id);

              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivityId(act.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border text-xs ${
                    active
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-semibold shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="mt-0.5">
                    {completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400 font-mono">
                        {act.order}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full border ${
                          act.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : act.difficulty === 'Intermediate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {act.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{act.moduleTag}</span>
                    </div>
                    <p className="truncate font-medium">{act.title.replace(/^\d+\.\s*/, '')}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Studio Area: Problem on Left, Query Builder on Right */}
      <div className={`${isSidebarOpen ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-6 transition-all duration-200`}>
        <div className="bg-white border border-border-light rounded-2xl p-5 sm:p-7 shadow-xs">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-border-light">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  title="Expand Exercises Sidebar"
                >
                  <PanelLeftOpen className="w-4 h-4 text-brand-600" />
                  <span>Exercises</span>
                </button>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      currentActivity.difficulty === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : currentActivity.difficulty === 'Intermediate'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {currentActivity.difficulty}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{currentActivity.moduleTag}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {currentActivity.title}
                </h1>
              </div>
            </div>

            {isCompleted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Solved</span>
              </div>
            )}
          </div>

          {/* TWO COLUMN STUDIO: Problem on Left (5 cols), Query Builder on Right (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Problem Description, Tables, Previews, Hints */}
            <div className="lg:col-span-5 space-y-4">
              {/* Problem Context & Goal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2.5">
                <div>
                  <strong className="text-slate-900 block font-semibold mb-0.5">Problem Context:</strong>
                  <p className="text-slate-600 text-xs leading-relaxed">{currentActivity.context}</p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <strong className="text-brand-700 block font-semibold mb-0.5">Your Goal:</strong>
                  <p className="text-slate-800 text-xs leading-relaxed">{currentActivity.goal}</p>
                </div>
              </div>

              {/* Target Tables with Schema Button */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Query Table:</span>
                {currentActivity.tablesUsed.map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => onOpenSchemaForTable(tbl)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-brand-600 font-mono text-xs border border-slate-200 hover:border-brand-300 shadow-2xs transition-colors"
                    title={`Inspect ${tbl} schema`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>{tbl}</span>
                  </button>
                ))}
              </div>

              {/* Input Table Preview */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-slate-500" />
                    Raw Table: <code className="font-mono text-brand-600">{currentActivity.sampleInput.tableName}</code>
                  </span>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                      <tr>
                        {currentActivity.sampleInput.headers.map((h, i) => (
                          <th key={i} className="p-1.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {currentActivity.sampleInput.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-1.5 text-slate-700">
                              {cell === null ? <span className="text-amber-600 italic">NULL</span> : String(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expected Output Preview */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Expected Result Format:
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    ({currentActivity.expectedOutputPreview.totalExpectedRows} total rows)
                  </span>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                      <tr>
                        {currentActivity.expectedOutputPreview.headers.map((h, i) => (
                          <th key={i} className="p-1.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {currentActivity.expectedOutputPreview.sampleRows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-1.5 text-slate-700">
                              {cell === null ? <span className="text-amber-600 italic">NULL</span> : String(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Hints Accordion */}
              {currentActivity.hints.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (activeHintIndex < currentActivity.hints.length - 1) {
                        setActiveHintIndex(activeHintIndex + 1);
                      } else {
                        setActiveHintIndex(-1);
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>
                        {activeHintIndex >= 0
                          ? `Hint ${activeHintIndex + 1} of ${currentActivity.hints.length}`
                          : 'Need a Hint?'}
                      </span>
                    </span>
                    <span className="text-brand-600 underline text-[11px]">
                      {activeHintIndex >= 0 && activeHintIndex < currentActivity.hints.length - 1
                        ? 'Next Hint ›'
                        : activeHintIndex >= 0
                        ? 'Close'
                        : 'Reveal'}
                    </span>
                  </button>

                  {activeHintIndex >= 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                      {currentActivity.hints[activeHintIndex]}
                    </div>
                  )}
                </div>
              )}

              {/* Solution Toggle */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-brand-600" />}
                    <span>{showSolution ? 'Hide Solution' : 'Reveal Solution & Walkthrough'}</span>
                  </span>
                </button>

                {showSolution && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                        Official Query
                      </span>
                      <button
                        onClick={() => setUserSql(currentActivity.expectedQuery)}
                        className="text-xs text-brand-600 hover:underline font-semibold"
                      >
                        Copy to Editor
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-[1.85] shadow-inner">
                      {currentActivity.expectedQuery}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{currentActivity.walkthrough}</p>
                  </div>
                )}
              </div>

              {/* Prev / Next Drill Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-slate-400'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-2xs'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentIndex === ACTIVITIES.length - 1}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentIndex === ACTIVITIES.length - 1
                      ? 'opacity-40 cursor-not-allowed text-slate-400'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-2xs'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Query Builder (Editor on top, Results on bottom) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Editor Header */}
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>Interactive SQL Query Builder</span>
                  <span className="text-[11px] text-slate-400 font-mono font-normal hidden sm:inline">
                    (Ctrl + Enter to run)
                  </span>
                </label>

                <button
                  onClick={handleResetStarter}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Code Textarea Editor */}
              <div className="relative rounded-xl border border-slate-800 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all overflow-hidden bg-slate-950 shadow-inner">
                <textarea
                  value={userSql}
                  onChange={(e) => setUserSql(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={11}
                  className="code-editor w-full p-5 bg-transparent text-emerald-400 text-sm outline-none resize-y leading-[1.85] font-mono"
                  placeholder="-- Write your SQL query here..."
                  spellCheck={false}
                />
              </div>

              {/* Run & Validate Actions */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunQuery}
                    disabled={isRunning || isValidating}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-300 shadow-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-brand-600 fill-current" />
                    <span>{isRunning ? 'Running...' : 'Run Query'}</span>
                  </button>

                  <button
                    onClick={handleValidateAnswer}
                    disabled={isRunning || isValidating}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isValidating ? 'Checking...' : 'Check Solution'}</span>
                  </button>
                </div>
              </div>

              {/* Validation Status Banner */}
              {validationState && (
                <div
                  className={`p-4 rounded-xl border text-xs flex items-start gap-3 transition-all ${
                    validationState.passed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {validationState.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm mb-0.5">
                      {validationState.passed ? 'Challenge Passed! 🎉' : 'Output Mismatch'}
                    </h4>
                    <p className="leading-relaxed">{validationState.message}</p>
                  </div>
                </div>
              )}

              {/* Live Output Data Table */}
              {queryResult && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
                    <span>
                      Execution time: <strong className="text-slate-900 font-mono">{queryResult.executionTimeMs} ms</strong>
                    </span>
                    <span>
                      Returned: <strong className="text-slate-900 font-mono">{queryResult.values.length} rows</strong>
                    </span>
                  </div>

                  {queryResult.error ? (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                      {queryResult.error}
                    </div>
                  ) : queryResult.values.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 bg-white rounded-lg border border-slate-200">
                      Query returned 0 rows. Double check your WHERE clause or JOIN condition.
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-auto rounded-lg border border-border-light bg-white">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-border-light">
                          <tr>
                            {queryResult.columns.map((col, i) => (
                              <th key={i} className="p-2.5 font-semibold">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                          {queryResult.values.map((row, rIdx) => (
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
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
