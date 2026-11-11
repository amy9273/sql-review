import React, { useState, useEffect } from 'react';
import {
  SCHNEIDER_SITUATIONAL_DRILLS,
  SCHNEIDER_BEHAVIORAL_PITCHES,
  SCHNEIDER_RAPID_FLASHCARDS
} from '../data/schneiderCurriculum';
import {
  Target,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  CheckCircle2,
  ListOrdered,
  Lightbulb,
  MessageSquare,
  Zap,
  ChevronRight,
  Check
} from 'lucide-react';

interface SchneiderInterviewDrillsProps {
  completedDrills: string[];
  onToggleDrillComplete: (drillId: string) => void;
}

export const SchneiderInterviewDrills: React.FC<SchneiderInterviewDrillsProps> = ({
  completedDrills,
  onToggleDrillComplete
}) => {
  const [subTab, setSubTab] = useState<'situations' | 'pitches' | 'flashcards'>('situations');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [revealedDrills, setRevealedDrills] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scratchpad notes per question saved in localStorage
  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('schneider_drill_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('schneider_drill_notes', JSON.stringify(userNotes));
  }, [userNotes]);

  const handleNoteChange = (id: string, text: string) => {
    setUserNotes((prev) => ({
      ...prev,
      [id]: text
    }));
  };

  const toggleReveal = (id: string) => {
    setRevealedDrills((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSituations = SCHNEIDER_SITUATIONAL_DRILLS.filter((d) => {
    if (selectedCategory === 'all') return true;
    return d.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-100/50 via-teal-50/20 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
              <Target className="w-3.5 h-3.5" />
              Schneider Electric Interview Drill Simulator
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interview Drills & Personal Pitch
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
              Practice real-world situational questions, internalize the 6-step problem-solving framework, and perfect your personal pitch.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setSubTab('situations')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                subTab === 'situations'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-emerald-600" />
              Situational Scenarios (A–H)
            </button>
            <button
              onClick={() => setSubTab('pitches')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                subTab === 'pitches'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Personal Pitch Scripts
            </button>
            <button
              onClick={() => setSubTab('flashcards')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                subTab === 'flashcards'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-600" />
              10 Rapid Recall Drills
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SUB-TAB 1: SITUATIONAL SCENARIOS (A-H)                    */}
      {/* ========================================================= */}
      {subTab === 'situations' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Scenarios (8)' },
              { id: 'data_quality', label: 'Data Quality' },
              { id: 'pipelines', label: 'Pipelines & Infrastructure' },
              { id: 'governance', label: 'Data Governance & MDM' },
              { id: 'behavioral', label: 'Prioritization & Ambiguity' },
              { id: 'problem_solving', label: 'Incidents & Recovery' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Scenarios Grid */}
          <div className="space-y-5">
            {filteredSituations.map((drill) => {
              const isRevealed = !!revealedDrills[drill.id];
              const isMastered = completedDrills.includes(drill.id);
              const note = userNotes[drill.id] || '';

              return (
                <div
                  key={drill.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                        {drill.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {drill.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => onToggleDrillComplete(drill.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isMastered
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      <CheckCircle className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
                      {isMastered ? 'Mastered' : 'Mark as Practiced'}
                    </button>
                  </div>

                  {/* Interview Question Prompt */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>"{drill.prompt}"</span>
                    </p>
                  </div>

                  {/* Student Scratchpad / Self-Reflection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                      Your Thought Process & Response Draft:
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => handleNoteChange(drill.id, e.target.value)}
                      placeholder="Type how you would respond in the interview before revealing the model answer..."
                      rows={3}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white placeholder:text-slate-400 resize-y"
                    />
                  </div>

                  {/* Toggle Model Answer Button */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => toggleReveal(drill.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {isRevealed ? 'Hide Model Answer' : 'Reveal Model Answer & 6-Step Strategy'}
                    </button>

                    {isRevealed && (
                      <button
                        onClick={() => copyToClipboard(drill.id, drill.modelAnswer)}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium p-1.5 rounded-lg hover:bg-slate-100"
                        title="Copy model answer"
                      >
                        {copiedId === drill.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === drill.id ? 'Copied!' : 'Copy Answer'}
                      </button>
                    )}
                  </div>

                  {/* Revealed Model Answer & 6-Step Framework */}
                  {isRevealed && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                      {/* Model Answer Quote */}
                      <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                          Recommended Interview Answer
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium italic">
                          "{drill.modelAnswer}"
                        </p>
                      </div>

                      {/* 6-Step Breakdown Table */}
                      <div className="rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                            <tr>
                              <th className="px-3 py-2 w-36">6-Step Framework</th>
                              <th className="px-3 py-2">Action in this Situation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {drill.sixStepBreakdown.map((step, idx) => (
                              <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'}>
                                <td className="px-3 py-2 font-semibold text-emerald-900 whitespace-nowrap">
                                  {step.step}
                                </td>
                                <td className="px-3 py-2 text-slate-700 leading-relaxed">
                                  {step.action}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Core Principles */}
                      <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800">Key Principles: </span>
                          {drill.keyPrinciples.join(' • ')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 2: PERSONAL PITCH SCRIPTS                         */}
      {/* ========================================================= */}
      {subTab === 'pitches' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {SCHNEIDER_BEHAVIORAL_PITCHES.map((pitch, pIdx) => (
              <div
                key={pitch.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      #{pIdx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {pitch.question}
                    </h3>
                  </div>

                  <button
                    onClick={() => copyToClipboard(pitch.id, pitch.recommendedPitch)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    {copiedId === pitch.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedId === pitch.id ? 'Copied Script!' : 'Copy Script'}
                  </button>
                </div>

                {/* Pitch Body */}
                <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                  {pitch.recommendedPitch}
                </div>

                {/* Why This Works */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Why this works: </span>
                    {pitch.whyThisWorks}
                  </div>
                </div>

                {/* Key Talking Points */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Key Talking Points to Remember:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pitch.talkingPoints.map((pt, ptIdx) => (
                      <div
                        key={ptIdx}
                        className="flex items-start gap-2 text-xs text-slate-700 p-2 rounded-lg bg-slate-50/80 border border-slate-100"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 3: RAPID RECALL FLASHCARDS                        */}
      {/* ========================================================= */}
      {subTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SCHNEIDER_RAPID_FLASHCARDS.map((card, cIdx) => {
              const isRevealed = !!revealedDrills[card.id];
              const isMastered = completedDrills.includes(card.id);

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {card.category} • Card #{cIdx + 1}
                      </span>
                      <button
                        onClick={() => onToggleDrillComplete(card.id)}
                        className={`text-xs p-1 rounded-md transition-all ${
                          isMastered ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title="Mark mastered"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {card.question}
                    </h4>

                    {isRevealed && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
                        <span className="font-bold text-emerald-800 block mb-1">Answer:</span>
                        {card.answer}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleReveal(card.id)}
                    className="w-full py-2 rounded-xl text-xs font-bold transition-all border text-center flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
