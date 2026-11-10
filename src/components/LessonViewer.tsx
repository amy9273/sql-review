import React, { useState, useEffect } from 'react';
import { LESSONS, MODULES } from '../data/curriculum';
import { executeQuery, validateAnswer, type QueryResult } from '../lib/sqliteEngine';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Terminal,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface LessonViewerProps {
  reviewedLessons: string[];
  onToggleReviewed: (lessonId: string) => void;
  onOpenPlaygroundWithSql: (sql: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  reviewedLessons,
  onToggleReviewed,
  onOpenPlaygroundWithSql,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(LESSONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Persistent drafts per lesson challenge so student work is NEVER lost on tab or lesson switch!
  const [lessonDrafts, setLessonDrafts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('sql_review_lesson_drafts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [liveResult, setLiveResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [challengeValidation, setChallengeValidation] = useState<{
    tested: boolean;
    passed: boolean;
    message: string;
  } | null>(null);

  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const currentLesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];
  const currentIndex = LESSONS.findIndex((l) => l.id === selectedLessonId);
  const isReviewed = reviewedLessons.includes(currentLesson.id);

  // Current active draft for this lesson
  const currentSql = lessonDrafts[currentLesson.id] ?? currentLesson.challenge.starterCode;

  // Persist lesson drafts
  useEffect(() => {
    localStorage.setItem('sql_review_lesson_drafts', JSON.stringify(lessonDrafts));
  }, [lessonDrafts]);

  // Reset ui state on lesson change, but NEVER reset draft
  useEffect(() => {
    setLiveResult(null);
    setChallengeValidation(null);
    setActiveHintIndex(-1);
    setShowSolution(false);
  }, [selectedLessonId]);

  const handleSqlChange = (newSql: string) => {
    setLessonDrafts((prev) => ({
      ...prev,
      [currentLesson.id]: newSql,
    }));
  };

  const handleRunQuery = async () => {
    setIsRunning(true);
    setChallengeValidation(null);
    const result = await executeQuery(currentSql);
    setLiveResult(result);
    setIsRunning(false);
  };

  const handleCheckAnswer = async () => {
    setIsValidating(true);
    const enforceOrder = currentLesson.challenge.expectedQuery.toLowerCase().includes('order by');
    const result = await validateAnswer(currentSql, currentLesson.challenge.expectedQuery, enforceOrder);

    setLiveResult(result.userResult || null);
    setChallengeValidation({
      tested: true,
      passed: result.passed,
      message: result.message,
    });

    if (result.passed) {
      if (!isReviewed) {
        onToggleReviewed(currentLesson.id);
      }
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4F46E5', '#10B981', '#6366F1'],
      });
    }

    setIsValidating(false);
  };

  const handleResetChallenge = () => {
    if (confirm('Reset this challenge back to the original template?')) {
      handleSqlChange(currentLesson.challenge.starterCode);
      setLiveResult(null);
      setChallengeValidation(null);
    }
  };

  const goToNext = () => {
    if (currentIndex < LESSONS.length - 1) {
      setSelectedLessonId(LESSONS[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(LESSONS[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex gap-5 h-[calc(100vh-100px)] overflow-hidden items-start">
      {/* Sidebar: Curriculum Outline - Collapsible & Independently Scrollable */}
      {isSidebarOpen && (
        <aside className="w-80 flex-shrink-0 bg-white border border-border-light rounded-2xl p-4 shadow-xs h-full flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-border-light">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-600" />
              <span>Curriculum Modules</span>
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Collapse Modules Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mb-2 font-medium">
            Completed: <strong className="text-brand-600">{reviewedLessons.length}</strong> of {LESSONS.length}
          </p>

          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {MODULES.map((mod) => {
              const moduleLessons = LESSONS.filter((l) => l.moduleOrder === mod.id);

              return (
                <div key={mod.id} className="space-y-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {mod.title}
                  </div>

                  <div className="space-y-1">
                    {moduleLessons.map((lesson) => {
                      const active = lesson.id === selectedLessonId;
                      const completed = reviewedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-start gap-2.5 border text-xs ${
                            active
                              ? 'bg-brand-50 border-brand-200 text-brand-700 font-semibold shadow-xs'
                              : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200'
                          }`}
                        >
                          <div className="mt-0.5">
                            {completed ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400 font-mono">
                                {lesson.lessonOrder}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium">{lesson.title}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      )}

      {/* Main Lesson Content - Independently Scrollable */}
      <div className="flex-1 h-full min-w-0 bg-white border border-border-light rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-border-light flex-shrink-0">
          <div className="flex items-start gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                title="Expand Modules Sidebar"
              >
                <PanelLeftOpen className="w-4 h-4 text-brand-600" />
                <span>Modules</span>
              </button>
            )}

            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
                {currentLesson.moduleTitle}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {currentLesson.title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">{currentLesson.description}</p>
            </div>
          </div>

          <button
            onClick={() => onToggleReviewed(currentLesson.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isReviewed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300 hover:border-slate-400'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${isReviewed ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isReviewed ? 'Lesson Completed' : 'Mark as Completed'}</span>
          </button>
        </div>

        {/* Sections Breakdown */}
        <div className="space-y-6">
          {currentLesson.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">{sec.title}</h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {sec.body}
              </div>

              {sec.exampleSql && (
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm font-mono text-slate-100 overflow-x-auto shadow-inner">
                  <pre className="whitespace-pre leading-[1.85]">{sec.exampleSql}</pre>
                </div>
              )}
            </div>
          ))}

          {/* Common Mistake to Avoid */}
          {currentLesson.commonMistake && (
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Common Mistake to Avoid
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 leading-relaxed">
                  <span className="font-bold block text-rose-900 mb-1">❌ Don't do this:</span>
                  <code>{currentLesson.commonMistake.wrongSql}</code>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 leading-relaxed">
                  <span className="font-bold block text-emerald-900 mb-1">✅ Do this instead:</span>
                  <code>{currentLesson.commonMistake.correctSql}</code>
                </div>
              </div>
              <p className="text-xs text-amber-900 pt-1 leading-relaxed">
                {currentLesson.commonMistake.explanation}
              </p>
            </div>
          )}

          {/* Quick Reference Table */}
          {currentLesson.quickReference && currentLesson.quickReference.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Syntax Reference
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border-light bg-slate-50">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border-light text-slate-600">
                      <th className="p-3 font-semibold">What you want to do</th>
                      <th className="p-3 font-semibold font-mono">SQL Syntax Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light bg-white font-mono">
                    {currentLesson.quickReference.map((ref, i) => (
                      <tr key={i}>
                        <td className="p-3 text-slate-800 font-sans font-medium">{ref.goal}</td>
                        <td className="p-3 text-brand-600">{ref.syntax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ACTIVE END-OF-LESSON ACTIVITY (NO SOLUTION GIVEN AWAY!) */}
        <div className="mt-8 pt-6 border-t border-border-light space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-brand-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Lesson Activity: {currentLesson.challenge.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenPlaygroundWithSql(currentSql)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-600 transition-colors"
                title="Open this query in SQL Playground"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open in Playground</span>
              </button>
              <button
                onClick={handleResetChallenge}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
                title="Reset code template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong className="block text-brand-800 font-semibold mb-1">Your Challenge:</strong>
            <p>{currentLesson.challenge.instructions}</p>
          </div>

          {/* Interactive Code Editor for Challenge */}
          <div className="space-y-3">
            <div className="relative rounded-xl border border-slate-800 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all overflow-hidden bg-slate-950 shadow-inner">
              <textarea
                value={currentSql}
                onChange={(e) => handleSqlChange(e.target.value)}
                rows={7}
                className="code-editor w-full p-4 bg-transparent text-emerald-400 text-sm outline-none resize-y leading-[1.85] font-mono"
                placeholder="-- Write your SQL query here to complete the lesson..."
                spellCheck={false}
              />
            </div>

            {/* Actions: Run & Check Answer */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunQuery}
                  disabled={isRunning || isValidating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-300 shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-brand-600 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Query'}</span>
                </button>

                <button
                  onClick={handleCheckAnswer}
                  disabled={isRunning || isValidating}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isValidating ? 'Checking...' : 'Check Answer'}</span>
                </button>
              </div>

              {/* Hints & Solution */}
              <div className="flex items-center gap-2">
                {currentLesson.challenge.hints.length > 0 && (
                  <button
                    onClick={() => {
                      if (activeHintIndex < currentLesson.challenge.hints.length - 1) {
                        setActiveHintIndex(activeHintIndex + 1);
                      } else {
                        setActiveHintIndex(-1);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium hover:bg-amber-100 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {activeHintIndex >= 0
                        ? `Hint ${activeHintIndex + 1} of ${currentLesson.challenge.hints.length}`
                        : 'Need a Hint?'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 px-2 py-1 transition-colors"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hint Dropdown */}
          {activeHintIndex >= 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed">
              <strong className="block font-semibold mb-0.5">Hint #{activeHintIndex + 1}:</strong>
              {currentLesson.challenge.hints[activeHintIndex]}
            </div>
          )}

          {/* Solution Dropdown */}
          {showSolution && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Official Query Solution
                </span>
                <button
                  onClick={() => handleSqlChange(currentLesson.challenge.expectedQuery)}
                  className="text-xs text-brand-600 hover:underline font-semibold"
                >
                  Copy to Editor
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-[1.85] shadow-inner">
                {currentLesson.challenge.expectedQuery}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{currentLesson.challenge.solutionExplanation}</p>
            </div>
          )}

          {/* Validation Banner */}
          {challengeValidation && (
            <div
              className={`p-4 rounded-xl border text-xs flex items-start gap-3 transition-all ${
                challengeValidation.passed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {challengeValidation.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm mb-0.5">
                  {challengeValidation.passed ? 'Awesome! Lesson Challenge Passed! 🎉' : 'Not quite right yet'}
                </h4>
                <p className="leading-relaxed">{challengeValidation.message}</p>
              </div>
            </div>
          )}

          {/* Result Output Table */}
          {liveResult && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
                <span>
                  Execution time: <strong className="text-slate-900 font-mono">{liveResult.executionTimeMs} ms</strong>
                </span>
                <span>
                  Returned: <strong className="text-slate-900 font-mono">{liveResult.values.length} rows</strong>
                </span>
              </div>

              {liveResult.error ? (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                  {liveResult.error}
                </div>
              ) : (
                <div className="max-h-60 overflow-auto rounded-lg border border-border-light bg-white">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-border-light">
                      <tr>
                        {liveResult.columns.map((col, i) => (
                          <th key={i} className="p-2.5 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light">
                      {liveResult.values.map((row, rIdx) => (
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

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-border-light flex-shrink-0">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Lesson</span>
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === LESSONS.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentIndex === LESSONS.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
            }`}
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
