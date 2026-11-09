import React, { useState } from 'react';
import { LESSONS } from '../data/curriculum';
import { executeQuery, type QueryResult } from '../lib/sqliteEngine';
import { BookOpen, CheckCircle, Clock, Play, ArrowRight, ArrowLeft, Sparkles, Terminal } from 'lucide-react';

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
  const [liveResult, setLiveResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const currentLesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];
  const currentIndex = LESSONS.findIndex((l) => l.id === selectedLessonId);
  const isReviewed = reviewedLessons.includes(currentLesson.id);

  const handleRunExample = async () => {
    setIsRunning(true);
    const result = await executeQuery(currentLesson.starterSql);
    setLiveResult(result);
    setIsRunning(false);
  };

  const goToNext = () => {
    if (currentIndex < LESSONS.length - 1) {
      setSelectedLessonId(LESSONS[currentIndex + 1].id);
      setLiveResult(null);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(LESSONS[currentIndex - 1].id);
      setLiveResult(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar List of Lessons */}
      <div className="lg:col-span-4 bg-surface-card border border-surface-border rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-surface-muted flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-electric-lavender" />
            Curriculum Modules
          </h2>
          <span className="text-xs font-mono text-electric-lavender font-medium">
            {reviewedLessons.length} / {LESSONS.length} Done
          </span>
        </div>

        <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {LESSONS.map((lesson, idx) => {
            const active = lesson.id === selectedLessonId;
            const completed = reviewedLessons.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setSelectedLessonId(lesson.id);
                  setLiveResult(null);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                  active
                    ? 'bg-aubergine-light text-white border-royal-violet shadow-md'
                    : 'bg-surface-elevated/40 text-surface-muted hover:bg-surface-elevated hover:text-white border-transparent'
                }`}
              >
                <div className="mt-0.5">
                  {completed ? (
                    <CheckCircle className="w-4 h-4 text-neon-emerald flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-surface-border flex items-center justify-center text-[10px] font-mono text-surface-muted">
                      {idx + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-void/60 text-lilac-pale">
                      {lesson.category}
                    </span>
                    <span className="text-[11px] text-surface-muted font-mono">{lesson.readingTime}</span>
                  </div>
                  <h3 className="text-xs font-medium text-white truncate">{lesson.title}</h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 lg:p-8 shadow-xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-surface-border">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-royal-violet/30 text-lilac-pale border border-royal-violet/50">
                  {currentLesson.category}
                </span>
                <span className="text-xs text-surface-muted flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {currentLesson.readingTime} read
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{currentLesson.title}</h1>
              <p className="text-sm text-surface-muted mt-1">{currentLesson.subtitle}</p>
            </div>

            <button
              onClick={() => onToggleReviewed(currentLesson.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isReviewed
                  ? 'bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/40 hover:bg-neon-emerald/30'
                  : 'bg-surface-elevated text-surface-muted hover:text-white border border-surface-border hover:border-royal-violet'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isReviewed ? 'text-neon-emerald' : 'text-surface-muted'}`} />
              <span>{isReviewed ? 'Completed' : 'Mark as Reviewed'}</span>
            </button>
          </div>

          {/* Key Takeaways Card */}
          <div className="my-6 p-4 rounded-xl bg-aubergine/60 border border-royal-violet/30">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-lilac-pale flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-electric-lavender" />
              Core Takeaways for Interviews
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {currentLesson.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-electric-lavender font-bold">›</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Content / Notes */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
            {currentLesson.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-base font-bold text-white pt-2 border-t border-surface-border/50">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeContent = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                return (
                  <pre
                    key={index}
                    className="p-4 rounded-xl bg-void border border-surface-border font-mono text-xs text-electric-lavender overflow-x-auto"
                  >
                    <code>{codeContent}</code>
                  </pre>
                );
              }
              return (
                <p key={index} className="text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Live Interactive SQL Code Box */}
          <div className="mt-8 pt-6 border-t border-surface-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-electric-lavender" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Live SQL Code Example</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenPlaygroundWithSql(currentLesson.starterSql)}
                  className="text-xs text-electric-lavender hover:underline flex items-center gap-1"
                >
                  Edit in Playground
                </button>
                <button
                  onClick={handleRunExample}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-royal-violet hover:bg-royal-glow text-white text-xs font-medium transition-all shadow-md shadow-royal-violet/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Executing...' : 'Run Query Live'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-void border border-surface-border font-mono text-xs text-lilac-pale overflow-x-auto whitespace-pre">
              {currentLesson.starterSql}
            </div>

            {/* Results Output */}
            {liveResult && (
              <div className="mt-4 p-4 rounded-xl bg-surface-elevated border border-surface-border">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border text-xs">
                  <span className="text-surface-muted">
                    Execution time:{' '}
                    <span className="text-neon-emerald font-mono font-medium">{liveResult.executionTimeMs} ms</span>
                  </span>
                  <span className="text-surface-muted">
                    Rows: <span className="text-white font-mono">{liveResult.values.length}</span>
                  </span>
                </div>

                {liveResult.error ? (
                  <div className="p-3 rounded-lg bg-neon-rose/10 border border-neon-rose/30 text-neon-rose text-xs font-mono">
                    {liveResult.error}
                  </div>
                ) : (
                  <div className="max-h-60 overflow-auto rounded-lg border border-surface-border">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-void/80 text-lilac-pale sticky top-0">
                        <tr>
                          {liveResult.columns.map((col, i) => (
                            <th key={i} className="p-2 border-b border-surface-border font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-border">
                        {liveResult.values.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-aubergine/40 transition-colors">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2 text-slate-300">
                                {val === null ? (
                                  <span className="text-neon-amber italic">NULL</span>
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
              <span>Previous Lesson</span>
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex === LESSONS.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                currentIndex === LESSONS.length - 1
                  ? 'opacity-40 cursor-not-allowed text-surface-muted'
                  : 'bg-royal-violet hover:bg-royal-glow text-white shadow-md shadow-royal-violet/20'
              }`}
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
