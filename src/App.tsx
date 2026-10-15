import React, { useState, useMemo, useEffect } from 'react';
import { CompanyName, DifficultyLevel, QACategory, Question, QuestionType } from './types/question';
import { QUESTION_BANK, COMPANY_PROFILES } from './data/questionBank';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { FilterBar } from './components/FilterBar';
import { QuestionCard } from './components/QuestionCard';
import { QuestionDetailModal } from './components/QuestionDetailModal';
import { CompanyTrackView } from './components/CompanyTrackView';
import { LiveSqlLabView } from './components/LiveSqlLabView';
import { MockInterviewModal } from './components/MockInterviewModal';
import { CheatSheetModal } from './components/CheatSheetModal';
import { ChevronLeft, ChevronRight, Sparkles, Building2, Terminal, BookOpen, Layers } from 'lucide-react';

export default function App() {
  // Navigation & views
  const [activeTab, setActiveTab] = useState<'questions' | 'companies' | 'lab' | 'mock' | 'cheatsheet'>('questions');
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockCompany, setMockCompany] = useState<CompanyName | 'All'>('All');
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // User persistence state
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('sql_qa_solved_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('sql_qa_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sql_qa_solved_ids', JSON.stringify(Array.from(solvedIds)));
    } catch {
      // ignore
    }
  }, [solvedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sql_qa_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyName | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<QACategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [selectedType, setSelectedType] = useState<QuestionType | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'solved' | 'unsolved' | 'bookmarked'>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  // Filter computation
  const filteredQuestions = useMemo(() => {
    return QUESTION_BANK.filter((q) => {
      // Company filter
      if (selectedCompany !== 'All' && q.company !== selectedCompany) return false;

      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;

      // Type filter
      if (selectedType !== 'All' && q.type !== selectedType) return false;

      // Status filter
      const isSolved = solvedIds.has(q.id);
      const isBookmarked = bookmarkedIds.has(q.id);
      if (selectedStatus === 'solved' && !isSolved) return false;
      if (selectedStatus === 'unsolved' && isSolved) return false;
      if (selectedStatus === 'bookmarked' && !isBookmarked) return false;

      // Search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const numStr = `#${q.questionNumber}`;
        const matchTitle = q.title.toLowerCase().includes(term);
        const matchDesc = q.description.toLowerCase().includes(term);
        const matchCompany = q.company.toLowerCase().includes(term);
        const matchTags = q.tags.some((t) => t.toLowerCase().includes(term));
        const matchNum = numStr.includes(term) || String(q.questionNumber).includes(term);

        if (!matchTitle && !matchDesc && !matchCompany && !matchTags && !matchNum) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedCompany,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    selectedStatus,
    searchTerm,
    solvedIds,
    bookmarkedIds,
  ]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCompany,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    selectedStatus,
  ]);

  // Paginated questions
  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, currentPage, pageSize]);

  // Solved & bookmark handlers
  const handleMarkSolved = (id: string) => {
    setSolvedIds((prev) => new Set([...prev, id]));
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCompany('All');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedType('All');
    setSelectedStatus('all');
  };

  // Quick random question
  const handleStartRandom = () => {
    const randomIndex = Math.floor(Math.random() * QUESTION_BANK.length);
    setActiveQuestion(QUESTION_BANK[randomIndex]);
  };

  // Start company mock
  const handleStartCompanyMock = (company: CompanyName) => {
    setMockCompany(company);
    setShowMockModal(true);
  };

  // Filter by company from Company Track
  const handleSelectCompanyFromTrack = (company: CompanyName) => {
    setSelectedCompany(company);
    setActiveTab('questions');
  };

  // Next / Prev question in modal
  const handleNextQuestion = () => {
    if (!activeQuestion) return;
    const currentIndex = QUESTION_BANK.findIndex((q) => q.id === activeQuestion.id);
    if (currentIndex >= 0 && currentIndex < QUESTION_BANK.length - 1) {
      setActiveQuestion(QUESTION_BANK[currentIndex + 1]);
    }
  };

  const handlePrevQuestion = () => {
    if (!activeQuestion) return;
    const currentIndex = QUESTION_BANK.findIndex((q) => q.id === activeQuestion.id);
    if (currentIndex > 0) {
      setActiveQuestion(QUESTION_BANK[currentIndex - 1]);
    }
  };

  const companiesList = Object.keys(COMPANY_PROFILES) as CompanyName[];
  const interactiveTotal = QUESTION_BANK.filter((q) => q.type === 'interactive_sql').length;
  const mcqTotal = QUESTION_BANK.filter((q) => q.type === 'multiple_choice').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Top Bar Contract compliant Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'mock') {
            setMockCompany('All');
            setShowMockModal(true);
          } else if (tab === 'cheatsheet') {
            setShowCheatSheet(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onStartRandom={handleStartRandom}
        solvedCount={solvedIds.size}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Company Tracks Tab */}
        {activeTab === 'companies' && (
          <CompanyTrackView
            questions={QUESTION_BANK}
            onSelectCompany={handleSelectCompanyFromTrack}
            onStartCompanyMock={handleStartCompanyMock}
          />
        )}

        {/* Live SQL Sandbox Tab */}
        {activeTab === 'lab' && <LiveSqlLabView />}

        {/* Question Bank Tab (Default) */}
        {activeTab === 'questions' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Top stats summary strip */}
            <StatsBanner
              totalQuestions={QUESTION_BANK.length}
              solvedCount={solvedIds.size}
              totalCompanies={companiesList.length}
              interactiveCount={interactiveTotal}
              mcqCount={mcqTotal}
            />

            {/* Filter and search deck */}
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCompany={selectedCompany}
              onCompanyChange={setSelectedCompany}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onResetFilters={handleResetFilters}
              companies={companiesList}
              totalFiltered={filteredQuestions.length}
            />

            {/* Questions Grid */}
            {paginatedQuestions.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border border-slate-800 bg-slate-900/40">
                <p className="text-base font-semibold text-slate-300">No questions match your current filters</p>
                <p className="text-xs text-slate-500 mt-1">Try relaxing your search terms or company selection</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    isSolved={solvedIds.has(q.id)}
                    isBookmarked={bookmarkedIds.has(q.id)}
                    onSelect={setActiveQuestion}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 font-mono tabular-nums">
                  Page <span className="text-slate-200 font-bold">{currentPage}</span> of{' '}
                  <span className="text-slate-200 font-bold">{totalPages}</span> (
                  {filteredQuestions.length} Total Questions)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md disabled:opacity-40 disabled:hover:bg-slate-900 transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-1 font-mono text-xs">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum = i + 1;
                      if (currentPage > 3 && totalPages > 5) {
                        pageNum = Math.min(currentPage - 2 + i, totalPages);
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-7 h-7 rounded text-xs transition-colors tabular-nums ${
                            currentPage === pageNum
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md disabled:opacity-40 disabled:hover:bg-slate-900 transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">SQL QA Master</span>
            <span>·</span>
            <span>2,000+ QA & SDET Interview Questions</span>
            <span>·</span>
            <span>Real Glassdoor QA Benchmarks</span>
          </div>
          <div>
            Built for QA Engineers, SDETs, and Data Test Leads preparing for FAANG & Tech Giant Interviews.
          </div>
        </div>
      </footer>

      {/* Question Detail Modal (Interactive SQL & MCQ Quiz) */}
      {activeQuestion && (
        <QuestionDetailModal
          question={activeQuestion}
          onClose={() => setActiveQuestion(null)}
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          isBookmarked={bookmarkedIds.has(activeQuestion.id)}
          onToggleBookmark={(id) => handleToggleBookmark(id)}
          isSolved={solvedIds.has(activeQuestion.id)}
          onMarkSolved={handleMarkSolved}
        />
      )}

      {/* Mock Interview Assessment Modal */}
      {showMockModal && (
        <MockInterviewModal
          questions={QUESTION_BANK}
          initialCompany={mockCompany}
          onClose={() => setShowMockModal(false)}
          onQuestionSolved={handleMarkSolved}
        />
      )}

      {/* QA SQL Survival Cheat Sheet Modal */}
      {showCheatSheet && (
        <CheatSheetModal onClose={() => setShowCheatSheet(false)} />
      )}
    </div>
  );
}
