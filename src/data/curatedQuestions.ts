import { Question } from '../types/question';

export const CURATED_QA_QUESTIONS: Question[] = [
  // 1. AMAZON - SDET / QA Engineer
  {
    id: 'amazon-sdet-01',
    questionNumber: 1,
    title: 'Detect Staging vs Production Order Count Discrepancies (ETL Testing)',
    company: 'Amazon',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Mid SDET',
    category: 'ETL & Source-to-Target Reconciliation',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Reported on Glassdoor for Amazon SDET II (Fulfillment Technologies team): "The interviewer asked me to write an automated reconciliation SQL query to detect missed or dropped orders between raw SQS staging logs and the final Redshift orders table."',
    tags: ['ETL Testing', 'Data Reconciliation', 'Anti-Join', 'Data Quality'],
    description: `During Amazon's hourly ETL ingestion from raw staging (\`staging_orders\`) to the production orders warehouse (\`production_orders\`), data pipeline engineers suspect network hiccups caused order records to be dropped.
    
Write an automated QA SQL reconciliation query to identify all \`order_id\`s and their \`customer_id\` and \`order_amount\` present in \`staging_orders\` with status \`'COMPLETED'\` that are completely missing from \`production_orders\`. Sort the output by \`order_id\` ascending.`,
    dbSetupSql: `
      CREATE TABLE staging_orders (
        order_id INT,
        customer_id VARCHAR(50),
        order_amount DECIMAL(10,2),
        order_status VARCHAR(20),
        created_at VARCHAR(30)
      );
      CREATE TABLE production_orders (
        order_id INT,
        customer_id VARCHAR(50),
        order_amount DECIMAL(10,2),
        order_status VARCHAR(20),
        ingested_at VARCHAR(30)
      );

      INSERT INTO staging_orders VALUES 
      (1001, 'CUST-A', 149.99, 'COMPLETED', '2026-10-10 10:00:00'),
      (1002, 'CUST-B', 29.50, 'COMPLETED', '2026-10-10 10:05:00'),
      (1003, 'CUST-C', 899.00, 'COMPLETED', '2026-10-10 10:15:00'),
      (1004, 'CUST-D', 45.00, 'PENDING', '2026-10-10 10:20:00'),
      (1005, 'CUST-E', 320.00, 'COMPLETED', '2026-10-10 10:25:00');

      INSERT INTO production_orders VALUES 
      (1001, 'CUST-A', 149.99, 'COMPLETED', '2026-10-10 10:02:00'),
      (1002, 'CUST-B', 29.50, 'COMPLETED', '2026-10-10 10:07:00'),
      (1004, 'CUST-D', 45.00, 'PENDING', '2026-10-10 10:22:00');
    `,
    tables: [
      {
        tableName: 'staging_orders',
        columns: [
          { name: 'order_id', type: 'INT', isPrimaryKey: true },
          { name: 'customer_id', type: 'VARCHAR(50)' },
          { name: 'order_amount', type: 'DECIMAL(10,2)' },
          { name: 'order_status', type: 'VARCHAR(20)' },
          { name: 'created_at', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { order_id: 1001, customer_id: 'CUST-A', order_amount: 149.99, order_status: 'COMPLETED' },
          { order_id: 1002, customer_id: 'CUST-B', order_amount: 29.50, order_status: 'COMPLETED' },
          { order_id: 1003, customer_id: 'CUST-C', order_amount: 899.00, order_status: 'COMPLETED' },
          { order_id: 1004, customer_id: 'CUST-D', order_amount: 45.00, order_status: 'PENDING' },
          { order_id: 1005, customer_id: 'CUST-E', order_amount: 320.00, order_status: 'COMPLETED' },
        ],
      },
      {
        tableName: 'production_orders',
        columns: [
          { name: 'order_id', type: 'INT', isPrimaryKey: true },
          { name: 'customer_id', type: 'VARCHAR(50)' },
          { name: 'order_amount', type: 'DECIMAL(10,2)' },
          { name: 'order_status', type: 'VARCHAR(20)' },
          { name: 'ingested_at', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { order_id: 1001, customer_id: 'CUST-A', order_amount: 149.99, order_status: 'COMPLETED' },
          { order_id: 1002, customer_id: 'CUST-B', order_amount: 29.50, order_status: 'COMPLETED' },
          { order_id: 1004, customer_id: 'CUST-D', order_amount: 45.00, order_status: 'PENDING' },
        ],
      },
    ],
    initialQuery: `-- Write an automated reconciliation query
SELECT 
  s.order_id, 
  s.customer_id, 
  s.order_amount
FROM staging_orders s
-- your join or filtering logic here
ORDER BY s.order_id ASC;`,
    solutionQuery: `SELECT 
  s.order_id, 
  s.customer_id, 
  s.order_amount
FROM staging_orders s
LEFT JOIN production_orders p ON s.order_id = p.order_id
WHERE s.order_status = 'COMPLETED' 
  AND p.order_id IS NULL
ORDER BY s.order_id ASC`,
    expectedResultExplanation: `We perform an anti-join (LEFT JOIN with IS NULL filter) between staging_orders and production_orders where staging order_status is 'COMPLETED'. This flags orders 1003 and 1005 which were completed in staging but dropped before ingestion into production.`,
    qaInsight: `In QA data testing, never use "NOT IN (SELECT order_id FROM production_orders)" if the target table column might ever contain a NULL value; in SQL, "NOT IN" evaluates to UNKNOWN if any target row is NULL, masking data drops! A LEFT JOIN ... WHERE p.order_id IS NULL or NOT EXISTS is the industry QA standard.`,
  },

  // 2. SUN KING - QA Data Analyst / IoT SDET
  {
    id: 'sunking-qa-01',
    questionNumber: 2,
    title: 'Sun King Solar Home System: Detect Missing Hourly Telemetry Pings',
    company: 'Sun King',
    companyCategory: 'Enterprise & GreenTech',
    interviewRole: 'Data QA Analyst',
    difficulty: 'Mid SDET',
    category: 'Temporal & Window Function QA',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Reported on Glassdoor for Sun King (Greenlight Planet) QA & Data Analyst interview in Nairobi/Mumbai: "Sun King produces Pay-As-You-Go solar home lighting systems. The QA team must verify if IoT solar units transmitted power generation telemetry properly or experienced dead zones without signal."',
    tags: ['IoT Testing', 'Time Gaps', 'Window Functions', 'Lead/Lag', 'Firmware QA'],
    description: `Sun King's smart solar inverters transmit periodic energy generation telemetry (\`solar_telemetry\`) to the cloud. QA needs to verify hardware and network reliability.
    
Write a query to identify any telemetry record where the time gap between consecutive transmissions for the same device (\`device_id\`) exceeded 60 minutes. Output \`device_id\`, \`reading_time\` (current reading), and \`gap_minutes\`. Include only records with \`gap_minutes > 60\`, ordered by \`device_id\` then \`reading_time\`.`,
    dbSetupSql: `
      CREATE TABLE solar_telemetry (
        reading_id INT,
        device_id VARCHAR(30),
        reading_time VARCHAR(30),
        epoch_minutes INT,
        watts_generated INT
      );

      INSERT INTO solar_telemetry VALUES
      (1, 'SK-SOLAR-001', '2026-10-12 08:00', 480, 45),
      (2, 'SK-SOLAR-001', '2026-10-12 09:00', 540, 75),
      (3, 'SK-SOLAR-001', '2026-10-12 11:30', 690, 110),
      (4, 'SK-SOLAR-001', '2026-10-12 12:30', 750, 120),
      (5, 'SK-SOLAR-002', '2026-10-12 08:00', 480, 30),
      (6, 'SK-SOLAR-002', '2026-10-12 08:45', 525, 55),
      (7, 'SK-SOLAR-002', '2026-10-12 10:15', 615, 90);
    `,
    tables: [
      {
        tableName: 'solar_telemetry',
        columns: [
          { name: 'reading_id', type: 'INT', isPrimaryKey: true },
          { name: 'device_id', type: 'VARCHAR(30)' },
          { name: 'reading_time', type: 'VARCHAR(30)' },
          { name: 'epoch_minutes', type: 'INT' },
          { name: 'watts_generated', type: 'INT' },
        ],
        sampleData: [
          { reading_id: 1, device_id: 'SK-SOLAR-001', reading_time: '2026-10-12 08:00', epoch_minutes: 480, watts_generated: 45 },
          { reading_id: 2, device_id: 'SK-SOLAR-001', reading_time: '2026-10-12 09:00', epoch_minutes: 540, watts_generated: 75 },
          { reading_id: 3, device_id: 'SK-SOLAR-001', reading_time: '2026-10-12 11:30', epoch_minutes: 690, watts_generated: 110 },
        ],
      },
    ],
    initialQuery: `-- Identify telemetry transmission gaps > 60 minutes
SELECT 
  device_id,
  reading_time,
  gap_minutes
FROM (
  -- calculate time delta using LAG
) t
WHERE gap_minutes > 60
ORDER BY device_id, reading_time;`,
    solutionQuery: `SELECT 
  device_id,
  reading_time,
  gap_minutes
FROM (
  SELECT 
    device_id,
    reading_time,
    epoch_minutes - LAG(epoch_minutes, 1) OVER (PARTITION BY device_id ORDER BY epoch_minutes) AS gap_minutes
  FROM solar_telemetry
) sub
WHERE gap_minutes > 60
ORDER BY device_id, reading_time`,
    expectedResultExplanation: `We utilize the LAG() window function partitioned by device_id and ordered by epoch_minutes to find the delta from the previous transmission. For SK-SOLAR-001, reading at 11:30 had a 150 min gap (690 - 540). For SK-SOLAR-002, reading at 10:15 had a 90 min gap (615 - 525).`,
    qaInsight: `IoT & CleanTech QA testing heavily tests communication resilience. If solar units drop connectivity, off-grid customers may suffer locked inverters due to missed activation tokens. Testing interval continuity using LAG/LEAD is a top interview pattern at hardware/IoT giants.`,
  },

  // 3. GLOBALLOGIC - Senior Test Engineer / SDET
  {
    id: 'globallogic-sdet-01',
    questionNumber: 3,
    title: 'Find Inconsistent Duplicate Patient Records (Healthcare QA)',
    company: 'GlobalLogic',
    companyCategory: 'Tech Consultancy Giant',
    interviewRole: 'Automation Test Lead',
    difficulty: 'Senior QA Lead',
    category: 'Data Deduplication & Integrity',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Glassdoor GlobalLogic Senior QA Engineer interview: "Asked to validate duplicate detection logic in an Electronic Health Records (EHR) migration project. Had to locate patients having the same SSN/national_id but differing birth dates or spellings."',
    tags: ['Deduplication', 'Healthcare QA', 'HAVING COUNT', 'Data Migration'],
    description: `During a medical software database migration at GlobalLogic, QA must identify dirty data where the same \`national_id\` exists in multiple rows with conflicting patient details (different \`full_name\` or different \`birth_date\`).
    
Write a QA validation query to return the \`national_id\` and the count of distinct patient names (\`distinct_names\`) for all national IDs that have more than 1 distinct name registered. Order by \`distinct_names\` DESC, then \`national_id\` ASC.`,
    dbSetupSql: `
      CREATE TABLE patient_registry (
        record_id INT,
        national_id VARCHAR(20),
        full_name VARCHAR(100),
        birth_date VARCHAR(20),
        blood_group VARCHAR(5)
      );

      INSERT INTO patient_registry VALUES
      (1, 'NAT-99881', 'John Doe', '1985-04-12', 'O+'),
      (2, 'NAT-99881', 'Jon Doe', '1985-04-12', 'O+'),
      (3, 'NAT-44220', 'Maria Garcia', '1990-11-20', 'A+'),
      (4, 'NAT-44220', 'Maria Garcia', '1990-11-20', 'A+'),
      (5, 'NAT-77119', 'Robert Smith', '1978-02-05', 'B+'),
      (6, 'NAT-77119', 'Bob Smith', '1978-02-05', 'B+'),
      (7, 'NAT-77119', 'R. Smith', '1978-02-05', 'B+'),
      (8, 'NAT-11002', 'Alice Wong', '1995-07-30', 'AB+');
    `,
    tables: [
      {
        tableName: 'patient_registry',
        columns: [
          { name: 'record_id', type: 'INT', isPrimaryKey: true },
          { name: 'national_id', type: 'VARCHAR(20)' },
          { name: 'full_name', type: 'VARCHAR(100)' },
          { name: 'birth_date', type: 'VARCHAR(20)' },
          { name: 'blood_group', type: 'VARCHAR(5)' },
        ],
        sampleData: [
          { record_id: 1, national_id: 'NAT-99881', full_name: 'John Doe', birth_date: '1985-04-12' },
          { record_id: 2, national_id: 'NAT-99881', full_name: 'Jon Doe', birth_date: '1985-04-12' },
          { record_id: 3, national_id: 'NAT-44220', full_name: 'Maria Garcia', birth_date: '1990-11-20' },
        ],
      },
    ],
    initialQuery: `-- QA query to detect duplicate national IDs with conflicting patient names
SELECT 
  national_id,
  COUNT(DISTINCT full_name) AS distinct_names
FROM patient_registry
-- Group by and filter conflicting records
ORDER BY distinct_names DESC, national_id ASC;`,
    solutionQuery: `SELECT 
  national_id,
  COUNT(DISTINCT full_name) AS distinct_names
FROM patient_registry
GROUP BY national_id
HAVING COUNT(DISTINCT full_name) > 1
ORDER BY distinct_names DESC, national_id ASC`,
    expectedResultExplanation: `Grouping by national_id and filtering with HAVING COUNT(DISTINCT full_name) > 1 extracts NAT-77119 (3 distinct names: Robert Smith, Bob Smith, R. Smith) and NAT-99881 (2 distinct names: John Doe, Jon Doe). NAT-44220 has duplicate rows but identical names, so its distinct name count is 1.`,
    qaInsight: `In data validation testing, simply doing COUNT(*) > 1 only detects identical duplicate rows. Real-world migration defects occur when entity identifiers match but attributes diverge! Always check COUNT(DISTINCT attribute) > 1 to catch reconciliation inconsistencies.`,
  },

  // 4. NAGARRO - QA Lead / Fintech Test Engineer
  {
    id: 'nagarro-qa-01',
    questionNumber: 4,
    title: 'Validate Double-Entry Accounting Ledger Imbalance (Banking QA)',
    company: 'Nagarro',
    companyCategory: 'Tech Consultancy Giant',
    interviewRole: 'QA Engineer',
    difficulty: 'Senior QA Lead',
    category: 'Financial & Ledger Verification',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Nagarro QA Interview Glassdoor: "In banking and financial QA, the interviewer gave me a transaction ledger table containing debits and credits and asked me to write a query to detect broken transactions where Total Debits did not equal Total Credits."',
    tags: ['Fintech QA', 'Banking', 'Ledger Integrity', 'Aggregation', 'HAVING'],
    description: `In financial core banking systems, every transaction must balance to zero: the sum of debits (\`debit_amount\`) must exactly equal the sum of credits (\`credit_amount\`).
    
Write a QA assertion query to find all \`transaction_id\`s where the total debit does not equal the total credit. Return \`transaction_id\`, \`total_debits\`, \`total_credits\`, and the discrepancy \`balance_diff\` (\`total_debits - total_credits\`). Sort by \`transaction_id\` ascending.`,
    dbSetupSql: `
      CREATE TABLE ledger_entries (
        entry_id INT,
        transaction_id VARCHAR(20),
        account_id VARCHAR(20),
        debit_amount DECIMAL(10,2),
        credit_amount DECIMAL(10,2)
      );

      INSERT INTO ledger_entries VALUES
      (1, 'TXN-001', 'ACC-101', 500.00, 0.00),
      (2, 'TXN-001', 'ACC-102', 0.00, 500.00),
      (3, 'TXN-002', 'ACC-201', 1200.00, 0.00),
      (4, 'TXN-002', 'ACC-202', 0.00, 1150.00),
      (5, 'TXN-003', 'ACC-301', 75.50, 0.00),
      (6, 'TXN-003', 'ACC-302', 0.00, 75.50),
      (7, 'TXN-004', 'ACC-401', 2500.00, 0.00),
      (8, 'TXN-004', 'ACC-402', 0.00, 2000.00),
      (9, 'TXN-004', 'ACC-403', 0.00, 450.00);
    `,
    tables: [
      {
        tableName: 'ledger_entries',
        columns: [
          { name: 'entry_id', type: 'INT', isPrimaryKey: true },
          { name: 'transaction_id', type: 'VARCHAR(20)' },
          { name: 'account_id', type: 'VARCHAR(20)' },
          { name: 'debit_amount', type: 'DECIMAL(10,2)' },
          { name: 'credit_amount', type: 'DECIMAL(10,2)' },
        ],
        sampleData: [
          { entry_id: 1, transaction_id: 'TXN-001', debit_amount: 500.00, credit_amount: 0.00 },
          { entry_id: 2, transaction_id: 'TXN-001', debit_amount: 0.00, credit_amount: 500.00 },
          { entry_id: 3, transaction_id: 'TXN-002', debit_amount: 1200.00, credit_amount: 0.00 },
          { entry_id: 4, transaction_id: 'TXN-002', debit_amount: 0.00, credit_amount: 1150.00 },
        ],
      },
    ],
    initialQuery: `-- Identify unbalanced financial transactions
SELECT 
  transaction_id,
  SUM(debit_amount) AS total_debits,
  SUM(credit_amount) AS total_credits,
  SUM(debit_amount) - SUM(credit_amount) AS balance_diff
FROM ledger_entries
-- filter for imbalance
ORDER BY transaction_id ASC;`,
    solutionQuery: `SELECT 
  transaction_id,
  SUM(debit_amount) AS total_debits,
  SUM(credit_amount) AS total_credits,
  SUM(debit_amount) - SUM(credit_amount) AS balance_diff
FROM ledger_entries
GROUP BY transaction_id
HAVING SUM(debit_amount) <> SUM(credit_amount)
ORDER BY transaction_id ASC`,
    expectedResultExplanation: `Grouping by transaction_id and applying HAVING SUM(debit_amount) <> SUM(credit_amount) correctly isolates TXN-002 (debit 1200, credit 1150, diff 50) and TXN-004 (debit 2500, credit 2450, diff 50). TXN-001 and TXN-003 are balanced.`,
    qaInsight: `Financial audits will automatically halt batch settlements if debits != credits. As a QA automation engineer, this check is written as an automated sanity script in nightly CI/CD regression runs before any release candidate is promoted.`,
  },

  // 5. GOOGLE - Data QA / Test Engineer
  {
    id: 'google-qa-01',
    questionNumber: 5,
    title: 'Identify Flaky CI/CD Automated Test Cases by Flakiness Rate',
    company: 'Google',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Senior QA Lead',
    category: 'Defect & Test Execution Analytics',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Google Software Engineer in Test (SET / SDET) interview on Glassdoor: "The question asked how to calculate the flakiness percentage of automated test suites across different build runs where a test is defined as flaky if it has both passed and failed in the same Git commit hash or test suite run."',
    tags: ['Flakiness Analysis', 'CI/CD Metrics', 'Test Analytics', 'Aggregation'],
    description: `Google runs millions of automated tests daily. A test case is considered "flaky" if it intermittently produces both \`'PASSED'\` and \`'FAILED'\` results on the same commit or build.
    
Write a query to analyze \`ci_test_runs\`. For each \`test_name\`, return:
1. \`test_name\`
2. \`total_runs\` (total number of executions)
3. \`failed_runs\` (number of failed executions)
4. \`flakiness_percentage\` calculated as \`(failed_runs * 100.0) / total_runs\` rounded to 1 decimal place.

Filter only test cases that have at least one failed run AND at least one passed run (true flaky tests, ignoring tests that fail 100% of the time). Order by \`flakiness_percentage\` DESC, then \`test_name\` ASC.`,
    dbSetupSql: `
      CREATE TABLE ci_test_runs (
        run_id INT,
        test_name VARCHAR(100),
        build_id VARCHAR(30),
        status VARCHAR(10),
        duration_ms INT
      );

      INSERT INTO ci_test_runs VALUES
      (1, 'test_checkout_flow', 'BUILD-101', 'PASSED', 1200),
      (2, 'test_checkout_flow', 'BUILD-102', 'FAILED', 1540),
      (3, 'test_checkout_flow', 'BUILD-103', 'PASSED', 1190),
      (4, 'test_checkout_flow', 'BUILD-104', 'PASSED', 1250),
      (5, 'test_search_indexer', 'BUILD-101', 'PASSED', 450),
      (6, 'test_search_indexer', 'BUILD-102', 'PASSED', 430),
      (7, 'test_auth_oauth_callback', 'BUILD-101', 'FAILED', 3200),
      (8, 'test_auth_oauth_callback', 'BUILD-102', 'FAILED', 3150),
      (9, 'test_payment_stripe_webhook', 'BUILD-101', 'PASSED', 890),
      (10, 'test_payment_stripe_webhook', 'BUILD-102', 'FAILED', 910),
      (11, 'test_payment_stripe_webhook', 'BUILD-103', 'FAILED', 880),
      (12, 'test_payment_stripe_webhook', 'BUILD-104', 'PASSED', 940);
    `,
    tables: [
      {
        tableName: 'ci_test_runs',
        columns: [
          { name: 'run_id', type: 'INT', isPrimaryKey: true },
          { name: 'test_name', type: 'VARCHAR(100)' },
          { name: 'build_id', type: 'VARCHAR(30)' },
          { name: 'status', type: 'VARCHAR(10)' },
          { name: 'duration_ms', type: 'INT' },
        ],
        sampleData: [
          { run_id: 1, test_name: 'test_checkout_flow', build_id: 'BUILD-101', status: 'PASSED' },
          { run_id: 2, test_name: 'test_checkout_flow', build_id: 'BUILD-102', status: 'FAILED' },
          { run_id: 7, test_name: 'test_auth_oauth_callback', build_id: 'BUILD-101', status: 'FAILED' },
        ],
      },
    ],
    initialQuery: `-- Identify flaky tests with both PASS and FAIL results
SELECT 
  test_name,
  COUNT(*) AS total_runs,
  SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) AS failed_runs,
  ROUND(SUM(CASE WHEN status = 'FAILED' THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*), 1) AS flakiness_percentage
FROM ci_test_runs
-- filter for tests with at least one passed and one failed
ORDER BY flakiness_percentage DESC, test_name ASC;`,
    solutionQuery: `SELECT 
  test_name,
  COUNT(*) AS total_runs,
  SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) AS failed_runs,
  ROUND(SUM(CASE WHEN status = 'FAILED' THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*), 1) AS flakiness_percentage
FROM ci_test_runs
GROUP BY test_name
HAVING SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) > 0 
   AND SUM(CASE WHEN status = 'PASSED' THEN 1 ELSE 0 END) > 0
ORDER BY flakiness_percentage DESC, test_name ASC`,
    expectedResultExplanation: `Grouping by test_name and filtering with HAVING ensures we exclude tests that never fail (test_search_indexer) and tests that fail 100% of the time (test_auth_oauth_callback). test_payment_stripe_webhook has 2 fails out of 4 (50.0%) and test_checkout_flow has 1 fail out of 4 (25.0%).`,
    qaInsight: `Flaky tests waste thousands of developer hours and mask real regressions. Google SDET interviews prioritize test metrics calculation (flakiness rate, Mean Time to Detect, MTTR) via SQL telemetry over standard CRUD operations.`,
  },

  // 6. MICROSOFT - SDET / Quality Lead
  {
    id: 'microsoft-qa-01',
    questionNumber: 6,
    title: 'Detect Orphaned Defect Comments with No Parent Bug (Referential Integrity)',
    company: 'Microsoft',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Junior QA',
    category: 'Complex Multi-Table Joins & Orphans',
    type: 'interactive_sql',
    frequency: 'High',
    glassdoorContext: 'Microsoft Azure DevOps team SDET interview: "A database foreign key was disabled during a data sync, leading to orphaned records in the work item tracking table. Write a query to flag all comments pointing to non-existent bug tickets."',
    tags: ['Referential Integrity', 'Foreign Keys', 'Orphan Records', 'Data Quality'],
    description: `In Microsoft Azure DevOps work item tracking, comments on defect tickets are stored in \`bug_comments\`, referencing \`bug_id\` from \`defects\`.
    
Write a QA assertion query to find all orphaned comments in \`bug_comments\` whose \`bug_id\` does not exist in the \`defects\` table. Return \`comment_id\`, \`bug_id\`, and \`comment_author\`. Sort by \`comment_id\` ascending.`,
    dbSetupSql: `
      CREATE TABLE defects (
        bug_id INT,
        title VARCHAR(150),
        severity VARCHAR(20),
        status VARCHAR(20)
      );

      CREATE TABLE bug_comments (
        comment_id INT,
        bug_id INT,
        comment_author VARCHAR(50),
        comment_text VARCHAR(200)
      );

      INSERT INTO defects VALUES
      (101, 'NullPointerException on checkout', 'Critical', 'Open'),
      (102, 'CSS overflow on mobile safari', 'Low', 'Resolved'),
      (103, 'Memory leak in worker pool', 'High', 'In Progress');

      INSERT INTO bug_comments VALUES
      (1, 101, 'alex_sdet', 'Reproduced on Chrome v120.'),
      (2, 101, 'dev_lead', 'Working on patch.'),
      (3, 102, 'qa_tester', 'Verified fix in staging.'),
      (4, 999, 'dev_ops', 'This bug ticket was purged accidentally!'),
      (5, 888, 'qa_manager', 'Root cause identified.');
    `,
    tables: [
      {
        tableName: 'defects',
        columns: [
          { name: 'bug_id', type: 'INT', isPrimaryKey: true },
          { name: 'title', type: 'VARCHAR(150)' },
          { name: 'severity', type: 'VARCHAR(20)' },
          { name: 'status', type: 'VARCHAR(20)' },
        ],
        sampleData: [
          { bug_id: 101, title: 'NullPointerException on checkout', severity: 'Critical', status: 'Open' },
          { bug_id: 102, title: 'CSS overflow on mobile safari', severity: 'Low', status: 'Resolved' },
        ],
      },
      {
        tableName: 'bug_comments',
        columns: [
          { name: 'comment_id', type: 'INT', isPrimaryKey: true },
          { name: 'bug_id', type: 'INT', isForeignKey: true },
          { name: 'comment_author', type: 'VARCHAR(50)' },
          { name: 'comment_text', type: 'VARCHAR(200)' },
        ],
        sampleData: [
          { comment_id: 1, bug_id: 101, comment_author: 'alex_sdet' },
          { comment_id: 4, bug_id: 999, comment_author: 'dev_ops' },
          { comment_id: 5, bug_id: 888, comment_author: 'qa_manager' },
        ],
      },
    ],
    initialQuery: `-- Identify orphaned comments
SELECT 
  c.comment_id,
  c.bug_id,
  c.comment_author
FROM bug_comments c
-- find non-existent parent bugs
ORDER BY c.comment_id ASC;`,
    solutionQuery: `SELECT 
  c.comment_id,
  c.bug_id,
  c.comment_author
FROM bug_comments c
LEFT JOIN defects d ON c.bug_id = d.bug_id
WHERE d.bug_id IS NULL
ORDER BY c.comment_id ASC`,
    expectedResultExplanation: `A LEFT JOIN from child table (bug_comments) to parent table (defects) followed by WHERE d.bug_id IS NULL finds records with broken referential integrity. Comments 4 and 5 reference non-existent bugs 999 and 888.`,
    qaInsight: `In microservice or distributed databases (NoSQL or sharded relational databases where FK constraints cannot be enforced at database level), data QA test automation frequently runs orphaned-record sweeps to prevent memory leaks and zombie references.`,
  },

  // 7. UBER - SDET / Data Quality Engineer
  {
    id: 'uber-qa-01',
    questionNumber: 7,
    title: 'Validate Fare Calculation: Base Fare + Mileage Rate + Surge Multiplier',
    company: 'Uber',
    companyCategory: 'Fintech & Mobility',
    interviewRole: 'SDET',
    difficulty: 'Senior QA Lead',
    category: 'Financial & Ledger Verification',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Uber SDET interview on Glassdoor: "You are given a trips table with recorded distance and surge pricing. Write an automated audit query that compares the recorded total_fare charged against the business formula: base_fare ($2.50) + (distance_miles * $1.75) * surge_multiplier."',
    tags: ['Pricing Verification', 'Calculation Audit', 'Round Off Tests', 'Business Rules'],
    description: `Uber QA must verify that rider billing algorithms adhere to company fare rules without price tampering or floating-point rounding bugs.
    
Business Formula:
\`expected_fare = ROUND((2.50 + (distance_miles * 1.75)) * surge_multiplier, 2)\`
    
Write a QA assertion query to find all rides in \`completed_trips\` where the \`actual_fare\` billed to the rider differs from the \`expected_fare\` by more than $0.05. Return \`trip_id\`, \`actual_fare\`, \`expected_fare\`, and \`discrepancy\` (\`actual_fare - expected_fare\`). Order by \`trip_id\` ASC.`,
    dbSetupSql: `
      CREATE TABLE completed_trips (
        trip_id VARCHAR(20),
        rider_id VARCHAR(20),
        distance_miles DECIMAL(6,2),
        surge_multiplier DECIMAL(4,2),
        actual_fare DECIMAL(8,2)
      );

      INSERT INTO completed_trips VALUES
      ('TRIP-01', 'RIDER-A', 5.0, 1.0, 11.25),
      ('TRIP-02', 'RIDER-B', 10.0, 1.5, 30.00),
      ('TRIP-03', 'RIDER-C', 4.0, 2.0, 25.00),
      ('TRIP-04', 'RIDER-D', 8.2, 1.2, 20.21),
      ('TRIP-05', 'RIDER-E', 12.0, 1.0, 23.50);
    `,
    tables: [
      {
        tableName: 'completed_trips',
        columns: [
          { name: 'trip_id', type: 'VARCHAR(20)', isPrimaryKey: true },
          { name: 'rider_id', type: 'VARCHAR(20)' },
          { name: 'distance_miles', type: 'DECIMAL(6,2)' },
          { name: 'surge_multiplier', type: 'DECIMAL(4,2)' },
          { name: 'actual_fare', type: 'DECIMAL(8,2)' },
        ],
        sampleData: [
          { trip_id: 'TRIP-01', distance_miles: 5.0, surge_multiplier: 1.0, actual_fare: 11.25 },
          { trip_id: 'TRIP-02', distance_miles: 10.0, surge_multiplier: 1.5, actual_fare: 30.00 },
          { trip_id: 'TRIP-03', distance_miles: 4.0, surge_multiplier: 2.0, actual_fare: 25.00 },
        ],
      },
    ],
    initialQuery: `-- Identify trip fare discrepancies > $0.05
SELECT 
  trip_id,
  actual_fare,
  expected_fare,
  actual_fare - expected_fare AS discrepancy
FROM (
  SELECT 
    trip_id,
    actual_fare,
    ROUND((2.50 + (distance_miles * 1.75)) * surge_multiplier, 2) AS expected_fare
  FROM completed_trips
) t
-- filter for discrepancy > 0.05
ORDER BY trip_id ASC;`,
    solutionQuery: `SELECT 
  trip_id,
  actual_fare,
  expected_fare,
  ROUND(actual_fare - expected_fare, 2) AS discrepancy
FROM (
  SELECT 
    trip_id,
    actual_fare,
    ROUND((2.50 + (distance_miles * 1.75)) * surge_multiplier, 2) AS expected_fare
  FROM completed_trips
) sub
WHERE ABS(actual_fare - expected_fare) > 0.05
ORDER BY trip_id ASC`,
    expectedResultExplanation: `TRIP-03 has distance 4.0 miles, surge 2.0. Expected: (2.50 + 7.00)*2.0 = 19.00, but actual_fare was 25.00 (discrepancy +6.00). All other trips are within the $0.05 threshold.`,
    qaInsight: `Automating formula verification with tolerance thresholds (e.g., ABS(actual - expected) > epsilon) is standard practice in QA testing to accommodate floating point arithmetic nuances while catching real calculation defects.`,
  },

  // 8. TCS / COGNIZANT - Data QA / ETL Test Lead
  {
    id: 'tcs-qa-01',
    questionNumber: 8,
    title: 'Detect Nullability Constraint Violations Across Critical Insurance Claims',
    company: 'TCS',
    companyCategory: 'Tech Consultancy Giant',
    interviewRole: 'ETL Tester',
    difficulty: 'Junior QA',
    category: 'Nullability & Boundary Testing',
    type: 'interactive_sql',
    frequency: 'High',
    glassdoorContext: 'TCS ETL QA Interview Glassdoor: "In data warehouse testing, source flat files had mandatory non-null columns. You need to write a validation script to catch any rows where mandatory fields (policy_number, claim_amount, settlement_date) were loaded with NULLs or empty whitespace."',
    tags: ['Data Integrity', 'Null Checks', 'ETL Verification', 'Data Hygiene'],
    description: `During an ETL load into an enterprise insurance analytics repository, compliance laws require that every record must have a non-null \`policy_number\`, a non-null \`claim_amount\` greater than zero, and a non-null \`settlement_date\`.
    
Write a QA test script to identify all records violating any of these mandatory compliance rules. Return \`claim_id\`, \`policy_number\`, \`claim_amount\`, and \`settlement_date\`. Order by \`claim_id\` ascending.`,
    dbSetupSql: `
      CREATE TABLE insurance_claims (
        claim_id INT,
        policy_number VARCHAR(50),
        claim_amount DECIMAL(10,2),
        settlement_date VARCHAR(30)
      );

      INSERT INTO insurance_claims VALUES
      (1, 'POL-7789', 4500.00, '2026-09-15'),
      (2, NULL, 12000.00, '2026-09-16'),
      (3, 'POL-8821', NULL, '2026-09-17'),
      (4, 'POL-9904', -500.00, '2026-09-18'),
      (5, 'POL-3312', 3200.00, NULL),
      (6, 'POL-4411', 890.00, '2026-09-20');
    `,
    tables: [
      {
        tableName: 'insurance_claims',
        columns: [
          { name: 'claim_id', type: 'INT', isPrimaryKey: true },
          { name: 'policy_number', type: 'VARCHAR(50)' },
          { name: 'claim_amount', type: 'DECIMAL(10,2)' },
          { name: 'settlement_date', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { claim_id: 1, policy_number: 'POL-7789', claim_amount: 4500.00, settlement_date: '2026-09-15' },
          { claim_id: 2, policy_number: null, claim_amount: 12000.00, settlement_date: '2026-09-16' },
          { claim_id: 3, policy_number: 'POL-8821', claim_amount: null, settlement_date: '2026-09-17' },
        ],
      },
    ],
    initialQuery: `-- Identify invalid compliance claim records
SELECT 
  claim_id,
  policy_number,
  claim_amount,
  settlement_date
FROM insurance_claims
-- condition for nulls or negative amounts
ORDER BY claim_id ASC;`,
    solutionQuery: `SELECT 
  claim_id,
  policy_number,
  claim_amount,
  settlement_date
FROM insurance_claims
WHERE policy_number IS NULL 
   OR claim_amount IS NULL 
   OR claim_amount <= 0 
   OR settlement_date IS NULL
ORDER BY claim_id ASC`,
    expectedResultExplanation: `Claims 2 (null policy), 3 (null claim_amount), 4 (negative claim_amount -500), and 5 (null settlement_date) all violate mandatory ETL data contract rules.`,
    qaInsight: `ETL testing always involves nullability tests, boundary checks, and range checks. In automated testing frameworks like Great Expectations or dbt test, these translate directly into SQL assertion rules.`,
  },

  // 9. NETFLIX - Senior SDET
  {
    id: 'netflix-qa-01',
    questionNumber: 9,
    title: 'Identify Video Playback Sessions with Excessive Rebuffering (QoE QA)',
    company: 'Netflix',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Senior QA Lead',
    category: 'Defect & Test Execution Analytics',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Netflix SDET Streaming Quality of Experience (QoE) interview: "The test engineer needs to write a query to identify defective streaming sessions where buffer stall time exceeded 5% of total watch duration, grouped by CDN edge server."',
    tags: ['Streaming Quality', 'QoE Testing', 'Performance QA', 'Aggregation'],
    description: `Netflix streaming quality teams monitor Quality of Experience (QoE). A stream playback session is flagged as a quality defect if \`rebuffer_duration_sec\` is greater than 5% (0.05) of \`total_watch_duration_sec\`.
    
Write a QA monitoring query to find all sessions where \`rebuffer_duration_sec / total_watch_duration_sec > 0.05\`. Return \`session_id\`, \`cdn_provider\`, \`rebuffer_duration_sec\`, \`total_watch_duration_sec\`, and the rebuffer ratio as a percentage (\`rebuffer_pct\`) rounded to 2 decimal places. Order by \`rebuffer_pct\` DESC, then \`session_id\` ASC.`,
    dbSetupSql: `
      CREATE TABLE stream_sessions (
        session_id VARCHAR(30),
        device_type VARCHAR(30),
        cdn_provider VARCHAR(30),
        total_watch_duration_sec INT,
        rebuffer_duration_sec INT
      );

      INSERT INTO stream_sessions VALUES
      ('SESS-101', 'SmartTV', 'Cloudflare', 3600, 45),
      ('SESS-102', 'Mobile_iOS', 'Fastly', 1800, 150),
      ('SESS-103', 'Browser_Chrome', 'Cloudflare', 7200, 20),
      ('SESS-104', 'Mobile_Android', 'Akamai', 2400, 210),
      ('SESS-105', 'Roku', 'Fastly', 1200, 80);
    `,
    tables: [
      {
        tableName: 'stream_sessions',
        columns: [
          { name: 'session_id', type: 'VARCHAR(30)', isPrimaryKey: true },
          { name: 'device_type', type: 'VARCHAR(30)' },
          { name: 'cdn_provider', type: 'VARCHAR(30)' },
          { name: 'total_watch_duration_sec', type: 'INT' },
          { name: 'rebuffer_duration_sec', type: 'INT' },
        ],
        sampleData: [
          { session_id: 'SESS-101', cdn_provider: 'Cloudflare', total_watch_duration_sec: 3600, rebuffer_duration_sec: 45 },
          { session_id: 'SESS-102', cdn_provider: 'Fastly', total_watch_duration_sec: 1800, rebuffer_duration_sec: 150 },
        ],
      },
    ],
    initialQuery: `-- Identify playback sessions with rebuffer ratio > 5%
SELECT 
  session_id,
  cdn_provider,
  rebuffer_duration_sec,
  total_watch_duration_sec,
  ROUND((rebuffer_duration_sec * 100.0) / total_watch_duration_sec, 2) AS rebuffer_pct
FROM stream_sessions
-- filter for rebuffer percentage > 5.0
ORDER BY rebuffer_pct DESC, session_id ASC;`,
    solutionQuery: `SELECT 
  session_id,
  cdn_provider,
  rebuffer_duration_sec,
  total_watch_duration_sec,
  ROUND((rebuffer_duration_sec * 100.0) / total_watch_duration_sec, 2) AS rebuffer_pct
FROM stream_sessions
WHERE (rebuffer_duration_sec * 1.0) / total_watch_duration_sec > 0.05
ORDER BY rebuffer_pct DESC, session_id ASC`,
    expectedResultExplanation: `SESS-104 (Akamai) has 210/2400 = 8.75%, SESS-102 (Fastly) has 150/1800 = 8.33%, and SESS-105 (Fastly) has 80/1200 = 6.67%. All three exceed the 5% threshold.`,
    qaInsight: `Video & media testing uses synthetic probe bots as well as real-user telemetry (RUM). In video streaming QA interviews, calculating QoE ratios, bitrate drops, and buffer health through SQL is a staple requirement.`,
  },

  // 10. FLIPKART - SDET / Warehouse Automation QA
  {
    id: 'flipkart-qa-01',
    questionNumber: 10,
    title: 'Reconcile Dispatch Scans vs Courier Manifest (Logistics QA)',
    company: 'Flipkart',
    companyCategory: 'Fintech & Mobility',
    interviewRole: 'SDET',
    difficulty: 'Mid SDET',
    category: 'ETL & Source-to-Target Reconciliation',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Flipkart Logistics SDET interview: "At midnight cutoff, packages scanned out of the fulfillment center (FC) must match the courier logistics manifest. Write a query to find packages marked as Dispatched in FC that were never received by the courier partner."',
    tags: ['Logistics QA', 'Scan Reconciliation', 'Tracking Discrepancies'],
    description: `At Flipkart Fulfillment Centers, packages are barcode-scanned at the dispatch dock (\`warehouse_scans\`) and handed over to logistics partners (\`courier_manifest\`).
    
Write an automated reconciliation query to find all \`package_id\`s and \`destination_hub\` scanned at the warehouse as \`'DISPATCHED'\` that are completely missing from the \`courier_manifest\`. Order by \`package_id\` ASC.`,
    dbSetupSql: `
      CREATE TABLE warehouse_scans (
        package_id VARCHAR(30),
        status VARCHAR(20),
        destination_hub VARCHAR(50),
        scanned_at VARCHAR(30)
      );

      CREATE TABLE courier_manifest (
        manifest_id INT,
        package_id VARCHAR(30),
        courier_name VARCHAR(50),
        received_at VARCHAR(30)
      );

      INSERT INTO warehouse_scans VALUES
      ('PKG-901', 'DISPATCHED', 'HUB_BENGALURU_NORTH', '2026-10-14 18:00'),
      ('PKG-902', 'DISPATCHED', 'HUB_DELHI_NCR', '2026-10-14 18:05'),
      ('PKG-903', 'PACKING', 'HUB_MUMBAI_CENTRAL', '2026-10-14 18:10'),
      ('PKG-904', 'DISPATCHED', 'HUB_HYDERABAD_WEST', '2026-10-14 18:15'),
      ('PKG-905', 'DISPATCHED', 'HUB_KOLKATA_EAST', '2026-10-14 18:20');

      INSERT INTO courier_manifest VALUES
      (1, 'PKG-901', 'Ekart Logistics', '2026-10-14 18:30'),
      (2, 'PKG-904', 'BlueDart', '2026-10-14 18:35');
    `,
    tables: [
      {
        tableName: 'warehouse_scans',
        columns: [
          { name: 'package_id', type: 'VARCHAR(30)', isPrimaryKey: true },
          { name: 'status', type: 'VARCHAR(20)' },
          { name: 'destination_hub', type: 'VARCHAR(50)' },
          { name: 'scanned_at', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { package_id: 'PKG-901', status: 'DISPATCHED', destination_hub: 'HUB_BENGALURU_NORTH' },
          { package_id: 'PKG-902', status: 'DISPATCHED', destination_hub: 'HUB_DELHI_NCR' },
          { package_id: 'PKG-903', status: 'PACKING', destination_hub: 'HUB_MUMBAI_CENTRAL' },
        ],
      },
      {
        tableName: 'courier_manifest',
        columns: [
          { name: 'manifest_id', type: 'INT', isPrimaryKey: true },
          { name: 'package_id', type: 'VARCHAR(30)' },
          { name: 'courier_name', type: 'VARCHAR(50)' },
          { name: 'received_at', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { manifest_id: 1, package_id: 'PKG-901', courier_name: 'Ekart Logistics' },
          { manifest_id: 2, package_id: 'PKG-904', courier_name: 'BlueDart' },
        ],
      },
    ],
    initialQuery: `-- Identify dispatched packages missing from courier manifest
SELECT 
  w.package_id,
  w.destination_hub
FROM warehouse_scans w
-- add reconciliation logic
ORDER BY w.package_id ASC;`,
    solutionQuery: `SELECT 
  w.package_id,
  w.destination_hub
FROM warehouse_scans w
LEFT JOIN courier_manifest c ON w.package_id = c.package_id
WHERE w.status = 'DISPATCHED' 
  AND c.package_id IS NULL
ORDER BY w.package_id ASC`,
    expectedResultExplanation: `An anti-join reveals PKG-902 and PKG-905 were marked DISPATCHED by the warehouse packing line, but never acknowledged on the courier manifest. PKG-903 is excluded because its status is still PACKING.`,
    qaInsight: `E-commerce supply chain testing checks physical-to-digital state machine parity. Missing manifest handshakes cause lost inventory and customer delivery SLA breaches.`,
  },

  // 11. GOOGLE - SDET Multiple Choice: COUNT(*) vs COUNT(column)
  {
    id: 'google-mcq-01',
    questionNumber: 11,
    title: 'Google QA: Impact of NULLs on Automated Test Pass-Rate Assertions',
    company: 'Google',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Mid SDET',
    category: 'Nullability & Boundary Testing',
    type: 'multiple_choice',
    frequency: 'Very High',
    glassdoorContext: 'Google SDET interview feedback on Glassdoor: "The interviewer asked a trick scenario involving COUNT(*) vs COUNT(column_name) on a table where automated test results contained aborted runs with NULL execution times."',
    tags: ['Tricky SQL', 'Null Handling', 'COUNT Aggregation', 'Interview Traps'],
    description: `A QA automation engineer runs the following query to determine the total count of automated test runs and average execution time:
\`\`\`sql
SELECT 
  COUNT(*) AS total_runs_a,
  COUNT(execution_time_sec) AS total_runs_b,
  AVG(execution_time_sec) AS avg_duration
FROM automated_test_logs;
\`\`\`
Suppose \`automated_test_logs\` contains 100 rows total, but 15 of those rows were aborted by timeouts and have \`execution_time_sec IS NULL\`.

What will be the exact values of \`total_runs_a\` and \`total_runs_b\`, and how is \`avg_duration\` computed?`,
    qaInsight: `In SQL standards, COUNT(*) counts every single row in the result set including rows where all columns are NULL. However, COUNT(column_name) and AVG(column_name) strictly ignore NULL values! If 15 rows have NULL execution times, AVG divides the sum by 85, NOT 100.`,
    options: [
      {
        id: 'opt-a',
        text: 'total_runs_a = 100, total_runs_b = 85, and avg_duration divides total time by 85 (ignoring NULLs).',
        isCorrect: true,
        explanation: 'Correct! COUNT(*) counts all rows (100). COUNT(column) ignores NULLs (85). Standard SQL aggregate functions like AVG(), SUM(), MIN(), MAX() automatically eliminate NULL values before calculation.',
      },
      {
        id: 'opt-b',
        text: 'total_runs_a = 100, total_runs_b = 100, and avg_duration treats NULLs as 0.0 seconds.',
        isCorrect: false,
        explanation: 'Incorrect. SQL aggregates NEVER automatically cast NULL to 0; NULL is unknown and is completely omitted from the calculation.',
      },
      {
        id: 'opt-c',
        text: 'total_runs_a = 85, total_runs_b = 85, and avg_duration divides by 85.',
        isCorrect: false,
        explanation: 'Incorrect. COUNT(*) never filters NULLs; it returns the physical cardinality of the dataset.',
      },
      {
        id: 'opt-d',
        text: 'The query throws a runtime NULL_POINTER_EXCEPTION during execution.',
        isCorrect: false,
        explanation: 'Incorrect. Relational SQL engines are ANSI compliant and silently ignore NULL values in aggregate functions.',
      },
    ],
  },

  // 12. AMAZON - SDET Multiple Choice: The NOT IN NULL Trap
  {
    id: 'amazon-mcq-01',
    questionNumber: 12,
    title: 'Amazon QA: Why NOT IN Fails in ETL Data Drop Auditing',
    company: 'Amazon',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Senior QA Lead',
    category: 'ETL & Source-to-Target Reconciliation',
    type: 'multiple_choice',
    frequency: 'Very High',
    glassdoorContext: 'Amazon QA Lead interview on Glassdoor: "Classic senior SDET trap question: An engineer used `WHERE id NOT IN (SELECT id FROM target_table)` in a reconciliation test script. It returned 0 rows even though thousands of orders were missing. Why?"',
    tags: ['NOT IN Trap', 'Three-Valued Logic', 'ETL Verification'],
    description: `A data QA engineer wrote this test query to find dropped orders during ETL migration:
\`\`\`sql
SELECT order_id 
FROM raw_orders_source
WHERE order_id NOT IN (
  SELECT order_id FROM warehouse_orders_target
);
\`\`\`
Even though hundreds of records in \`raw_orders_source\` were actually missing from \`warehouse_orders_target\`, the query returned zero rows (\`0 rows returned\`).

What is the fundamental root cause of this defect?`,
    qaInsight: `In Three-Valued Logic (3VL), x NOT IN (a, b, NULL) expands to (x <> a AND x <> b AND x <> NULL). Since comparison with NULL returns UNKNOWN, the entire condition evaluates to FALSE or UNKNOWN, suppressing all rows!`,
    options: [
      {
        id: 'opt-a',
        text: 'If warehouse_orders_target contains even a single NULL in order_id, NOT IN evaluates to UNKNOWN for all rows, returning 0 records.',
        isCorrect: true,
        explanation: 'Correct! In SQL three-valued logic, if any value in the subquery list is NULL, "value NOT IN (list)" evaluates to UNKNOWN for every non-matching row. Always use NOT EXISTS or LEFT JOIN ... WHERE target.id IS NULL in QA test scripts.',
      },
      {
        id: 'opt-b',
        text: 'The NOT IN operator only supports string comparisons and automatically errors on integers.',
        isCorrect: false,
        explanation: 'Incorrect. NOT IN supports all comparable scalar data types.',
      },
      {
        id: 'opt-c',
        text: 'Subqueries inside WHERE clauses are limited to a maximum of 10 records by SQL standards.',
        isCorrect: false,
        explanation: 'Incorrect. Subqueries have no 10-record standard limitation.',
      },
      {
        id: 'opt-d',
        text: 'The query suffered from a dead lock because subqueries automatically lock the target table.',
        isCorrect: false,
        explanation: 'Incorrect. A SELECT subquery generates read locks or MVCC snapshots depending on isolation level, not an empty result set.',
      },
    ],
  },

  // 13. SUN KING - Pay-as-You-Go Installment Default Validation
  {
    id: 'sunking-qa-02',
    questionNumber: 13,
    title: 'Sun King Solar: Flag Solar Inverters with Overdue Installment Defaults',
    company: 'Sun King',
    companyCategory: 'Enterprise & GreenTech',
    interviewRole: 'QA Engineer',
    difficulty: 'Mid SDET',
    category: 'Financial & Ledger Verification',
    type: 'interactive_sql',
    frequency: 'High',
    glassdoorContext: 'Sun King interview for QA Test Analyst: "In Pay-As-You-Go solar financing, customers pay weekly installments. QA must write SQL tests to verify the batch system correctly identifies accounts with total paid < expected payment to trigger unit deactivation."',
    tags: ['Financing QA', 'Payment Schedule', 'Aggregations', 'GreenTech'],
    description: `Sun King provides solar home systems through installment plans. To ensure the automated token generation system works as expected, QA must verify customer accounts.
    
Write a query to identify all \`account_id\`s where \`total_paid\` is less than \`minimum_expected_amount\`. Return \`account_id\`, \`customer_name\`, \`minimum_expected_amount\`, \`total_paid\`, and \`shortfall\` (\`minimum_expected_amount - total_paid\`). Order by \`shortfall\` DESC.`,
    dbSetupSql: `
      CREATE TABLE customer_contracts (
        account_id VARCHAR(20),
        customer_name VARCHAR(50),
        minimum_expected_amount DECIMAL(10,2)
      );

      CREATE TABLE installment_payments (
        payment_id INT,
        account_id VARCHAR(20),
        amount_paid DECIMAL(10,2)
      );

      INSERT INTO customer_contracts VALUES
      ('SK-ACC-01', 'Amina Mwangi', 150.00),
      ('SK-ACC-02', 'Samuel Ochieng', 150.00),
      ('SK-ACC-03', 'Grace Muthoni', 200.00),
      ('SK-ACC-04', 'David Kiprono', 180.00);

      INSERT INTO installment_payments VALUES
      (1, 'SK-ACC-01', 50.00),
      (2, 'SK-ACC-01', 50.00),
      (3, 'SK-ACC-01', 50.00),
      (4, 'SK-ACC-02', 60.00),
      (5, 'SK-ACC-02', 40.00),
      (6, 'SK-ACC-03', 100.00),
      (7, 'SK-ACC-03', 50.00),
      (8, 'SK-ACC-04', 180.00);
    `,
    tables: [
      {
        tableName: 'customer_contracts',
        columns: [
          { name: 'account_id', type: 'VARCHAR(20)', isPrimaryKey: true },
          { name: 'customer_name', type: 'VARCHAR(50)' },
          { name: 'minimum_expected_amount', type: 'DECIMAL(10,2)' },
        ],
        sampleData: [
          { account_id: 'SK-ACC-01', customer_name: 'Amina Mwangi', minimum_expected_amount: 150.00 },
          { account_id: 'SK-ACC-02', customer_name: 'Samuel Ochieng', minimum_expected_amount: 150.00 },
        ],
      },
      {
        tableName: 'installment_payments',
        columns: [
          { name: 'payment_id', type: 'INT', isPrimaryKey: true },
          { name: 'account_id', type: 'VARCHAR(20)' },
          { name: 'amount_paid', type: 'DECIMAL(10,2)' },
        ],
        sampleData: [
          { payment_id: 1, account_id: 'SK-ACC-01', amount_paid: 50.00 },
          { payment_id: 4, account_id: 'SK-ACC-02', amount_paid: 60.00 },
        ],
      },
    ],
    initialQuery: `-- Identify defaulted solar installment accounts
SELECT 
  c.account_id,
  c.customer_name,
  c.minimum_expected_amount,
  SUM(p.amount_paid) AS total_paid,
  c.minimum_expected_amount - SUM(p.amount_paid) AS shortfall
FROM customer_contracts c
JOIN installment_payments p ON c.account_id = p.account_id
-- filter where total paid < minimum expected
ORDER BY shortfall DESC;`,
    solutionQuery: `SELECT 
  c.account_id,
  c.customer_name,
  c.minimum_expected_amount,
  SUM(p.amount_paid) AS total_paid,
  c.minimum_expected_amount - SUM(p.amount_paid) AS shortfall
FROM customer_contracts c
JOIN installment_payments p ON c.account_id = p.account_id
GROUP BY c.account_id, c.customer_name, c.minimum_expected_amount
HAVING SUM(p.amount_paid) < c.minimum_expected_amount
ORDER BY shortfall DESC`,
    expectedResultExplanation: `Grouping by account_id and comparing SUM(amount_paid) against minimum_expected_amount reveals Grace Muthoni (SK-ACC-03, paid 150 of 200, shortfall 50) and Samuel Ochieng (SK-ACC-02, paid 100 of 150, shortfall 50). Amina and David have fully satisfied their minimums.`,
    qaInsight: `Testing Pay-As-You-Go financial schedules requires rigorous verification of boundary conditions: partial payments, multiple small installment splits, and exact matching of micro-credit loan balances.`,
  },

  // 14. META - Ad Click Timestamp Inversion Defect (Event Ordering QA)
  {
    id: 'meta-qa-01',
    questionNumber: 14,
    title: 'Meta QA: Detect Causality Inversion Bug (Click Occurred Before Ad Impression)',
    company: 'Meta',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'Data QA Analyst',
    difficulty: 'Senior QA Lead',
    category: 'Temporal & Window Function QA',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Meta Data Quality Engineer / SDET Glassdoor interview: "In ad analytics testing, candidate was asked to write an audit script to detect causality inversion: instances where a recorded user click timestamp preceded the actual ad impression timestamp due to clock skew or distributed queue delays."',
    tags: ['AdTech QA', 'Causality Testing', 'Timestamp Inversion', 'Data Quality'],
    description: `In Meta's ad tracking pipeline, an ad click cannot physically occur before the user was shown the advertisement. Clock drift across mobile client devices or distributed logging pipeline delays can corrupt analytics.
    
Write an automated QA validation query to find all defective ad events in \`ad_events\` where \`click_timestamp\` is earlier than or equal to \`impression_timestamp\`. Return \`ad_id\`, \`user_id\`, \`impression_timestamp\`, and \`click_timestamp\`. Order by \`ad_id\` ASC.`,
    dbSetupSql: `
      CREATE TABLE ad_events (
        ad_id VARCHAR(20),
        user_id VARCHAR(30),
        impression_timestamp VARCHAR(30),
        click_timestamp VARCHAR(30)
      );

      INSERT INTO ad_events VALUES
      ('AD-001', 'USR-112', '2026-10-14 12:00:10', '2026-10-14 12:00:25'),
      ('AD-002', 'USR-481', '2026-10-14 12:05:00', '2026-10-14 12:04:50'),
      ('AD-003', 'USR-902', '2026-10-14 12:10:00', '2026-10-14 12:10:00'),
      ('AD-004', 'USR-319', '2026-10-14 12:15:30', '2026-10-14 12:15:45'),
      ('AD-005', 'USR-882', '2026-10-14 12:20:00', '2026-10-14 12:19:30');
    `,
    tables: [
      {
        tableName: 'ad_events',
        columns: [
          { name: 'ad_id', type: 'VARCHAR(20)', isPrimaryKey: true },
          { name: 'user_id', type: 'VARCHAR(30)' },
          { name: 'impression_timestamp', type: 'VARCHAR(30)' },
          { name: 'click_timestamp', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { ad_id: 'AD-001', user_id: 'USR-112', impression_timestamp: '2026-10-14 12:00:10', click_timestamp: '2026-10-14 12:00:25' },
          { ad_id: 'AD-002', user_id: 'USR-481', impression_timestamp: '2026-10-14 12:05:00', click_timestamp: '2026-10-14 12:04:50' },
        ],
      },
    ],
    initialQuery: `-- Identify causality inversion defects
SELECT 
  ad_id,
  user_id,
  impression_timestamp,
  click_timestamp
FROM ad_events
-- condition for click earlier than or equal to impression
ORDER BY ad_id ASC;`,
    solutionQuery: `SELECT 
  ad_id,
  user_id,
  impression_timestamp,
  click_timestamp
FROM ad_events
WHERE click_timestamp <= impression_timestamp
ORDER BY ad_id ASC`,
    expectedResultExplanation: `Comparing timestamps isolates AD-002 (click 12:04:50 before impression 12:05:00), AD-003 (click exactly at 12:10:00 identical to impression, impossible human reaction time), and AD-005 (click 12:19:30 before impression 12:20:00).`,
    qaInsight: `Testing event stream architectures (Kafka, Flink, BigQuery) requires validating causality invariants. Fraud detection algorithms rely on QA to catch timestamp skew and automated bot spam where click events simulate zero-millisecond impressions.`,
  },

  // 15. APPLE - App Store In-App Purchase Status Machine Validation
  {
    id: 'apple-qa-01',
    questionNumber: 15,
    title: 'Apple QA: Detect Invalid Subscription State Machine Transitions',
    company: 'Apple',
    companyCategory: 'FAANG & Big Tech',
    interviewRole: 'SDET',
    difficulty: 'Senior QA Lead',
    category: 'Schema Drift & CDC Validation',
    type: 'interactive_sql',
    frequency: 'Very High',
    glassdoorContext: 'Apple SDET Commerce Engineering Glassdoor: "In App Store subscription billing QA, candidate must verify that no subscription moved directly from EXPIRED status back to ACTIVE without a corresponding RENEWED event record in the audit log."',
    tags: ['State Machine Testing', 'Audit Logs', 'Subscription QA', 'Commerce Engine'],
    description: `In Apple's App Store subscription state machine, valid status progressions are:
- \`TRIAL\` $\\to$ \`ACTIVE\` $\\to$ \`EXPIRED\`
- An \`EXPIRED\` subscription can ONLY become active again if there is an intervening \`RENEWED\` event in \`subscription_transitions\`.
    
Write a QA assertion query to find any \`subscription_id\` that has an illegal direct transition from \`'EXPIRED'\` to \`'ACTIVE'\` where \`from_status = 'EXPIRED'\` and \`to_status = 'ACTIVE'\` and \`event_type != 'RENEWED'\`. Return \`transition_id\`, \`subscription_id\`, \`from_status\`, \`to_status\`, and \`event_type\`. Order by \`transition_id\` ASC.`,
    dbSetupSql: `
      CREATE TABLE subscription_transitions (
        transition_id INT,
        subscription_id VARCHAR(30),
        from_status VARCHAR(20),
        to_status VARCHAR(20),
        event_type VARCHAR(20),
        transition_time VARCHAR(30)
      );

      INSERT INTO subscription_transitions VALUES
      (1, 'SUB-APPLE-01', 'TRIAL', 'ACTIVE', 'FIRST_CHARGE', '2026-09-01'),
      (2, 'SUB-APPLE-01', 'ACTIVE', 'EXPIRED', 'USER_CANCELLED', '2026-10-01'),
      (3, 'SUB-APPLE-01', 'EXPIRED', 'ACTIVE', 'RENEWED', '2026-10-05'),
      (4, 'SUB-APPLE-02', 'ACTIVE', 'EXPIRED', 'PAYMENT_FAILED', '2026-09-15'),
      (5, 'SUB-APPLE-02', 'EXPIRED', 'ACTIVE', 'GLITCH_RESTORE', '2026-09-16'),
      (6, 'SUB-APPLE-03', 'EXPIRED', 'ACTIVE', 'BYPASS_PROMO', '2026-09-20');
    `,
    tables: [
      {
        tableName: 'subscription_transitions',
        columns: [
          { name: 'transition_id', type: 'INT', isPrimaryKey: true },
          { name: 'subscription_id', type: 'VARCHAR(30)' },
          { name: 'from_status', type: 'VARCHAR(20)' },
          { name: 'to_status', type: 'VARCHAR(20)' },
          { name: 'event_type', type: 'VARCHAR(20)' },
          { name: 'transition_time', type: 'VARCHAR(30)' },
        ],
        sampleData: [
          { transition_id: 1, subscription_id: 'SUB-APPLE-01', from_status: 'TRIAL', to_status: 'ACTIVE', event_type: 'FIRST_CHARGE' },
          { transition_id: 5, subscription_id: 'SUB-APPLE-02', from_status: 'EXPIRED', to_status: 'ACTIVE', event_type: 'GLITCH_RESTORE' },
        ],
      },
    ],
    initialQuery: `-- Identify illegal state transitions
SELECT 
  transition_id,
  subscription_id,
  from_status,
  to_status,
  event_type
FROM subscription_transitions
-- condition for illegal transition
ORDER BY transition_id ASC;`,
    solutionQuery: `SELECT 
  transition_id,
  subscription_id,
  from_status,
  to_status,
  event_type
FROM subscription_transitions
WHERE from_status = 'EXPIRED' 
  AND to_status = 'ACTIVE' 
  AND event_type <> 'RENEWED'
ORDER BY transition_id ASC`,
    expectedResultExplanation: `Transitions 5 ('GLITCH_RESTORE') and 6 ('BYPASS_PROMO') moved from EXPIRED directly to ACTIVE without a verified RENEWED event, violating Apple App Store subscription billing business rules.`,
    qaInsight: `State machine verification is one of the highest value test patterns in enterprise QA. Writing SQL queries that audit state transition graphs directly from change data capture (CDC) or event sourcing tables ensures complete coverage of asynchronous billing workflows.`,
  },
];
