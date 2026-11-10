import React, { useState, useEffect } from 'react';
import { PYTHON_LESSONS, PYTHON_MODULES } from '../data/pythonCurriculum';
import { executePythonCode, validatePythonSubmission, type PythonExecutionResult } from '../lib/pythonEngine';
import { PythonEditor } from './PythonEditor';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Terminal,
  AlertCircle,
  Copy,
  Calculator,
} from 'lucide-react';

interface PythonLessonViewerProps {
  reviewedLessons: string[];
  onToggleReviewed: (lessonId: string) => void;
  onOpenPlaygroundWithCode: (code: string) => void;
}

export const PythonLessonViewer: React.FC<PythonLessonViewerProps> = ({
  reviewedLessons,
  onToggleReviewed,
  onOpenPlaygroundWithCode
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(PYTHON_LESSONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'guide' | 'challenge'>('guide');

  // Persistent drafts per lesson challenge
  const [lessonDrafts, setLessonDrafts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('python_review_lesson_drafts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [execResult, setExecResult] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationState, setValidationState] = useState<{
    tested: boolean;
    passed: boolean;
    message: string;
  } | null>(null);

  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const currentLesson =
    PYTHON_LESSONS.find((l) => l.id === selectedLessonId) || PYTHON_LESSONS[0];
  const currentIndex = PYTHON_LESSONS.findIndex((l) => l.id === selectedLessonId);
  const isReviewed = reviewedLessons.includes(currentLesson.id);

  const currentCode = lessonDrafts[currentLesson.id] ?? currentLesson.challenge.starterCode;

  // Persist drafts
  useEffect(() => {
    localStorage.setItem('python_review_lesson_drafts', JSON.stringify(lessonDrafts));
  }, [lessonDrafts]);

  // Reset ui on lesson change
  useEffect(() => {
    setExecResult(null);
    setValidationState(null);
    setActiveHintIndex(-1);
    setShowSolution(false);
  }, [selectedLessonId]);

  const handleCodeChange = (newCode: string) => {
    setLessonDrafts((prev) => ({
      ...prev,
      [currentLesson.id]: newCode
    }));
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setValidationState(null);
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
    }
  };

  const handleCheckSolution = async () => {
    setIsValidating(true);
    try {
      const result = await validatePythonSubmission(
        currentCode,
        currentLesson.challenge.validationScript
      );
      setExecResult(result.userResult);
      setValidationState({
        tested: true,
        passed: result.passed,
        message: result.message
      });

      if (result.passed) {
        if (!isReviewed) {
          onToggleReviewed(currentLesson.id);
        }
        confetti({
          particleCount: 85,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#10B981', '#3B82F6', '#6366F1', '#34D399']
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
    }
  };

  const handleResetChallenge = () => {
    if (confirm('Reset this challenge to the original starter code?')) {
      handleCodeChange(currentLesson.challenge.starterCode);
      setExecResult(null);
      setValidationState(null);
    }
  };

  const goToNext = () => {
    if (currentIndex < PYTHON_LESSONS.length - 1) {
      setSelectedLessonId(PYTHON_LESSONS[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(PYTHON_LESSONS[currentIndex - 1].id);
    }
  };

  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[13px] border border-emerald-100 font-semibold"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n').filter(Boolean);

    return (
      <div className="space-y-3.5">
        {paragraphs.map((p, pIdx) => {
          const lines = p.split('\n').filter(Boolean);
          const isBulletList = lines.every(
            (l) => l.trim().startsWith('•') || l.trim().startsWith('-') || l.trim().startsWith('*')
          );

          if (isBulletList) {
            return (
              <ul key={pIdx} className="space-y-2 my-2.5 pl-1">
                {lines.map((line, lIdx) => {
                  const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                  return (
                    <li key={lIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span>{renderInlineMarkdown(cleanLine)}</span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          return (
            <p key={pIdx} className="text-sm text-slate-700 leading-[1.85]">
              {renderInlineMarkdown(p)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex gap-5 h-[calc(100vh-100px)] overflow-hidden items-start">
      {/* Sidebar: Curriculum Outline */}
      {isSidebarOpen && (
        <aside className="w-80 flex-shrink-0 bg-white border border-border-light rounded-2xl p-4 shadow-xs h-full flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-border-light">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Python Curriculum</span>
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
            Completed: <strong className="text-emerald-700">{reviewedLessons.length}</strong> of{' '}
            {PYTHON_LESSONS.length}
          </p>

          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {PYTHON_MODULES.map((mod) => {
              const moduleLessons = PYTHON_LESSONS.filter((l) => l.moduleOrder === mod.id);

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
                          <button
                            onClick={() => setSelectedLessonId(lesson.id)}
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
                            <div className="ml-5 pl-3 border-l-2 border-emerald-300 py-1 space-y-1 mt-1 mb-1.5">
                              <button
                                onClick={() => {
                                  setSelectedLessonId(lesson.id);
                                  setViewMode('guide');
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                  viewMode === 'guide'
                                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <BookOpen className="w-3 h-3 text-emerald-600" />
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
                                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  <span>Practice Challenge</span>
                                </span>
                                {completed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
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

      {/* Main View Area */}
      {viewMode === 'guide' ? (
        /* MODE 1: LESSON GUIDE */
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
                  <PanelLeftOpen className="w-4 h-4 text-emerald-600" />
                  <span>Modules</span>
                </button>
              )}

              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {currentLesson.moduleTitle}
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  {currentLesson.title}
                </h1>
                <p className="text-sm text-slate-500 mt-1">{currentLesson.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('guide')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-emerald-800 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
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
                <span>{isReviewed ? 'Completed' : 'Mark Completed'}</span>
              </button>
            </div>
          </div>

          {/* Guide Content */}
          <div className="space-y-6">
            {currentLesson.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                {renderFormattedText(sec.body)}

                {/* Mathematical Formula Callout */}
                {sec.formula && (
                  <div className="my-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 text-white border border-emerald-800/60 shadow-md">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-800/40 text-xs">
                      <span className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-emerald-400 text-[11px]">
                        <Calculator className="w-4 h-4 text-emerald-400" />
                        {sec.formula.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[10px] font-semibold">
                        Formula Definition
                      </span>
                    </div>

                    <div className="py-2 text-center">
                      <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 font-mono text-base sm:text-lg font-bold text-emerald-300 tracking-wide shadow-inner">
                        {sec.formula.expression}
                      </div>
                    </div>

                    {sec.formula.variables && sec.formula.variables.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-emerald-800/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        {sec.formula.variables.map((v, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-700/60"
                          >
                            <code className="text-emerald-400 font-bold font-mono text-xs">{v.name}</code>
                            <span className="text-slate-300 text-[11px] leading-snug">{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Example Python Code Block */}
                {sec.exampleCode && (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                      <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        Python 3 Example
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(sec.exampleCode!);
                          }}
                          className="hover:text-slate-200 transition-colors flex items-center gap-1 text-[11px] text-slate-400"
                          title="Copy code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                        <button
                          onClick={() => onOpenPlaygroundWithCode(sec.exampleCode!)}
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold text-[11px] transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>Try in Playground</span>
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre leading-[1.85]">
                      {sec.exampleCode}
                    </pre>
                  </div>
                )}
              </div>
            ))}

            {/* Common Mistake to Avoid */}
            {currentLesson.commonMistake && (
              <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Common Mistake to Avoid</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-900 leading-relaxed">
                    <span className="font-bold block text-rose-950 mb-1.5 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      Don't do this:
                    </span>
                    <pre className="whitespace-pre-wrap font-mono text-[12px]">{currentLesson.commonMistake.wrongCode}</pre>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 leading-relaxed">
                    <span className="font-bold block text-emerald-950 mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Do this instead:
                    </span>
                    <pre className="whitespace-pre-wrap font-mono text-[12px]">{currentLesson.commonMistake.correctCode}</pre>
                  </div>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed pt-1 font-medium">
                  {currentLesson.commonMistake.explanation}
                </p>
              </div>
            )}

            {/* Quick Reference Table */}
            {currentLesson.quickReference && currentLesson.quickReference.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quick Syntax Reference</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border-light bg-slate-50 shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border-light text-slate-600 bg-slate-100/60">
                        <th className="p-3 font-semibold">What you want to do</th>
                        <th className="p-3 font-semibold font-mono">Python Syntax</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light bg-white font-mono">
                      {currentLesson.quickReference.map((ref, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3 text-slate-800 font-sans font-medium">{ref.goal}</td>
                          <td className="p-3 text-emerald-700 font-bold">{ref.syntax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Launchpad Card */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/80 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1 text-left">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
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
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all"
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
                currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Lesson</span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Lesson {currentIndex + 1} of {PYTHON_LESSONS.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentIndex === PYTHON_LESSONS.length - 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                currentIndex === PYTHON_LESSONS.length - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* MODE 2: CHALLENGE STUDIO */
        <div className="flex-1 h-full min-w-0 bg-white border border-border-light rounded-2xl shadow-xs p-5 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-border-light flex-shrink-0">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  title="Expand Modules Sidebar"
                >
                  <PanelLeftOpen className="w-4 h-4 text-emerald-600" />
                  <span>Modules</span>
                </button>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-emerald-800 shadow-xs"
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

          {/* Split Body */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 overflow-hidden">
            {/* Left Column */}
            <div className="lg:col-span-5 h-full overflow-y-auto pr-2 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                <div>
                  <strong className="text-slate-900 block font-semibold mb-0.5">Problem Context:</strong>
                  <p className="text-slate-600 leading-relaxed">{currentLesson.challenge.scenario}</p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <strong className="text-emerald-700 block font-semibold mb-0.5">Your Goal:</strong>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {currentLesson.challenge.instructions}
                  </p>
                </div>
              </div>

              {/* Hints */}
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
                      {currentLesson.challenge.hints.slice(0, activeHintIndex + 1).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="font-mono text-amber-600 font-bold">{hIdx + 1}.</span>
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Solution Walkthrough */}
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
                        Expected Python Solution:
                      </span>
                      <pre className="text-emerald-400 bg-slate-950 p-2.5 rounded-lg overflow-x-auto leading-relaxed">
                        {currentLesson.challenge.expectedCode}
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

            {/* Right Column */}
            <div className="lg:col-span-7 h-full overflow-y-auto space-y-3.5 pl-1 pr-1">
              <PythonEditor
                value={currentCode}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                onReset={handleResetChallenge}
                rows={9}
              />

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleCheckSolution}
                  disabled={isValidating}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isValidating ? 'Checking...' : 'Check Solution'}</span>
                </button>
              </div>

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
                      {validationState.passed ? 'Challenge Passed!' : 'Output Mismatch:'}
                    </strong>
                    <p className="mt-0.5 leading-relaxed">{validationState.message}</p>
                  </div>
                </div>
              )}

              {/* Execution Results */}
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
                    {execResult.error && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded font-mono text-xs text-rose-700 whitespace-pre-wrap">
                        {execResult.error}
                      </div>
                    )}
                    {execResult.stdout && (
                      <div className="p-3 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed shadow-inner max-h-[220px]">
                        {execResult.stdout}
                      </div>
                    )}
                    {execResult.plots.length > 0 && (
                      <div className="space-y-2">
                        {execResult.plots.map((plot, i) => (
                          <div key={i} className="bg-white p-2 rounded-xl border border-slate-200 flex justify-center">
                            <img
                              src={`data:image/png;base64,${plot}`}
                              alt="Generated Plot"
                              className="max-h-[280px] object-contain rounded"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {execResult.dataframe && (
                      <div className="overflow-auto max-h-[200px] bg-white rounded-lg border border-slate-200">
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
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 text-slate-700">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400 font-mono">
                    Run your Python code to see results here.
                  </div>
                )}
              </div>

              {/* Bottom Nav */}
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
                  Lesson {currentIndex + 1} of {PYTHON_LESSONS.length}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === PYTHON_LESSONS.length - 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    currentIndex === PYTHON_LESSONS.length - 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
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
