import React from 'react';
import { Database, BookOpen, Flame, Layers, Terminal, CheckCircle2, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: 'lessons' | 'activities' | 'schemas' | 'playground';
  setActiveTab: (tab: 'lessons' | 'activities' | 'schemas' | 'playground') => void;
  completedActivities: string[];
  totalActivities: number;
  reviewedLessons: string[];
  totalLessons: number;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  completedActivities,
  totalActivities,
  reviewedLessons,
  totalLessons,
  onResetProgress,
}) => {
  const percentComplete = Math.round((completedActivities.length / totalActivities) * 100);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand - Always single-line, never wraps */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base tracking-tight whitespace-nowrap">
                SQL Academy
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap">
                DE Review
              </span>
            </div>
          </div>

          {/* Navigation Tabs - Clean segmented pills */}
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'lessons'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lessons</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'lessons' ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {reviewedLessons.length}/{totalLessons}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'activities'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Practice Exercises</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'activities' ? 'bg-indigo-700 text-indigo-100' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {completedActivities.length}/{totalActivities}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schemas')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'schemas'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Database Tables</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'playground'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Playground</span>
            </button>
          </nav>

          {/* Progress Tracker & Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-3 pr-3 border-r border-slate-200">
              <div className="text-right">
                <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Progress</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {completedActivities.length}/{totalActivities} ({percentComplete}%)
                </div>
              </div>
              <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={onResetProgress}
              title="Reset All Progress"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/amy9273/sql-review"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="View on GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
