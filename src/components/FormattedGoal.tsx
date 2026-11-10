import React from 'react';
import { Calculator } from 'lucide-react';

interface FormattedGoalProps {
  goalText: string;
  theme?: 'emerald' | 'indigo';
}

interface Token {
  type: 'text' | 'number' | 'formula' | 'code';
  value: string;
}

function splitIntoSteps(text: string): string[] {
  if (!text) return [];

  // Check if text has explicit numbering like "1. ... 2. ... 3. ..."
  if (/(?:^|\s+)\d+\.\s+/.test(text)) {
    return text
      .split(/(?:^|\n|\s+)(?=\d+\.\s+)/)
      .map((s) => s.trim().replace(/^\d+\.\s*/, ''))
      .filter(Boolean);
  }

  // Check if text contains explicit newlines
  if (text.includes('\n')) {
    return text
      .split('\n')
      .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean);
  }

  // If text contains 2 or more distinct sentences, split into readable step statements
  const sentences = text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length >= 2) {
    return sentences;
  }

  return [text.trim()];
}

function isFormula(str: string): boolean {
  return (
    (str.includes('=') && !str.startsWith('=')) ||
    str.includes('**') ||
    (str.includes('*') && !str.includes('*.')) ||
    str.includes('/') ||
    str.includes('>=') ||
    str.includes('<=') ||
    str.includes('!=') ||
    str.includes('==')
  );
}

function tokenizeStep(stepText: string): Token[] {
  // Matches backtick blocks `...` OR standalone numeric values (integers, decimals, percentages, money)
  const regex = /(`[^`]+`|\b\d+(?:\.\d+)?%?\b)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const tokens: Token[] = [];

  while ((match = regex.exec(stepText)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        value: stepText.slice(lastIndex, match.index)
      });
    }

    const val = match[0];
    if (val.startsWith('`') && val.endsWith('`')) {
      const inner = val.slice(1, -1);
      if (isFormula(inner)) {
        tokens.push({ type: 'formula', value: inner });
      } else if (/^\d+(?:\.\d+)?%?$/.test(inner)) {
        tokens.push({ type: 'number', value: inner });
      } else {
        tokens.push({ type: 'code', value: inner });
      }
    } else if (/^\d+(?:\.\d+)?%?$/.test(val)) {
      tokens.push({ type: 'number', value: val });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < stepText.length) {
    tokens.push({
      type: 'text',
      value: stepText.slice(lastIndex)
    });
  }

  return tokens;
}

export const FormattedGoal: React.FC<FormattedGoalProps> = ({
  goalText,
  theme = 'emerald'
}) => {
  const steps = splitIntoSteps(goalText);

  // Find if there is any prominent formula across steps to showcase at top
  let detectedFormula: string | null = null;
  for (const step of steps) {
    const tokens = tokenizeStep(step);
    const formulaToken = tokens.find((t) => t.type === 'formula');
    if (formulaToken) {
      detectedFormula = formulaToken.value;
      break;
    }
  }

  const badgeBg = theme === 'emerald' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800';
  const codeBg =
    theme === 'emerald'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90'
      : 'bg-indigo-50 text-indigo-800 border-indigo-200/90';

  return (
    <div className="space-y-2.5">
      {/* Prominent Formula Callout if formula exists */}
      {detectedFormula && (
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-50/90 via-white to-blue-50/90 border border-indigo-200 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
            <Calculator className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="uppercase tracking-wider text-[10.5px]">Formula:</span>
          </div>
          <code className="font-mono text-xs font-bold text-indigo-800 bg-white px-2.5 py-1 rounded-lg border border-indigo-200/80 shadow-2xs">
            {detectedFormula}
          </code>
        </div>
      )}

      {/* Render each step on its own line in a styled step card */}
      <div className="space-y-2">
        {steps.map((stepText, idx) => {
          const tokens = tokenizeStep(stepText);

          return (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs text-slate-800 leading-relaxed hover:border-slate-300 transition-colors"
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-md ${badgeBg} text-[11px] font-bold flex items-center justify-center font-mono mt-0.5`}
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                {tokens.map((token, tIdx) => {
                  if (token.type === 'number') {
                    return (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-1.5 py-0.2 rounded font-mono text-[11.5px] font-bold text-amber-900 bg-amber-50 border border-amber-200 shadow-2xs mx-0.5"
                        title="Numeric Quantity / Parameter"
                      >
                        {token.value}
                      </span>
                    );
                  }

                  if (token.type === 'formula') {
                    return (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg font-mono text-[11.5px] font-bold text-indigo-800 bg-indigo-50/90 border border-indigo-200 shadow-2xs mx-0.5"
                        title="Mathematical Expression"
                      >
                        <span className="text-[10px] text-indigo-500 font-sans font-medium uppercase tracking-wider">
                          📐
                        </span>
                        <span>{token.value}</span>
                      </span>
                    );
                  }

                  if (token.type === 'code') {
                    return (
                      <code
                        key={tIdx}
                        className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[11.5px] font-semibold ${codeBg} border mx-0.5`}
                      >
                        {token.value}
                      </code>
                    );
                  }

                  return <span key={tIdx}>{token.value}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
