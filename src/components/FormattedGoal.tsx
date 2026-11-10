import React from 'react';
import { Calculator } from 'lucide-react';

interface FormattedGoalProps {
  goalText: string;
  theme?: 'emerald' | 'indigo';
}

interface Token {
  type: 'text' | 'number' | 'formula' | 'code';
  value: string;
  punctuation?: string;
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
    let type: Token['type'] = 'text';
    let innerVal = val;

    if (val.startsWith('`') && val.endsWith('`')) {
      innerVal = val.slice(1, -1);
      if (isFormula(innerVal)) {
        type = 'formula';
      } else if (/^\d+(?:\.\d+)?%?$/.test(innerVal)) {
        type = 'number';
      } else {
        type = 'code';
      }
    } else if (/^\d+(?:\.\d+)?%?$/.test(val)) {
      type = 'number';
      innerVal = val;
    }

    // Capture immediately trailing punctuation (.,;:?!)
    const afterMatchIndex = match.index + val.length;
    const remaining = stepText.slice(afterMatchIndex);
    const punctMatch = remaining.match(/^[.,;:?!)]+/);
    const punctuation = punctMatch ? punctMatch[0] : '';

    tokens.push({
      type,
      value: innerVal,
      punctuation: punctuation || undefined
    });

    lastIndex = afterMatchIndex + punctuation.length;
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

  const badgeBg =
    theme === 'emerald'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : 'bg-indigo-100 text-indigo-800 border-indigo-200';

  const codeBadgeStyle =
    theme === 'emerald'
      ? 'text-emerald-800 bg-emerald-50 border-emerald-200/90'
      : 'text-indigo-800 bg-indigo-50 border-indigo-200/90';

  return (
    <div className="space-y-3 pt-0.5">
      {/* Prominent Formula Callout Banner */}
      {detectedFormula && (
        <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/90 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
            <Calculator className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="uppercase tracking-wider text-[11px]">Formula:</span>
          </div>
          <code className="font-mono text-xs font-bold text-indigo-800 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs">
            {detectedFormula}
          </code>
        </div>
      )}

      {/* Render each step on its own line in a cleanly spaced step card */}
      <div className="space-y-2.5">
        {steps.map((stepText, idx) => {
          const tokens = tokenizeStep(stepText);

          return (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
            >
              {/* Compact Step Number */}
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-md ${badgeBg} border text-[11px] font-bold flex items-center justify-center font-mono mt-0.5 shadow-2xs`}
              >
                {idx + 1}
              </span>

              {/* Natural line height without ballooning - badges are low-profile and compact */}
              <div className="flex-1 min-w-0 text-[13px] text-slate-800 leading-relaxed font-normal">
                {tokens.map((token, tIdx) => {
                  if (token.type === 'number') {
                    return (
                      <React.Fragment key={tIdx}><span className="inline px-1.5 py-[1px] rounded font-mono text-[11.5px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/90 shadow-2xs" title="Numeric Quantity / Parameter">{token.value}</span>{token.punctuation}</React.Fragment>
                    );
                  }

                  if (token.type === 'formula') {
                    return (
                      <React.Fragment key={tIdx}><code className="inline px-1.5 py-[1px] rounded font-mono text-[11.5px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 shadow-2xs" title="Formula Expression">{token.value}</code>{token.punctuation}</React.Fragment>
                    );
                  }

                  if (token.type === 'code') {
                    return (
                      <React.Fragment key={tIdx}><code className={`inline px-1.5 py-[1px] rounded font-mono text-[11.5px] font-semibold ${codeBadgeStyle} border shadow-2xs`}>{token.value}</code>{token.punctuation}</React.Fragment>
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
