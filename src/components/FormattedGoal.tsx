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
  // Matches backtick blocks `...` OR standalone numeric values (integers, decimals, percentages)
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
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-indigo-50 text-indigo-800 border-indigo-200';

  return (
    <div className="space-y-3.5 pt-1">
      {/* Prominent Formula Callout Banner */}
      {detectedFormula && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50/90 via-white to-blue-50/90 border border-indigo-200 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
            <Calculator className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="uppercase tracking-wider text-[11px]">Formula Definition:</span>
          </div>
          <code className="font-mono text-xs font-bold text-indigo-800 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs">
            {detectedFormula}
          </code>
        </div>
      )}

      {/* Render each step on its own line in a styled step card with generous vertical clearance */}
      <div className="space-y-3">
        {steps.map((stepText, idx) => {
          const tokens = tokenizeStep(stepText);

          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-[13px] text-slate-800 leading-[2.1] hover:border-slate-300 transition-colors"
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-lg ${badgeBg} text-xs font-bold flex items-center justify-center font-mono mt-0.5 shadow-2xs`}
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                {tokens.map((token, tIdx) => {
                  const nextToken = tokens[tIdx + 1];
                  const isFollowedByPunctuation =
                    nextToken &&
                    nextToken.type === 'text' &&
                    /^[.,;:?!)]/.test(nextToken.value.trimStart());

                  const rightMargin = isFollowedByPunctuation ? 'mr-0' : 'mr-1';

                  if (token.type === 'number') {
                    return (
                      <span
                        key={tIdx}
                        className={`inline-block px-1.5 py-0.5 rounded-md font-mono text-[12px] font-bold text-amber-900 bg-amber-100/70 border border-amber-300/80 shadow-2xs ml-1 ${rightMargin} align-baseline`}
                        title="Numeric Quantity / Parameter"
                      >
                        {token.value}
                      </span>
                    );
                  }

                  if (token.type === 'formula') {
                    return (
                      <code
                        key={tIdx}
                        className={`inline-block px-2 py-0.5 rounded-md font-mono text-[12px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 shadow-2xs ml-1 ${rightMargin} align-baseline`}
                        title="Formula Expression"
                      >
                        {token.value}
                      </code>
                    );
                  }

                  if (token.type === 'code') {
                    return (
                      <code
                        key={tIdx}
                        className={`inline-block px-1.5 py-0.5 rounded-md font-mono text-[12px] font-semibold ${codeBg} border shadow-2xs ml-1 ${rightMargin} align-baseline`}
                      >
                        {token.value}
                      </code>
                    );
                  }

                  // If this text token starts with punctuation following a badge, attach it cleanly without space
                  let textVal = token.value;
                  const prevToken = tokens[tIdx - 1];
                  if (prevToken && prevToken.type !== 'text' && /^[.,;:?!)]/.test(textVal.trimStart())) {
                    textVal = textVal.trimStart();
                  }

                  return <span key={tIdx}>{textVal}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
