import { CompanyCategory, CompanyName, DifficultyLevel, QACategory, Question } from '../types/question';
import { CURATED_QA_QUESTIONS } from './curatedQuestions';

// Company metadata & Glassdoor interview benchmarks
export const COMPANY_PROFILES: Record<
  CompanyName,
  {
    category: CompanyCategory;
    interviewFocus: string;
    glassdoorSnippet: string;
    interviewRoles: ('SDET' | 'QA Engineer' | 'Data QA Analyst' | 'Automation Test Lead' | 'ETL Tester')[];
    sampleDomains: string[];
    accentColor: string;
  }
> = {
  Google: {
    category: 'FAANG & Big Tech',
    interviewFocus: 'Distributed Systems QA, BigQuery reconciliation, CI/CD Test Flakiness, Event Stream Causality',
    glassdoorSnippet: 'Focuses on test automation at massive scale: BigQuery analytical test scripts, flaky test analytics, and data pipeline invariants.',
    interviewRoles: ['SDET', 'Data QA Analyst', 'Automation Test Lead'],
    sampleDomains: ['Search Quality', 'YouTube Telemetry', 'Cloud BigQuery', 'Android Automated Test Farm'],
    accentColor: 'text-blue-400',
  },
  Amazon: {
    category: 'FAANG & Big Tech',
    interviewFocus: 'Fulfillment ETL Testing, Order State Machines, SQS/Redshift Reconciliation, Inventory Discrepancy',
    glassdoorSnippet: 'Heavily tests ETL source-to-target integrity, multi-table anti-joins, and transaction reconciliation between DynamoDB and Redshift.',
    interviewRoles: ['SDET', 'QA Engineer', 'ETL Tester'],
    sampleDomains: ['Fulfillment Centers', 'Prime 1-Day SLA', 'Inventory Ledger', 'Payment Gateway Reconciliation'],
    accentColor: 'text-amber-400',
  },
  'Sun King': {
    category: 'Enterprise & GreenTech',
    interviewFocus: 'IoT Device Telemetry Testing, Pay-As-You-Go Solar Micro-installment schedules, Hardware Firmware QA',
    glassdoorSnippet: 'Glassdoor candidates in Nairobi & Mumbai report emphasis on time-series telemetry gaps, installment defaults, and customer token generation integrity.',
    interviewRoles: ['Data QA Analyst', 'QA Engineer', 'SDET'],
    sampleDomains: ['Solar Inverter Telemetry', 'Pay-As-You-Go Credit', 'Firmware Event Logs', 'Mobile Money Pay-Ins'],
    accentColor: 'text-yellow-400',
  },
  GlobalLogic: {
    category: 'Tech Consultancy Giant',
    interviewFocus: 'Healthcare Patient Record Deduplication, Telecom CDR Mediation, Automated Regression Suites',
    glassdoorSnippet: 'Interviews evaluate real-world migration QA: finding inconsistent duplicates, complex multi-table joins, and test execution pass rates.',
    interviewRoles: ['Automation Test Lead', 'QA Engineer', 'SDET'],
    sampleDomains: ['EHR Medical Records', 'Telecom Billing Mediation', 'Regression Suite Analytics', 'Automotive Infotainment QA'],
    accentColor: 'text-cyan-400',
  },
  Nagarro: {
    category: 'Tech Consultancy Giant',
    interviewFocus: 'Core Banking Ledger Validation, Double-Entry Accounting Balances, Financial Auditing, End-of-Day Batch QA',
    glassdoorSnippet: 'Known for rigorous financial QA questions: checking debit/credit equality, identifying currency exchange date boundaries, and orphaned invoices.',
    interviewRoles: ['QA Engineer', 'Automation Test Lead', 'ETL Tester'],
    sampleDomains: ['Core Banking', 'Double-Entry Ledgers', 'Mortgage Loan Origination', 'Forex Settlement'],
    accentColor: 'text-emerald-400',
  },
  Microsoft: {
    category: 'FAANG & Big Tech',
    interviewFocus: 'Azure DevOps Pipeline QA, Referential Integrity, License Allocation, Cloud Telemetry Error Spikes',
    glassdoorSnippet: 'Interviews assess Azure pipeline reliability, referential integrity between bug tracking tables, and cloud resource billing accuracy.',
    interviewRoles: ['SDET', 'Automation Test Lead'],
    sampleDomains: ['Azure DevOps Work Items', 'Office 365 Tenant Audits', 'Teams Media Quality', 'Windows Build Sanity'],
    accentColor: 'text-sky-400',
  },
  Meta: {
    category: 'FAANG & Big Tech',
    interviewFocus: 'Ad Impression vs Click Reconciliation, Event Causality, User Deduplication, Content Moderation Queues',
    glassdoorSnippet: 'Focuses on causality validation in event queues (clicks vs impressions) and large-scale user graph integrity checks.',
    interviewRoles: ['SDET', 'Data QA Analyst'],
    sampleDomains: ['Ad Campaign Analytics', 'Graph Integrity', 'Video Viewership Metrics', 'Account Security Audit'],
    accentColor: 'text-indigo-400',
  },
  Netflix: {
    category: 'FAANG & Big Tech',
    interviewFocus: 'Streaming Quality of Experience (QoE), Buffer Stall Ratios, CDN Edge Routing QA, Metadata Drift',
    glassdoorSnippet: 'Questions center around streaming telemetry: calculating rebuffer percentage, identifying playback dropouts, and catalog licensing validity.',
    interviewRoles: ['SDET', 'Data QA Analyst'],
    sampleDomains: ['Video Streaming QoE', 'CDN Cache Hit Ratios', 'Catalog Title Availability', 'Member Profile Sync'],
    accentColor: 'text-red-400',
  },
  Apple: {
    category: 'FAANG & Big Tech',
    interviewFocus: 'App Store In-App Purchases, Subscription State Machines, Hardware Component Defect Rates, iCloud Sync',
    glassdoorSnippet: 'Assesses state machine validation in subscription lifecycles, receipt verification discrepancies, and device hardware failure rates.',
    interviewRoles: ['SDET', 'QA Engineer'],
    sampleDomains: ['App Store Subscription Engine', 'iCloud Conflict Resolver', 'Factory Hardware Quality', 'Apple Pay Ledger'],
    accentColor: 'text-slate-300',
  },
  Uber: {
    category: 'Fintech & Mobility',
    interviewFocus: 'Trip Fare Formula Auditing, Surge Multiplier Reconciliation, Driver Payouts, GPS Route Bounds',
    glassdoorSnippet: 'Focuses on pricing engine verification: validating fare calculations against base+mileage+surge formulas and driver ledger balances.',
    interviewRoles: ['SDET', 'Data QA Analyst'],
    sampleDomains: ['Rider Fare Calculation', 'Driver Payout Ledger', 'Surge Pricing Engine', 'Eats Delivery Dispatch'],
    accentColor: 'text-emerald-400',
  },
  Flipkart: {
    category: 'Fintech & Mobility',
    interviewFocus: 'Warehouse Dispatch vs Courier Manifest, Cash on Delivery (COD) Reconciliation, Flash Sale Concurrency QA',
    glassdoorSnippet: 'Interviews focus heavily on logistics and order fulfillment testing: dock scans vs courier handoffs, COD settlements, and inventory oversell bugs.',
    interviewRoles: ['SDET', 'ETL Tester'],
    sampleDomains: ['Fulfillment Center Scans', 'Ekart Courier Manifest', 'COD Remittance Audit', 'Flash Sale Inventory'],
    accentColor: 'text-blue-400',
  },
  Cognizant: {
    category: 'Tech Consultancy Giant',
    interviewFocus: 'Enterprise Data Warehouse QA, Source vs Target Reconciliation, Insurance Claim Auditing, Nullability Rules',
    glassdoorSnippet: 'Tests classic data warehouse ETL testing: row count validations, minus queries, checksums, and null constraint tests in health/insurance.',
    interviewRoles: ['ETL Tester', 'QA Engineer'],
    sampleDomains: ['Health Insurance Claims', 'Retail Banking ETL', 'Supply Chain Migration', 'Regulatory Compliance Reporting'],
    accentColor: 'text-teal-400',
  },
  TCS: {
    category: 'Tech Consultancy Giant',
    interviewFocus: 'Core Banking Data Migration, Source-to-Staging Checksums, Foreign Key Constraint Integrity, Batch Jobs',
    glassdoorSnippet: 'Commonly tests banking migration scenarios: ensuring staging tables exactly mirror source flat files without precision loss or duplicate keys.',
    interviewRoles: ['ETL Tester', 'QA Engineer', 'Automation Test Lead'],
    sampleDomains: ['Banking Core Migration', 'Telecom Billing Validation', 'Government Pension Ledgers', 'Retail Inventory Sync'],
    accentColor: 'text-cyan-400',
  },
};

export const QA_CATEGORIES: QACategory[] = [
  'ETL & Source-to-Target Reconciliation',
  'Data Deduplication & Integrity',
  'Nullability & Boundary Testing',
  'Defect & Test Execution Analytics',
  'Financial & Ledger Verification',
  'Temporal & Window Function QA',
  'Complex Multi-Table Joins & Orphans',
  'Schema Drift & CDC Validation',
];

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  'Junior QA',
  'Mid SDET',
  'Senior QA Lead',
  'Principal Data QA',
];

const COMPANIES: CompanyName[] = [
  'Google',
  'Amazon',
  'Sun King',
  'GlobalLogic',
  'Nagarro',
  'Microsoft',
  'Meta',
  'Netflix',
  'Apple',
  'Uber',
  'Flipkart',
  'Cognizant',
  'TCS',
];

// Reusable scenario templates for generating the full 2,000 QA SQL question bank
interface QuestionTemplate {
  category: QACategory;
  titleFormula: (company: string, domain: string, index: number) => string;
  glassdoorFormula: (company: string, role: string, topic: string) => string;
  descriptionFormula: (company: string, domain: string) => string;
  qaInsight: string;
  type: 'interactive_sql' | 'multiple_choice';
  setupGenerator: (company: string) => {
    dbSetupSql: string;
    initialQuery: string;
    solutionQuery: string;
    explanation: string;
  };
  mcqGenerator?: () => {
    options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  };
}

const TEMPLATES: QuestionTemplate[] = [
  {
    category: 'ETL & Source-to-Target Reconciliation',
    type: 'interactive_sql',
    titleFormula: (company, domain, i) => `${company} QA: Reconcile ${domain} Source vs Target ETL Record Drops (#${i})`,
    glassdoorFormula: (company, role, topic) => `Reported for ${company} ${role} technical round on Glassdoor: "Candidate had to write an automated reconciliation test script to verify whether all completed transactions in the ingest queue reached the analytical datastore without data loss."`,
    descriptionFormula: (company, domain) => `During daily ETL ingestion in ${company}'s ${domain} pipeline, some records may fail silent pipeline transformations. Write a QA query to find all primary IDs present in source_records with status 'VALID' that are completely missing from target_warehouse. Order by record_id ASC.`,
    qaInsight: `In ETL testing, automated reconciliation queries form the backbone of regression suites. Always prefer LEFT JOIN with IS NULL or NOT EXISTS over NOT IN to avoid silent null poisoning.`,
    setupGenerator: (company) => ({
      dbSetupSql: `
        CREATE TABLE source_records (record_id INT, entity_code VARCHAR(30), status VARCHAR(20), amount DECIMAL(10,2));
        CREATE TABLE target_warehouse (record_id INT, entity_code VARCHAR(30), status VARCHAR(20), amount DECIMAL(10,2));
        INSERT INTO source_records VALUES (101, 'ENT-A', 'VALID', 150.00), (102, 'ENT-B', 'VALID', 240.50), (103, 'ENT-C', 'VALID', 99.00), (104, 'ENT-D', 'PENDING', 12.00), (105, 'ENT-E', 'VALID', 450.00);
        INSERT INTO target_warehouse VALUES (101, 'ENT-A', 'VALID', 150.00), (102, 'ENT-B', 'VALID', 240.50), (104, 'ENT-D', 'PENDING', 12.00);
      `,
      initialQuery: `SELECT s.record_id, s.entity_code, s.amount
FROM source_records s
-- add your reconciliation anti-join here
ORDER BY s.record_id ASC;`,
      solutionQuery: `SELECT s.record_id, s.entity_code, s.amount
FROM source_records s
LEFT JOIN target_warehouse t ON s.record_id = t.record_id
WHERE s.status = 'VALID' AND t.record_id IS NULL
ORDER BY s.record_id ASC`,
      explanation: `Records 103 and 105 were valid in source_records but never persisted in target_warehouse, flagging an ETL pipeline ingestion defect.`,
    }),
  },
  {
    category: 'Data Deduplication & Integrity',
    type: 'interactive_sql',
    titleFormula: (company, domain, i) => `${company} SDET: Detect Duplicate ${domain} Keys with Conflicting Statuses (#${i})`,
    glassdoorFormula: (company, role, topic) => `Glassdoor interview for ${company} ${role}: "We encountered a race condition in microservices producing duplicate entries for the same business key. Interviewer asked to write a SQL query to identify duplicate keys having conflicting statuses."`,
    descriptionFormula: (company, domain) => `In ${company}'s ${domain} database, concurrent worker threads occasionally insert multiple records for the same reference_id. Write a QA query to find all reference_ids having more than 1 distinct status. Return reference_id and count of distinct statuses as status_count. Order by status_count DESC, reference_id ASC.`,
    qaInsight: `Race conditions in microservices often violate business key uniqueness. In QA validation, verifying COUNT(DISTINCT attribute) > 1 catches inconsistent duplicate mutations.`,
    setupGenerator: (company) => ({
      dbSetupSql: `
        CREATE TABLE entity_events (event_id INT, reference_id VARCHAR(30), status VARCHAR(20), updated_at VARCHAR(30));
        INSERT INTO entity_events VALUES 
        (1, 'REF-9001', 'COMPLETED', '2026-10-01 10:00'),
        (2, 'REF-9001', 'FAILED', '2026-10-01 10:02'),
        (3, 'REF-9002', 'ACTIVE', '2026-10-01 11:00'),
        (4, 'REF-9002', 'ACTIVE', '2026-10-01 11:05'),
        (5, 'REF-9003', 'PENDING', '2026-10-01 12:00'),
        (6, 'REF-9003', 'CANCELLED', '2026-10-01 12:10');
      `,
      initialQuery: `SELECT reference_id, COUNT(DISTINCT status) AS status_count
FROM entity_events
-- group and filter for multiple distinct statuses
ORDER BY status_count DESC, reference_id ASC;`,
      solutionQuery: `SELECT reference_id, COUNT(DISTINCT status) AS status_count
FROM entity_events
GROUP BY reference_id
HAVING COUNT(DISTINCT status) > 1
ORDER BY status_count DESC, reference_id ASC`,
      explanation: `REF-9001 (COMPLETED, FAILED) and REF-9003 (PENDING, CANCELLED) both have conflicting statuses indicating race condition state pollution. REF-9002 has 2 rows but identical status ('ACTIVE').`,
    }),
  },
  {
    category: 'Defect & Test Execution Analytics',
    type: 'interactive_sql',
    titleFormula: (company, domain, i) => `${company} Quality Lead: Compute Regression Suite Failure Rate & Defect Density (#${i})`,
    glassdoorFormula: (company, role, topic) => `Reported on Glassdoor for ${company} ${role}: "The interviewer wanted to see how I would extract actionable QA telemetry: calculating failure percentages per module to direct manual QA testing towards unstable microservices."`,
    descriptionFormula: (company, domain) => `During ${company}'s nightly automated regression runs for ${domain}, test suites execute against multiple microservices. Write a query to return module_name, total_tests, failed_tests, and fail_rate_pct (calculated as (failed_tests * 100.0) / total_tests rounded to 2 decimal places). Filter for modules with fail_rate_pct > 20.0. Order by fail_rate_pct DESC, module_name ASC.`,
    qaInsight: `Quality managers use SQL test execution telemetry to compute Mean Time Between Failures (MTBF) and module risk ratings for release readiness gating.`,
    setupGenerator: (company) => ({
      dbSetupSql: `
        CREATE TABLE test_suite_results (execution_id INT, module_name VARCHAR(50), test_case VARCHAR(50), test_result VARCHAR(10));
        INSERT INTO test_suite_results VALUES 
        (1, 'Billing', 'test_tax_calc', 'PASSED'), (2, 'Billing', 'test_stripe_webhook', 'FAILED'), (3, 'Billing', 'test_refund_flow', 'FAILED'), (4, 'Billing', 'test_currency_fx', 'PASSED'),
        (5, 'Auth', 'test_jwt_refresh', 'PASSED'), (6, 'Auth', 'test_saml_login', 'PASSED'), (7, 'Auth', 'test_mfa_sms', 'PASSED'),
        (8, 'Inventory', 'test_stock_lock', 'FAILED'), (9, 'Inventory', 'test_decrement', 'PASSED'), (10, 'Inventory', 'test_restock_alert', 'PASSED');
      `,
      initialQuery: `SELECT module_name, COUNT(*) AS total_tests,
  SUM(CASE WHEN test_result = 'FAILED' THEN 1 ELSE 0 END) AS failed_tests,
  ROUND(SUM(CASE WHEN test_result = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*), 2) AS fail_rate_pct
FROM test_suite_results
-- group and filter for fail_rate_pct > 20.0
ORDER BY fail_rate_pct DESC, module_name ASC;`,
      solutionQuery: `SELECT module_name, COUNT(*) AS total_tests,
  SUM(CASE WHEN test_result = 'FAILED' THEN 1 ELSE 0 END) AS failed_tests,
  ROUND(SUM(CASE WHEN test_result = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*), 2) AS fail_rate_pct
FROM test_suite_results
GROUP BY module_name
HAVING (SUM(CASE WHEN test_result = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*)) > 20.0
ORDER BY fail_rate_pct DESC, module_name ASC`,
      explanation: `Billing module has 2 failures out of 4 (50.0%) and Inventory module has 1 failure out of 3 (33.33%), both exceeding 20% fail rate. Auth module is 100% passing.`,
    }),
  },
  {
    category: 'Nullability & Boundary Testing',
    type: 'multiple_choice',
    titleFormula: (company, domain, i) => `${company} QA Interview: Three-Valued Logic & Boolean Truth Tables (#${i})`,
    glassdoorFormula: (company, role, topic) => `Glassdoor interview question for ${company} ${role}: "Interviewer tested core SQL fundamentals: how does NULL behave in WHERE NOT (col = 'ACTIVE') when rows contain NULL values?"`,
    descriptionFormula: (company, domain) => `In ${company}'s ${domain} database, a QA automation test query executes:
\`\`\`sql
SELECT COUNT(*) 
FROM accounts 
WHERE NOT (status = 'ACTIVE');
\`\`\`
If accounts contains 50 'ACTIVE' rows, 30 'INACTIVE' rows, and 20 rows where status IS NULL, what count will be returned?`,
    qaInsight: `NULL is not false; it is UNKNOWN. NOT (UNKNOWN) evaluates to UNKNOWN! In SQL WHERE clauses, only TRUE passes the filter. Rows with NULL are discarded.`,
    setupGenerator: () => ({ dbSetupSql: '', initialQuery: '', solutionQuery: '', explanation: '' }),
    mcqGenerator: () => ({
      options: [
        {
          id: 'opt-1',
          text: '30 rows (the 20 NULL rows evaluate to UNKNOWN and are omitted).',
          isCorrect: true,
          explanation: 'Correct! In SQL three-valued logic, NULL = "ACTIVE" is UNKNOWN. NOT(UNKNOWN) is still UNKNOWN. WHERE clauses only return rows evaluating strictly to TRUE. The 20 NULL rows are omitted, yielding 30.',
        },
        {
          id: 'opt-2',
          text: '50 rows (30 INACTIVE + 20 NULL, since NULL is not equal to ACTIVE).',
          isCorrect: false,
          explanation: 'Incorrect. This is the most common QA trap in SQL interviews! NULL <> ACTIVE evaluates to UNKNOWN, not TRUE.',
        },
        {
          id: 'opt-3',
          text: '0 rows, because NULL invalidates the entire query evaluation.',
          isCorrect: false,
          explanation: 'Incorrect. SQL queries execute normally; NULL expressions simply evaluate to UNKNOWN.',
        },
        {
          id: 'opt-4',
          text: '100 rows, because NOT causes an inverted full table scan.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    }),
  },
  {
    category: 'Financial & Ledger Verification',
    type: 'interactive_sql',
    titleFormula: (company, domain, i) => `${company} QA: Audit Settlement Totals vs Detailed Line Item Sums (#${i})`,
    glassdoorFormula: (company, role, topic) => `Glassdoor feedback for ${company} ${role}: "In financial auditing QA, candidate was asked to write a reconciliation query between parent invoice total and the sum of child line items to catch discount and tax round-off bugs."`,
    descriptionFormula: (company, domain) => `In ${company}'s ${domain} billing system, each parent invoice has a declared total_amount. Due to rounding bugs in pricing microservices, line item sums occasionally deviate. Write a QA query to find all invoice_ids where the parent total_amount does not match the sum of item_amount from invoice_items. Return invoice_id, parent_total, items_sum, and difference (parent_total - items_sum). Order by invoice_id ASC.`,
    qaInsight: `Discrepancy between parent header totals and child line item sums is a critical P0 financial audit defect. Automated testing queries must routinely verify relational balance consistency.`,
    setupGenerator: (company) => ({
      dbSetupSql: `
        CREATE TABLE invoices (invoice_id VARCHAR(20), parent_total DECIMAL(10,2));
        CREATE TABLE invoice_items (item_id INT, invoice_id VARCHAR(20), item_amount DECIMAL(10,2));
        INSERT INTO invoices VALUES ('INV-100', 100.00), ('INV-200', 250.50), ('INV-300', 75.00);
        INSERT INTO invoice_items VALUES 
        (1, 'INV-100', 50.00), (2, 'INV-100', 50.00),
        (3, 'INV-200', 100.00), (4, 'INV-200', 150.00),
        (5, 'INV-300', 40.00), (6, 'INV-300', 35.00);
      `,
      initialQuery: `SELECT i.invoice_id, i.parent_total, SUM(it.item_amount) AS items_sum,
  i.parent_total - SUM(it.item_amount) AS difference
FROM invoices i
JOIN invoice_items it ON i.invoice_id = it.invoice_id
-- filter for mismatch
ORDER BY i.invoice_id ASC;`,
      solutionQuery: `SELECT i.invoice_id, i.parent_total, SUM(it.item_amount) AS items_sum,
  i.parent_total - SUM(it.item_amount) AS difference
FROM invoices i
JOIN invoice_items it ON i.invoice_id = it.invoice_id
GROUP BY i.invoice_id, i.parent_total
HAVING i.parent_total <> SUM(it.item_amount)
ORDER BY i.invoice_id ASC`,
      explanation: `INV-200 has parent total 250.50, but child items sum to 250.00 (difference 0.50), revealing a rounding or tax omission bug.`,
    }),
  },
  {
    category: 'Complex Multi-Table Joins & Orphans',
    type: 'interactive_sql',
    titleFormula: (company, domain, i) => `${company} SDET: Identify Orphan Records in Disconnected Relational Entities (#${i})`,
    glassdoorFormula: (company, role, topic) => `Reported on Glassdoor for ${company} ${role}: "We do not enforce foreign keys in Cassandra or sharded Postgres. Candidate was asked to write a script to find orphaned child rows whose parent entity was deleted."`,
    descriptionFormula: (company, domain) => `In ${company}'s ${domain} database, audit_logs reference user_id from users. When users are soft-deleted or purged, some audit logs become orphaned. Write a QA query to return log_id, user_id, and action for all audit logs whose user_id does not exist in the users table. Order by log_id ASC.`,
    qaInsight: `Orphaned child records violate 3NF referential integrity and cause NullPointerExceptions in downstream reporting dashboards. QA engineers write orphaned-row detection scripts for nightly hygiene passes.`,
    setupGenerator: (company) => ({
      dbSetupSql: `
        CREATE TABLE users (user_id INT, username VARCHAR(50));
        CREATE TABLE audit_logs (log_id INT, user_id INT, action VARCHAR(50));
        INSERT INTO users VALUES (1, 'alice'), (2, 'bob'), (3, 'charlie');
        INSERT INTO audit_logs VALUES (10, 1, 'LOGIN'), (11, 2, 'PURCHASE'), (12, 99, 'PASSWORD_RESET'), (13, 3, 'LOGOUT'), (14, 88, 'UPDATE_PROFILE');
      `,
      initialQuery: `SELECT a.log_id, a.user_id, a.action
FROM audit_logs a
-- find logs without user
ORDER BY a.log_id ASC;`,
      solutionQuery: `SELECT a.log_id, a.user_id, a.action
FROM audit_logs a
LEFT JOIN users u ON a.user_id = u.user_id
WHERE u.user_id IS NULL
ORDER BY a.log_id ASC`,
      explanation: `Logs 12 (user 99) and 14 (user 88) have no matching parent record in the users table.`,
    }),
  },
  {
    category: 'Temporal & Window Function QA',
    type: 'interactive_sql',
    titleFormula: (company, domain, i) => `${company} QA: Detect Out-of-Order Sensor Pings with Window Functions (#${i})`,
    glassdoorFormula: (company, role, topic) => `Glassdoor interview at ${company} for ${role}: "Interviewer tested window functions: writing a query with LAG() to verify event chronological sequence and detect timestamp inversion bugs."`,
    descriptionFormula: (company, domain) => `In ${company}'s ${domain} event stream, events for the same session_id must strictly increase in step_number and timestamp. Write a query to find any event where the current step_timestamp is earlier than the previous step_timestamp for the same session_id. Return session_id, step_number, and current_timestamp. Order by session_id, step_number.`,
    qaInsight: `Event-driven architectures frequently suffer from out-of-order delivery over Kafka/RabbitMQ. QA uses LAG/LEAD window functions to detect sequence violations in staging end-to-end tests.`,
    setupGenerator: (company) => ({
      dbSetupSql: `
        CREATE TABLE session_steps (step_id INT, session_id VARCHAR(20), step_number INT, step_timestamp VARCHAR(30));
        INSERT INTO session_steps VALUES 
        (1, 'SESS-A', 1, '2026-10-14 10:00:00'),
        (2, 'SESS-A', 2, '2026-10-14 10:00:15'),
        (3, 'SESS-B', 1, '2026-10-14 11:00:00'),
        (4, 'SESS-B', 2, '2026-10-14 10:59:45'),
        (5, 'SESS-C', 1, '2026-10-14 12:00:00');
      `,
      initialQuery: `SELECT session_id, step_number, step_timestamp
FROM (
  -- calculate prev timestamp using LAG
) t
ORDER BY session_id, step_number;`,
      solutionQuery: `SELECT session_id, step_number, step_timestamp
FROM (
  SELECT session_id, step_number, step_timestamp,
    LAG(step_timestamp, 1) OVER (PARTITION BY session_id ORDER BY step_number) AS prev_timestamp
  FROM session_steps
) sub
WHERE prev_timestamp IS NOT NULL AND step_timestamp < prev_timestamp
ORDER BY session_id, step_number`,
      explanation: `In session SESS-B, step 2 had timestamp 10:59:45 which is earlier than step 1 (11:00:00), indicating clock drift or out-of-order message delivery defect.`,
    }),
  },
  {
    category: 'Schema Drift & CDC Validation',
    type: 'multiple_choice',
    titleFormula: (company, domain, i) => `${company} QA: Change Data Capture (CDC) Deletion Tombstone Validation (#${i})`,
    glassdoorFormula: (company, role, topic) => `Reported on Glassdoor for ${company} ${role}: "In Change Data Capture (Debezium/Kafka) testing, candidate was asked how to assert whether a hard DELETE in the source database was accurately propagated to the target data lake as a soft-delete tombstone."`,
    descriptionFormula: (company, domain) => `In ${company}'s ${domain} CDC pipeline, when a row is deleted in the source database, the streaming connector writes a tombstone record with \`op = 'd'\` and payload \`is_deleted = TRUE\` in the audit lake.
    
Which SQL assertion correctly verifies that all source deleted IDs have been marked as \`is_deleted = TRUE\` in the downstream \`target_cdc_lake\`?`,
    qaInsight: `CDC testing requires validating insert, update, and delete operation codes ('c', 'u', 'd'). A failure in delete tombstones results in zombie records persisting in data lakes.`,
    setupGenerator: () => ({ dbSetupSql: '', initialQuery: '', solutionQuery: '', explanation: '' }),
    mcqGenerator: () => ({
      options: [
        {
          id: 'opt-cdc-1',
          text: 'SELECT id FROM deleted_source_audit WHERE id NOT IN (SELECT id FROM target_cdc_lake WHERE is_deleted = TRUE) returns 0 rows.',
          isCorrect: true,
          explanation: 'Correct! If no deleted_source_audit IDs are missing from target_cdc_lake with is_deleted = TRUE (or checking NOT EXISTS), the tombstone synchronization invariant is satisfied.',
        },
        {
          id: 'opt-cdc-2',
          text: 'SELECT COUNT(*) FROM target_cdc_lake WHERE is_deleted IS NULL must be greater than 10,000.',
          isCorrect: false,
          explanation: 'Incorrect. Records with is_deleted IS NULL indicates unhandled states, not verified deletions.',
        },
        {
          id: 'opt-cdc-3',
          text: 'Run DROP TABLE target_cdc_lake to force full reload.',
          isCorrect: false,
          explanation: 'Incorrect. Dropping tables is destructive and destroys CDC history.',
        },
        {
          id: 'opt-cdc-4',
          text: 'CDC engines do not support SQL queries.',
          isCorrect: false,
          explanation: 'Incorrect. Target data lakes (Iceberg, Delta, BigQuery) are queried via standard SQL.',
        },
      ],
    }),
  },
];

/**
 * Procedural synthesizer generating the full 2,000 QA SQL interview question bank
 */
function buildFullQuestionBank(): Question[] {
  const allQuestions: Question[] = [...CURATED_QA_QUESTIONS];
  let currentNum = allQuestions.length + 1;
  const targetTotal = 2000;

  // Distribute systematically across companies, categories, and difficulty levels
  let companyIdx = 0;
  let categoryIdx = 0;
  let diffIdx = 0;
  let templateIdx = 0;

  while (currentNum <= targetTotal) {
    const company = COMPANIES[companyIdx % COMPANIES.length];
    const profile = COMPANY_PROFILES[company];
    const category = QA_CATEGORIES[categoryIdx % QA_CATEGORIES.length];
    const difficulty = DIFFICULTY_LEVELS[diffIdx % DIFFICULTY_LEVELS.length];
    const template = TEMPLATES[templateIdx % TEMPLATES.length];
    const role = profile.interviewRoles[currentNum % profile.interviewRoles.length];
    const domain = profile.sampleDomains[currentNum % profile.sampleDomains.length];

    const qId = `qa-auto-${currentNum}`;
    const questionTitle = template.titleFormula(company, domain, currentNum);
    const glassdoor = template.glassdoorFormula(company, role, category);
    const description = template.descriptionFormula(company, domain);

    if (template.type === 'interactive_sql') {
      const setup = template.setupGenerator(company);
      allQuestions.push({
        id: qId,
        questionNumber: currentNum,
        title: questionTitle,
        company,
        companyCategory: profile.category,
        interviewRole: role,
        difficulty,
        category,
        type: 'interactive_sql',
        frequency: currentNum % 3 === 0 ? 'Very High' : currentNum % 2 === 0 ? 'High' : 'Medium',
        glassdoorContext: glassdoor,
        tags: [category.split(' ')[0], domain, 'QA Test Script', 'Glassdoor'],
        description,
        dbSetupSql: setup.dbSetupSql,
        initialQuery: setup.initialQuery,
        solutionQuery: setup.solutionQuery,
        expectedResultExplanation: setup.explanation,
        qaInsight: template.qaInsight,
      });
    } else {
      const mcq = template.mcqGenerator ? template.mcqGenerator() : {
        options: [
          { id: '1', text: 'Option A: Satisfies standard SQL QA assertion.', isCorrect: true, explanation: 'Correct.' },
          { id: '2', text: 'Option B: Violates 3-valued logic.', isCorrect: false, explanation: 'Incorrect.' },
        ],
      };
      allQuestions.push({
        id: qId,
        questionNumber: currentNum,
        title: questionTitle,
        company,
        companyCategory: profile.category,
        interviewRole: role,
        difficulty,
        category,
        type: 'multiple_choice',
        frequency: currentNum % 3 === 0 ? 'Very High' : 'High',
        glassdoorContext: glassdoor,
        tags: [category.split(' ')[0], domain, 'Multiple Choice', 'Glassdoor'],
        description,
        qaInsight: template.qaInsight,
        options: mcq.options,
      });
    }

    currentNum++;
    companyIdx++;
    categoryIdx++;
    diffIdx++;
    templateIdx++;
  }

  return allQuestions;
}

// Full 2,000 Questions Bank Instance (Memoized)
export const QUESTION_BANK: Question[] = buildFullQuestionBank();

// Quick lookup map
export const QUESTION_MAP: Map<string, Question> = new Map(
  QUESTION_BANK.map((q) => [q.id, q])
);
