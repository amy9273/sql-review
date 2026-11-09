import React from 'react';
import { Database, BookOpen, CheckCircle2, RotateCcw, Flame, Layers, Terminal } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white border-b border-border-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">SQL Academy</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
                  Data Engineering
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Interactive Review & Practice Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'lessons'
                  ? 'bg-brand-50 text-brand-600 border border-brand-100 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lessons</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                {reviewedLessons.length}/{totalLessons}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'activities'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Practice Exercises</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 font-mono font-semibold">
                {completedActivities.length}/{totalActivities}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schemas')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'schemas'
                  ? 'bg-brand-50 text-brand-600 border border-brand-100 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden md:inline">Database Tables</span>
              <span className="md:hidden">Tables</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'playground'
                  ? 'bg-brand-50 text-brand-600 border border-brand-100 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden md:inline">SQL Playground</span>
              <span className="md:hidden">Console</span>
            </button>
          </nav>

          {/* Progress & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 pr-3 border-r border-border-light">
              <div className="text-right">
                <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exercises Solved</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-800">
                  {completedActivities.length} of {totalActivities} ({percentComplete}%)
                </div>
              </div>
              <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={onResetProgress}
              title="Reset All Progress"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/amy9273/sql-review"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
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
