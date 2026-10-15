import React, { useState } from 'react';
import { SqlEngine } from '../services/sqlEngine';
import { SqlEditor } from './SqlEditor';
import { QueryResultTable } from './QueryResultTable';
import { SqlExecutionResult } from '../types/question';
import { Database, Play, Sparkles, BookOpen, Layers } from 'lucide-react';

interface PreloadedDataset {
  id: string;
  name: string;
  companyOrigin: string;
  description: string;
  setupSql: string;
  defaultQuery: string;
}

const PRELOADED_DATASETS: PreloadedDataset[] = [
  {
    id: 'amazon-orders',
    name: 'Amazon ETL Staging & Production Reconciliation',
    companyOrigin: 'Amazon Fulfillment',
    description: 'Verify dropped or delayed orders between staging and production datastores.',
    setupSql: `
      CREATE TABLE staging_orders (order_id INT, customer_id VARCHAR(30), amount DECIMAL(10,2), status VARCHAR(20));
      CREATE TABLE production_orders (order_id INT, customer_id VARCHAR(30), amount DECIMAL(10,2), status VARCHAR(20));
      INSERT INTO staging_orders VALUES 
      (101, 'CUST-A', 150.00, 'COMPLETED'), (102, 'CUST-B', 80.00, 'COMPLETED'), (103, 'CUST-C', 210.00, 'COMPLETED'),
      (104, 'CUST-D', 45.00, 'PENDING'), (105, 'CUST-E', 320.00, 'COMPLETED');
      INSERT INTO production_orders VALUES 
      (101, 'CUST-A', 150.00, 'COMPLETED'), (102, 'CUST-B', 80.00, 'COMPLETED'), (104, 'CUST-D', 45.00, 'PENDING');
    `,
    defaultQuery: `-- Find completed orders dropped during ETL ingestion
SELECT s.order_id, s.customer_id, s.amount
FROM staging_orders s
LEFT JOIN production_orders p ON s.order_id = p.order_id
WHERE s.status = 'COMPLETED' AND p.order_id IS NULL;`,
  },
  {
    id: 'sunking-telemetry',
    name: 'Sun King Solar IoT Telemetry Gaps',
    companyOrigin: 'Sun King GreenTech',
    description: 'Analyze time-series telemetry gaps > 60 minutes across solar home inverters.',
    setupSql: `
      CREATE TABLE solar_telemetry (reading_id INT, device_id VARCHAR(30), epoch_minutes INT, watts INT);
      INSERT INTO solar_telemetry VALUES 
      (1, 'SK-01', 480, 45), (2, 'SK-01', 540, 75), (3, 'SK-01', 690, 110), (4, 'SK-01', 750, 120),
      (5, 'SK-02', 480, 30), (6, 'SK-02', 525, 55), (7, 'SK-02', 615, 90);
    `,
    defaultQuery: `-- Find telemetry transmission gaps > 60 minutes using LAG()
SELECT 
  device_id,
  epoch_minutes,
  epoch_minutes - LAG(epoch_minutes, 1) OVER (PARTITION BY device_id ORDER BY epoch_minutes) AS gap_minutes
FROM solar_telemetry;`,
  },
  {
    id: 'banking-ledger',
    name: 'Nagarro Banking Double-Entry Balances',
    companyOrigin: 'Nagarro Core Banking',
    description: 'Ensure debit and credit totals match for every transaction.',
    setupSql: `
      CREATE TABLE ledger (entry_id INT, txn_id VARCHAR(20), debit DECIMAL(10,2), credit DECIMAL(10,2));
      INSERT INTO ledger VALUES 
      (1, 'TX-1', 500, 0), (2, 'TX-1', 0, 500),
      (3, 'TX-2', 1200, 0), (4, 'TX-2', 0, 1150),
      (5, 'TX-3', 250, 0), (6, 'TX-3', 0, 250);
    `,
    defaultQuery: `-- Flag unbalanced transactions
SELECT 
  txn_id, 
  SUM(debit) AS total_debit, 
  SUM(credit) AS total_credit,
  SUM(debit) - SUM(credit) AS diff
FROM ledger
GROUP BY txn_id
HAVING SUM(debit) <> SUM(credit);`,
  },
  {
    id: 'google-flaky',
    name: 'Google CI/CD Test Flakiness Analytics',
    companyOrigin: 'Google Test Infrastructure',
    description: 'Compute test flakiness rates from automated test logs.',
    setupSql: `
      CREATE TABLE test_logs (run_id INT, test_name VARCHAR(50), status VARCHAR(10));
      INSERT INTO test_logs VALUES 
      (1, 'test_checkout', 'PASSED'), (2, 'test_checkout', 'FAILED'), (3, 'test_checkout', 'PASSED'), (4, 'test_checkout', 'PASSED'),
      (5, 'test_search', 'PASSED'), (6, 'test_search', 'PASSED'),
      (7, 'test_auth', 'FAILED'), (8, 'test_auth', 'FAILED');
    `,
    defaultQuery: `-- Find flaky tests with both PASS and FAIL results
SELECT 
  test_name,
  COUNT(*) AS total_runs,
  SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) AS failures,
  ROUND(SUM(CASE WHEN status = 'FAILED' THEN 100.0 ELSE 0.0 END) / COUNT(*), 1) AS flakiness_pct
FROM test_logs
GROUP BY test_name
HAVING SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) > 0 
   AND SUM(CASE WHEN status = 'PASSED' THEN 1 ELSE 0 END) > 0;`,
  },
];

export const LiveSqlLabView: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<PreloadedDataset>(PRELOADED_DATASETS[0]);
  const [query, setQuery] = useState(selectedDataset.defaultQuery);
  const [result, setResult] = useState<SqlExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectDataset = (dataset: PreloadedDataset) => {
    setSelectedDataset(dataset);
    setQuery(dataset.defaultQuery);
    setResult(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = SqlEngine.executeQuery(selectedDataset.setupSql, query);
      setResult(res);
      setIsRunning(false);
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Database className="h-4 w-4" />
            <span>In-Browser SQL Playground</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Live SQL Sandbox</h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Run ad-hoc SQL queries against pre-seeded QA databases from Amazon, Sun King, Nagarro, and Google. Test joins, window functions, and aggregations without needing a local database.
          </p>
        </div>

        {/* Dataset selector */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <label className="text-xs text-slate-400 font-medium">Select QA Dataset:</label>
          <select
            value={selectedDataset.id}
            onChange={(e) => {
              const d = PRELOADED_DATASETS.find((item) => item.id === e.target.value);
              if (d) handleSelectDataset(d);
            }}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
          >
            {PRELOADED_DATASETS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.companyOrigin})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dataset quick info */}
      <div className="p-3.5 bg-slate-900/40 rounded-lg border border-slate-800/80 text-xs flex items-center justify-between">
        <span className="text-slate-300">
          <strong className="text-cyan-300">{selectedDataset.companyOrigin}:</strong>{' '}
          {selectedDataset.description}
        </span>
        <button
          onClick={() => setQuery(selectedDataset.defaultQuery)}
          className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline ml-4 shrink-0"
        >
          Reset to Dataset Query
        </button>
      </div>

      {/* SQL Editor */}
      <SqlEditor
        value={query}
        onChange={setQuery}
        onRun={handleRun}
        onReset={() => setQuery(selectedDataset.defaultQuery)}
        isRunning={isRunning}
      />

      {/* Query Results */}
      <div>
        <h3 className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-cyan-400" />
          <span>Query Result Grid</span>
        </h3>
        <QueryResultTable result={result} isLoading={isRunning} />
      </div>
    </div>
  );
};
