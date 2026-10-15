import React, { useState, useEffect } from 'react';
import { CompanyName, Question } from '../types/question';
import { QuestionDetailModal } from './QuestionDetailModal';
import { Timer, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, X, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MockInterviewModalProps {
  questions: Question[];
  initialCompany?: CompanyName | 'All';
  onClose: () => void;
  onQuestionSolved: (id: string) => void;
}

export const MockInterviewModal: React.FC<MockInterviewModalProps> = ({
  questions,
  initialCompany = 'All',
  onClose,
  onQuestionSolved,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyName | 'All'>(initialCompany);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  // Setup exam questions
  const startExam = () => {
    let pool = questions;
    if (selectedCompany !== 'All') {
      pool = questions.filter((q) => q.company === selectedCompany);
    }
    // Shuffle and pick 10
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 10);
    setExamQuestions(picked);
    setCurrentIndex(0);
    setTimeLeft(1200);
    setSolvedIds(new Set());
    setIsExamStarted(true);
    setIsFinished(false);
  };

  // Timer countdown
  useEffect(() => {
    if (!isExamStarted || isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamStarted, isFinished]);

  const finishExam = () => {
    setIsFinished(true);
    if (solvedIds.size >= 7) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleMarkSolved = (id: string) => {
    setSolvedIds((prev) => new Set([...prev, id]));
    onQuestionSolved(id);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Pre-exam setup screen
  if (!isExamStarted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Award className="h-4 w-4" />
              <span>Simulated Glassdoor Assessment</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Timed QA / SDET Mock Interview
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Test your SQL test automation skills under real interview pressure. You will be presented with 10 questions covering ETL reconciliation, data integrity assertions, test flakiness analytics, and boundary testing.
            </p>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-slate-300">Target Company:</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Companies (Mixed FAANG & Tech Giants)</option>
                <option value="Google">Google (BigQuery & CI/CD Flakiness)</option>
                <option value="Amazon">Amazon (Fulfillment ETL & Order Reconciliation)</option>
                <option value="Sun King">Sun King (Solar IoT Telemetry & Pay-As-You-Go Credit)</option>
                <option value="GlobalLogic">GlobalLogic (Healthcare EHR & Telecom Mediation)</option>
                <option value="Nagarro">Nagarro (Banking Double-Entry Balances & Forex)</option>
                <option value="Microsoft">Microsoft (Azure DevOps Work Items & Orphans)</option>
                <option value="Meta">Meta (Ad Event Causality & Graph Integrity)</option>
                <option value="Netflix">Netflix (Streaming Buffer QoE & CDN Telemetry)</option>
                <option value="Apple">Apple (App Store Subscription State Machines)</option>
                <option value="Uber">Uber (Trip Pricing Formula & Multiplier Audits)</option>
                <option value="Flipkart">Flipkart (Warehouse Scans vs Courier Manifests)</option>
                <option value="Cognizant">Cognizant (Enterprise ETL & Null Constraints)</option>
                <option value="TCS">TCS (Banking Migration Checksums)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-slate-400">Questions:</span>
                <div className="text-base font-bold text-white font-mono">10 Questions</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-slate-400">Time Limit:</span>
                <div className="text-base font-bold text-cyan-400 font-mono">20 Minutes</div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={startExam}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm shadow-cyan-400/20"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Score report screen
  if (isFinished) {
    const score = solvedIds.size;
    const percentage = Math.round((score / 10) * 100);
    const isPassing = percentage >= 70;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 border border-slate-800 mb-2">
              {isPassing ? (
                <Sparkles className="h-6 w-6 text-emerald-400" />
              ) : (
                <ShieldAlert className="h-6 w-6 text-amber-400" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-white">Mock Interview Results</h2>
            <p className="text-xs text-slate-400">
              Target Company: <span className="text-cyan-400 font-semibold">{selectedCompany}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">Score</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {score} / 10
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">Accuracy</div>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                {percentage}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">Status</div>
              <div
                className={`text-sm font-bold mt-1.5 ${
                  isPassing ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {isPassing ? 'PASSED' : 'NEEDS PRACTICE'}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-100">QA Hiring Benchmark:</strong>{' '}
            {percentage >= 90
              ? 'Outstanding! Your SQL QA test verification skill is ready for Senior SDET / Lead QA roles at Tier-1 tech giants.'
              : percentage >= 70
              ? 'Solid performance! You cleared the QA interview benchmark. Review missed edge-case assertions.'
              : 'Keep practicing. Pay close attention to NULL handling in outer joins and window functions.'}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={startExam}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Mock Exam</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              Return to Question Bank
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active exam question screen
  const currentQ = examQuestions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950">
      {/* Exam Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {selectedCompany} QA Exam
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-xs text-slate-300 tabular-nums">
            Question {currentIndex + 1} of 10
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-md tabular-nums">
          <Timer className="h-4 w-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* Finish early */}
        <button
          onClick={finishExam}
          className="px-3.5 py-1.5 text-xs font-semibold text-rose-200 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800 rounded transition-colors"
        >
          Submit Exam
        </button>
      </div>

      {/* Progress pill dots */}
      <div className="flex items-center justify-center gap-1.5 py-2 bg-slate-900/40 border-b border-slate-800/60">
        {examQuestions.map((q, idx) => {
          const isDone = solvedIds.has(q.id);
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 w-6 rounded-full transition-all ${
                isCurrent
                  ? 'bg-cyan-400'
                  : isDone
                  ? 'bg-emerald-500'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Question Component */}
      <div className="flex-1 overflow-y-auto">
        <QuestionDetailModal
          question={currentQ}
          onClose={finishExam}
          onNext={currentIndex < 9 ? () => setCurrentIndex(currentIndex + 1) : undefined}
          onPrev={currentIndex > 0 ? () => setCurrentIndex(currentIndex - 1) : undefined}
          isBookmarked={false}
          onToggleBookmark={() => {}}
          isSolved={solvedIds.has(currentQ.id)}
          onMarkSolved={handleMarkSolved}
        />
      </div>
    </div>
  );
};
