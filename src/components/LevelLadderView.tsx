import React, { useState, useMemo } from 'react';
import { CompanyName, Question, QuestionType, SkillTier } from '../types/question';
import { SKILL_TIERS, COMPANY_PROFILES } from '../data/questionBank';
import { QuestionCard } from './QuestionCard';
import {
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  Terminal,
  HelpCircle,
  Filter,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface LevelLadderViewProps {
  questions: Question[];
  solvedIds: Set<string>;
  bookmarkedIds: Set<string>;
  onSelectQuestion: (question: Question) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const LevelLadderView: React.FC<LevelLadderViewProps> = ({
  questions,
  solvedIds,
  bookmarkedIds,
  onSelectQuestion,
  onToggleBookmark,
}) => {
  const [activeTier, setActiveTier] = useState<SkillTier>('Basic');
  const [selectedCompany, setSelectedCompany] = useState<CompanyName | 'All'>('All');
  const [selectedFormat, setSelectedFormat] = useState<QuestionType | 'All'>('All');
  const [searchTierQuery, setSearchTierQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Filter questions for the active tier
  const tierQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.tier !== activeTier) return false;
      if (selectedCompany !== 'All' && q.company !== selectedCompany) return false;
      if (selectedFormat !== 'All' && q.type !== selectedFormat) return false;
      if (searchTierQuery.trim() !== '') {
        const term = searchTierQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(term);
        const matchCompany = q.company.toLowerCase().includes(term);
        const matchDesc = q.description.toLowerCase().includes(term);
        const matchNum = String(q.questionNumber).includes(term);
        if (!matchTitle && !matchCompany && !matchDesc && !matchNum) return false;
      }
      return true;
    });
  }, [questions, activeTier, selectedCompany, selectedFormat, searchTierQuery]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTier, selectedCompany, selectedFormat, searchTierQuery]);

  const totalPages = Math.ceil(tierQuestions.length / pageSize) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tierQuestions.slice(start, start + pageSize);
  }, [tierQuestions, currentPage, pageSize]);

  // Compute metrics for all 3 tiers
  const tierMetrics = useMemo(() => {
    const res: Record<SkillTier, { total: number; solved: number; interactive: number; mcq: number }> = {
      Basic: { total: 0, solved: 0, interactive: 0, mcq: 0 },
      Medium: { total: 0, solved: 0, interactive: 0, mcq: 0 },
      Tough: { total: 0, solved: 0, interactive: 0, mcq: 0 },
    };

    questions.forEach((q) => {
      const t: SkillTier = q.tier || 'Medium';
      if (res[t]) {
        res[t].total++;
        if (solvedIds.has(q.id)) res[t].solved++;
        if (q.type === 'interactive_sql') res[t].interactive++;
        else res[t].mcq++;
      }
    });

    return res;
  }, [questions, solvedIds]);

  const companiesList = Object.keys(COMPANY_PROFILES) as CompanyName[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Intro hero */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <TrendingUp className="h-4 w-4" />
            <span>Structured Interview Progression Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Skill Ladder: Easy ➔ Medium ➔ Tough
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Progress systematically through three targeted tiers: start with foundational SQL queries (SELECT, WHERE, NULLs), level up to intermediate joins & ETL reconciliation, and conquer senior QA lead topics (Window Functions, financial audits, and CDC state machines). Both interactive code writing and instant-feedback quizzes are included at every level.
          </p>
        </div>
      </div>

      {/* 3 Tier Segment Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SKILL_TIERS.map((tierConfig) => {
          const t = tierConfig.tier;
          const metrics = tierMetrics[t];
          const isSelected = activeTier === t;
          const pct = Math.round((metrics.solved / (metrics.total || 1)) * 100);

          let tierBadgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          if (t === 'Medium') tierBadgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
          if (t === 'Tough') tierBadgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';

          return (
            <div
              key={t}
              onClick={() => setActiveTier(t)}
              className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-500 bg-slate-900 shadow-lg shadow-cyan-950/20'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-md border font-mono ${tierBadgeColor}`}
                  >
                    Level: {tierConfig.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    {metrics.total.toLocaleString()} Questions
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-200 mt-2 mb-1">
                  Target: {tierConfig.targetRole}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {tierConfig.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
                  <span>Progress</span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {metrics.solved} / {metrics.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={searchTierQuery}
            onChange={(e) => setSearchTierQuery(e.target.value)}
            placeholder={`Search ${activeTier} level questions...`}
            className="w-full sm:max-w-xs px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Company filter inside tier */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value as any)}
            className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Companies</option>
            {companiesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Format filter */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as any)}
            className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Formats</option>
            <option value="interactive_sql">Write SQL Code</option>
            <option value="multiple_choice">Scenario Quizzes (MCQ)</option>
          </select>

          <span className="text-slate-400 font-mono tabular-nums ml-2">
            {tierQuestions.length} Matches
          </span>
        </div>
      </div>

      {/* Question Cards Grid */}
      {paginatedQuestions.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400">
          No {activeTier} questions match your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isSolved={solvedIds.has(q.id)}
              isBookmarked={bookmarkedIds.has(q.id)}
              onSelect={onSelectQuestion}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
          <span className="tabular-nums">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
