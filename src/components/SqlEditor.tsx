import React, { useRef, useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Code2, Copy, Check } from 'lucide-react';

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning?: boolean;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  value,
  onChange,
  onRun,
  onReset,
  isRunning,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  // Compute line numbers
  const lineCount = Math.max(value.split('\n').length, 8);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Handle Tab key and Ctrl+Enter keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 2 spaces
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    // Upper case SQL keywords
    const keywords = [
      'select', 'from', 'where', 'and', 'or', 'join', 'left join', 'right join', 'inner join',
      'full outer join', 'group by', 'order by', 'having', 'as', 'distinct', 'in', 'not in',
      'exists', 'not exists', 'is null', 'is not null', 'union', 'union all', 'limit', 'offset',
      'case', 'when', 'then', 'else', 'end', 'sum', 'count', 'avg', 'min', 'max', 'round',
      'over', 'partition by', 'asc', 'desc'
    ];

    let formatted = value;
    // Replace standalone keywords with uppercase
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, (match) => match.toUpperCase());
    });

    onChange(formatted);
  };

  const insertSnippet = (snippet: string) => {
    onChange(snippet);
  };

  return (
    <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-900 overflow-hidden shadow-md">
      {/* Editor toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <Code2 className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-300">Interactive SQL Query Editor</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleFormat}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded transition-colors"
            title="Uppercase SQL keywords"
          >
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Format</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded transition-colors"
            title="Reset to starter query"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Editor text canvas with line numbers */}
      <div className="relative flex min-h-[180px] max-h-[300px] bg-slate-950/80 font-mono text-xs">
        {/* Line numbers column */}
        <div className="select-none py-2 px-3 text-right text-slate-600 bg-slate-950/90 border-r border-slate-800/80 tabular-nums font-mono text-[11px] leading-5">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 w-full resize-y bg-transparent p-2 text-slate-100 focus:outline-none font-mono text-xs leading-5 selection:bg-cyan-500/30 selection:text-white placeholder:text-slate-600 overflow-x-auto"
          placeholder="-- Write your QA SQL verification query here..."
        />
      </div>

      {/* Footer action bar */}
      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-3 py-2 text-xs">
        <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
          <span>Shortcuts:</span>
          <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">
            Ctrl + Enter
          </kbd>
          <span>to run</span>
          <span className="text-slate-600">·</span>
          <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">
            Tab
          </kbd>
          <span>indent</span>
        </div>

        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 ml-auto px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded transition-colors shadow-sm shadow-emerald-400/20"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
        </button>
      </div>
    </div>
  );
};
