import React from 'react';
import { Database, BookOpen, Flame, Terminal, Layers, CheckCircle2, RotateCcw } from 'lucide-react';

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
    <header className="sticky top-0 z-50 border-b border-surface-border bg-canvas/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-violet to-electric-lavender flex items-center justify-center shadow-lg shadow-royal-violet/20">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">SQL Forge</span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-aubergine-light text-lilac-pale border border-royal-violet/30">
                  DE Edition
                </span>
              </div>
              <p className="text-xs text-surface-muted hidden sm:block">Data Engineering SQL Review & Sandbox</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'lessons'
                  ? 'bg-aubergine text-electric-lavender border border-royal-violet/50 shadow-sm'
                  : 'text-surface-muted hover:text-white hover:bg-aubergine-dark'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lessons</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-surface-card text-surface-muted font-mono">
                {reviewedLessons.length}/{totalLessons}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'activities'
                  ? 'bg-aubergine text-electric-lavender border border-royal-violet/50 shadow-sm'
                  : 'text-surface-muted hover:text-white hover:bg-aubergine-dark'
              }`}
            >
              <Flame className="w-4 h-4 text-neon-amber" />
              <span>Activities</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-neon-emerald/20 text-neon-emerald font-mono font-semibold">
                {completedActivities.length}/{totalActivities}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schemas')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'schemas'
                  ? 'bg-aubergine text-electric-lavender border border-royal-violet/50 shadow-sm'
                  : 'text-surface-muted hover:text-white hover:bg-aubergine-dark'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden md:inline">Database Schemas</span>
              <span className="md:hidden">Schemas</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'playground'
                  ? 'bg-aubergine text-electric-lavender border border-royal-violet/50 shadow-sm'
                  : 'text-surface-muted hover:text-white hover:bg-aubergine-dark'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden md:inline">SQL Playground</span>
              <span className="md:hidden">Console</span>
            </button>
          </nav>

          {/* Progress & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 pr-3 border-r border-surface-border">
              <div className="text-right">
                <div className="text-xs text-surface-muted flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neon-emerald" />
                  <span>Mastery</span>
                </div>
                <div className="font-mono text-xs font-bold text-white">{percentComplete}% Done</div>
              </div>
              <div className="w-20 bg-surface-card rounded-full h-2 overflow-hidden border border-surface-border">
                <div
                  className="bg-gradient-to-r from-royal-violet to-neon-emerald h-full transition-all duration-500 rounded-full"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={onResetProgress}
              title="Reset All Progress"
              className="p-2 text-surface-muted hover:text-neon-rose hover:bg-surface-card rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/amy9273/sql-review"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-surface-muted hover:text-white hover:bg-surface-card rounded-lg transition-colors"
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
