import React from 'react';
import { Question } from '../types/question';
import { CheckCircle2, Bookmark, Terminal, HelpCircle, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  isSolved: boolean;
  isBookmarked: boolean;
  onSelect: (question: Question) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSolved,
  isBookmarked,
  onSelect,
  onToggleBookmark,
}) => {
  let tierColor = 'text-emerald-400';
  if (question.tier === 'Medium') tierColor = 'text-amber-400';
  if (question.tier === 'Tough') tierColor = 'text-rose-400';

  return (
    <div
      onClick={() => onSelect(question)}
      className={`group relative flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all cursor-pointer ${
        isSolved
          ? 'border-emerald-900/40 bg-slate-900/40 hover:border-emerald-700/60'
          : 'border-slate-800/80 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90'
      } shadow-sm hover:shadow-cyan-950/20`}
    >
      <div>
        {/* Top clean unboxed metadata with subtle typographic separators */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-cyan-400 font-semibold tabular-nums">
              #{String(question.questionNumber).padStart(4, '0')}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-semibold text-slate-200">{question.company}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className={`font-semibold font-mono ${tierColor}`}>{question.tier}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{question.difficulty}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isSolved && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Solved
              </span>
            )}
            <button
              onClick={(e) => onToggleBookmark(question.id, e)}
              className={`p-1 rounded transition-colors ${
                isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Bookmark question"
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Primary Title */}
        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
          {question.title}
        </h3>

        {/* Short description excerpt */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {question.description.replace(/```[\s\S]*?```/g, '').trim()}
        </p>
      </div>

      {/* Footer bar with category and action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          {question.type === 'interactive_sql' ? (
            <Terminal className="h-3 w-3 text-cyan-400" />
          ) : (
            <HelpCircle className="h-3 w-3 text-amber-400" />
          )}
          <span>{question.category}</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-medium text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all">
          <span>{question.type === 'interactive_sql' ? 'Write SQL' : 'Take Quiz'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
};
