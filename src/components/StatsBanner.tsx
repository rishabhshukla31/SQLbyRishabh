import React from 'react';
import { Database, Building2, CheckCircle2, TrendingUp, Terminal } from 'lucide-react';

interface StatsBannerProps {
  totalQuestions: number;
  solvedCount: number;
  totalCompanies: number;
  interactiveCount: number;
  mcqCount: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  totalQuestions,
  solvedCount,
  totalCompanies,
  interactiveCount,
  mcqCount,
}) => {
  const progressPct = Math.round((solvedCount / totalQuestions) * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Catalog */}
      <div className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Database className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-white font-mono tabular-nums">
            {totalQuestions.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Total QA SQL Questions</div>
        </div>
      </div>

      {/* 3 Skill Tiers */}
      <div className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-bold text-white font-mono tabular-nums">
            1.4k <span className="text-slate-500">·</span> 1.4k <span className="text-slate-500">·</span> 1.4k
          </div>
          <div className="text-xs text-slate-400">Basic · Medium · Tough</div>
        </div>
      </div>

      {/* Target Companies */}
      <div className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-white font-mono tabular-nums">
            {totalCompanies} Giants
          </div>
          <div className="text-xs text-slate-400">FAANG & Consultancies</div>
        </div>
      </div>

      {/* Solved & Format */}
      <div className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-emerald-400 font-mono tabular-nums">
            {solvedCount}{' '}
            <span className="text-xs text-slate-500 font-normal">({progressPct}%)</span>
          </div>
          <div className="text-xs text-slate-400">
            {interactiveCount} SQL / {mcqCount} Quizzes
          </div>
        </div>
      </div>
    </div>
  );
};
