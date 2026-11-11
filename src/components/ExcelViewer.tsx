import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  CheckCircle2,
  Table,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Layers,
  Filter,
  Check,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  EXCEL_LESSONS,
  EXCEL_PRACTICUM_TASKS,
  SAMPLE_TRANSACTION_RECORDS,
  type ExcelLesson
} from '../data/excelCurriculum';

interface ExcelViewerProps {
  activeTab?: 'lessons' | 'activities' | 'schemas' | 'playground';
  onTabChange?: (tab: 'lessons' | 'activities' | 'schemas' | 'playground') => void;
  completedTasks?: string[];
  onToggleTask?: (taskId: string) => void;
}

export const ExcelViewer: React.FC<ExcelViewerProps> = ({
  activeTab,
  onTabChange,
  completedTasks: controlledCompletedTasks,
  onToggleTask: controlledToggleTask
}) => {
  const [internalMode, setInternalMode] = useState<'guide' | 'pivots' | 'cleansing' | 'practicum'>('guide');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(EXCEL_LESSONS[0].id);
  const [internalCompletedTasks, setInternalCompletedTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('excel_completed_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const completedTasks = controlledCompletedTasks ?? internalCompletedTasks;

  // Map activeTab to mode if provided
  const activeMode: 'guide' | 'pivots' | 'cleansing' | 'practicum' = activeTab
    ? activeTab === 'lessons'
      ? 'guide'
      : activeTab === 'activities'
      ? 'pivots'
      : activeTab === 'schemas'
      ? 'cleansing'
      : 'practicum'
    : internalMode;

  const handleModeChange = (mode: 'guide' | 'pivots' | 'cleansing' | 'practicum') => {
    setInternalMode(mode);
    if (onTabChange) {
      if (mode === 'guide') onTabChange('lessons');
      else if (mode === 'pivots') onTabChange('activities');
      else if (mode === 'cleansing') onTabChange('schemas');
      else if (mode === 'practicum') onTabChange('playground');
    }
  };

  // Pivot Table Interactive State
  const [pivotRowField, setPivotRowField] = useState<'region' | 'product'>('region');
  const [pivotValueField, setPivotValueField] = useState<'sum' | 'count'>('sum');

  // Filter lessons
  const currentLesson: ExcelLesson =
    EXCEL_LESSONS.find((l) => l.id === selectedLessonId) || EXCEL_LESSONS[0];

  const handleToggleTask = (taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }

    if (controlledToggleTask) {
      controlledToggleTask(taskId);
    } else {
      let updated: string[];
      if (internalCompletedTasks.includes(taskId)) {
        updated = internalCompletedTasks.filter((id) => id !== taskId);
      } else {
        updated = [...internalCompletedTasks, taskId];
      }
      setInternalCompletedTasks(updated);
      localStorage.setItem('excel_completed_tasks', JSON.stringify(updated));
    }
  };

  // Compute Pivot Aggregations Dynamically
  const pivotData = React.useMemo(() => {
    const validRecords = SAMPLE_TRANSACTION_RECORDS.filter((r) => !r.status.includes('Duplicate'));
    const groups: Record<string, { sum: number; count: number; items: typeof validRecords }> = {};

    validRecords.forEach((r) => {
      const key = pivotRowField === 'region' ? r.region : r.product;
      if (!groups[key]) {
        groups[key] = { sum: 0, count: 0, items: [] };
      }
      groups[key].sum += r.total;
      groups[key].count += 1;
      groups[key].items.push(r);
    });

    return Object.entries(groups).map(([groupKey, stats]) => ({
      groupKey,
      sum: stats.sum,
      count: stats.count
    }));
  }, [pivotRowField]);

  const totalPivotSum = pivotData.reduce((acc, curr) => acc + curr.sum, 0);
  const totalPivotCount = pivotData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
              <span>Business & Data Engineering Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Excel Mastery for Data Engineers
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-2xl leading-relaxed">
              Master the everyday spreadsheet tools companies rely on: XLOOKUP, INDEX/MATCH,
              SUMIFS, Pivot Tables, deduplication, and hands-on 1,000-row transaction cleaning.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center bg-black/20 p-1.5 rounded-xl border border-white/10 text-xs font-medium gap-1 self-start md:self-auto shrink-0">
            <button
              onClick={() => handleModeChange('guide')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMode === 'guide'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Formulas & Lookups</span>
            </button>
            <button
              onClick={() => handleModeChange('pivots')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMode === 'pivots'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Pivot Simulator</span>
            </button>
            <button
              onClick={() => handleModeChange('cleansing')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMode === 'cleansing'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Data Cleansing</span>
            </button>
            <button
              onClick={() => handleModeChange('practicum')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMode === 'practicum'
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1,000 Sales Practicum</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                {completedTasks.length}/{EXCEL_PRACTICUM_TASKS.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: FORMULAS & LOOKUPS GUIDE                          */}
      {/* ========================================================= */}
      {activeMode === 'guide' && (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar Menu */}
          <aside className="w-full lg:w-80 shrink-0 space-y-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Excel Core Functions
              </h3>
              <div className="space-y-1.5">
                {EXCEL_LESSONS.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-bold">{lesson.title.split(' ')[0]}</p>
                        <p className="text-[11px] font-normal text-slate-500 line-clamp-1">
                          {lesson.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Pro Tip */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                <span>Interviewer Secret</span>
              </div>
              <p className="leading-relaxed">
                Companies love asking: <em>"Why would you use XLOOKUP over VLOOKUP?"</em>
                Answer: XLOOKUP defaults to exact match, searches both left & right, and doesn't
                break if someone inserts a column!
              </p>
            </div>
          </aside>

          {/* Main Formula Breakdown Card */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {currentLesson.category.toUpperCase()}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    {currentLesson.title}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">{currentLesson.subtitle}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentLesson.durationMinutes} min mastery</span>
                </div>
              </div>

              {/* Formula Syntax Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Exact Excel Formula Syntax
                </label>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-sm shadow-inner flex items-center justify-between overflow-x-auto">
                  <code>{currentLesson.syntax}</code>
                </div>
              </div>

              {/* Plain English Meaning */}
              <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>What It Does (In Plain English)</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentLesson.simpleExplanation}
                </p>
              </div>

              {/* Syntax Parts Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Understanding Each Argument
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentLesson.formulaBreakdown.map((arg, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-1"
                    >
                      <code className="text-xs font-bold text-emerald-700 font-mono block">
                        {arg.part}
                      </code>
                      <p className="text-xs text-slate-600 leading-relaxed">{arg.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Spreadsheet Table */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Live Spreadsheet Demonstration
                </label>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-emerald-50/70 border-b border-emerald-200 text-emerald-950 font-bold font-mono">
                      <tr>
                        {currentLesson.sampleData.headers.map((h, i) => (
                          <th key={i} className="px-4 py-2.5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {currentLesson.sampleData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-2.5">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step by Step Execution */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Step-by-Step Instructions
                </h4>
                <ol className="list-decimal list-outside ml-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                  {currentLesson.stepByStepGuide.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Interview Gold Tip */}
              <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-bold">Interview Talking Point:</strong>{' '}
                  {currentLesson.interviewTip}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: INTERACTIVE PIVOT TABLE SIMULATOR                 */}
      {/* ========================================================= */}
      {activeMode === 'pivots' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                INTERACTIVE SIMULATOR
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                How Pivot Tables Actually Work (Visualizer)
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
                In a Pivot Table, you choose which column acts as your <strong>Row groupings</strong> and
                how numbers are aggregated in the <strong>Values</strong> box. Test toggling the
                controls below to see how raw transaction rows reorganize automatically!
              </p>
            </div>

            {/* Pivot Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              {/* Row Selector */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5 uppercase tracking-wider">
                  1. Group Rows By:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPivotRowField('region')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      pivotRowField === 'region'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Region (Asia / NA / EU)
                  </button>
                  <button
                    onClick={() => setPivotRowField('product')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      pivotRowField === 'product'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Product Name
                  </button>
                </div>
              </div>

              {/* Value Selector */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5 uppercase tracking-wider">
                  2. Calculate Values As:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPivotValueField('sum')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      pivotValueField === 'sum'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Sum of Revenue ($)
                  </button>
                  <button
                    onClick={() => setPivotValueField('count')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      pivotValueField === 'count'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Count of Orders
                  </button>
                </div>
              </div>

              {/* Explanatory Pill */}
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl">
                  <strong>Current Pivot Formula:</strong> Group by <em>{pivotRowField}</em>, show{' '}
                  <em>{pivotValueField === 'sum' ? 'SUM(total)' : 'COUNT(*)'}</em>
                </span>
              </div>
            </div>

            {/* Resulting Pivot Table */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Generated Pivot Table View
              </label>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-800 text-white font-bold font-mono">
                    <tr>
                      <th className="px-4 py-3 uppercase tracking-wider">
                        Row Labels ({pivotRowField})
                      </th>
                      <th className="px-4 py-3 text-right uppercase tracking-wider">
                        {pivotValueField === 'sum' ? 'Sum of Total Revenue' : 'Count of Orders'}
                      </th>
                      <th className="px-4 py-3 text-right uppercase tracking-wider">
                        % of Grand Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-800">
                    {pivotData.map((row, idx) => {
                      const share =
                        pivotValueField === 'sum'
                          ? totalPivotSum > 0
                            ? Math.round((row.sum / totalPivotSum) * 100)
                            : 0
                          : totalPivotCount > 0
                          ? Math.round((row.count / totalPivotCount) * 100)
                          : 0;

                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold text-slate-900">
                            {row.groupKey}
                          </td>
                          <td className="px-4 py-2.5 text-right font-bold text-emerald-700">
                            {pivotValueField === 'sum'
                              ? `$${row.sum.toLocaleString()}`
                              : `${row.count} orders`}
                          </td>
                          <td className="px-4 py-2.5 text-right text-slate-500">
                            {share}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold font-mono text-slate-900">
                    <tr>
                      <td className="px-4 py-3">Grand Total</td>
                      <td className="px-4 py-3 text-right text-emerald-800">
                        {pivotValueField === 'sum'
                          ? `$${totalPivotSum.toLocaleString()}`
                          : `${totalPivotCount} orders`}
                      </td>
                      <td className="px-4 py-3 text-right">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Pivot Pro Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
                <span className="font-bold text-slate-800 block">How to Group Dates by Month:</span>
                <p className="text-slate-600 leading-relaxed">
                  Right-click any date cell in your Pivot Table column → click <strong>Group...</strong> → select <strong>Months</strong> and <strong>Years</strong>. Excel automatically turns individual timestamps into clean calendar buckets!
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
                <span className="font-bold text-slate-800 block">Why Values Show "Count" Instead of "Sum":</span>
                <p className="text-slate-600 leading-relaxed">
                  If even ONE cell in your raw revenue column contains text or is empty, Excel defaults the Value field to <em>Count</em>. Fix: right-click Value → <strong>Value Field Settings</strong> → change to <strong>Sum</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: DATA CLEANSING TOOLS                              */}
      {/* ========================================================= */}
      {activeMode === 'cleansing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                DATA ENGINEERING PREPARATION
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                Excel Data Cleansing Essentials
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
                Before loading raw spreadsheets into databases or Python dataframes, you must sanitize
                them. Here are the 4 built-in Excel features every data engineer should know:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Remove Duplicates */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Filter className="w-4 h-4" />
                  <span>1. Remove Duplicates</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located in <strong>Data Ribbon → Remove Duplicates</strong>. Be careful: only check
                  the <em>Unique Identifier</em> column (like `Transaction_ID` or `Customer_ID`). If you
                  check all columns, orders that share the same price or date will remain!
                </p>
                <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-700">
                  Tip: Highlight column → Conditional Formatting → Highlight Duplicate Values first to see what will be wiped!
                </div>
              </div>

              {/* Card 2: Text to Columns */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>2. Text to Columns</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located in <strong>Data Ribbon → Text to Columns</strong>. Use this to split combined
                  strings (like `Santos, John` into `Last_Name` and `First_Name`) using a delimiter like
                  a comma, space, or hyphen.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-700">
                  Crucial: Always insert 1 or 2 blank columns to the right before splitting, or Excel will overwrite existing data!
                </div>
              </div>

              {/* Card 3: Find Blanks with Go To Special */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Search className="w-4 h-4" />
                  <span>3. Instant Blank Cell Finder (Ctrl + G)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Press <strong>Ctrl + G</strong> (Go To) → click <strong>Special...</strong> → select <strong>Blanks</strong> → hit OK. Excel instantly selects every blank cell in the entire table simultaneously so you can highlight or fill them!
                </p>
                <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-700">
                  Shortcut: After selecting blanks, type "N/A" and press Ctrl + Enter to fill all blanks at once!
                </div>
              </div>

              {/* Card 4: Data Validation Dropdowns */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>4. Data Validation (Input Rules)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located in <strong>Data Ribbon → Data Validation</strong>. Locks cells to an approved
                  list of values (e.g. `List: Completed, Pending, Cancelled`). Stops users from typing
                  typos like `Complted` that break SQL queries later.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-700">
                  Formula equivalent: In SQL, this is the same as an `ENUM` or `CHECK (status IN (...))` constraint.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 4: 1,000 SALES TRANSACTIONS PRACTICUM               */}
      {/* ========================================================= */}
      {activeMode === 'practicum' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                REAL-WORLD EXERCISE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                1,000 Sales Transactions Cleansing & Analysis
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
                <strong>Scenario:</strong> You are handed a raw Excel file containing 1,000 sales
                transactions from Schneider Electric's enterprise distribution network. Complete the 6
                tasks below to clean the data, calculate revenue, and summarize business performance.
              </p>
            </div>

            {/* Checklist Tasks */}
            <div className="space-y-3">
              {EXCEL_PRACTICUM_TASKS.map((task) => {
                const isDone = completedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            TASK {task.order}
                          </span>
                          <h3 className="font-extrabold text-slate-900 text-base">
                            {task.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-600">{task.objective}</p>

                        {/* Formula or Action Box */}
                        <div className="p-3 bg-slate-900 text-emerald-300 rounded-xl font-mono text-xs overflow-x-auto">
                          <code>{task.formulaOrAction}</code>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">
                          <strong>How it works:</strong> {task.plainEnglishExplanation}
                        </p>

                        <div className="p-2.5 rounded-lg bg-emerald-100/60 border border-emerald-200 text-emerald-900 text-xs">
                          <strong>Expected Outcome:</strong> {task.expectedResult}
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <span>Mark as Done</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sample Table Preview */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Sample Raw Transactions (Showing First 12 Rows)
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  Rows 6 & 9 contain sample anomalies (Missing ID & Duplicate)!
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold font-mono border-b border-slate-200">
                    <tr>
                      <th className="px-3.5 py-2.5">TX ID</th>
                      <th className="px-3.5 py-2.5">Date</th>
                      <th className="px-3.5 py-2.5">Customer ID</th>
                      <th className="px-3.5 py-2.5">Region</th>
                      <th className="px-3.5 py-2.5">Product</th>
                      <th className="px-3.5 py-2.5 text-right">Qty</th>
                      <th className="px-3.5 py-2.5 text-right">Unit Price</th>
                      <th className="px-3.5 py-2.5 text-right">Total ($)</th>
                      <th className="px-3.5 py-2.5">Status Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700 text-[11.5px]">
                    {SAMPLE_TRANSACTION_RECORDS.map((row, idx) => {
                      const isDup = row.status.includes('Duplicate');
                      const isMissing = row.status.includes('Missing');

                      return (
                        <tr
                          key={idx}
                          className={`${
                            isDup
                              ? 'bg-rose-50 text-rose-800 font-semibold'
                              : isMissing
                              ? 'bg-amber-50 text-amber-800 font-semibold'
                              : idx % 2 === 1
                              ? 'bg-slate-50/50'
                              : 'bg-white'
                          }`}
                        >
                          <td className="px-3.5 py-2">{row.id}</td>
                          <td className="px-3.5 py-2">{row.date}</td>
                          <td className="px-3.5 py-2">
                            {row.customerId || (
                              <span className="px-1.5 py-0.5 rounded bg-rose-200 text-rose-900 font-bold">
                                BLANK
                              </span>
                            )}
                          </td>
                          <td className="px-3.5 py-2">{row.region}</td>
                          <td className="px-3.5 py-2">{row.product}</td>
                          <td className="px-3.5 py-2 text-right">{row.quantity}</td>
                          <td className="px-3.5 py-2 text-right">${row.unitPrice}</td>
                          <td className="px-3.5 py-2 text-right font-bold">
                            ${row.total.toLocaleString()}
                          </td>
                          <td className="px-3.5 py-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10.5px] ${
                                isDup
                                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                  : isMissing
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
