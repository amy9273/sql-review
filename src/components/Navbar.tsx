import React from 'react';
import {
  Database,
  BookOpen,
  Flame,
  Layers,
  Terminal,
  RotateCcw,
  Code2,
  FileSpreadsheet,
  ShieldCheck,
  Target,
  Zap,
  Table,
  Filter,
  Sparkles
} from 'lucide-react';

export type TrackType = 'sql' | 'python' | 'schneider' | 'excel';

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
  reviewedSchneiderLessons?: string[];
  totalSchneiderLessons?: number;
  completedSchneiderDrills?: string[];
  totalSchneiderDrills?: number;
  completedExcelTasks?: string[];
  totalExcelTasks?: number;
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
  reviewedSchneiderLessons = [],
  totalSchneiderLessons = 14,
  completedSchneiderDrills = [],
  totalSchneiderDrills = 18,
  completedExcelTasks = [],
  totalExcelTasks = 6,
  onResetProgress
}) => {
  const isSql = track === 'sql';
  const isSchneider = track === 'schneider';
  const isExcel = track === 'excel';

  let solvedCount = completedActivities.length;
  let totalCount = totalActivities;
  if (track === 'python') {
    solvedCount = completedPythonExercises.length;
    totalCount = totalPythonExercises;
  } else if (isSchneider) {
    solvedCount = completedSchneiderDrills.length;
    totalCount = totalSchneiderDrills;
  } else if (isExcel) {
    solvedCount = completedExcelTasks.length;
    totalCount = totalExcelTasks;
  }

  const percentComplete = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Track Switcher */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs transition-colors ${
                  isSchneider || isExcel
                    ? 'bg-emerald-600'
                    : isSql
                    ? 'bg-indigo-600'
                    : 'bg-teal-600'
                }`}
              >
                {isSchneider ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : isExcel ? (
                  <FileSpreadsheet className="w-5 h-5" />
                ) : isSql ? (
                  <Database className="w-5 h-5" />
                ) : (
                  <Code2 className="w-5 h-5" />
                )}
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight whitespace-nowrap">
                  DE Academy
                </span>
                <span className="text-[10px] text-slate-400 block font-mono font-medium">
                  {isSchneider
                    ? 'Schneider Electric DE'
                    : isExcel
                    ? 'Excel Review'
                    : isSql
                    ? 'SQL Review'
                    : 'Python Review'}
                </span>
              </div>
            </div>

            {/* Track Switcher Pills (SQL / Python / Schneider) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold gap-0.5">
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
                  track === 'python'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Python</span>
              </button>
              <button
                onClick={() => setTrack('excel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isExcel
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Excel</span>
              </button>
              <button
                onClick={() => setTrack('schneider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isSchneider
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Schneider Prep</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 shrink-0">
            {/* Tab 1: Lessons / Guide */}
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'lessons'
                  ? isSchneider || isExcel
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isSchneider ? 'Guide' : isExcel ? 'Formulas' : 'Lessons'}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'lessons'
                    ? 'bg-black/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isSchneider
                  ? `${reviewedSchneiderLessons.length}/${totalSchneiderLessons}`
                  : isExcel
                  ? '7 Core'
                  : isSql
                  ? `${reviewedLessons.length}/${totalLessons}`
                  : `${reviewedPythonLessons.length}/${totalPythonLessons}`}
              </span>
            </button>

            {/* Tab 2: Activities / Drills / Pivots */}
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'activities'
                  ? isSchneider || isExcel
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isSchneider ? (
                <Target className="w-3.5 h-3.5 text-emerald-300" />
              ) : isExcel ? (
                <Table className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Flame className={`w-3.5 h-3.5 ${isSql ? 'text-amber-400' : 'text-amber-300'}`} />
              )}
              <span>{isSchneider ? 'Drills' : isExcel ? 'Pivot Simulator' : 'Exercises'}</span>
              {!isExcel && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === 'activities'
                      ? 'bg-black/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isSchneider
                    ? `${completedSchneiderDrills.length}/${totalSchneiderDrills}`
                    : isSql
                    ? `${completedActivities.length}/${totalActivities}`
                    : `${completedPythonExercises.length}/${totalPythonExercises}`}
                </span>
              )}
            </button>

            {/* Tab 3: Schemas / Scenarios / Cleansing */}
            <button
              onClick={() => setActiveTab('schemas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'schemas'
                  ? isSchneider || isExcel
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isSchneider ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : isExcel ? (
                <Filter className="w-3.5 h-3.5" />
              ) : isSql ? (
                <Layers className="w-3.5 h-3.5" />
              ) : (
                <FileSpreadsheet className="w-3.5 h-3.5" />
              )}
              <span>
                {isSchneider
                  ? 'Scenarios'
                  : isExcel
                  ? 'Data Cleansing'
                  : isSql
                  ? 'Tables'
                  : 'Datasets'}
              </span>
            </button>

            {/* Tab 4: Playground / Practicum */}
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'playground'
                  ? isSchneider || isExcel
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isSql
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isExcel ? (
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Terminal className="w-3.5 h-3.5" />
              )}
              <span>
                {isSchneider
                  ? 'SQL Practicum'
                  : isExcel
                  ? '1,000 Sales Practicum'
                  : 'Playground'}
              </span>
              {isExcel && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === 'playground'
                      ? 'bg-black/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {completedExcelTasks.length}/{totalExcelTasks}
                </span>
              )}
            </button>
          </nav>

          {/* Progress Tracker & Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">
                {isSchneider ? 'Mastery:' : isExcel ? 'Tasks Completed:' : 'Drills Solved:'}
              </span>
              <span className="font-mono font-bold text-slate-900">
                {solvedCount} of {totalCount} ({percentComplete}%)
              </span>
              <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isSchneider || isExcel
                      ? 'bg-emerald-600'
                      : isSql
                      ? 'bg-indigo-600'
                      : 'bg-teal-600'
                  }`}
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={onResetProgress}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Reset progress for active track"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
