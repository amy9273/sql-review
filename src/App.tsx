import { useState, useEffect } from 'react';
import { Navbar, type TrackType } from './components/Navbar';
import { LessonViewer } from './components/LessonViewer';
import { ActivityRunner } from './components/ActivityRunner';
import { SchemaViewer } from './components/SchemaViewer';
import { Playground } from './components/Playground';
import { PythonLessonViewer } from './components/PythonLessonViewer';
import { PythonActivityRunner } from './components/PythonActivityRunner';
import { PythonDatasetViewer } from './components/PythonDatasetViewer';
import { PythonPlayground } from './components/PythonPlayground';
import { LESSONS, ACTIVITIES } from './data/curriculum';
import { PYTHON_LESSONS, PYTHON_EXERCISES } from './data/pythonCurriculum';
import { initDatabase } from './lib/sqliteEngine';
import { initPyodide } from './lib/pythonEngine';

export default function App() {
  const [track, setTrack] = useState<TrackType>(() => {
    return (localStorage.getItem('de_academy_active_track') as TrackType) || 'sql';
  });

  const [activeTab, setActiveTab] = useState<'lessons' | 'activities' | 'schemas' | 'playground'>('lessons');
  const [playgroundSql, setPlaygroundSql] = useState<string | undefined>(undefined);
  const [playgroundPythonCode, setPlaygroundPythonCode] = useState<string | undefined>(undefined);
  const [schemaTargetTable, setSchemaTargetTable] = useState<string | undefined>(undefined);
  const [targetCsvDataset, setTargetCsvDataset] = useState<string | undefined>(undefined);

  // SQL LocalStorage state
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

  // Python LocalStorage state
  const [completedPythonExercises, setCompletedPythonExercises] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('python_review_completed_exercises');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviewedPythonLessons, setReviewedPythonLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('python_review_reviewed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Pre-initialize SQLite and Pyodide on mount
  useEffect(() => {
    initDatabase().catch((err) => console.error('Failed to init SQLite:', err));
    // Warm up Pyodide in background
    if (window.loadPyodide) {
      initPyodide().catch((err) => console.error('Failed to pre-warm Pyodide:', err));
    }
  }, []);

  // Save Track
  useEffect(() => {
    localStorage.setItem('de_academy_active_track', track);
  }, [track]);

  // Save SQL progress
  useEffect(() => {
    localStorage.setItem('sql_review_completed_activities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  useEffect(() => {
    localStorage.setItem('sql_review_reviewed_lessons', JSON.stringify(reviewedLessons));
  }, [reviewedLessons]);

  // Save Python progress
  useEffect(() => {
    localStorage.setItem(
      'python_review_completed_exercises',
      JSON.stringify(completedPythonExercises)
    );
  }, [completedPythonExercises]);

  useEffect(() => {
    localStorage.setItem('python_review_reviewed_lessons', JSON.stringify(reviewedPythonLessons));
  }, [reviewedPythonLessons]);

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

  const handleCompletePythonExercise = (exerciseId: string) => {
    if (!completedPythonExercises.includes(exerciseId)) {
      setCompletedPythonExercises((prev) => [...prev, exerciseId]);
    }
  };

  const handleToggleReviewedPythonLesson = (lessonId: string) => {
    setReviewedPythonLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleResetProgress = () => {
    const trackName = track === 'sql' ? 'SQL' : 'Python';
    if (confirm(`Are you sure you want to reset all your ${trackName} progress?`)) {
      if (track === 'sql') {
        setCompletedActivities([]);
        setReviewedLessons([]);
        localStorage.removeItem('sql_review_completed_activities');
        localStorage.removeItem('sql_review_reviewed_lessons');
      } else {
        setCompletedPythonExercises([]);
        setReviewedPythonLessons([]);
        localStorage.removeItem('python_review_completed_exercises');
        localStorage.removeItem('python_review_reviewed_lessons');
      }
    }
  };

  const handleOpenPlaygroundWithSql = (sql: string) => {
    setPlaygroundSql(sql);
    setActiveTab('playground');
  };

  const handleOpenPlaygroundWithPythonCode = (code: string) => {
    setPlaygroundPythonCode(code);
    setActiveTab('playground');
  };

  const handleOpenSchemaForTable = (tableName: string) => {
    setSchemaTargetTable(tableName);
    setActiveTab('schemas');
  };

  const handleOpenDatasetViewer = (filename: string) => {
    setTargetCsvDataset(filename);
    setActiveTab('schemas');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        track={track}
        setTrack={setTrack}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedActivities={completedActivities}
        totalActivities={ACTIVITIES.length}
        reviewedLessons={reviewedLessons}
        totalLessons={LESSONS.length}
        completedPythonExercises={completedPythonExercises}
        totalPythonExercises={PYTHON_EXERCISES.length}
        reviewedPythonLessons={reviewedPythonLessons}
        totalPythonLessons={PYTHON_LESSONS.length}
        onResetProgress={handleResetProgress}
      />

      {/* Main Learning Space */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {track === 'sql' ? (
          /* ========================================================= */
          /* SQL TRACK                                                 */
          /* ========================================================= */
          <>
            {activeTab === 'lessons' && (
              <LessonViewer
                reviewedLessons={reviewedLessons}
                onToggleReviewed={handleToggleReviewedLesson}
                onOpenPlaygroundWithSql={handleOpenPlaygroundWithSql}
                onOpenSchemaForTable={handleOpenSchemaForTable}
              />
            )}

            {activeTab === 'activities' && (
              <ActivityRunner
                completedActivities={completedActivities}
                onCompleteActivity={handleCompleteActivity}
                onOpenSchemaForTable={handleOpenSchemaForTable}
              />
            )}

            {activeTab === 'schemas' && (
              <SchemaViewer initialSelectedTable={schemaTargetTable} />
            )}

            {activeTab === 'playground' && <Playground initialSql={playgroundSql} />}
          </>
        ) : (
          /* ========================================================= */
          /* PYTHON TRACK (pandas, numpy, matplotlib, data processing) */
          /* ========================================================= */
          <>
            {activeTab === 'lessons' && (
              <PythonLessonViewer
                reviewedLessons={reviewedPythonLessons}
                onToggleReviewed={handleToggleReviewedPythonLesson}
                onOpenPlaygroundWithCode={handleOpenPlaygroundWithPythonCode}
              />
            )}

            {activeTab === 'activities' && (
              <PythonActivityRunner
                completedExercises={completedPythonExercises}
                onCompleteExercise={handleCompletePythonExercise}
                onOpenDatasetViewer={handleOpenDatasetViewer}
              />
            )}

            {activeTab === 'schemas' && (
              <PythonDatasetViewer initialSelectedCsv={targetCsvDataset} />
            )}

            {activeTab === 'playground' && (
              <PythonPlayground initialCode={playgroundPythonCode} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-3.5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span>Data Engineering Academy — SQL & Python Review Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">SQL: 23 Lessons • 10 Drills</span>
            <span>•</span>
            <span className="font-mono">Python: 60 Lessons • 8 Practical Drills</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
