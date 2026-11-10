import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Wand2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Database,
  Columns,
  Code2
} from 'lucide-react';

export interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}

interface SuggestionItem {
  label: string;
  type: 'KEYWORD' | 'FUNCTION' | 'TABLE' | 'COLUMN';
  snippet?: string;
  description?: string;
}

const SQL_KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP BY',
  'HAVING',
  'ORDER BY',
  'LIMIT',
  'JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'ON',
  'WITH',
  'AS',
  'DISTINCT',
  'BETWEEN',
  'AND',
  'OR',
  'NOT',
  'IN',
  'LIKE',
  'IS NULL',
  'IS NOT NULL',
  'CASE',
  'WHEN',
  'THEN',
  'ELSE',
  'END',
  'PARTITION BY',
  'DESC',
  'ASC'
];

const SQL_FUNCTIONS = [
  { label: 'COUNT(*)', snippet: 'COUNT(*)', desc: 'Count all rows' },
  { label: 'COUNT(col)', snippet: 'COUNT()', desc: 'Count non-null values' },
  { label: 'SUM()', snippet: 'SUM()', desc: 'Total sum of numeric column' },
  { label: 'AVG()', snippet: 'AVG()', desc: 'Mathematical average' },
  { label: 'ROUND()', snippet: 'ROUND(, 2)', desc: 'Round to decimal places' },
  { label: 'MIN()', snippet: 'MIN()', desc: 'Smallest value' },
  { label: 'MAX()', snippet: 'MAX()', desc: 'Largest value' },
  { label: 'COALESCE()', snippet: 'COALESCE(, )', desc: 'Fallback for NULLs' },
  { label: 'TRIM()', snippet: 'TRIM()', desc: 'Strip whitespace' },
  { label: 'strftime()', snippet: "strftime('%Y-%m', )", desc: 'Extract date parts' },
  { label: 'ROW_NUMBER() OVER ()', snippet: 'ROW_NUMBER() OVER (PARTITION BY  ORDER BY )', desc: 'Sequential row numbers' },
  { label: 'DENSE_RANK() OVER ()', snippet: 'DENSE_RANK() OVER (ORDER BY )', desc: 'Rank without gaps' },
  { label: 'RANK() OVER ()', snippet: 'RANK() OVER (ORDER BY )', desc: 'Rank with gaps on ties' }
];

const SQL_TABLES = [
  { label: 'customers', desc: 'Customer contact directory' },
  { label: 'products', desc: 'Product catalog with prices' },
  { label: 'sales', desc: 'Transaction orders with regions' },
  { label: 'employees', desc: 'Internal staff and salaries' },
  { label: 'departments', desc: 'Corporate departments' },
  { label: 'transactions', desc: 'Payment logs with timestamps' },
  { label: 'pages', desc: 'Facebook pages directory' },
  { label: 'page_likes', desc: 'Facebook user likes log' },
  { label: 'candidates', desc: 'Applicant skill tagging' }
];

const SQL_COLUMNS = [
  'customer_id',
  'first_name',
  'last_name',
  'email',
  'city',
  'signup_date',
  'product_id',
  'product_name',
  'category',
  'price',
  'sale_id',
  'region',
  'sale_amount',
  'sale_date',
  'employee_id',
  'name',
  'department_id',
  'department_name',
  'salary',
  'hire_date',
  'transaction_id',
  'amount',
  'transaction_date',
  'page_id',
  'page_name',
  'user_id',
  'liked_date',
  'skill'
];

/**
 * Formats a SQL query with clean indentation and line breaks across clauses
 */
export function formatSql(raw: string): string {
  if (!raw || !raw.trim()) return raw;

  const lines = raw.split('\n');
  const leadingComments: string[] = [];
  let contentStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('--')) {
      leadingComments.push(lines[i]);
      contentStartIndex = i + 1;
    } else {
      break;
    }
  }

  const commentPrefix = leadingComments.length > 0 ? leadingComments.join('\n') + '\n' : '';
  const body = lines.slice(contentStartIndex).join(' ').replace(/\s+/g, ' ').trim();

  if (!body) return raw;

  const clauses = [
    'WITH',
    'SELECT',
    'FROM',
    'INNER JOIN',
    'LEFT JOIN',
    'RIGHT JOIN',
    'FULL JOIN',
    'CROSS JOIN',
    'JOIN',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'ORDER BY',
    'LIMIT'
  ];

  let formatted = body;

  // Protect string literals
  const stringLiterals: string[] = [];
  formatted = formatted.replace(/'([^']*)'/g, (m) => {
    stringLiterals.push(m);
    return `__STR_${stringLiterals.length - 1}__`;
  });

  // Ensure major keywords are on new lines
  clauses.forEach((c) => {
    const reg = new RegExp(`\\b${c}\\b`, 'gi');
    formatted = formatted.replace(reg, `\n${c.toUpperCase()}`);
  });

  const formattedLines: string[] = [];
  const rawSections = formatted.split('\n').map((s) => s.trim()).filter(Boolean);

  for (const section of rawSections) {
    if (section.toUpperCase().startsWith('SELECT')) {
      const afterSelect = section.substring(6).trim();

      // Split columns separated by commas outside of parentheses
      const cols: string[] = [];
      let current = '';
      let parenDepth = 0;

      for (let i = 0; i < afterSelect.length; i++) {
        const char = afterSelect[i];
        if (char === '(') parenDepth++;
        else if (char === ')') parenDepth--;

        if (char === ',' && parenDepth === 0) {
          cols.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      if (current.trim()) cols.push(current.trim());

      if (cols.length > 1) {
        formattedLines.push('SELECT');
        cols.forEach((col, idx) => {
          const suffix = idx < cols.length - 1 ? ',' : '';
          formattedLines.push(`    ${col}${suffix}`);
        });
      } else {
        formattedLines.push(section);
      }
    } else {
      formattedLines.push(section);
    }
  }

  let result = formattedLines.join('\n');

  // Restore string literals
  stringLiterals.forEach((str, i) => {
    result = result.replace(`__STR_${i}__`, str);
  });

  if (!result.trim().endsWith(';')) {
    result = result.trim() + ';';
  }

  return commentPrefix + result;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  value,
  onChange,
  onRun,
  onReset,
  rows = 10,
  placeholder = '-- Write your SQL query here...',
  className = ''
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  // Autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionFilter, setSuggestionFilter] = useState('');
  const [cursorWordRange, setCursorWordRange] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  // Dynamic line numbers
  const lineCount = useMemo(() => {
    return Math.max(rows, value.split('\n').length);
  }, [value, rows]);

  // All suggestions list
  const allSuggestions = useMemo<SuggestionItem[]>(() => {
    const list: SuggestionItem[] = [];

    SQL_KEYWORDS.forEach((kw) => {
      list.push({ label: kw, type: 'KEYWORD' });
    });

    SQL_FUNCTIONS.forEach((fn) => {
      list.push({ label: fn.label, type: 'FUNCTION', snippet: fn.snippet, description: fn.desc });
    });

    SQL_TABLES.forEach((tbl) => {
      list.push({ label: tbl.label, type: 'TABLE', description: tbl.desc });
    });

    SQL_COLUMNS.forEach((col) => {
      list.push({ label: col, type: 'COLUMN' });
    });

    return list;
  }, []);

  // Filtered suggestions based on typed token
  const filteredSuggestions = useMemo(() => {
    if (!suggestionFilter || suggestionFilter.length < 1) return [];

    const lower = suggestionFilter.toLowerCase();
    const matches = allSuggestions.filter((item) => item.label.toLowerCase().includes(lower));

    // Sort: items that start with the query appear first
    matches.sort((a, b) => {
      const aStarts = a.label.toLowerCase().startsWith(lower);
      const bStarts = b.label.toLowerCase().startsWith(lower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.label.localeCompare(b.label);
    });

    return matches.slice(0, 8); // Top 8 suggestions
  }, [allSuggestions, suggestionFilter]);

  // Keep index within bounds
  useEffect(() => {
    setSelectedSuggestionIndex(0);
  }, [filteredSuggestions]);

  // Check cursor position for autocomplete triggers
  const checkAutocomplete = (text: string, cursorPos: number) => {
    const textBefore = text.substring(0, cursorPos);
    const match = textBefore.match(/[a-zA-Z0-9_]+$/);

    if (match && match[0].length >= 1) {
      const word = match[0];
      setSuggestionFilter(word);
      setCursorWordRange({ start: cursorPos - word.length, end: cursorPos });
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestionFilter('');
    }
  };

  const applySuggestion = (item: SuggestionItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const insertText = item.snippet || item.label;
    const before = value.substring(0, cursorWordRange.start);
    const after = value.substring(cursorWordRange.end);
    const newText = before + insertText + after;

    onChange(newText);
    setShowSuggestions(false);

    // Place cursor right after inserted text or inside parentheses
    setTimeout(() => {
      textarea.focus();
      let newCursor = cursorWordRange.start + insertText.length;
      if (insertText.endsWith(')')) {
        const openParen = insertText.indexOf('(');
        if (openParen !== -1 && openParen < insertText.length - 1) {
          newCursor = cursorWordRange.start + openParen + 1;
        }
      }
      textarea.selectionStart = textarea.selectionEnd = newCursor;
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 1. Run Query on Ctrl + Enter / Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      setShowSuggestions(false);
      onRun?.();
      return;
    }

    // 2. Format Query on Alt + Shift + F
    if (e.altKey && e.shiftKey && (e.key === 'f' || e.key === 'F')) {
      e.preventDefault();
      handleFormatSql();
      return;
    }

    // 3. Autocomplete popup keyboard navigation
    if (showSuggestions && filteredSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev + 1) % filteredSuggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        applySuggestion(filteredSuggestions[selectedSuggestionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowSuggestions(false);
        return;
      }
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;
    const selectedText = value.substring(start, end);

    // 4. Auto-wrap selected text when typing quotes or brackets
    const wrapPairs: Record<string, string> = {
      "'": "'",
      '"': '"',
      '`': '`',
      '(': ')',
      '[': ']',
      '{': '}'
    };

    if (hasSelection && wrapPairs[e.key]) {
      e.preventDefault();
      const openChar = e.key;
      const closeChar = wrapPairs[openChar];
      const newText = value.substring(0, start) + openChar + selectedText + closeChar + value.substring(end);
      onChange(newText);
      setShowSuggestions(false);

      setTimeout(() => {
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
      }, 0);
      return;
    }

    // 5. Auto-close brackets if no selection
    if (!hasSelection && (e.key === '(' || e.key === '[' || e.key === '{')) {
      e.preventDefault();
      const openChar = e.key;
      const closeChar = wrapPairs[openChar];
      const newText = value.substring(0, start) + openChar + closeChar + value.substring(end);
      onChange(newText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
      return;
    }

    // 6. Tab & Shift + Tab Indentation
    if (e.key === 'Tab') {
      e.preventDefault();

      if (e.shiftKey) {
        // Shift + Tab: Un-indent lines
        const before = value.substring(0, start);
        const lineStart = before.lastIndexOf('\n') + 1;
        const after = value.substring(end);
        const block = value.substring(lineStart, end);
        const lines = block.split('\n');

        const unindented = lines.map((line) => {
          if (line.startsWith('    ')) return line.substring(4);
          if (line.startsWith('  ')) return line.substring(2);
          if (line.startsWith(' ')) return line.substring(1);
          return line;
        });

        const replacement = unindented.join('\n');
        const newText = value.substring(0, lineStart) + replacement + after;
        onChange(newText);

        setTimeout(() => {
          textarea.selectionStart = lineStart;
          textarea.selectionEnd = lineStart + replacement.length;
        }, 0);
      } else {
        // Tab: Indent
        if (selectedText.includes('\n')) {
          // Multi-line selection: indent every selected line
          const before = value.substring(0, start);
          const lineStart = before.lastIndexOf('\n') + 1;
          const after = value.substring(end);
          const block = value.substring(lineStart, end);
          const lines = block.split('\n');
          const indented = lines.map((line) => '    ' + line);
          const replacement = indented.join('\n');
          const newText = value.substring(0, lineStart) + replacement + after;
          onChange(newText);

          setTimeout(() => {
            textarea.selectionStart = lineStart;
            textarea.selectionEnd = lineStart + replacement.length;
          }, 0);
        } else {
          // Single cursor: insert 4 spaces
          const newText = value.substring(0, start) + '    ' + value.substring(end);
          onChange(newText);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 4;
          }, 0);
        }
      }
      return;
    }

    // 7. Smart Enter (preserve leading indentation)
    if (e.key === 'Enter') {
      const before = value.substring(0, start);
      const lastNewLine = before.lastIndexOf('\n');
      const currentLine = lastNewLine === -1 ? before : before.substring(lastNewLine + 1);
      const match = currentLine.match(/^[ \t]+/);

      if (match) {
        e.preventDefault();
        const indent = match[0];
        const newText = value.substring(0, start) + '\n' + indent + value.substring(end);
        onChange(newText);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
        }, 0);
        return;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    checkAutocomplete(newVal, e.target.selectionStart);
  };

  const handleFormatSql = () => {
    const formatted = formatSql(value);
    onChange(formatted);
    setShowSuggestions(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Editor Top Toolbar */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-brand-600" />
            <span>SQL Editor</span>
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            (Tab to indent • Select &apos; to quote • Ctrl+Enter to run)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleFormatSql}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            title="Prettify and format SQL (Alt + Shift + F)"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Format SQL</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            title="Copy query to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Reset query template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Frame with Line Numbers & Autocomplete */}
      <div className="relative rounded-xl border border-slate-800 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all overflow-hidden bg-slate-950 shadow-inner flex">
        {/* Line Numbers Gutter */}
        <div className="w-10 select-none py-4 text-right pr-2.5 text-slate-600 font-mono text-xs border-r border-slate-800/80 bg-slate-950/80 flex-shrink-0 leading-[1.85]">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* SQL Textarea */}
        <div className="flex-1 relative min-w-0">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              // Delay hide to allow clicks on dropdown
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            rows={rows}
            className="code-editor w-full p-4 bg-transparent text-emerald-400 text-sm outline-none resize-y leading-[1.85] font-mono"
            placeholder={placeholder}
            spellCheck={false}
          />

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-6 top-12 z-50 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-xl overflow-hidden divide-y divide-slate-800">
              <div className="px-3 py-1.5 bg-slate-950/80 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>SQL Suggestions</span>
                <span className="font-mono text-[9px] text-slate-500">Tab or Enter</span>
              </div>
              <div className="max-h-56 overflow-y-auto">
                {filteredSuggestions.map((item, idx) => {
                  const isSelected = idx === selectedSuggestionIndex;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applySuggestion(item);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between gap-2 transition-colors ${
                        isSelected ? 'bg-brand-600/30 text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {item.type === 'KEYWORD' && <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />}
                        {item.type === 'FUNCTION' && <Code2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                        {item.type === 'TABLE' && <Database className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />}
                        {item.type === 'COLUMN' && <Columns className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                        <span className="font-mono font-medium truncate">{item.label}</span>
                      </div>

                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wider ${
                          item.type === 'KEYWORD'
                            ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50'
                            : item.type === 'FUNCTION'
                            ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50'
                            : item.type === 'TABLE'
                            ? 'bg-sky-900/50 text-sky-300 border border-sky-700/50'
                            : 'bg-amber-900/50 text-amber-300 border border-amber-700/50'
                        }`}
                      >
                        {item.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
