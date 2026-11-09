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
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#A77BEB', '#10B981', '#7041A6', '#D8C5FF'],
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Activity Navigation Sidebar */}
      <div className="lg:col-span-4 bg-surface-card border border-surface-border rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-surface-muted flex items-center gap-2">
            <Flame className="w-4 h-4 text-neon-amber" />
            Practical Drills
          </h2>
          <span className="text-xs font-mono text-neon-emerald font-semibold">
            {completedActivities.length} / {ACTIVITIES.length} Solved
          </span>
        </div>

        <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {ACTIVITIES.map((act, idx) => {
            const active = act.id === selectedActivityId;
            const completed = completedActivities.includes(act.id);

            return (
              <button
                key={act.id}
                onClick={() => setSelectedActivityId(act.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                  active
                    ? 'bg-aubergine-light text-white border-royal-violet shadow-md'
                    : 'bg-surface-elevated/40 text-surface-muted hover:bg-surface-elevated hover:text-white border-transparent'
                }`}
              >
                <div className="mt-0.5">
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4 text-neon-emerald flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-surface-border flex items-center justify-center text-[10px] font-mono text-surface-muted">
                      {idx + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-void/60 text-lilac-pale">
                      {act.difficulty}
                    </span>
                    {act.companyTag && (
                      <span className="text-[10px] text-surface-muted truncate max-w-[110px]">{act.companyTag}</span>
                    )}
                  </div>
                  <h3 className="text-xs font-medium text-white truncate">{act.title}</h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Activity Workspace */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 lg:p-8 shadow-xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-surface-border">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold border ${
                    currentActivity.difficulty === 'Easy'
                      ? 'bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30'
                      : currentActivity.difficulty === 'Medium'
                      ? 'bg-neon-amber/20 text-neon-amber border-neon-amber/30'
                      : 'bg-neon-rose/20 text-neon-rose border-neon-rose/30'
                  }`}
                >
                  {currentActivity.difficulty}
                </span>
                {currentActivity.companyTag && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-aubergine border border-royal-violet/40 text-lilac-pale">
                    {currentActivity.companyTag}
                  </span>
                )}
                <span className="text-xs text-surface-muted font-mono">{currentActivity.category}</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">{currentActivity.title}</h1>
            </div>

            {isCompleted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/30 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solved</span>
              </div>
            )}
          </div>

          {/* Problem Prompt */}
          <div className="my-5 p-4 rounded-xl bg-aubergine-dark/70 border border-surface-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-muted mb-2">Instructions</h3>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{currentActivity.prompt}</p>

            {/* Tables Used */}
            <div className="mt-4 pt-3 border-t border-surface-border/50 flex flex-wrap items-center gap-2">
              <span className="text-xs text-surface-muted">Target Tables:</span>
              {currentActivity.tablesUsed.map((tbl) => (
                <button
                  key={tbl}
                  onClick={() => onOpenSchemaForTable(tbl)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-elevated hover:bg-aubergine-light text-electric-lavender text-xs font-mono transition-colors border border-royal-violet/30"
                  title={`Inspect ${tbl} schema`}
                >
                  <Database className="w-3 h-3 text-electric-lavender" />
                  <span>{tbl}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SQL Editor Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-surface-muted flex items-center gap-2">
                <span>SQL Query Editor</span>
                <span className="text-[11px] text-surface-muted font-mono font-normal hidden sm:inline">
                  (Press Ctrl + Enter to run)
                </span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetStarter}
                  className="flex items-center gap-1 text-xs text-surface-muted hover:text-white px-2 py-1 rounded transition-colors"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-xl border border-surface-border focus-within:border-royal-violet transition-all overflow-hidden bg-void shadow-inner">
              <textarea
                value={userSql}
                onChange={(e) => setUserSql(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={9}
                className="code-editor w-full p-4 bg-transparent text-lilac-pale text-xs sm:text-sm outline-none resize-y leading-relaxed font-mono"
                placeholder="-- Write your SQL query here..."
                spellCheck={false}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunQuery}
                  disabled={isRunning || isValidating}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-elevated hover:bg-aubergine-light text-white text-xs font-medium border border-surface-border hover:border-royal-violet transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-electric-lavender" />
                  <span>{isRunning ? 'Running...' : 'Run Query'}</span>
                </button>

                <button
                  onClick={handleValidateAnswer}
                  disabled={isRunning || isValidating}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-royal-violet to-electric-lavender hover:opacity-95 text-white text-xs font-semibold shadow-lg shadow-royal-violet/25 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isValidating ? 'Validating...' : 'Test & Submit Solution'}</span>
                </button>
              </div>

              {/* Hints Toggle */}
              <div className="flex items-center gap-2">
                {currentActivity.hints.length > 0 && (
                  <button
                    onClick={() => {
                      if (activeHintIndex < currentActivity.hints.length - 1) {
                        setActiveHintIndex(activeHintIndex + 1);
                      } else {
                        setActiveHintIndex(-1);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aubergine text-electric-lavender text-xs font-medium hover:bg-aubergine-light transition-colors border border-royal-violet/30"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>
                      {activeHintIndex >= 0
                        ? `Hint ${activeHintIndex + 1}/${currentActivity.hints.length}`
                        : 'Need a Hint?'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-1 text-xs text-surface-muted hover:text-white px-2 py-1 transition-colors"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Revealed Hint Box */}
          {activeHintIndex >= 0 && (
            <div className="mt-4 p-4 rounded-xl bg-neon-amber/10 border border-neon-amber/30 text-xs text-slate-200">
              <div className="flex items-center justify-between mb-1 text-neon-amber font-semibold">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  Hint {activeHintIndex + 1} of {currentActivity.hints.length}
                </span>
                {activeHintIndex < currentActivity.hints.length - 1 && (
                  <button
                    onClick={() => setActiveHintIndex(activeHintIndex + 1)}
                    className="text-neon-amber underline hover:opacity-80"
                  >
                    Next Hint ›
                  </button>
                )}
              </div>
              <p>{currentActivity.hints[activeHintIndex]}</p>
            </div>
          )}

          {/* Revealed Solution Box */}
          {showSolution && (
            <div className="mt-4 p-4 rounded-xl bg-aubergine/80 border border-royal-violet/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-lilac-pale uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-electric-lavender" />
                  Expected Solution & Explanation
                </span>
              </div>
              <div className="p-3 rounded-lg bg-void border border-surface-border font-mono text-xs text-neon-emerald overflow-x-auto whitespace-pre">
                {currentActivity.expectedQuery}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentActivity.solutionExplanation}</p>
              <button
                onClick={() => setUserSql(currentActivity.expectedQuery)}
                className="text-xs text-electric-lavender hover:underline"
              >
                Copy Solution to Editor
              </button>
            </div>
          )}

          {/* Validation Feedback Banner */}
          {validationState && (
            <div
              className={`mt-5 p-4 rounded-xl border text-xs flex items-start gap-3 transition-all ${
                validationState.passed
                  ? 'bg-neon-emerald/10 border-neon-emerald/30 text-neon-emerald'
                  : 'bg-neon-rose/10 border-neon-rose/30 text-rose-200'
              }`}
            >
              {validationState.passed ? (
                <CheckCircle2 className="w-5 h-5 text-neon-emerald flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-neon-rose flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-semibold text-sm mb-0.5">
                  {validationState.passed ? 'Challenge Passed! 🎉' : 'Output Mismatch'}
                </h4>
                <p className="text-xs leading-relaxed">{validationState.message}</p>
              </div>
            </div>
          )}

          {/* Results Output Table */}
          {queryResult && (
            <div className="mt-5 p-4 rounded-xl bg-surface-elevated border border-surface-border">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border text-xs">
                <span className="text-surface-muted">
                  Time: <span className="text-neon-emerald font-mono font-medium">{queryResult.executionTimeMs} ms</span>
                </span>
                <span className="text-surface-muted">
                  Rows: <span className="text-white font-mono font-medium">{queryResult.values.length}</span>
                </span>
              </div>

              {queryResult.error ? (
                <div className="p-3 rounded-lg bg-neon-rose/10 border border-neon-rose/30 text-neon-rose text-xs font-mono">
                  {queryResult.error}
                </div>
              ) : queryResult.values.length === 0 ? (
                <div className="p-4 text-center text-xs text-surface-muted">
                  Query returned 0 rows. Double check your filters or joins.
                </div>
              ) : (
                <div className="max-h-72 overflow-auto rounded-lg border border-surface-border">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-void/90 text-lilac-pale sticky top-0">
                      <tr>
                        {queryResult.columns.map((col, i) => (
                          <th key={i} className="p-2.5 border-b border-surface-border font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {queryResult.values.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-aubergine/40 transition-colors">
                          {row.map((val, cIdx) => (
                            <td key={cIdx} className="p-2.5 text-slate-300">
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

          {/* Activity Footer Navigation */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-surface-border">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-surface-muted'
                  : 'bg-surface-elevated text-surface-muted hover:text-white hover:border-royal-violet border border-surface-border'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Drill</span>
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex === ACTIVITIES.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                currentIndex === ACTIVITIES.length - 1
                  ? 'opacity-40 cursor-not-allowed text-surface-muted'
                  : 'bg-royal-violet hover:bg-royal-glow text-white shadow-md shadow-royal-violet/20'
              }`}
            >
              <span>Next Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
