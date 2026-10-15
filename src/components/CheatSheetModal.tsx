import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';

interface CheatSheetModalProps {
  onClose: () => void;
}

interface Pattern {
  title: string;
  tag: string;
  description: string;
  sql: string;
  qaWhy: string;
}

const PATTERNS: Pattern[] = [
  {
    title: '1. ETL Source-to-Target Anti-Join (The Anti-NULL Trap)',
    tag: 'ETL Reconciliation',
    description: 'Find records present in the source staging table that were dropped during ingestion into the production warehouse.',
    sql: `-- PREFERRED: Safe against NULLs in target
SELECT s.order_id, s.amount
FROM staging_orders s
LEFT JOIN target_warehouse t ON s.order_id = t.order_id
WHERE s.status = 'COMPLETED' AND t.order_id IS NULL;

-- ALTERNATIVE: NOT EXISTS
SELECT s.order_id, s.amount
FROM staging_orders s
WHERE s.status = 'COMPLETED'
  AND NOT EXISTS (
    SELECT 1 FROM target_warehouse t WHERE t.order_id = s.order_id
  );`,
    qaWhy: 'NEVER use "WHERE s.order_id NOT IN (SELECT order_id FROM target_warehouse)". If target_warehouse contains even ONE row with NULL order_id, NOT IN returns 0 rows due to 3-valued logic, hiding data loss!',
  },
  {
    title: '2. Detecting Duplicate Business Keys with Inconsistent Attributes',
    tag: 'Data Integrity',
    description: 'Find accounts or entities where the primary key exists multiple times with diverging names or statuses (race condition).',
    sql: `SELECT national_id, COUNT(DISTINCT patient_name) AS distinct_names
FROM patient_registry
GROUP BY national_id
HAVING COUNT(DISTINCT patient_name) > 1;`,
    qaWhy: 'Standard COUNT(*) > 1 only catches identical duplicate rows. The critical bug in data migration is conflicting attributes on identical business keys.',
  },
  {
    title: '3. Detecting Orphaned Foreign Keys (Broken Referential Integrity)',
    tag: 'Referential Integrity',
    description: 'Identify child records that reference parent rows that do not exist (e.g. comments with no parent bug ticket).',
    sql: `SELECT c.comment_id, c.bug_id
FROM bug_comments c
LEFT JOIN defects d ON c.bug_id = d.bug_id
WHERE d.bug_id IS NULL;`,
    qaWhy: 'NoSQL, distributed microservices, and sharded Postgres instances do not enforce physical foreign key constraints. QA automation scripts run orphaned-record audits regularly.',
  },
  {
    title: '4. Sensor/Telemetry Gaps with Window Functions (LAG / LEAD)',
    tag: 'Time-Series QA',
    description: 'Identify IoT devices or microservices where the gap between consecutive pings exceeded the maximum SLA.',
    sql: `SELECT 
  device_id,
  reading_time,
  epoch_minutes - LAG(epoch_minutes, 1) OVER (
    PARTITION BY device_id ORDER BY epoch_minutes
  ) AS gap_minutes
FROM solar_telemetry
WHERE gap_minutes > 60;`,
    qaWhy: 'Hardware, IoT (like Sun King solar units), and message broker QA rely on LAG/LEAD to detect lost packets and out-of-order event streams.',
  },
  {
    title: '5. Financial Double-Entry Accounting Imbalance',
    tag: 'Fintech QA',
    description: 'Ensure the sum of debits exactly matches the sum of credits for every transaction.',
    sql: `SELECT 
  transaction_id,
  SUM(debit_amount) AS total_debits,
  SUM(credit_amount) AS total_credits,
  SUM(debit_amount) - SUM(credit_amount) AS diff
FROM ledger_entries
GROUP BY transaction_id
HAVING SUM(debit_amount) <> SUM(credit_amount);`,
    qaWhy: 'In banking QA (Nagarro, Stripe, PayPal), an unbalanced transaction is a P0 showstopper that stops daily settlement batches.',
  },
  {
    title: '6. Three-Valued Logic: Why NULL = NULL is UNKNOWN',
    tag: 'SQL Foundations',
    description: 'Understanding how NULL behaves in conditional logic and aggregate functions.',
    sql: `-- TRAP: Will return 0 rows!
SELECT * FROM table WHERE column = NULL;

-- CORRECT:
SELECT * FROM table WHERE column IS NULL;

-- AGGREGATE TRAP:
-- COUNT(*) = total physical rows
-- COUNT(col) = total rows where col IS NOT NULL
-- AVG(col) = SUM(col) / COUNT(col) -- ignores NULL rows completely!`,
    qaWhy: 'Commonly asked in Google & Amazon SDET interviews to test if candidates understand SQL standards vs programming language equality.',
  },
];

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ onClose }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (sql: string, idx: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">QA SQL Interview Cheat Sheet</h2>
              <div className="text-xs text-slate-400">Must-know query templates for SDET & Data QA interviews</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List of Patterns */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          {PATTERNS.map((p, idx) => (
            <div
              key={p.title}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {p.tag}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>

              {/* Code Box */}
              <div className="relative rounded-lg bg-slate-950 p-3 border border-slate-800/80 font-mono text-xs text-emerald-300 overflow-x-auto">
                <button
                  onClick={() => handleCopy(p.sql, idx)}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded text-[11px] flex items-center gap-1"
                >
                  {copiedIdx === idx ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                </button>
                <pre>{p.sql}</pre>
              </div>

              {/* QA Insight Callout */}
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-200">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-cyan-300">Why QA Interviewers Ask This:</strong> {p.qaWhy}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
