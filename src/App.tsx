import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonViewer } from './components/LessonViewer';
import { ActivityRunner } from './components/ActivityRunner';
import { SchemaViewer } from './components/SchemaViewer';
import { Playground } from './components/Playground';
import { LESSONS, ACTIVITIES } from './data/curriculum';
import { initDatabase } from './lib/sqliteEngine';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedActivities={completedActivities}
        totalActivities={ACTIVITIES.length}
        reviewedLessons={reviewedLessons}
        totalLessons={LESSONS.length}
        onResetProgress={handleResetProgress}
      />

      {/* Main Learning Space - Direct into the content without banner bloat */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span>SQL Academy — Interactive Data Engineering Review</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('lessons')} className="hover:text-slate-900 transition-colors">
              Lessons
            </button>
            <button onClick={() => setActiveTab('activities')} className="hover:text-slate-900 transition-colors">
              Practice Exercises
            </button>
            <button onClick={() => setActiveTab('playground')} className="hover:text-slate-900 transition-colors">
              Playground
            </button>
            <a
              href="https://github.com/amy9273/sql-review"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
