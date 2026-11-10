import React, { useRef, useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  RotateCcw,
  Wand2
} from 'lucide-react';

export interface PythonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}

export const PythonEditor: React.FC<PythonEditorProps> = ({
  value,
  onChange,
  onRun,
  onReset,
  rows = 9,
  placeholder = '# Write your Python code here...',
  className = ''
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const lineCount = Math.max(value.split('\n').length, rows || 9);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // Ctrl + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
      return;
    }

    // Auto-quote & bracket wrapping
    const wrapChars: Record<string, string> = {
      "'": "'",
      '"': '"',
      '(': ')',
      '[': ']',
      '{': '}'
    };

    if (wrapChars[e.key] && selectedText.length > 0) {
      e.preventDefault();
      const open = e.key;
      const close = wrapChars[e.key];
      const newText = value.substring(0, start) + open + selectedText + close + value.substring(end);
      onChange(newText);
      setTimeout(() => {
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
      }, 0);
      return;
    }

    // Tab & Shift+Tab handling (4 spaces indentation)
    if (e.key === 'Tab') {
      e.preventDefault();

      if (e.shiftKey) {
        // Unindent
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
        // Indent
        if (selectedText.includes('\n')) {
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
          // Single cursor insert 4 spaces
          const newText = value.substring(0, start) + '    ' + value.substring(end);
          onChange(newText);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 4;
          }, 0);
        }
      }
      return;
    }

    // Smart Enter (preserve indentation + add indent after ':')
    if (e.key === 'Enter') {
      const before = value.substring(0, start);
      const lastNewLine = before.lastIndexOf('\n');
      const currentLine = lastNewLine === -1 ? before : before.substring(lastNewLine + 1);
      const match = currentLine.match(/^[ \t]+/);
      let indent = match ? match[0] : '';

      if (currentLine.trim().endsWith(':')) {
        indent += '    ';
      }

      if (indent.length > 0) {
        e.preventDefault();
        const newText = value.substring(0, start) + '\n' + indent + value.substring(end);
        onChange(newText);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
        }, 0);
        return;
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatCode = () => {
    // Basic clean up: remove trailing spaces per line
    const cleaned = value
      .split('\n')
      .map((l) => l.trimEnd())
      .join('\n');
    onChange(cleaned);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Editor Top Toolbar */}
      <div className="flex items-center justify-between text-xs px-1 pb-0.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Python 3 (pandas & numpy)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden xl:inline whitespace-nowrap">
            • Tab to indent • Ctrl+Enter to run
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleFormatCode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            title="Clean trailing whitespace"
          >
            <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Format</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            title="Copy Python script"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Reset code template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Frame with Line Numbers */}
      <div className="relative rounded-xl border border-slate-800 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all overflow-hidden bg-slate-950 shadow-inner flex flex-col">
        <div className="flex flex-1 min-h-[170px]">
          {/* Line Numbers Gutter */}
          <div className="w-9 select-none py-3 text-right pr-2 text-slate-600 font-mono text-xs border-r border-slate-800/80 bg-slate-950 flex-shrink-0 leading-[1.85]">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Textarea */}
          <div className="flex-1 relative min-w-0">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={rows}
              className="code-editor w-full p-3 bg-transparent text-emerald-400 text-sm outline-none resize-none leading-[1.85] font-mono min-h-[170px]"
              placeholder={placeholder}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
