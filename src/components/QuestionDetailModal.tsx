import React, { useState, useEffect } from 'react';
import { Question, SqlExecutionResult, ValidationResult } from '../types/question';
import { SqlEngine } from '../services/sqlEngine';
import { SqlEditor } from './SqlEditor';
import { QueryResultTable } from './QueryResultTable';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Eye,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Building2,
  Database,
  ArrowRight,
  ShieldCheck,
  Table as TableIcon,
  Code2,
  Check,
  XCircle,
} from 'lucide-react';

interface QuestionDetailModalProps {
  question: Question;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isSolved: boolean;
  onMarkSolved: (id: string, userQuery?: string) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose,
  onNext,
  onPrev,
  isBookmarked,
  onToggleBookmark,
  isSolved,
  onMarkSolved,
}) => {
  // Interactive SQL state
  const [userQuery, setUserQuery] = useState(question.initialQuery || '');
  const [isRunning, setIsRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<SqlExecutionResult | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [activeSchemaTab, setActiveSchemaTab] = useState<string>(
    question.tables && question.tables.length > 0 ? question.tables[0].tableName : ''
  );

  // Multiple choice state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [showMcqSqlPlayground, setShowMcqSqlPlayground] = useState(false);
  const [mcqPlaygroundQuery, setMcqPlaygroundQuery] = useState('SELECT 1 AS test_val;');
  const [mcqPlaygroundResult, setMcqPlaygroundResult] = useState<SqlExecutionResult | null>(null);

  // Reset when question changes
  useEffect(() => {
    setUserQuery(question.initialQuery || '');
    setQueryResult(null);
    setValidationResult(null);
    setShowSolution(false);
    setShowInsight(false);
    setSelectedOptionId(null);
    setMcqSubmitted(false);
    setShowMcqSqlPlayground(false);
    setMcqPlaygroundResult(null);

    if (question.tables && question.tables.length > 0) {
      setActiveSchemaTab(question.tables[0].tableName);
    }

    // Starter query for playground if MCQ
    if (question.type === 'multiple_choice') {
      setMcqPlaygroundQuery('-- Experiment with SQL expressions here\nSELECT 100 AS total_count, (100 - 15) AS non_null_count;');
    }
  }, [question.id]);

  // Execute query in in-browser engine
  const handleRunQuery = () => {
    if (!question.dbSetupSql) return;
    setIsRunning(true);
    setValidationResult(null);

    setTimeout(() => {
      const res = SqlEngine.executeQuery(question.dbSetupSql!, userQuery);
      setQueryResult(res);
      setIsRunning(false);
    }, 50);
  };

  // Validate user query against solution
  const handleValidateSubmission = () => {
    if (!question.dbSetupSql || !question.solutionQuery) return;
    setIsRunning(true);

    setTimeout(() => {
      const val = SqlEngine.validateSolution(
        question.dbSetupSql!,
        userQuery,
        question.solutionQuery!
      );
      setValidationResult(val);
      setIsRunning(false);

      if (val.isCorrect) {
        onMarkSolved(question.id, userQuery);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b'],
        });
      }
    }, 100);
  };

  // MCQ click handler - immediately reveals feedback and answers
  const handleOptionClick = (optionId: string) => {
    setSelectedOptionId(optionId);
    setMcqSubmitted(true);
    const selected = question.options?.find((o) => o.id === optionId);
    if (selected?.isCorrect) {
      onMarkSolved(question.id);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#38bdf8'],
      });
    }
  };

  // MCQ SQL playground runner
  const handleRunMcqPlayground = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = SqlEngine.executeQuery('', mcqPlaygroundQuery);
      setMcqPlaygroundResult(res);
      setIsRunning(false);
    }, 50);
  };

  const correctOption = question.options?.find((o) => o.isCorrect);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-6xl max-h-[95vh] rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-cyan-400 tabular-nums">
              #{String(question.questionNumber).padStart(4, '0')}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-medium text-slate-300">{question.company}</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              {question.tier} Level
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">{question.interviewRole}</span>

            {isSolved && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 ml-2">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Solved
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(question.id)}
              className={`p-1.5 rounded transition-colors ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Bookmark question"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {onPrev && (
              <button
                onClick={onPrev}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Previous Question"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            {onNext && (
              <button
                onClick={onNext}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Next Question"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors ml-2"
              title="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Glassdoor context box */}
          <div className="p-3.5 rounded-lg border border-slate-800/80 bg-slate-900/40 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>Glassdoor Interview Experience Context</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">
                Frequency: <span className="text-amber-300 font-medium">{question.frequency}</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">
                Format: <span className="text-cyan-300 font-medium">{question.type === 'interactive_sql' ? 'Interactive SQL Code' : 'Multiple Choice Quiz'}</span>
              </span>
            </div>
            <p className="text-slate-300 italic">{question.glassdoorContext}</p>
          </div>

          {/* Title & problem statement */}
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-2">{question.title}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-line">
              {question.description}
            </div>
          </div>

          {/* Schema Viewer (if interactive tables provided) */}
          {question.tables && question.tables.length > 0 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Database className="h-4 w-4 text-cyan-400" />
                  <span>Database Schema & Test Fixtures</span>
                </div>
                <div className="flex items-center gap-1">
                  {question.tables.map((t) => (
                    <button
                      key={t.tableName}
                      onClick={() => setActiveSchemaTab(t.tableName)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors font-mono ${
                        activeSchemaTab === t.tableName
                          ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.tableName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active table view */}
              {question.tables
                .filter((t) => t.tableName === activeSchemaTab)
                .map((table) => (
                  <div key={table.tableName} className="space-y-3">
                    {/* Columns schema */}
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {table.columns.map((c) => (
                        <div
                          key={c.name}
                          className="px-2 py-1 bg-slate-950 rounded border border-slate-800 text-slate-300 flex items-center gap-1.5"
                        >
                          <span className={c.isPrimaryKey ? 'text-amber-400 font-semibold' : 'text-slate-200'}>
                            {c.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-sans">{c.type}</span>
                          {c.isPrimaryKey && <span className="text-[9px] text-amber-500 font-sans">PK</span>}
                          {c.isForeignKey && <span className="text-[9px] text-blue-400 font-sans">FK</span>}
                        </div>
                      ))}
                    </div>

                    {/* Sample data preview */}
                    {table.sampleData && table.sampleData.length > 0 && (
                      <div className="overflow-x-auto rounded border border-slate-800/80 max-h-40">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                            <tr>
                              {Object.keys(table.sampleData[0]).map((k) => (
                                <th key={k} className="py-1 px-2.5 text-slate-300 font-medium">
                                  {k}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50">
                            {table.sampleData.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-800/20">
                                {Object.values(row).map((v, i) => (
                                  <td key={i} className="py-1 px-2.5 text-slate-300 tabular-nums">
                                    {v === null ? <span className="text-amber-400/80">NULL</span> : String(v)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Interactive SQL Workspace */}
          {question.type === 'interactive_sql' && (
            <div className="space-y-4">
              <SqlEditor
                value={userQuery}
                onChange={setUserQuery}
                onRun={handleRunQuery}
                onReset={() => {
                  setUserQuery(question.initialQuery || '');
                  setQueryResult(null);
                  setValidationResult(null);
                }}
                isRunning={isRunning}
              />

              {/* Submit & Validate Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Click "Validate Solution" to test against expected QA test data output</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleValidateSubmission}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-colors shadow-sm shadow-cyan-400/20"
                  >
                    <span>Validate & Submit Solution</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Validation Result Box */}
              {validationResult && (
                <div
                  className={`p-4 rounded-lg border text-xs leading-relaxed ${
                    validationResult.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {validationResult.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="font-bold text-sm">
                        {validationResult.isCorrect ? 'Verification Successful!' : 'Verification Failed'}
                      </div>
                      <p>{validationResult.feedback}</p>
                      {validationResult.differences && validationResult.differences.length > 0 && (
                        <ul className="list-disc list-inside mt-2 space-y-1 text-rose-300 font-mono text-[11px]">
                          {validationResult.differences.map((diff, i) => (
                            <li key={i}>{diff}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Live Query Results Table */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <TableIcon className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Execution Output</span>
                </div>
                <QueryResultTable result={queryResult} isLoading={isRunning} />
              </div>
            </div>
          )}

          {/* Multiple Choice Quiz Workspace with Instant Feedback and "Why Correct" */}
          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-4">
              <div className="text-xs font-medium text-slate-400">
                Click any option to submit your answer and instantly see why it is correct:
              </div>

              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  const showFeedback = mcqSubmitted;
                  let borderStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900/40';

                  if (showFeedback) {
                    if (option.isCorrect) {
                      borderStyle = 'border-emerald-700 bg-emerald-950/30 text-emerald-100 shadow-sm shadow-emerald-950/30';
                    } else if (isSelected && !option.isCorrect) {
                      borderStyle = 'border-rose-800 bg-rose-950/30 text-rose-100 shadow-sm shadow-rose-950/30';
                    }
                  } else if (isSelected) {
                    borderStyle = 'border-cyan-500 bg-cyan-950/20 text-cyan-100';
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${borderStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {showFeedback && option.isCorrect ? (
                            <div className="h-4 w-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                              ✓
                            </div>
                          ) : showFeedback && isSelected && !option.isCorrect ? (
                            <div className="h-4 w-4 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-[10px]">
                              ✗
                            </div>
                          ) : (
                            <div
                              className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                              }`}
                            >
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-xs leading-relaxed">
                          <span className="text-slate-100 font-medium">{option.text}</span>
                        </div>
                      </div>

                      {/* Immediate Explanation below each option when submitted */}
                      {showFeedback && (
                        <div
                          className={`mt-2.5 pt-2.5 border-t text-[11px] leading-relaxed font-mono ${
                            option.isCorrect
                              ? 'border-emerald-800/60 text-emerald-300'
                              : isSelected
                              ? 'border-rose-900/60 text-rose-300'
                              : 'border-slate-800/80 text-slate-400'
                          }`}
                        >
                          <span className="font-bold">
                            {option.isCorrect ? '✓ Correct Choice: ' : isSelected ? '✗ Why this choice fails: ' : 'Analysis: '}
                          </span>
                          {option.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* In-depth "Why Correct" Banner when submitted */}
              {mcqSubmitted && (
                <div className="p-4 rounded-xl border border-emerald-800/80 bg-emerald-950/40 text-xs leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Why This Is Correct (QA Interview Master Guide):</span>
                  </div>
                  <p className="text-emerald-200">
                    {question.whyCorrect || correctOption?.explanation || question.qaInsight}
                  </p>
                </div>
              )}

              {/* Write SQL Code Playground Toggle for MCQ Questions */}
              <div className="pt-2">
                <button
                  onClick={() => setShowMcqSqlPlayground(!showMcqSqlPlayground)}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/20 border border-cyan-900/50 rounded-lg transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>
                    {showMcqSqlPlayground
                      ? 'Hide SQL Code Playground'
                      : 'Write & Run SQL Code to Verify This Scenario'}
                  </span>
                </button>

                {showMcqSqlPlayground && (
                  <div className="mt-3 space-y-3 p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                    <div className="text-xs text-slate-300 font-medium">
                      Live In-Browser SQL Workspace: Write queries to verify this question:
                    </div>
                    <SqlEditor
                      value={mcqPlaygroundQuery}
                      onChange={setMcqPlaygroundQuery}
                      onRun={handleRunMcqPlayground}
                      onReset={() =>
                        setMcqPlaygroundQuery('-- Reset query\nSELECT 1 AS sanity_check;')
                      }
                      isRunning={isRunning}
                    />
                    <QueryResultTable result={mcqPlaygroundResult} isLoading={isRunning} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QA Insight & Explanation Accordion */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowInsight(!showInsight)}
                className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                <span>{showInsight ? 'Hide QA Interview Insight' : 'View QA Interview Insight & Trap Warning'}</span>
              </button>

              {question.solutionQuery && (
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white py-1 ml-auto"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{showSolution ? 'Hide Solution' : 'Reveal Canonical QA Solution'}</span>
                </button>
              )}
            </div>

            {/* QA Insight Content */}
            {showInsight && (
              <div className="p-4 rounded-lg border border-cyan-900/50 bg-cyan-950/20 text-xs text-cyan-200 leading-relaxed space-y-1">
                <div className="font-semibold text-cyan-300">Why QA Interviewers Care:</div>
                <p>{question.qaInsight}</p>
              </div>
            )}

            {/* Canonical Solution Content */}
            {showSolution && question.solutionQuery && (
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300 font-semibold">
                  <span>Canonical QA Solution Query:</span>
                  <button
                    onClick={() => {
                      setUserQuery(question.solutionQuery || '');
                      setShowSolution(false);
                    }}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Load into Editor
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded border border-slate-800/80 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                  {question.solutionQuery}
                </pre>
                {question.expectedResultExplanation && (
                  <p className="text-slate-400 text-xs leading-relaxed pt-1">
                    {question.expectedResultExplanation}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
