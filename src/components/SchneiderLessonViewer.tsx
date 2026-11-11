import React, { useState } from 'react';
import {
  SCHNEIDER_LESSONS,
  SCHNEIDER_MODULES,
  type SchneiderLesson
} from '../data/schneiderCurriculum';
import { FormattedLessonBody } from './FormattedLessonBody';
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  CheckCircle2,
  Database,
  Layers,
  ShieldCheck,
  Code2,
  Target,
  Clock,
  Award
} from 'lucide-react';

interface SchneiderLessonViewerProps {
  reviewedLessons: string[];
  onToggleReviewed: (lessonId: string) => void;
}

export const SchneiderLessonViewer: React.FC<SchneiderLessonViewerProps> = ({
  reviewedLessons,
  onToggleReviewed
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get('schneider_lesson');
    if (paramId && SCHNEIDER_LESSONS.some((l) => l.id === paramId)) {
      return paramId;
    }
    return SCHNEIDER_LESSONS[0].id;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const currentLesson: SchneiderLesson =
    SCHNEIDER_LESSONS.find((l) => l.id === selectedLessonId) || SCHNEIDER_LESSONS[0];
  const currentIndex = SCHNEIDER_LESSONS.findIndex((l) => l.id === selectedLessonId);
  const isReviewed = reviewedLessons.includes(currentLesson.id);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Target':
        return <Target className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleSelectLesson = (id: string) => {
    setSelectedLessonId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('schneider_lesson', id);
    window.history.replaceState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentIndex < SCHNEIDER_LESSONS.length - 1) {
      handleSelectLesson(SCHNEIDER_LESSONS[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleSelectLesson(SCHNEIDER_LESSONS[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Sidebar Navigation */}
      <aside
        className={`transition-all duration-300 w-full lg:w-80 shrink-0 ${
          isSidebarOpen ? 'block' : 'hidden lg:block lg:w-16'
        }`}
      >
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden sticky top-6">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Schneider Curriculum
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors"
              title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Module & Lessons List */}
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-3 space-y-4">
            {SCHNEIDER_MODULES.map((module) => {
              const moduleLessons = SCHNEIDER_LESSONS.filter(
                (l) => l.moduleId === module.id
              );
              const completedInMod = moduleLessons.filter((l) =>
                reviewedLessons.includes(l.id)
              ).length;

              return (
                <div key={module.id} className="space-y-1.5">
                  <div className="px-2 py-1 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      {getModuleIcon(module.iconName)}
                      <span>Part {module.number}</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">
                      {completedInMod}/{moduleLessons.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {moduleLessons.map((lesson) => {
                      const isSelected = lesson.id === currentLesson.id;
                      const isDone = reviewedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lesson.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                  isSelected
                                    ? 'border-emerald-500 text-emerald-700 bg-emerald-100/60'
                                    : 'border-slate-300 text-slate-500'
                                }`}
                              >
                                {lesson.number}
                              </span>
                            )}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-semibold text-[13px] leading-snug">
                              {lesson.title}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {lesson.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick shortcuts footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Progress: {reviewedLessons.length} / {SCHNEIDER_LESSONS.length}
            </span>
            <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{
                  width: `${(reviewedLessons.length / SCHNEIDER_LESSONS.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 w-full space-y-6">
        {/* Lesson Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/40 via-teal-50/20 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                Schneider Data Office Guide • Part {currentLesson.number}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {currentLesson.durationMinutes} min read
              </span>
            </div>

            <button
              onClick={() => onToggleReviewed(currentLesson.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                isReviewed
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isReviewed ? 'Reviewed ✓' : 'Mark as Reviewed'}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentLesson.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            {currentLesson.subtitle}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {currentLesson.sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6"
            >
              {section.title && section.title !== 'Overview' && (
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
                  <span className="w-1.5 h-5 rounded-full bg-emerald-500"></span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {section.title}
                  </h2>
                </div>
              )}
              <FormattedLessonBody text={section.body} theme="emerald" />
            </div>
          ))}
        </div>

        {/* Key Takeaways Card */}
        {currentLesson.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white rounded-2xl border border-emerald-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-3">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Key Interview Takeaways</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {currentLesson.keyTakeaways.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span className="leading-relaxed font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Navigation Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Part
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Part {currentIndex + 1} of {SCHNEIDER_LESSONS.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === SCHNEIDER_LESSONS.length - 1}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentIndex === SCHNEIDER_LESSONS.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
            }`}
          >
            Next Part
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
