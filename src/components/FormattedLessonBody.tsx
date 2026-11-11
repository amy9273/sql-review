import React, { useState } from 'react';
import { AlertCircle, Copy, Check } from 'lucide-react';

export interface FormattedLessonBodyProps {
  text: string;
  theme?: 'emerald' | 'indigo';
  className?: string;
}

type ParsedBlock =
  | { type: 'subtitle'; title: string }
  | { type: 'indented_list'; items: string[] }
  | { type: 'code_block'; snippets: string[] }
  | { type: 'fenced_code'; lang: string; code: string }
  | { type: 'bullet_list'; items: string[] }
  | { type: 'ordered_list'; items: string[] }
  | { type: 'divider' }
  | { type: 'tip'; label: string; content: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'paragraph'; text: string };

function parseBlocks(rawText: string): ParsedBlock[] {
  if (!rawText) return [];

  // Step 1: Split preserving fenced code blocks
  const codeFencePattern = /(```[a-zA-Z0-9_-]*[\s\S]*?```)/g;
  const rawParts = rawText.split(codeFencePattern);
  const tempBlocks: ParsedBlock[] = [];

  for (const part of rawParts) {
    const chunk = part.trim();
    if (!chunk) continue;

    // Is it a fenced code block?
    if (chunk.startsWith('```') && chunk.endsWith('```')) {
      const inner = chunk.slice(3, -3).trim();
      const lines = inner.split('\n');
      const firstLine = lines[0].trim();

      let lang = '';
      let code = inner;

      if (lines.length > 1 && /^[a-zA-Z0-9_-]+$/.test(firstLine)) {
        lang = firstLine;
        code = lines.slice(1).join('\n');
      } else {
        const langMatch = inner.match(/^([a-zA-Z0-9_-]+)\s+([\s\S]+)$/);
        if (langMatch && ['sql', 'python', 'bash', 'js', 'json', 'sh'].includes(langMatch[1].toLowerCase())) {
          lang = langMatch[1];
          code = langMatch[2];
        }
      }

      tempBlocks.push({ type: 'fenced_code', lang, code });
      continue;
    }

    // Split non-code markdown into paragraphs
    const rawParagraphs = chunk.split('\n\n').filter(Boolean);

    for (const rawP of rawParagraphs) {
      const p = rawP.trim();
      if (!p) continue;
      const lines = p.split('\n').map((l) => l.trim()).filter(Boolean);

      // 0. Horizontal divider rule (---, ***, ___)
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(p)) {
        tempBlocks.push({ type: 'divider' });
        continue;
      }

      // 1. Markdown Table
      const isMarkdownTable =
        lines.length >= 2 &&
        lines.every((l) => l.startsWith('|') && l.endsWith('|')) &&
        lines.some((l) => /^\|(\s*:?-+:?\s*\|)+$/.test(l));

      if (isMarkdownTable) {
        const headerLine = lines[0];
        const headers = headerLine
          .split('|')
          .slice(1, -1)
          .map((h) => h.trim());

        const dataRows = lines
          .slice(1)
          .filter((l) => !/^\|(\s*:?-+:?\s*\|)+$/.test(l))
          .map((l) =>
            l
              .split('|')
              .slice(1, -1)
              .map((c) => c.trim())
          );

        tempBlocks.push({
          type: 'table',
          headers,
          rows: dataRows
        });
        continue;
      }

      // 2. Markdown Headings (e.g. ### Example database)
      if (/^#{1,6}\s+/.test(p)) {
        const cleanTitle = p.replace(/^#{1,6}\s*/, '').trim();
        tempBlocks.push({ type: 'subtitle', title: cleanTitle });
        continue;
      }

      // 3. Section letters / subheadings (e.g. **A. SELECT** or G. HAVING)
      if (/^(?:\*\*)?[A-Z]\.\s+([A-Za-z0-9_ -]+)(?:\*\*)?$/.test(p)) {
        const cleanTitle = p.replace(/\*\*/g, '').trim();
        tempBlocks.push({ type: 'subtitle', title: cleanTitle });
        continue;
      }

      // 4. Bullet lists (lines starting with •, -, *, +)
      const isBulletList =
        lines.length > 0 &&
        lines.every((l) => /^[•\-\*\+]\s+/.test(l));

      if (isBulletList) {
        tempBlocks.push({
          type: 'bullet_list',
          items: lines.map((l) => l.replace(/^[•\-\*\+]\s*/, '').trim())
        });
        continue;
      }

      // 5. Ordered lists (1. Foo\n2. Bar OR inline smushed: "1. Foo. 2. Bar.")
      const isOrderedList =
        /^\d+[\.)]\s+/.test(p) &&
        (
          (lines.length > 1 && lines.every((l) => /^\d+[\.)]\s+/.test(l))) ||
          /\s+\d+[\.)]\s+/.test(p)
        );

      if (isOrderedList) {
        let items: string[] = [];
        if (lines.length > 1 && lines.every((l) => /^\d+[\.)]\s+/.test(l))) {
          items = lines.map((l) => l.replace(/^\d+[\.)]\s*/, '').trim());
        } else {
          items = p
            .split(/(?:^|\s+)\d+[\.)]\s+/)
            .map((it) => it.trim())
            .filter(Boolean);
        }
        tempBlocks.push({ type: 'ordered_list', items });
        continue;
      }

      // 6. Multi-line chunk where all lines are Key: Value pairs
      const isAllKv =
        lines.length > 1 &&
        lines.every((l) => /^([A-Za-z0-9_`* /&()-]{2,35})[:–—]\s+(.+)/.test(l));

      if (isAllKv) {
        tempBlocks.push({
          type: 'indented_list',
          items: lines
        });
        continue;
      }

      // 7. Standalone inline code snippet: e.g. `import numpy`
      if (/^`[^`\n]+`$/.test(p)) {
        tempBlocks.push({ type: 'code_block', snippets: [p.slice(1, -1)] });
        continue;
      }

      // 8. Note / Tip / Warning / Important callout
      const tipMatch = p.match(/^(Note|Tip|Warning|Important):\s*(.+)/is);
      if (tipMatch) {
        tempBlocks.push({ type: 'tip', label: tipMatch[1], content: tipMatch[2] });
        continue;
      }

      // 9. Subtitle / Heading
      // Single line <= 65 chars that ends in a colon or is a title phrase
      const isSubtitle =
        lines.length === 1 &&
        p.length <= 65 &&
        !p.startsWith('`') &&
        !p.startsWith('http') &&
        (
          p.endsWith(':') ||
          (!/[.,;?!]$/.test(p) && !/^(if|when|then|where|and|or|for|to|with|in|as|so)\b/i.test(p))
        );

      if (isSubtitle) {
        tempBlocks.push({ type: 'subtitle', title: p });
        continue;
      }

      // 10. Standalone Key: Value / Key – Value item
      const kvMatch = p.match(/^([A-Za-z0-9_`* /&()-]{2,35})[:–—]\s+(.+)/s);
      if (
        kvMatch &&
        !kvMatch[1].toLowerCase().startsWith('for example') &&
        !kvMatch[1].toLowerCase().startsWith('for instance')
      ) {
        tempBlocks.push({ type: 'indented_list', items: [p] });
        continue;
      }

      // 11. Regular paragraph
      tempBlocks.push({ type: 'paragraph', text: p });
    }
  }

  // Merge consecutive indented_list blocks
  const mergedBlocks: ParsedBlock[] = [];
  let currentList: string[] = [];

  for (const block of tempBlocks) {
    if (block.type === 'indented_list') {
      currentList.push(...block.items);
    } else {
      if (currentList.length > 0) {
        mergedBlocks.push({ type: 'indented_list', items: currentList });
        currentList = [];
      }
      mergedBlocks.push(block);
    }
  }
  if (currentList.length > 0) {
    mergedBlocks.push({ type: 'indented_list', items: currentList });
  }

  return mergedBlocks;
}

const FencedCodeBlock: React.FC<{
  code: string;
  lang?: string;
  theme?: 'emerald' | 'indigo';
}> = ({ code, lang, theme = 'emerald' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEmerald = theme === 'emerald';
  const langBadgeColor = isEmerald
    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60'
    : 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60';

  return (
    <div className="my-3.5 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-md">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-800/90 border-b border-slate-700/60 text-xs text-slate-300 font-mono">
        <span className={`uppercase font-semibold tracking-wider text-[11px] px-2 py-0.5 rounded border ${langBadgeColor}`}>
          {lang || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] text-slate-300 hover:text-white hover:bg-slate-700/70 transition-colors font-sans"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-slate-100">
        <pre className="font-mono whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

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
        let codeContent = part.slice(1, -1);
        codeContent = codeContent.replace(/^(sql|python|bash|javascript|js|sh)\s+/i, '');

        return (
          <code
            key={idx}
            className={`px-1.5 py-0.5 rounded font-mono text-[12.5px] border font-semibold ${inlineCodeBg}`}
          >
            {codeContent}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {blocks.map((block, bIdx) => {
        // Horizontal divider (---, ***)
        if (block.type === 'divider') {
          return <hr key={bIdx} className="my-5 border-t border-slate-200/80" />;
        }

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

        // Fenced Code Block (Syntax-highlighted dark container with copy button)
        if (block.type === 'fenced_code') {
          return (
            <FencedCodeBlock
              key={bIdx}
              code={block.code}
              lang={block.lang}
              theme={theme}
            />
          );
        }

        // Ordered List (1. 2. 3. numbered steps)
        if (block.type === 'ordered_list') {
          return (
            <ol key={bIdx} className="my-3 space-y-2.5 ml-5 list-decimal text-sm text-slate-800 leading-relaxed pl-1">
              {block.items.map((item, idx) => (
                <li key={idx} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          );
        }

        // Indented list (cards, steps, and Key: Value pairs)
        if (block.type === 'indented_list') {
          return (
            <div
              key={bIdx}
              className={`space-y-2.5 my-3 ml-4 pl-3.5 border-l-2 ${borderAccent} bg-slate-50/80 py-3 px-3.5 rounded-r-xl shadow-2xs`}
            >
              {block.items.map((item, idx) => {
                const kvMatch = item.match(/^([A-Za-z0-9_`* /&()-]{2,35})[:–—]\s*(.+)/);
                return (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full ${bulletDot} mt-2 flex-shrink-0`} />
                    <div>
                      {kvMatch ? (
                        <>
                          <strong className="font-bold text-slate-900 font-mono text-[13px]">
                            {renderInline(kvMatch[1])}:
                          </strong>{' '}
                          <span className="text-slate-700">{renderInline(kvMatch[2])}</span>
                        </>
                      ) : (
                        <span className="text-slate-700">{renderInline(item)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // Standard bullet list (also indents and bolds any embedded Key: Value)
        if (block.type === 'bullet_list') {
          return (
            <ul key={bIdx} className="space-y-2 my-2.5 ml-4 pl-1">
              {block.items.map((line, idx) => {
                const kv = line.match(/^([A-Za-z0-9_`* /&()-]{2,35})[:–—]\s*(.+)/);
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

        // Clean light code block for short inline snippets
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

        // Formatted Markdown Table
        if (block.type === 'table') {
          return (
            <div key={bIdx} className="overflow-x-auto my-3 rounded-xl border border-slate-200/90 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    {block.headers.map((h, hIdx) => (
                      <th key={hIdx} className="px-3.5 py-2.5 font-semibold text-slate-900 tracking-tight">
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {block.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2 text-slate-700 font-mono text-[12px]">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
