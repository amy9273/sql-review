import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonViewer } from './components/LessonViewer';
import { ActivityRunner } from './components/ActivityRunner';
import { SchemaViewer } from './components/SchemaViewer';
import { Playground } from './components/Playground';
import { LESSONS, ACTIVITIES } from './data/curriculum';
import { initDatabase } from './lib/sqliteEngine';
import { Sparkles, BookOpen, Flame } from 'lucide-react';

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
    <div className="min-h-screen bg-canvas text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedActivities={completedActivities}
        totalActivities={ACTIVITIES.length}
        reviewedLessons={reviewedLessons}
        totalLessons={LESSONS.length}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white border border-border-light shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Interactive SQL Learning Path</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master SQL for Data Engineering
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Step-by-step lessons, visual explanations, and 10 practical hands-on drills powered by a real in-browser SQLite engine.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                <span>Lessons</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                {reviewedLessons.length} / {LESSONS.length}
              </div>
            </div>

            <div className="px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Exercises</span>
              </div>
              <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">
                {completedActivities.length} / {ACTIVITIES.length}
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
      <footer className="mt-auto border-t border-border-light bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>SQL Academy — Built with React, TypeScript & SQLite WebAssembly</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('lessons')} className="hover:text-slate-900 transition-colors">
              Lessons
            </button>
            <button onClick={() => setActiveTab('activities')} className="hover:text-slate-900 transition-colors">
              Exercises
            </button>
            <button onClick={() => setActiveTab('playground')} className="hover:text-slate-900 transition-colors">
              Playground
            </button>
            <a
              href="https://github.com/amy9273/sql-review"
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 hover:underline"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
