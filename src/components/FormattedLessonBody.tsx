import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormattedLessonBodyProps {
  text: string;
  theme?: 'emerald' | 'indigo';
  className?: string;
}

interface KVItem {
  key: string;
  val: string;
}

type ParsedBlock =
  | { type: 'subtitle'; title: string }
  | { type: 'definition_list'; items: KVItem[] }
  | { type: 'code_block'; snippets: string[] }
  | { type: 'bullet_list'; items: string[] }
  | { type: 'tip'; label: string; content: string }
  | { type: 'paragraph'; text: string };

function parseBlocks(rawText: string): ParsedBlock[] {
  if (!rawText) return [];

  const rawParagraphs = rawText.split('\n\n').filter(Boolean);
  const tempBlocks: (
    | { type: 'subtitle'; title: string }
    | { type: 'key_value'; key: string; val: string }
    | { type: 'bullet_list'; items: string[] }
    | { type: 'code_snippet'; code: string }
    | { type: 'tip'; label: string; content: string }
    | { type: 'paragraph'; text: string }
  )[] = [];

  for (let i = 0; i < rawParagraphs.length; i++) {
    const chunk = rawParagraphs[i].trim();
    const lines = chunk.split('\n').filter(Boolean);

    // 1. Bullet list (e.g. • or - or *)
    const isBulletList =
      lines.length > 0 &&
      lines.every((l) => {
        const t = l.trim();
        return t.startsWith('•') || t.startsWith('- ') || t.startsWith('* ');
      });

    if (isBulletList) {
      tempBlocks.push({
        type: 'bullet_list',
        items: lines.map((l) => l.trim().replace(/^[•\-\*]\s*/, ''))
      });
      continue;
    }

    // 2. Multi-line chunk where all lines are Key: Value pairs
    const isAllKv =
      lines.length > 1 &&
      lines.every((l) => /^([A-Za-z0-9_`* /&-]{2,35}):\s+([A-Z0-9`"'].+)/.test(l.trim()));

    if (isAllKv) {
      for (const line of lines) {
        const kvMatch = line.trim().match(/^([A-Za-z0-9_`* /&-]{2,35}):\s+([A-Z0-9`"'].+)/);
        if (kvMatch) {
          tempBlocks.push({
            type: 'key_value',
            key: kvMatch[1],
            val: kvMatch[2]
          });
        }
      }
      continue;
    }

    // 3. Standalone code snippet: e.g. `import numpy`
    if (/^`[^`\n]+`$/.test(chunk)) {
      tempBlocks.push({ type: 'code_snippet', code: chunk.slice(1, -1) });
      continue;
    }

    // 4. Note / Tip / Warning / Important callout
    const tipMatch = chunk.match(/^(Note|Tip|Warning|Important):\s*(.+)/is);
    if (tipMatch) {
      tempBlocks.push({ type: 'tip', label: tipMatch[1], content: tipMatch[2] });
      continue;
    }

    // 5. Key: Value definition item (e.g. "NumPy: Efficiently works with arrays.")
    const kvMatch = chunk.match(/^([A-Za-z0-9_`* /&-]{2,35}):\s+([A-Z0-9`"'].+)/s);
    if (
      kvMatch &&
      !kvMatch[1].toLowerCase().startsWith('for example') &&
      !kvMatch[1].toLowerCase().startsWith('for instance') &&
      !kvMatch[1].toLowerCase().startsWith('the general workflow is')
    ) {
      tempBlocks.push({ type: 'key_value', key: kvMatch[1], val: kvMatch[2] });
      continue;
    }

    // 6. Subtitle / Heading
    // Standalone single line <= 65 chars that:
    // - Ends in a colon (e.g. "Import the whole package:")
    // - OR does not end in standard sentence punctuation (. ? ! , ;) and is a heading-like phrase
    const isSubtitle =
      lines.length === 1 &&
      chunk.length <= 65 &&
      !chunk.startsWith('`') &&
      !chunk.startsWith('http') &&
      (
        chunk.endsWith(':') ||
        (!/[.,;?!]$/.test(chunk) && !/^(if|when|then|where|and|or|for|to|with|in|as|so)\b/i.test(chunk))
      );

    if (isSubtitle) {
      tempBlocks.push({ type: 'subtitle', title: chunk });
      continue;
    }

    // 7. Regular paragraph
    tempBlocks.push({ type: 'paragraph', text: chunk });
  }

  // Group consecutive key_value blocks into definition_list,
  // and group consecutive code_snippet blocks into code_block
  const groupedBlocks: ParsedBlock[] = [];
  let currentKvGroup: KVItem[] = [];
  let currentCodeGroup: string[] = [];

  const flushKv = () => {
    if (currentKvGroup.length > 0) {
      groupedBlocks.push({ type: 'definition_list', items: currentKvGroup });
      currentKvGroup = [];
    }
  };

  const flushCode = () => {
    if (currentCodeGroup.length > 0) {
      groupedBlocks.push({ type: 'code_block', snippets: currentCodeGroup });
      currentCodeGroup = [];
    }
  };

  for (const block of tempBlocks) {
    if (block.type === 'key_value') {
      flushCode();
      currentKvGroup.push({ key: block.key, val: block.val });
    } else if (block.type === 'code_snippet') {
      flushKv();
      currentCodeGroup.push(block.code);
    } else {
      flushKv();
      flushCode();
      groupedBlocks.push(block);
    }
  }
  flushKv();
  flushCode();

  return groupedBlocks;
}

export const FormattedLessonBody: React.FC<FormattedLessonBodyProps> = ({
  text,
  theme = 'emerald',
  className = ''
}) => {
  const blocks = parseBlocks(text);

  const isEmerald = theme === 'emerald';

  const accentBar = isEmerald ? 'bg-emerald-500' : 'bg-indigo-500';
  const borderAccent = isEmerald ? 'border-emerald-400' : 'border-indigo-400';
  const bulletDot = isEmerald ? 'bg-emerald-500' : 'bg-indigo-500';
  const inlineCodeBg = isEmerald
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
    : 'bg-indigo-50 text-indigo-800 border-indigo-200/80';

  const renderInline = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className={`px-1.5 py-0.5 rounded font-mono text-[12.5px] border font-semibold ${inlineCodeBg}`}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {blocks.map((block, bIdx) => {
        // Subtitle / Heading (bold with clean vertical accent bar)
        if (block.type === 'subtitle') {
          return (
            <div key={bIdx} className="pt-2 pb-0.5">
              <h4 className="text-[15px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className={`w-1.5 h-3.5 rounded-full ${accentBar} flex-shrink-0`} />
                <span>{renderInline(block.title)}</span>
              </h4>
            </div>
          );
        }

        // Definition list with a colon (Indented & Bold items)
        if (block.type === 'definition_list') {
          return (
            <div
              key={bIdx}
              className={`space-y-2.5 my-3 ml-4 pl-3.5 border-l-2 ${borderAccent} bg-slate-50/80 py-3 px-3.5 rounded-r-xl shadow-2xs`}
            >
              {block.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 leading-relaxed">
                  <span className={`w-1.5 h-1.5 rounded-full ${bulletDot} mt-2 flex-shrink-0`} />
                  <div>
                    <strong className="font-bold text-slate-900 font-mono text-[13px]">
                      {renderInline(item.key)}:
                    </strong>{' '}
                    <span className="text-slate-700">{renderInline(item.val)}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // Standard bullet list (also indents and bolds any embedded Key: Value)
        if (block.type === 'bullet_list') {
          return (
            <ul key={bIdx} className="space-y-2 my-2.5 ml-4 pl-1">
              {block.items.map((line, idx) => {
                const kv = line.match(/^([A-Za-z0-9_`* /&-]{2,35}):\s*(.+)/);
                return (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full ${bulletDot} mt-2 flex-shrink-0`} />
                    <div>
                      {kv ? (
                        <>
                          <strong className="font-bold text-slate-900 font-mono text-[13px]">
                            {renderInline(kv[1])}:
                          </strong>{' '}
                          <span>{renderInline(kv[2])}</span>
                        </>
                      ) : (
                        renderInline(line)
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Clean light code block (NOT black! Fits seamlessly into light theme)
        if (block.type === 'code_block') {
          return (
            <div key={bIdx} className="my-2.5 ml-4">
              <div className="inline-block max-w-full rounded-xl bg-slate-100/90 border border-slate-200/90 px-3.5 py-2 shadow-2xs font-mono text-[13px] text-slate-800 space-y-1">
                {block.snippets.map((snip, sIdx) => (
                  <div key={sIdx} className="font-semibold leading-relaxed">
                    {snip}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Note / Tip callout box
        if (block.type === 'tip') {
          return (
            <div
              key={bIdx}
              className="my-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-sm leading-relaxed flex items-start gap-2.5 shadow-2xs"
            >
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="font-bold">{block.label}:</strong> {renderInline(block.content)}
              </div>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={bIdx} className="text-sm text-slate-700 leading-[1.85]">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
};
