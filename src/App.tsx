import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonViewer } from './components/LessonViewer';
import { ActivityRunner } from './components/ActivityRunner';
import { SchemaViewer } from './components/SchemaViewer';
import { Playground } from './components/Playground';
import { LESSONS, ACTIVITIES } from './data/curriculum';
import { initDatabase } from './lib/sqliteEngine';
import { Sparkles, Flame, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'activities' | 'schemas' | 'playground'>('lessons');
  const [playgroundSql, setPlaygroundSql] = useState<string | undefined>(undefined);
  const [schemaTargetTable, setSchemaTargetTable] = useState<string | undefined>(undefined);

  // LocalStorage state for progress
  const [completedActivities, setCompletedActivities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sql_review_completed_activities');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviewedLessons, setReviewedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sql_review_reviewed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Pre-initialize database on mount
  useEffect(() => {
    initDatabase().catch((err) => console.error('Failed to init SQLite:', err));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('sql_review_completed_activities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  useEffect(() => {
    localStorage.setItem('sql_review_reviewed_lessons', JSON.stringify(reviewedLessons));
  }, [reviewedLessons]);

  const handleCompleteActivity = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities((prev) => [...prev, activityId]);
    }
  };

  const handleToggleReviewedLesson = (lessonId: string) => {
    setReviewedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all your lesson and exercise progress?')) {
      setCompletedActivities([]);
      setReviewedLessons([]);
      localStorage.removeItem('sql_review_completed_activities');
      localStorage.removeItem('sql_review_reviewed_lessons');
    }
  };

  const handleOpenPlaygroundWithSql = (sql: string) => {
    setPlaygroundSql(sql);
    setActiveTab('playground');
  };

  const handleOpenSchemaForTable = (tableName: string) => {
    setSchemaTargetTable(tableName);
    setActiveTab('schemas');
  };

  return (
    <div className="min-h-screen bg-void text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedActivities={completedActivities}
        totalActivities={ACTIVITIES.length}
        reviewedLessons={reviewedLessons}
        totalLessons={LESSONS.length}
        onResetProgress={handleResetProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-aubergine-dark via-surface-card to-aubergine border border-royal-violet/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-royal-violet/15 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-violet/20 border border-royal-violet/40 text-electric-lavender text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Data Engineering Technical Interview Review</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Master Joins, CTEs, Window Functions & NULL Logic
              </h1>
              <p className="text-xs sm:text-sm text-surface-muted mt-1.5 max-w-2xl leading-relaxed">
                Review the core principles from your notes, experiment with real in-browser SQLite WebAssembly, and test
                your queries against 10 practical engineering exercises.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-surface-elevated/80 border border-surface-border text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-electric-lavender font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Modules</span>
                </div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">
                  {reviewedLessons.length}/{LESSONS.length}
                </div>
              </div>

              <div className="px-4 py-3 rounded-xl bg-surface-elevated/80 border border-surface-border text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-neon-emerald font-mono">
                  <Flame className="w-3.5 h-3.5 text-neon-amber" />
                  <span>Drills</span>
                </div>
                <div className="text-lg font-bold font-mono text-neon-emerald mt-0.5">
                  {completedActivities.length}/{ACTIVITIES.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'lessons' && (
          <LessonViewer
            reviewedLessons={reviewedLessons}
            onToggleReviewed={handleToggleReviewedLesson}
            onOpenPlaygroundWithSql={handleOpenPlaygroundWithSql}
          />
        )}

        {activeTab === 'activities' && (
          <ActivityRunner
            completedActivities={completedActivities}
            onCompleteActivity={handleCompleteActivity}
            onOpenSchemaForTable={handleOpenSchemaForTable}
          />
        )}

        {activeTab === 'schemas' && <SchemaViewer initialSelectedTable={schemaTargetTable} />}

        {activeTab === 'playground' && <Playground initialSql={playgroundSql} />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-surface-border bg-canvas/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-muted">
          <div className="flex items-center gap-2">
            <span>Built for Data Engineering review with React 19 + SQLite WASM</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('lessons')} className="hover:text-white transition-colors">
              Lessons
            </button>
            <button onClick={() => setActiveTab('activities')} className="hover:text-white transition-colors">
              Activities
            </button>
            <button onClick={() => setActiveTab('playground')} className="hover:text-white transition-colors">
              Playground
            </button>
            <a
              href="https://github.com/amy9273/sql-review"
              target="_blank"
              rel="noreferrer"
              className="text-electric-lavender hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
