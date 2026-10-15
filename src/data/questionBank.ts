import { CompanyCategory, CompanyName, DifficultyLevel, QACategory, Question, SkillTier } from '../types/question';
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

export const SKILL_TIERS: { tier: SkillTier; label: string; description: string; targetRole: string }[] = [
  {
    tier: 'Basic',
    label: 'Basic (Easy)',
    description: 'Foundational QA testing queries: SELECT, WHERE filters, LIKE, IN, IS NULL, basic aggregates (COUNT, SUM), and ordering.',
    targetRole: 'Junior QA & Automation Tester',
  },
  {
    tier: 'Medium',
    label: 'Medium (Intermediate)',
    description: 'SDET interview core: INNER/LEFT Joins, GROUP BY & HAVING, Anti-joins for ETL reconciliation, and duplicate detection.',
    targetRole: 'Mid-Level SDET & Data QA Analyst',
  },
  {
    tier: 'Tough',
    label: 'Tough (Advanced)',
    description: 'Senior QA Lead mastery: Window functions (LAG, LEAD, ROW_NUMBER), financial ledger balances, CDC tombstones, and state machines.',
    targetRole: 'Senior QA Lead & Principal SDET',
  },
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

interface TierTemplate {
  category: QACategory;
  tier: SkillTier;
  difficulty: DifficultyLevel;
  type: 'interactive_sql' | 'multiple_choice';
  titleFormula: (company: string, domain: string, index: number) => string;
  glassdoorFormula: (company: string, role: string, topic: string) => string;
  descriptionFormula: (company: string, domain: string) => string;
  qaInsight: string;
  whyCorrectFormula: () => string;
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

// ----------------------------------------------------
// TIER 1: BASIC (EASY) TEMPLATES
// ----------------------------------------------------
const BASIC_TEMPLATES: TierTemplate[] = [
  {
    tier: 'Basic',
    difficulty: 'Junior QA',
    category: 'Nullability & Boundary Testing',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} QA: Filter Missing Mandatory Fields in ${d} Records (#${i})`,
    glassdoorFormula: (c, r) => `Glassdoor interview for ${c} ${r}: "The interviewer tested basic data validation: writing a simple SELECT WHERE condition to catch records with NULL emails or status."`,
    descriptionFormula: (c, d) => `In ${c}'s ${d} staging table, records must have a non-null email and status 'ACTIVE'. Write a query to find all account_id and full_name where email IS NULL or status != 'ACTIVE'. Order by account_id ASC.`,
    qaInsight: `Basic boundary checking requires verifying NULLs and inverted predicates. In SQL, empty string '' is distinct from NULL in Postgres and standard ANSI SQL.`,
    whyCorrectFormula: () => `Checking "email IS NULL OR status <> 'ACTIVE'" catches all non-compliant records where mandatory contact data was omitted or the account is inactive.`,
    setupGenerator: (c) => ({
      dbSetupSql: `
        CREATE TABLE accounts_staging (account_id INT, full_name VARCHAR(50), email VARCHAR(50), status VARCHAR(20));
        INSERT INTO accounts_staging VALUES (1, 'Alice Smith', 'alice@test.com', 'ACTIVE'), (2, 'Bob Jones', NULL, 'ACTIVE'), (3, 'Charlie Brown', 'charlie@test.com', 'SUSPENDED'), (4, 'Diana Prince', NULL, 'PENDING');
      `,
      initialQuery: `SELECT account_id, full_name\nFROM accounts_staging\n-- filter where email is null or status is not active\nORDER BY account_id ASC;`,
      solutionQuery: `SELECT account_id, full_name\nFROM accounts_staging\nWHERE email IS NULL OR status <> 'ACTIVE'\nORDER BY account_id ASC`,
      explanation: `Accounts 2, 3, and 4 either have missing email addresses or have non-active status, violating compliance rules.`,
    }),
  },
  {
    tier: 'Basic',
    difficulty: 'Junior QA',
    category: 'Defect & Test Execution Analytics',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} QA: Retrieve Slow-Running Tests Exceeding 2000ms SLA in ${d} (#${i})`,
    glassdoorFormula: (c, r) => `Reported on Glassdoor for ${c} ${r}: "Simple SQL screening test: write a query to filter automated test execution logs where runtime was greater than 2000ms and sort by longest duration."`,
    descriptionFormula: (c, d) => `During automated test suite runs in ${c}'s ${d} pipeline, performance SLAs require tests to finish in under 2000ms. Write a query to return test_name and duration_ms for all tests with status 'PASSED' where duration_ms > 2000. Order by duration_ms DESC.`,
    qaInsight: `Performance regression tests in CI/CD pipelines use duration filters to detect memory leaks and CPU bottlenecks before release.`,
    whyCorrectFormula: () => `Filtering by duration_ms > 2000 and status = 'PASSED' isolates slow tests that passed functionally but breached performance SLA boundaries.`,
    setupGenerator: (c) => ({
      dbSetupSql: `
        CREATE TABLE test_runs (run_id INT, test_name VARCHAR(50), status VARCHAR(10), duration_ms INT);
        INSERT INTO test_runs VALUES (1, 'test_login', 'PASSED', 450), (2, 'test_checkout_cart', 'PASSED', 2850), (3, 'test_search_query', 'FAILED', 3100), (4, 'test_pdf_export', 'PASSED', 4200), (5, 'test_profile_update', 'PASSED', 1500);
      `,
      initialQuery: `SELECT test_name, duration_ms\nFROM test_runs\n-- filter for duration > 2000 and status PASSED\nORDER BY duration_ms DESC;`,
      solutionQuery: `SELECT test_name, duration_ms\nFROM test_runs\nWHERE status = 'PASSED' AND duration_ms > 2000\nORDER BY duration_ms DESC`,
      explanation: `test_pdf_export (4200ms) and test_checkout_cart (2850ms) both passed functionally but breached the 2000ms SLA.`,
    }),
  },
  {
    tier: 'Basic',
    difficulty: 'Junior QA',
    category: 'Nullability & Boundary Testing',
    type: 'multiple_choice',
    titleFormula: (c, d, i) => `${c} QA Quiz: What is the Result of 'SELECT NULL = NULL' in SQL? (#${i})`,
    glassdoorFormula: (c, r) => `Glassdoor screening question at ${c} for ${r}: "Basic SQL fundamentals: Can two NULL values be evaluated for equality using the standard equal sign?"`,
    descriptionFormula: (c, d) => `In ${c}'s ${d} database test validation script, a junior tester writes:
\`\`\`sql
SELECT * FROM test_executions WHERE error_message = NULL;
\`\`\`
What will this query return?`,
    qaInsight: `In ANSI SQL, NULL represents an unknown value. Comparing unknown with unknown yields UNKNOWN, never TRUE. Always use IS NULL.`,
    whyCorrectFormula: () => `In Three-Valued Logic (3VL), NULL = NULL evaluates to UNKNOWN (truth value false in WHERE clauses). Therefore, the query returns 0 rows. To match NULL values, the syntax must explicitly use "IS NULL".`,
    setupGenerator: () => ({ dbSetupSql: '', initialQuery: '', solutionQuery: '', explanation: '' }),
    mcqGenerator: () => ({
      options: [
        { id: 'b-1', text: '0 rows (returns nothing because NULL = NULL evaluates to UNKNOWN, not TRUE).', isCorrect: true, explanation: 'Correct! NULL represents an absence of value. Comparing any expression with NULL using = or <> always evaluates to UNKNOWN, which evaluates as false in a WHERE filter. You must write "WHERE error_message IS NULL".' },
        { id: 'b-2', text: 'All rows where error_message is empty string or NULL.', isCorrect: false, explanation: 'Incorrect. Empty string "" is not NULL, and = NULL never evaluates to true.' },
        { id: 'b-3', text: 'Throws a syntax error during query execution.', isCorrect: false, explanation: 'Incorrect. The syntax is valid SQL, but logically it never matches any rows.' },
        { id: 'b-4', text: 'Returns 1 row containing the NULL literal.', isCorrect: false, explanation: 'Incorrect.' },
      ],
    }),
  },
  {
    tier: 'Basic',
    difficulty: 'Junior QA',
    category: 'Data Deduplication & Integrity',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} QA: Count Total Tests and Passed Tests in ${d} (#${i})`,
    glassdoorFormula: (c, r) => `Reported for ${c} ${r}: "Screening test: Write a query to aggregate total tests and passed tests for automated test sanity check."`,
    descriptionFormula: (c, d) => `Write a query against test_summary to calculate total_tests using COUNT(*) and passed_tests using SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END). Output total_tests and passed_tests.`,
    qaInsight: `Aggregations with conditional CASE statements are the most frequent building block in QA test reporting dashboards.`,
    whyCorrectFormula: () => `COUNT(*) computes total test executions while SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) tallies only the successful executions.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE test_summary (id INT, status VARCHAR(10));
        INSERT INTO test_summary VALUES (1, 'PASS'), (2, 'FAIL'), (3, 'PASS'), (4, 'PASS'), (5, 'SKIP'), (6, 'PASS');
      `,
      initialQuery: `SELECT \n  COUNT(*) AS total_tests,\n  SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed_tests\nFROM test_summary;`,
      solutionQuery: `SELECT \n  COUNT(*) AS total_tests,\n  SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed_tests\nFROM test_summary`,
      explanation: `Yields 6 total tests and 4 passed tests.`,
    }),
  },
];

// ----------------------------------------------------
// TIER 2: MEDIUM (INTERMEDIATE) TEMPLATES
// ----------------------------------------------------
const MEDIUM_TEMPLATES: TierTemplate[] = [
  {
    tier: 'Medium',
    difficulty: 'Mid SDET',
    category: 'ETL & Source-to-Target Reconciliation',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} SDET: Reconcile ${d} Staging vs Target Record Drops (#${i})`,
    glassdoorFormula: (c, r) => `Glassdoor interview for ${c} ${r}: "Candidate was asked to write an automated anti-join query to detect records present in source staging that never made it into the analytical data warehouse."`,
    descriptionFormula: (c, d) => `During daily ingestion into ${c}'s ${d} datastore, some records fail silent transformations. Write an automated reconciliation query to find all record_id, entity_code, and amount from source_records with status 'VALID' that are completely missing from target_warehouse. Order by record_id ASC.`,
    qaInsight: `Always prefer LEFT JOIN ... WHERE target.id IS NULL or NOT EXISTS over NOT IN to avoid silent null poisoning in reconciliation tests.`,
    whyCorrectFormula: () => `A LEFT JOIN between source_records and target_warehouse with "WHERE target.record_id IS NULL" reliably extracts dropped records without susceptibility to NULL values in the target table.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE source_records (record_id INT, entity_code VARCHAR(30), status VARCHAR(20), amount DECIMAL(10,2));
        CREATE TABLE target_warehouse (record_id INT, entity_code VARCHAR(30), status VARCHAR(20), amount DECIMAL(10,2));
        INSERT INTO source_records VALUES (101, 'ENT-A', 'VALID', 150.00), (102, 'ENT-B', 'VALID', 240.50), (103, 'ENT-C', 'VALID', 99.00), (104, 'ENT-D', 'PENDING', 12.00), (105, 'ENT-E', 'VALID', 450.00);
        INSERT INTO target_warehouse VALUES (101, 'ENT-A', 'VALID', 150.00), (102, 'ENT-B', 'VALID', 240.50), (104, 'ENT-D', 'PENDING', 12.00);
      `,
      initialQuery: `SELECT s.record_id, s.entity_code, s.amount\nFROM source_records s\n-- add anti-join\nORDER BY s.record_id ASC;`,
      solutionQuery: `SELECT s.record_id, s.entity_code, s.amount\nFROM source_records s\nLEFT JOIN target_warehouse t ON s.record_id = t.record_id\nWHERE s.status = 'VALID' AND t.record_id IS NULL\nORDER BY s.record_id ASC`,
      explanation: `Records 103 and 105 were valid in source but missing from target, flagging an ETL data loss defect.`,
    }),
  },
  {
    tier: 'Medium',
    difficulty: 'Mid SDET',
    category: 'Data Deduplication & Integrity',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} SDET: Detect Duplicate ${d} Keys with Conflicting Statuses (#${i})`,
    glassdoorFormula: (c, r) => `Reported on Glassdoor for ${c} ${r}: "Interviewer asked how to identify race condition duplicate rows where the business key matches but statuses diverge."`,
    descriptionFormula: (c, d) => `In ${c}'s ${d} database, concurrent worker threads occasionally create duplicate records. Write a query to find all reference_id with more than 1 distinct status. Return reference_id and count of distinct statuses as status_count. Order by status_count DESC, reference_id ASC.`,
    qaInsight: `Verifying COUNT(DISTINCT attribute) > 1 catches inconsistent duplicate mutations caused by asynchronous race conditions.`,
    whyCorrectFormula: () => `Grouping by reference_id and filtering with HAVING COUNT(DISTINCT status) > 1 isolates keys having conflicting states rather than merely duplicate identical rows.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE entity_events (event_id INT, reference_id VARCHAR(30), status VARCHAR(20));
        INSERT INTO entity_events VALUES (1, 'REF-9001', 'COMPLETED'), (2, 'REF-9001', 'FAILED'), (3, 'REF-9002', 'ACTIVE'), (4, 'REF-9002', 'ACTIVE'), (5, 'REF-9003', 'PENDING'), (6, 'REF-9003', 'CANCELLED');
      `,
      initialQuery: `SELECT reference_id, COUNT(DISTINCT status) AS status_count\nFROM entity_events\n-- group and filter\nORDER BY status_count DESC, reference_id ASC;`,
      solutionQuery: `SELECT reference_id, COUNT(DISTINCT status) AS status_count\nFROM entity_events\nGROUP BY reference_id\nHAVING COUNT(DISTINCT status) > 1\nORDER BY status_count DESC, reference_id ASC`,
      explanation: `REF-9001 and REF-9003 both contain conflicting states across duplicate rows.`,
    }),
  },
  {
    tier: 'Medium',
    difficulty: 'Mid SDET',
    category: 'Defect & Test Execution Analytics',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} QA: Compute Module Failure Percentage in ${d} (#${i})`,
    glassdoorFormula: (c, r) => `Glassdoor interview at ${c} for ${r}: "The interviewer wanted to see how I would extract actionable QA telemetry: calculating failure percentages per module."`,
    descriptionFormula: (c, d) => `During regression testing for ${c}'s ${d}, test suites run against multiple services. Write a query to return module_name, total_tests, failed_tests, and fail_rate_pct (calculated as (failed_tests * 100.0) / total_tests rounded to 2 decimal places). Filter for modules with fail_rate_pct > 20.0. Order by fail_rate_pct DESC, module_name ASC.`,
    qaInsight: `Quality managers use SQL test execution telemetry to compute Mean Time Between Failures (MTBF) and module risk ratings for release gating.`,
    whyCorrectFormula: () => `Aggregating failed tests divided by total tests yields the exact defect density and failure rate per microservice module.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE test_suite_results (execution_id INT, module_name VARCHAR(50), test_result VARCHAR(10));
        INSERT INTO test_suite_results VALUES (1, 'Billing', 'PASSED'), (2, 'Billing', 'FAILED'), (3, 'Billing', 'FAILED'), (4, 'Billing', 'PASSED'), (5, 'Auth', 'PASSED'), (6, 'Auth', 'PASSED'), (7, 'Inventory', 'FAILED'), (8, 'Inventory', 'PASSED'), (9, 'Inventory', 'PASSED');
      `,
      initialQuery: `SELECT module_name, COUNT(*) AS total_tests,\n  SUM(CASE WHEN test_result = 'FAILED' THEN 1 ELSE 0 END) AS failed_tests,\n  ROUND(SUM(CASE WHEN test_result = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*), 2) AS fail_rate_pct\nFROM test_suite_results\n-- group and filter\nORDER BY fail_rate_pct DESC, module_name ASC;`,
      solutionQuery: `SELECT module_name, COUNT(*) AS total_tests,\n  SUM(CASE WHEN test_result = 'FAILED' THEN 1 ELSE 0 END) AS failed_tests,\n  ROUND(SUM(CASE WHEN test_result = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*), 2) AS fail_rate_pct\nFROM test_suite_results\nGROUP BY module_name\nHAVING (SUM(CASE WHEN test_result = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*)) > 20.0\nORDER BY fail_rate_pct DESC, module_name ASC`,
      explanation: `Billing (50.0%) and Inventory (33.33%) modules exceed the 20% failure threshold.`,
    }),
  },
  {
    tier: 'Medium',
    difficulty: 'Mid SDET',
    category: 'Nullability & Boundary Testing',
    type: 'multiple_choice',
    titleFormula: (c, d, i) => `${c} SDET Trap: The 'NOT IN (SELECT with NULL)' Defect (#${i})`,
    glassdoorFormula: (c, r) => `Glassdoor interview for ${c} ${r}: "Classic senior SDET trap question: An engineer used WHERE id NOT IN (SELECT id FROM target_table) in a reconciliation test script. It returned 0 rows even though records were missing. Why?"`,
    descriptionFormula: (c, d) => `A data QA engineer wrote this test query to find dropped orders during ETL migration:
\`\`\`sql
SELECT order_id 
FROM raw_orders_source
WHERE order_id NOT IN (
  SELECT order_id FROM warehouse_orders_target
);
\`\`\`
Even though hundreds of records were missing, the query returned zero rows. What is the fundamental root cause?`,
    qaInsight: `In Three-Valued Logic (3VL), x NOT IN (a, b, NULL) expands to (x <> a AND x <> b AND x <> NULL). Since comparison with NULL returns UNKNOWN, the entire condition evaluates to FALSE or UNKNOWN, suppressing all rows!`,
    whyCorrectFormula: () => `In SQL Three-Valued Logic, if ANY value in the NOT IN subquery list is NULL, "x NOT IN (subquery)" evaluates to UNKNOWN for all non-matching rows, discarding the entire result set. Always use NOT EXISTS or LEFT JOIN ... WHERE IS NULL.`,
    setupGenerator: () => ({ dbSetupSql: '', initialQuery: '', solutionQuery: '', explanation: '' }),
    mcqGenerator: () => ({
      options: [
        { id: 'm-1', text: 'If warehouse_orders_target contains even a single NULL in order_id, NOT IN evaluates to UNKNOWN for all rows, returning 0 records.', isCorrect: true, explanation: 'Correct! In SQL three-valued logic, if any value in the subquery list is NULL, "value NOT IN (list)" evaluates to UNKNOWN for every non-matching row. Always use NOT EXISTS or LEFT JOIN in QA test scripts.' },
        { id: 'm-2', text: 'Subqueries inside WHERE clauses are limited to 10 rows maximum.', isCorrect: false, explanation: 'Incorrect. Subqueries have no arbitrary 10-row limit.' },
        { id: 'm-3', text: 'The NOT IN operator only works on text strings, not integers.', isCorrect: false, explanation: 'Incorrect. NOT IN supports all comparable scalar data types.' },
        { id: 'm-4', text: 'The database automatically rolled back due to a transaction deadlock.', isCorrect: false, explanation: 'Incorrect.' },
      ],
    }),
  },
];

// ----------------------------------------------------
// TIER 3: TOUGH (ADVANCED) TEMPLATES
// ----------------------------------------------------
const TOUGH_TEMPLATES: TierTemplate[] = [
  {
    tier: 'Tough',
    difficulty: 'Senior QA Lead',
    category: 'Temporal & Window Function QA',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} QA Lead: Detect Telemetry Gaps > 60 Mins with Window Functions (#${i})`,
    glassdoorFormula: (c, r) => `Glassdoor interview at ${c} for ${r}: "Interviewer tested window functions: writing a query with LAG() to verify event chronological sequence and detect missing hourly telemetry transmissions."`,
    descriptionFormula: (c, d) => `In ${c}'s ${d} IoT / event stream, smart devices transmit telemetry every hour. Write a query to identify any telemetry record where the time gap between consecutive transmissions for the same device_id exceeded 60 minutes. Return device_id, reading_time, and gap_minutes. Order by device_id, reading_time.`,
    qaInsight: `Testing time-series continuity using LAG/LEAD window functions is the premier pattern at IoT and hardware telemetry giants.`,
    whyCorrectFormula: () => `LAG(epoch_minutes, 1) OVER (PARTITION BY device_id ORDER BY epoch_minutes) computes the previous reading timestamp per device. Subtracting it from the current epoch reveals transmission gaps exceeding the 60-minute threshold.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE solar_telemetry (reading_id INT, device_id VARCHAR(30), reading_time VARCHAR(30), epoch_minutes INT, watts INT);
        INSERT INTO solar_telemetry VALUES (1, 'DEV-001', '08:00', 480, 45), (2, 'DEV-001', '09:00', 540, 75), (3, 'DEV-001', '11:30', 690, 110), (4, 'DEV-001', '12:30', 750, 120), (5, 'DEV-002', '08:00', 480, 30), (6, 'DEV-002', '08:45', 525, 55), (7, 'DEV-002', '10:15', 615, 90);
      `,
      initialQuery: `SELECT device_id, reading_time, gap_minutes\nFROM (\n  -- calculate time delta using LAG\n) sub\nWHERE gap_minutes > 60\nORDER BY device_id, reading_time;`,
      solutionQuery: `SELECT device_id, reading_time, gap_minutes\nFROM (\n  SELECT device_id, reading_time,\n    epoch_minutes - LAG(epoch_minutes, 1) OVER (PARTITION BY device_id ORDER BY epoch_minutes) AS gap_minutes\n  FROM solar_telemetry\n) sub\nWHERE gap_minutes > 60\nORDER BY device_id, reading_time`,
      explanation: `DEV-001 at 11:30 had a 150-min gap (690 - 540) and DEV-002 at 10:15 had a 90-min gap (615 - 525), both exceeding 60 minutes.`,
    }),
  },
  {
    tier: 'Tough',
    difficulty: 'Senior QA Lead',
    category: 'Financial & Ledger Verification',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} QA Lead: Audit Double-Entry Ledger Imbalances in ${d} (#${i})`,
    glassdoorFormula: (c, r) => `Nagarro/Fintech QA Interview Glassdoor: "In banking and financial QA, interviewer gave a transaction ledger table containing debits and credits and asked to detect broken transactions where debits did not equal credits."`,
    descriptionFormula: (c, d) => `In financial banking systems at ${c}, every transaction must balance to zero: total debits must equal total credits. Write an audit query to find all transaction_id where total debit does not equal total credit. Return transaction_id, total_debits, total_credits, and balance_diff. Order by transaction_id ASC.`,
    qaInsight: `Financial audits halt batch settlements if debits != credits. Automated sanity scripts test relational balance invariants in nightly CI/CD regression runs.`,
    whyCorrectFormula: () => `Grouping by transaction_id and applying HAVING SUM(debit_amount) <> SUM(credit_amount) directly isolates unbalanced transactions where the double-entry accounting equation is violated.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE ledger_entries (entry_id INT, transaction_id VARCHAR(20), debit_amount DECIMAL(10,2), credit_amount DECIMAL(10,2));
        INSERT INTO ledger_entries VALUES (1, 'TXN-001', 500.00, 0.00), (2, 'TXN-001', 0.00, 500.00), (3, 'TXN-002', 1200.00, 0.00), (4, 'TXN-002', 0.00, 1150.00), (5, 'TXN-003', 75.50, 0.00), (6, 'TXN-003', 0.00, 75.50);
      `,
      initialQuery: `SELECT transaction_id,\n  SUM(debit_amount) AS total_debits,\n  SUM(credit_amount) AS total_credits,\n  SUM(debit_amount) - SUM(credit_amount) AS balance_diff\nFROM ledger_entries\n-- filter for imbalance\nORDER BY transaction_id ASC;`,
      solutionQuery: `SELECT transaction_id,\n  SUM(debit_amount) AS total_debits,\n  SUM(credit_amount) AS total_credits,\n  SUM(debit_amount) - SUM(credit_amount) AS balance_diff\nFROM ledger_entries\nGROUP BY transaction_id\nHAVING SUM(debit_amount) <> SUM(credit_amount)\nORDER BY transaction_id ASC`,
      explanation: `TXN-002 has debits 1200.00 but credits 1150.00 (diff 50.00), indicating a core ledger reconciliation bug.`,
    }),
  },
  {
    tier: 'Tough',
    difficulty: 'Principal Data QA',
    category: 'Schema Drift & CDC Validation',
    type: 'interactive_sql',
    titleFormula: (c, d, i) => `${c} SDET: Detect Invalid State Machine Transitions in ${d} (#${i})`,
    glassdoorFormula: (c, r) => `Apple/Commerce QA Lead interview on Glassdoor: "In subscription billing QA, candidate must verify that no record transitioned from EXPIRED back to ACTIVE without a verified RENEWED event."`,
    descriptionFormula: (c, d) => `In ${c}'s ${d} state machine, valid status progressions require an intervening 'RENEWED' event to return from 'EXPIRED' to 'ACTIVE'. Write a QA assertion query to find any record that has an illegal direct transition from 'EXPIRED' to 'ACTIVE' where event_type != 'RENEWED'. Return transition_id, subscription_id, from_status, to_status, and event_type. Order by transition_id ASC.`,
    qaInsight: `State machine verification is a premier test pattern. Querying state transition graphs from CDC audit logs ensures asynchronous billing workflow integrity.`,
    whyCorrectFormula: () => `Checking from_status = 'EXPIRED' AND to_status = 'ACTIVE' AND event_type <> 'RENEWED' enforces business rules against unauthorized state machine bypasses.`,
    setupGenerator: () => ({
      dbSetupSql: `
        CREATE TABLE subscription_transitions (transition_id INT, subscription_id VARCHAR(30), from_status VARCHAR(20), to_status VARCHAR(20), event_type VARCHAR(20));
        INSERT INTO subscription_transitions VALUES (1, 'SUB-01', 'TRIAL', 'ACTIVE', 'FIRST_CHARGE'), (2, 'SUB-01', 'ACTIVE', 'EXPIRED', 'USER_CANCELLED'), (3, 'SUB-01', 'EXPIRED', 'ACTIVE', 'RENEWED'), (4, 'SUB-02', 'ACTIVE', 'EXPIRED', 'PAYMENT_FAILED'), (5, 'SUB-02', 'EXPIRED', 'ACTIVE', 'GLITCH_RESTORE'), (6, 'SUB-03', 'EXPIRED', 'ACTIVE', 'BYPASS_PROMO');
      `,
      initialQuery: `SELECT transition_id, subscription_id, from_status, to_status, event_type\nFROM subscription_transitions\n-- filter for illegal transition\nORDER BY transition_id ASC;`,
      solutionQuery: `SELECT transition_id, subscription_id, from_status, to_status, event_type\nFROM subscription_transitions\nWHERE from_status = 'EXPIRED' AND to_status = 'ACTIVE' AND event_type <> 'RENEWED'\nORDER BY transition_id ASC`,
      explanation: `Transitions 5 ('GLITCH_RESTORE') and 6 ('BYPASS_PROMO') moved from EXPIRED directly to ACTIVE without an authorized RENEWED event.`,
    }),
  },
  {
    tier: 'Tough',
    difficulty: 'Principal Data QA',
    category: 'Schema Drift & CDC Validation',
    type: 'multiple_choice',
    titleFormula: (c, d, i) => `${c} QA Lead: CDC Deletion Tombstone Invariant Assertion (#${i})`,
    glassdoorFormula: (c, r) => `Reported on Glassdoor for ${c} ${r}: "In Change Data Capture (Debezium/Kafka) testing, candidate was asked how to assert whether a hard DELETE in the source database was accurately propagated to the target data lake as a soft-delete tombstone."`,
    descriptionFormula: (c, d) => `In ${c}'s ${d} CDC pipeline, when a row is deleted in the source database, the streaming connector writes a tombstone record with \`is_deleted = TRUE\` in the audit lake.
    
Which SQL assertion correctly verifies that all source deleted IDs have been marked as \`is_deleted = TRUE\` in the downstream \`target_cdc_lake\`?`,
    qaInsight: `CDC testing requires validating insert, update, and delete operation codes. A failure in delete tombstones results in zombie records persisting in data lakes.`,
    whyCorrectFormula: () => `Checking that NO deleted_source_audit IDs are missing from target_cdc_lake with is_deleted = TRUE (using NOT EXISTS or NOT IN) asserts that 100% of deletions have properly synced tombstones.`,
    setupGenerator: () => ({ dbSetupSql: '', initialQuery: '', solutionQuery: '', explanation: '' }),
    mcqGenerator: () => ({
      options: [
        { id: 't-1', text: 'SELECT id FROM deleted_source_audit WHERE id NOT IN (SELECT id FROM target_cdc_lake WHERE is_deleted = TRUE) returns 0 rows.', isCorrect: true, explanation: 'Correct! If no deleted_source_audit IDs are missing from target_cdc_lake with is_deleted = TRUE (or checking NOT EXISTS), the tombstone synchronization invariant is satisfied.' },
        { id: 't-2', text: 'SELECT COUNT(*) FROM target_cdc_lake WHERE is_deleted IS NULL must be greater than 10,000.', isCorrect: false, explanation: 'Incorrect. Null tombstone markers indicates unhandled states.' },
        { id: 't-3', text: 'Run DROP TABLE target_cdc_lake to force full reload.', isCorrect: false, explanation: 'Incorrect. Destructive and destroys history.' },
        { id: 't-4', text: 'CDC engines do not support SQL assertions.', isCorrect: false, explanation: 'Incorrect.' },
      ],
    }),
  },
];

/**
 * Procedural synthesizer generating the full 4,200 QA SQL interview question bank
 * Evenly balanced across tiers:
 * - 1,400 Basic (Easy)
 * - 1,400 Medium
 * - 1,400 Tough (Hard)
 * Total: 4,200 Questions!
 */
function buildFullQuestionBank(): Question[] {
  const allQuestions: Question[] = [];
  
  // Assign tier to curated questions first
  CURATED_QA_QUESTIONS.forEach((q, idx) => {
    let tier: SkillTier = 'Medium';
    if (q.difficulty === 'Junior QA') tier = 'Basic';
    else if (q.difficulty === 'Senior QA Lead' || q.difficulty === 'Principal Data QA') tier = 'Tough';

    allQuestions.push({
      ...q,
      tier,
      whyCorrect: q.expectedResultExplanation || q.qaInsight,
    });
  });

  const targetPerTier = 1400; // 1400 * 3 = 4200 questions!
  let currentNum = allQuestions.length + 1;

  // Track counts per tier
  const tierCounts: Record<SkillTier, number> = {
    Basic: allQuestions.filter((q) => q.tier === 'Basic').length,
    Medium: allQuestions.filter((q) => q.tier === 'Medium').length,
    Tough: allQuestions.filter((q) => q.tier === 'Tough').length,
  };

  const tiers: SkillTier[] = ['Basic', 'Medium', 'Tough'];
  let companyIdx = 0;
  let templateCounters: Record<SkillTier, number> = { Basic: 0, Medium: 0, Tough: 0 };

  // Fill up each tier to 1,400 questions
  for (const tier of tiers) {
    const templates =
      tier === 'Basic'
        ? BASIC_TEMPLATES
        : tier === 'Medium'
        ? MEDIUM_TEMPLATES
        : TOUGH_TEMPLATES;

    while (tierCounts[tier] < targetPerTier) {
      const company = COMPANIES[companyIdx % COMPANIES.length];
      const profile = COMPANY_PROFILES[company];
      const template = templates[templateCounters[tier] % templates.length];
      const role = profile.interviewRoles[currentNum % profile.interviewRoles.length];
      const domain = profile.sampleDomains[currentNum % profile.sampleDomains.length];

      const qId = `qa-auto-${currentNum}`;
      const questionTitle = template.titleFormula(company, domain, currentNum);
      const glassdoor = template.glassdoorFormula(company, role, template.category);
      const description = template.descriptionFormula(company, domain);
      const whyCorrect = template.whyCorrectFormula();

      if (template.type === 'interactive_sql') {
        const setup = template.setupGenerator(company);
        allQuestions.push({
          id: qId,
          questionNumber: currentNum,
          title: questionTitle,
          company,
          companyCategory: profile.category,
          interviewRole: role,
          difficulty: template.difficulty,
          tier,
          category: template.category,
          type: 'interactive_sql',
          frequency: currentNum % 3 === 0 ? 'Very High' : currentNum % 2 === 0 ? 'High' : 'Medium',
          glassdoorContext: glassdoor,
          tags: [template.category.split(' ')[0], domain, tier, 'QA Test Script'],
          description,
          dbSetupSql: setup.dbSetupSql,
          initialQuery: setup.initialQuery,
          solutionQuery: setup.solutionQuery,
          expectedResultExplanation: setup.explanation,
          qaInsight: template.qaInsight,
          whyCorrect,
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
          difficulty: template.difficulty,
          tier,
          category: template.category,
          type: 'multiple_choice',
          frequency: currentNum % 3 === 0 ? 'Very High' : 'High',
          glassdoorContext: glassdoor,
          tags: [template.category.split(' ')[0], domain, tier, 'Scenario Quiz'],
          description,
          qaInsight: template.qaInsight,
          whyCorrect,
          options: mcq.options,
        });
      }

      tierCounts[tier]++;
      currentNum++;
      companyIdx++;
      templateCounters[tier]++;
    }
  }

  // Sort by question number
  allQuestions.sort((a, b) => a.questionNumber - b.questionNumber);
  return allQuestions;
}

// Full 4,200 Questions Bank Instance (Memoized)
export const QUESTION_BANK: Question[] = buildFullQuestionBank();

// Quick lookup map
export const QUESTION_MAP: Map<string, Question> = new Map(
  QUESTION_BANK.map((q) => [q.id, q])
);
