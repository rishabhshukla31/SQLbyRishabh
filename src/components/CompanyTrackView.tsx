import React from 'react';
import { CompanyName, Question } from '../types/question';
import { COMPANY_PROFILES } from '../data/questionBank';
import { Building2, ArrowRight, PlayCircle, ShieldCheck, Terminal, Award } from 'lucide-react';

interface CompanyTrackViewProps {
  questions: Question[];
  onSelectCompany: (company: CompanyName) => void;
  onStartCompanyMock: (company: CompanyName) => void;
}

export const CompanyTrackView: React.FC<CompanyTrackViewProps> = ({
  questions,
  onSelectCompany,
  onStartCompanyMock,
}) => {
  const companies = Object.keys(COMPANY_PROFILES) as CompanyName[];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Intro hero banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Building2 className="h-4 w-4" />
            <span>Curated Glassdoor & Real-World Interview Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Company QA & SDET Interview Tracks
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every tech leader tests distinct QA competencies: Google tests BigQuery data integrity and CI/CD test flakiness, Amazon prioritizes order state machines and fulfillment ETL reconciliation, Sun King tests IoT solar telemetry gaps and Pay-As-You-Go installment defaults, while GlobalLogic and Nagarro focus on complex healthcare deduplication and banking double-entry ledger audits.
          </p>
        </div>
      </div>

      {/* Grid of Company Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {companies.map((company) => {
          const profile = COMPANY_PROFILES[company];
          const companyQuestions = questions.filter((q) => q.company === company);
          const interactiveCount = companyQuestions.filter((q) => q.type === 'interactive_sql').length;
          const mcqCount = companyQuestions.filter((q) => q.type === 'multiple_choice').length;

          return (
            <div
              key={company}
              className="flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 hover:border-slate-700 hover:bg-slate-900/80 transition-all shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/90 border border-slate-700 text-cyan-400 font-bold text-sm">
                      {company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{company}</h3>
                      <div className="text-[11px] text-slate-400">{profile.category}</div>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-cyan-400 tabular-nums">
                    {companyQuestions.length} Qs
                  </span>
                </div>

                {/* Glassdoor debrief */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 italic bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                  "{profile.glassdoorSnippet}"
                </p>

                {/* Interview Focus Topics */}
                <div className="space-y-1.5 text-xs text-slate-400 mb-5">
                  <span className="font-semibold text-slate-200">Key QA Focus:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {profile.interviewFocus}
                  </p>
                </div>

                {/* Breakdown counts */}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 mb-4">
                  <span className="flex items-center gap-1">
                    <Terminal className="h-3 w-3 text-cyan-400" />
                    <span className="font-mono tabular-nums">{interactiveCount}</span> SQL Runner
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-amber-400" />
                    <span className="font-mono tabular-nums">{mcqCount}</span> QA Quizzes
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectCompany(company)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
                >
                  <span>Browse {company} Qs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onStartCompanyMock(company)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
                  title="Take timed 10-question mock assessment"
                >
                  <PlayCircle className="h-3.5 w-3.5 fill-current" />
                  <span>Mock</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
