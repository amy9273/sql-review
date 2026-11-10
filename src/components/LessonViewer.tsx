import React, { useState, useEffect } from 'react';
import { LESSONS, MODULES } from '../data/curriculum';
import { executeQuery, validateAnswer, type QueryResult } from '../lib/sqliteEngine';
import { SqlEditor } from './SqlEditor';
import { FormattedGoal } from './FormattedGoal';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Database,
  Table,
} from 'lucide-react';

interface LessonViewerProps {
  reviewedLessons: string[];
  onToggleReviewed: (lessonId: string) => void;
  onOpenPlaygroundWithSql: (sql: string) => void;
  onOpenSchemaForTable?: (tableName: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  reviewedLessons,
  onToggleReviewed,
  onOpenPlaygroundWithSql,
  onOpenSchemaForTable,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get('lesson');
    if (paramId && LESSONS.some((l) => l.id === paramId)) {
      return paramId;
    }
    return LESSONS[0].id;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'guide' | 'challenge'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'challenge' ? 'challenge' : 'guide';
  });

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
        particleCount: 85,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#4F46E5', '#10B981', '#6366F1', '#34D399'],
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
                      const isSelected = lesson.id === selectedLessonId;
                      const completed = reviewedLessons.includes(lesson.id);

                      return (
                        <div key={lesson.id} className="rounded-xl transition-all">
                          {/* Main Lesson Header Button */}
                          <button
                            onClick={() => {
                              setSelectedLessonId(lesson.id);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-start gap-2.5 border text-xs ${
                              isSelected
                                ? 'bg-slate-100 border-slate-300 text-slate-900 font-semibold shadow-2xs'
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

                          {/* Indented Sub-items: Lesson Guide & Practice Challenge */}
                          {isSelected && (
                            <div className="ml-5 pl-3 border-l-2 border-indigo-200 py-1 space-y-1 mt-1 mb-1.5">
                              <button
                                onClick={() => {
                                  setSelectedLessonId(lesson.id);
                                  setViewMode('guide');
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                  viewMode === 'guide'
                                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <BookOpen className="w-3 h-3 text-indigo-500" />
                                  <span>Lesson Guide</span>
                                </span>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedLessonId(lesson.id);
                                  setViewMode('challenge');
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                  viewMode === 'challenge'
                                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  <span>Practice Challenge</span>
                                </span>
                                {completed && (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      )}

      {/* Main View Area: Either Guide Mode (reading) OR Challenge Mode (split studio) */}
      {viewMode === 'guide' ? (
        /* ========================================================= */
        /* MODE 1: LESSON GUIDE (Clean, focused reading format)      */
        /* ========================================================= */
        <div className="flex-1 h-full min-w-0 bg-white border border-border-light rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col overflow-y-auto">
          {/* Header Bar */}
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

            <div className="flex items-center gap-3">
              {/* Mode Toggle Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('guide')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-indigo-700 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Lesson Guide</span>
                </button>
                <button
                  onClick={() => setViewMode('challenge')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Practice Challenge</span>
                  {isReviewed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                </button>
              </div>

              <button
                onClick={() => onToggleReviewed(currentLesson.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isReviewed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300 hover:border-slate-400'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${isReviewed ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{isReviewed ? 'Lesson Completed' : 'Mark as Completed'}</span>
              </button>
            </div>
          </div>

          {/* Lesson Guide Reading Body */}
          <div className="space-y-6">
            {currentLesson.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">{sec.title}</h2>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {sec.body}
                </div>

                {sec.exampleSql && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm font-mono text-slate-100 overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                      <span>SQL Syntax Example</span>
                      <button
                        onClick={() => onOpenPlaygroundWithSql(sec.exampleSql!)}
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans font-medium"
                      >
                        <Play className="w-3 h-3" />
                        <span>Try in Playground</span>
                      </button>
                    </div>
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

          {/* Big End-of-Lesson CTA: Launch Challenge Studio */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/80 border border-indigo-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1 text-left">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Lesson Practice Challenge
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {currentLesson.challenge.title}
              </h3>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                {currentLesson.challenge.scenario}
              </p>
            </div>
            <button
              onClick={() => setViewMode('challenge')}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all"
            >
              <span>Launch Challenge Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Previous / Next Lesson Footer */}
          <div className="flex items-center justify-between gap-3 pt-8 mt-6 border-t border-border-light">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Lesson</span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Lesson {currentIndex + 1} of {LESSONS.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentIndex === LESSONS.length - 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                currentIndex === LESSONS.length - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* MODE 2: CHALLENGE STUDIO (Exact same layout as Exercise)  */
        /* ========================================================= */
        <div className="flex-1 h-full min-w-0 bg-white border border-border-light rounded-2xl shadow-xs p-5 flex flex-col overflow-hidden">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-border-light flex-shrink-0">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  title="Expand Modules Sidebar"
                >
                  <PanelLeftOpen className="w-4 h-4 text-brand-600" />
                  <span>Modules</span>
                </button>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Lesson {currentLesson.lessonOrder} Challenge
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentLesson.moduleTitle.split(':')[0]}
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  {currentLesson.challenge.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Mode Toggle Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('guide')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Lesson Guide</span>
                </button>
                <button
                  onClick={() => setViewMode('challenge')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-indigo-700 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Challenge Studio</span>
                </button>
              </div>

              {isReviewed && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Solved</span>
                </div>
              )}
            </div>
          </div>

          {/* Studio Body: Two independently scrollable panes (Identical to Exercises!) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 overflow-hidden">
            {/* LEFT PANE (Problem Context, Tables, Sample Data, Expected Preview, Hints) */}
            <div className="lg:col-span-5 h-full overflow-y-auto pr-2 space-y-4">
              {/* Problem Context & Goal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                <div>
                  <strong className="text-slate-900 block font-semibold mb-0.5">Problem Context:</strong>
                  <p className="text-slate-600 leading-relaxed">{currentLesson.challenge.scenario}</p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <strong className="text-brand-700 block font-semibold mb-1.5 text-xs">Your Goal:</strong>
                  <FormattedGoal goalText={currentLesson.challenge.instructions} theme="indigo" />
                </div>
              </div>

              {/* Target Tables with Schema Button */}
              {currentLesson.challenge.tablesUsed && currentLesson.challenge.tablesUsed.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Tables Used:</span>
                  {currentLesson.challenge.tablesUsed.map((tbl) => (
                    <button
                      key={tbl}
                      onClick={() => onOpenSchemaForTable?.(tbl)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-brand-600 font-mono text-xs border border-slate-200 hover:border-brand-300 shadow-2xs transition-colors"
                      title={`Inspect full ${tbl} schema`}
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>{tbl}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* ALL SAMPLE TABLES */}
              {currentLesson.challenge.sampleInputs && currentLesson.challenge.sampleInputs.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-brand-600" />
                    <span>Sample Data from Table(s)</span>
                  </h3>

                  {currentLesson.challenge.sampleInputs.map((sample, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span>Table:</span>
                          <code className="font-mono text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                            {sample.tableName}
                          </code>
                        </span>
                        {sample.description && (
                          <span className="text-[11px] text-slate-400 font-normal">{sample.description}</span>
                        )}
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
                                    {cell === null ? (
                                      <span className="text-amber-600 italic font-semibold">NULL</span>
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
                </div>
              )}

              {/* Expected Output Preview */}
              {currentLesson.challenge.expectedOutputPreview && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Expected Output Preview</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ({currentLesson.challenge.expectedOutputPreview.totalExpectedRows} total rows)
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50">
                    <table className="w-full text-left text-[11px] font-mono">
                      <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                        <tr>
                          {currentLesson.challenge.expectedOutputPreview.headers.map((h, i) => (
                            <th key={i} className="p-2">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {currentLesson.challenge.expectedOutputPreview.sampleRows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 text-slate-700">
                                {cell === null ? (
                                  <span className="text-amber-600 italic font-semibold">NULL</span>
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
              )}

              {/* Hints Accordion */}
              {currentLesson.challenge.hints && currentLesson.challenge.hints.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (activeHintIndex < currentLesson.challenge.hints.length - 1) {
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
                          ? `Hint ${activeHintIndex + 1} of ${currentLesson.challenge.hints.length}`
                          : 'Need a Hint?'}
                      </span>
                    </span>
                    <span className="text-[11px] text-amber-700 font-normal">
                      {activeHintIndex >= 0 ? 'Click for next / close' : 'Reveal'}
                    </span>
                  </button>

                  {activeHintIndex >= 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-900 space-y-2">
                      {currentLesson.challenge.hints.slice(0, activeHintIndex + 1).map((hint, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="font-mono text-amber-600 font-bold">{hIdx + 1}.</span>
                          <span className="leading-relaxed">{hint}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Solution Walkthrough Accordion */}
              <div className="pt-1">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {showSolution ? (
                      <EyeOff className="w-4 h-4 text-slate-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-500" />
                    )}
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
                        Expected SQL Solution:
                      </span>
                      <pre className="text-emerald-400 bg-slate-950 p-2.5 rounded-lg overflow-x-auto leading-relaxed">
                        {currentLesson.challenge.expectedQuery}
                      </pre>
                    </div>
                    <div className="font-sans text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                      <strong className="text-white block font-semibold mb-0.5">Why it works:</strong>
                      {currentLesson.challenge.solutionExplanation}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANE: Query Builder & Results - Independently Scrollable */}
            <div className="lg:col-span-7 h-full overflow-y-auto space-y-3.5 pl-1 pr-1">
              {/* Modern SQL Editor */}
              <SqlEditor
                value={currentSql}
                onChange={handleSqlChange}
                onRun={handleRunQuery}
                onReset={handleResetChallenge}
                rows={9}
                placeholder="-- Write your SQL query here..."
              />

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Query'}</span>
                </button>

                <button
                  onClick={handleCheckAnswer}
                  disabled={isValidating}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isValidating ? 'Checking...' : 'Check Solution'}</span>
                </button>
              </div>

              {/* Validation Result Banner */}
              {challengeValidation && (
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                    challengeValidation.passed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="mt-0.5">
                    {challengeValidation.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <strong className="block font-bold">
                      {challengeValidation.passed ? 'Challenge Solved! Outstanding work!' : 'Keep Going! Not quite matching:'}
                    </strong>
                    <p className="mt-0.5 leading-relaxed">{challengeValidation.message}</p>
                  </div>
                </div>
              )}

              {/* Live Query Results Table */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pb-1.5 border-b border-slate-200">
                  <span>Execution Results</span>
                  {liveResult && (
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                      <span>{liveResult.executionTimeMs} ms</span>
                      <span>•</span>
                      <span>{liveResult.values.length} rows</span>
                    </div>
                  )}
                </div>

                <div className="overflow-auto max-h-[300px] bg-white rounded-lg border border-slate-200">
                  {liveResult ? (
                    liveResult.error ? (
                      <div className="p-4 text-xs font-mono text-rose-600 whitespace-pre-wrap">
                        {liveResult.error}
                      </div>
                    ) : (
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-slate-200 font-semibold">
                          <tr>
                            {liveResult.columns.map((col, idx) => (
                              <th key={idx} className="p-2.5">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {liveResult.values.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5 text-slate-700">
                                  {cell === null ? (
                                    <span className="text-amber-600 italic font-semibold">NULL</span>
                                  ) : (
                                    String(cell)
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  ) : (
                    <div className="py-8 flex flex-col items-center justify-center text-slate-400 text-xs text-center">
                      <Play className="w-5 h-5 stroke-[1.5] mb-1.5 opacity-40" />
                      <p>Run your query or check solution to view live database output here.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between gap-3 pt-1 flex-shrink-0">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    currentIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <span className="text-[11px] text-slate-400 font-mono">
                  Lesson {currentIndex + 1} of {LESSONS.length}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === LESSONS.length - 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    currentIndex === LESSONS.length - 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'bg-brand-600 text-white hover:bg-brand-700'
                  }`}
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
