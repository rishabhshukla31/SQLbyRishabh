import React from 'react';
import { CompanyName, DifficultyLevel, QACategory, QuestionType } from '../types/question';
import { QA_CATEGORIES, DIFFICULTY_LEVELS } from '../data/questionBank';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCompany: CompanyName | 'All';
  onCompanyChange: (c: CompanyName | 'All') => void;
  selectedCategory: QACategory | 'All';
  onCategoryChange: (c: QACategory | 'All') => void;
  selectedDifficulty: DifficultyLevel | 'All';
  onDifficultyChange: (d: DifficultyLevel | 'All') => void;
  selectedType: QuestionType | 'All';
  onTypeChange: (t: QuestionType | 'All') => void;
  selectedStatus: 'all' | 'solved' | 'unsolved' | 'bookmarked';
  onStatusChange: (s: 'all' | 'solved' | 'unsolved' | 'bookmarked') => void;
  onResetFilters: () => void;
  companies: CompanyName[];
  totalFiltered: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCompany,
  onCompanyChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  companies,
  totalFiltered,
}) => {
  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCompany !== 'All' ||
    selectedCategory !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedType !== 'All' ||
    selectedStatus !== 'all';

  return (
    <div className="space-y-3.5 p-4 rounded-xl border border-slate-800 bg-slate-900/60">
      {/* Top search & quick status row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 2,000+ QA SQL questions by keyword, #ID, or tag..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status segmented buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0 text-xs font-medium">
          <button
            onClick={() => onStatusChange('all')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Qs
          </button>
          <button
            onClick={() => onStatusChange('unsolved')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              selectedStatus === 'unsolved'
                ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Unsolved
          </button>
          <button
            onClick={() => onStatusChange('solved')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              selectedStatus === 'solved'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Solved
          </button>
          <button
            onClick={() => onStatusChange('bookmarked')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              selectedStatus === 'bookmarked'
                ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bookmarked
          </button>
        </div>
      </div>

      {/* Dropdown Filters row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
        {/* Company Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400">Company Track:</label>
          <select
            value={selectedCompany}
            onChange={(e) => onCompanyChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Companies ({companies.length})</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* QA Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400">QA Domain:</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All QA Domains</option>
            {QA_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400">Role / Level:</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Levels</option>
            {DIFFICULTY_LEVELS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Question Type Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400">Question Format:</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Formats</option>
            <option value="interactive_sql">Live SQL Lab Runner</option>
            <option value="multiple_choice">Scenario Quiz (MCQ)</option>
          </select>
        </div>
      </div>

      {/* Filter summary status strip */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
        <span className="font-mono tabular-nums">
          Showing <span className="text-cyan-400 font-semibold">{totalFiltered}</span> matched questions
        </span>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
          >
            Reset All Filters
          </button>
        )}
      </div>
    </div>
  );
};
