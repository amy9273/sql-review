import React, { useState, useEffect } from 'react';
import { PYTHON_EXERCISES } from '../data/pythonCurriculum';
import { executePythonCode, validatePythonSubmission, SEED_CSVS, type PythonExecutionResult } from '../lib/pythonEngine';
import { PythonEditor } from './PythonEditor';
import { FormattedGoal } from './FormattedGoal';
import confetti from 'canvas-confetti';
import {
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  Sparkles,
  Eye,
  EyeOff,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Table,
  Terminal,
  Image as ImageIcon
} from 'lucide-react';

interface PythonActivityRunnerProps {
  completedExercises: string[];
  onCompleteExercise: (exerciseId: string) => void;
  onOpenDatasetViewer: (filename: string) => void;
}

export const PythonActivityRunner: React.FC<PythonActivityRunnerProps> = ({
  completedExercises,
  onCompleteExercise,
  onOpenDatasetViewer
}) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(PYTHON_EXERCISES[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Persistent drafts per exercise so user progress is never lost
  const [exerciseDrafts, setExerciseDrafts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('python_review_exercise_drafts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [execResult, setExecResult] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [engineStatus, setEngineStatus] = useState<string>('');
  const [validationState, setValidationState] = useState<{
    tested: boolean;
    passed: boolean;
    message: string;
  } | null>(null);

  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const currentExercise =
    PYTHON_EXERCISES.find((e) => e.id === selectedExerciseId) || PYTHON_EXERCISES[0];
  const currentIndex = PYTHON_EXERCISES.findIndex((e) => e.id === selectedExerciseId);
  const isCompleted = completedExercises.includes(currentExercise.id);

  const currentCode = exerciseDrafts[currentExercise.id] ?? currentExercise.starterCode;

  // Persist drafts
  useEffect(() => {
    localStorage.setItem('python_review_exercise_drafts', JSON.stringify(exerciseDrafts));
  }, [exerciseDrafts]);

  // Reset ui state on exercise change
  useEffect(() => {
    setExecResult(null);
    setValidationState(null);
    setActiveHintIndex(-1);
    setShowSolution(false);
  }, [selectedExerciseId]);

  const handleCodeChange = (newCode: string) => {
    setExerciseDrafts((prev) => ({
      ...prev,
      [currentExercise.id]: newCode
    }));
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setValidationState(null);
    setEngineStatus('Executing Python code...');
    try {
      const result = await executePythonCode(currentCode);
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
      setEngineStatus('');
    }
  };

  const handleValidateSubmission = async () => {
    setIsValidating(true);
    setEngineStatus('Running automated assertions...');
    try {
      const result = await validatePythonSubmission(currentCode, currentExercise.validationScript);
      setExecResult(result.userResult);
      setValidationState({
        tested: true,
        passed: result.passed,
        message: result.message
      });

      if (result.passed) {
        onCompleteExercise(currentExercise.id);
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#10B981', '#3B82F6', '#6366F1', '#F59E0B']
        });
      }
    } catch (err: any) {
      setValidationState({
        tested: true,
        passed: false,
        message: err.message || 'Validation error'
      });
    } finally {
      setIsValidating(false);
      setEngineStatus('');
    }
  };

  const handleResetStarter = () => {
    if (confirm('Reset this exercise to the original starter code?')) {
      handleCodeChange(currentExercise.starterCode);
      setExecResult(null);
      setValidationState(null);
    }
  };

  const goToNext = () => {
    if (currentIndex < PYTHON_EXERCISES.length - 1) {
      setSelectedExerciseId(PYTHON_EXERCISES[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedExerciseId(PYTHON_EXERCISES[currentIndex - 1].id);
    }
  };

  // Helper to parse CSV sample rows for preview
  const getCsvPreview = (filename: string) => {
    const raw = SEED_CSVS[filename as keyof typeof SEED_CSVS];
    if (!raw) return null;
    const lines = raw.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1, 6).map((l) => l.split(','));
    return { headers, rows, totalRows: lines.length - 1 };
  };

  return (
    <div className="flex gap-5 h-[calc(100vh-100px)] overflow-hidden items-start">
      {/* Exercise Navigation Sidebar */}
      {isSidebarOpen && (
        <aside className="w-80 flex-shrink-0 bg-white border border-border-light rounded-2xl p-4 shadow-xs h-full flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-border-light">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-600" />
              <span>Python Exercises ({PYTHON_EXERCISES.length})</span>
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Collapse Exercises Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mb-2 font-medium">
            Completed: <strong className="text-emerald-700">{completedExercises.length}</strong> of{' '}
            {PYTHON_EXERCISES.length}
          </p>

          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
            {PYTHON_EXERCISES.map((ex) => {
              const active = ex.id === selectedExerciseId;
              const completed = completedExercises.includes(ex.id);

              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExerciseId(ex.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border text-xs ${
                    active
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="mt-0.5">
                    {completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400 font-mono">
                        {ex.order}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full border ${
                          ex.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ex.difficulty === 'Intermediate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {ex.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{ex.category}</span>
                    </div>
                    <p className="truncate font-medium">{ex.title.replace(/^\d+\.\s*/, '')}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      )}

      {/* Main Studio Area */}
      <div className="flex-1 h-full min-w-0 bg-white border border-border-light rounded-2xl shadow-xs p-5 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-border-light flex-shrink-0">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                title="Expand Exercises Sidebar"
              >
                <PanelLeftOpen className="w-4 h-4 text-emerald-600" />
                <span>Exercises</span>
              </button>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    currentExercise.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : currentExercise.difficulty === 'Intermediate'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {currentExercise.difficulty}
                </span>
                <span className="text-xs text-slate-500 font-medium">{currentExercise.category}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                {currentExercise.title}
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

        {/* Split Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 overflow-hidden">
          {/* LEFT PANE (Problem Context, Goal, CSV Samples, Hints) */}
          <div className="lg:col-span-5 h-full overflow-y-auto pr-2 space-y-4">
            {/* Context & Goal */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div>
                <strong className="text-slate-900 block font-semibold mb-0.5">Problem Context:</strong>
                <p className="text-slate-600 leading-relaxed">{currentExercise.context}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="text-emerald-700 block font-semibold mb-1.5 text-xs">Your Goal:</strong>
                <FormattedGoal goalText={currentExercise.goal} theme="emerald" />
              </div>
            </div>

            {/* CSV Datasets Used */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Datasets Used:</span>
              {currentExercise.csvsUsed.map((csv) => (
                <button
                  key={csv}
                  onClick={() => onOpenDatasetViewer(csv)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-emerald-700 font-mono text-xs border border-slate-200 hover:border-emerald-300 shadow-2xs transition-colors"
                  title={`Inspect full ${csv} dataset`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{csv}</span>
                </button>
              ))}
            </div>

            {/* CSV Previews */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-emerald-600" />
                <span>Input Data Sample</span>
              </h3>

              {currentExercise.csvsUsed.map((csv) => {
                const sample = getCsvPreview(csv);
                if (!sample) return null;

                return (
                  <div key={csv} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <code className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          {csv}
                        </code>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        ({sample.totalRows} total rows)
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50">
                      <table className="w-full text-left text-[11px] font-mono">
                        <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                          <tr>
                            {sample.headers.map((h, i) => (
                              <th key={i} className="p-2">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {sample.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 text-slate-700">
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
                );
              })}
            </div>

            {/* Hints Accordion */}
            {currentExercise.hints.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (activeHintIndex < currentExercise.hints.length - 1) {
                      setActiveHintIndex(activeHintIndex + 1);
                    } else {
                      setActiveHintIndex(-1);
                    }
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>
                      {activeHintIndex >= 0
                        ? `Hint ${activeHintIndex + 1} of ${currentExercise.hints.length}`
                        : 'Need a Hint?'}
                    </span>
                  </span>
                  <span className="text-[11px] text-amber-700 font-normal">
                    {activeHintIndex >= 0 ? 'Click for next / close' : 'Reveal'}
                  </span>
                </button>

                {activeHintIndex >= 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-900 space-y-2">
                    {currentExercise.hints.slice(0, activeHintIndex + 1).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2">
                        <span className="font-mono text-amber-600 font-bold">{hIdx + 1}.</span>
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Show Solution Accordion */}
            <div className="pt-1">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  {showSolution ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                  <span>{showSolution ? 'Hide Solution' : 'Show Solution & Walkthrough'}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  {showSolution ? 'Hide' : 'Reveal'}
                </span>
              </button>

              {showSolution && (
                <div className="mt-2 p-3.5 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-3 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                      Reference Solution:
                    </span>
                    <pre className="text-emerald-400 bg-slate-950 p-2.5 rounded-lg overflow-x-auto leading-relaxed">
                      {currentExercise.expectedCode}
                    </pre>
                  </div>
                  <div className="font-sans text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                    <strong className="text-white block font-semibold mb-0.5">Why it works:</strong>
                    {currentExercise.walkthrough}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE (Python Editor, Run/Validate, Console Logs, Plots, DataFrames) */}
          <div className="lg:col-span-7 h-full overflow-y-auto space-y-3.5 pl-1 pr-1">
            <PythonEditor
              value={currentCode}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleResetStarter}
              rows={9}
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning || isValidating}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleValidateSubmission}
                  disabled={isRunning || isValidating}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isValidating ? 'Checking...' : 'Check Solution'}</span>
                </button>
              </div>

              {engineStatus && (
                <span className="text-xs text-emerald-700 font-medium animate-pulse">
                  {engineStatus}
                </span>
              )}
            </div>

            {/* Validation Banner */}
            {validationState && (
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                  validationState.passed
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="mt-0.5">
                  {validationState.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div className="flex-1">
                  <strong className="block font-bold">
                    {validationState.passed ? 'Exercise Completed! Excellent Python code!' : 'Assertion Mismatch:'}
                  </strong>
                  <p className="mt-0.5 leading-relaxed">{validationState.message}</p>
                </div>
              </div>
            )}

            {/* Execution Output (Console stdout, Plots, DataFrames) */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pb-1.5 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Execution Output</span>
                </span>
                {execResult && (
                  <span className="text-[11px] font-mono text-slate-500">
                    {execResult.executionTimeMs} ms
                  </span>
                )}
              </div>

              {execResult ? (
                <div className="space-y-3">
                  {/* Error if any */}
                  {execResult.error && (
                    <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 font-mono text-xs text-rose-700 whitespace-pre-wrap">
                      {execResult.error}
                    </div>
                  )}

                  {/* Standard output logs */}
                  {execResult.stdout && (
                    <div className="p-3 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed shadow-inner max-h-[220px]">
                      {execResult.stdout}
                    </div>
                  )}

                  {/* Matplotlib Plots */}
                  {execResult.plots.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Generated Plot:</span>
                      </span>
                      {execResult.plots.map((plot, pIdx) => (
                        <div key={pIdx} className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex justify-center">
                          <img
                            src={`data:image/png;base64,${plot}`}
                            alt={`Matplotlib plot ${pIdx + 1}`}
                            className="max-h-[300px] object-contain rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* DataFrame Table */}
                  {execResult.dataframe && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="font-semibold">Evaluated DataFrame:</span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {execResult.dataframe.shape[0]} rows × {execResult.dataframe.shape[1]} cols
                        </span>
                      </div>
                      <div className="overflow-auto max-h-[240px] bg-white rounded-lg border border-slate-200">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-slate-200 font-semibold">
                            <tr>
                              {execResult.dataframe.columns.map((c, i) => (
                                <th key={i} className="p-2">
                                  {c}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {execResult.dataframe.values.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 text-slate-700">
                                    {cell === 'NULL' ? (
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
                  )}

                  {!execResult.stdout && !execResult.error && execResult.plots.length === 0 && !execResult.dataframe && (
                    <div className="py-4 text-center text-xs text-slate-400 font-mono">
                      Code executed successfully with zero output. Use print() to inspect variables.
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-slate-400 text-xs text-center">
                  <Play className="w-5 h-5 stroke-[1.5] mb-1.5 opacity-40 text-emerald-600" />
                  <p>Run your Python script or check solution to see console output, plots, and DataFrames.</p>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between pt-2 pb-1 border-t border-slate-200">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <span className="text-[11px] text-slate-400 font-mono">
                Exercise {currentIndex + 1} of {PYTHON_EXERCISES.length}
              </span>
              <button
                onClick={goToNext}
                disabled={currentIndex === PYTHON_EXERCISES.length - 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentIndex === PYTHON_EXERCISES.length - 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <span>Next Exercise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
