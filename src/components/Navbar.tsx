import React from 'react';
import {
  Database,
  BookOpen,
  Flame,
  Layers,
  Terminal,
  RotateCcw,
  Code2,
  FileSpreadsheet
} from 'lucide-react';

export type TrackType = 'sql' | 'python';

interface NavbarProps {
  track: TrackType;
  setTrack: (track: TrackType) => void;
  activeTab: 'lessons' | 'activities' | 'schemas' | 'playground';
  setActiveTab: (tab: 'lessons' | 'activities' | 'schemas' | 'playground') => void;
  completedActivities: string[];
  totalActivities: number;
  reviewedLessons: string[];
  totalLessons: number;
  completedPythonExercises: string[];
  totalPythonExercises: number;
  reviewedPythonLessons: string[];
  totalPythonLessons: number;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  track,
  setTrack,
  activeTab,
  setActiveTab,
  completedActivities,
  totalActivities,
  reviewedLessons,
  totalLessons,
  completedPythonExercises,
  totalPythonExercises,
  reviewedPythonLessons,
  totalPythonLessons,
  onResetProgress
}) => {
  const isSql = track === 'sql';

  const solvedCount = isSql ? completedActivities.length : completedPythonExercises.length;
  const totalCount = isSql ? totalActivities : totalPythonExercises;
  const percentComplete = Math.round((solvedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Track Switcher */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs transition-colors ${
                  isSql ? 'bg-indigo-600' : 'bg-emerald-600'
                }`}
              >
                {isSql ? <Database className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight whitespace-nowrap">
                  DE Academy
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {isSql ? 'SQL Review' : 'Python Review'}
                </span>
              </div>
            </div>

            {/* Track Switcher Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setTrack('sql')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isSql
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-indigo-600" />
                <span>SQL</span>
              </button>
              <button
                onClick={() => setTrack('python')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  !isSql
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Python</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'lessons'
                  ? isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lessons</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'lessons'
                    ? isSql
                      ? 'bg-indigo-700 text-indigo-100'
                      : 'bg-emerald-700 text-emerald-100'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isSql
                  ? `${reviewedLessons.length}/${totalLessons}`
                  : `${reviewedPythonLessons.length}/${totalPythonLessons}`}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'activities'
                  ? isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className={`w-4 h-4 ${isSql ? 'text-amber-400' : 'text-amber-300'}`} />
              <span>Practice Exercises</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'activities'
                    ? isSql
                      ? 'bg-indigo-700 text-indigo-100'
                      : 'bg-emerald-700 text-emerald-100'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {isSql
                  ? `${completedActivities.length}/${totalActivities}`
                  : `${completedPythonExercises.length}/${totalPythonExercises}`}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schemas')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'schemas'
                  ? isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isSql ? <Layers className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{isSql ? 'Database Tables' : 'CSV Datasets'}</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'playground'
                  ? isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Playground</span>
            </button>
          </nav>

          {/* Progress Tracker & Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Drills Solved:</span>
              <span className="font-mono font-bold text-slate-900">
                {solvedCount} of {totalCount} ({percentComplete}%)
              </span>
              <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isSql ? 'bg-indigo-600' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={onResetProgress}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
