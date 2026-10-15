import alasql from 'alasql';
import { SqlExecutionResult, ValidationResult } from '../types/question';

/**
 * In-browser SQL execution engine powered by AlaSQL.
 * Runs client-side with 0 external network overhead.
 */
export class SqlEngine {
  private static dbCounter = 0;

  /**
   * Run a SQL query in an isolated in-memory database environment with test fixtures
   */
  public static executeQuery(
    setupSql: string,
    queryToRun: string
  ): SqlExecutionResult {
    const dbName = `test_db_${Date.now()}_${++this.dbCounter}`;
    const startTime = performance.now();

    try {
      // Create isolated database
      alasql(`CREATE DATABASE ${dbName};`);
      alasql(`USE ${dbName};`);

      // Run database setup statements
      if (setupSql && setupSql.trim().length > 0) {
        // AlaSQL can run semicolon-separated statements
        const statements = setupSql
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        for (const stmt of statements) {
          alasql(stmt);
        }
      }

      // Execute target query
      const trimmedQuery = queryToRun.trim().replace(/;+$/, '');
      if (!trimmedQuery) {
        return {
          success: false,
          errorMessage: 'Query is empty. Please enter a valid SQL statement.',
        };
      }

      const rawResult = alasql(trimmedQuery);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      // Format results
      let rows: any[] = [];
      if (Array.isArray(rawResult)) {
        // Check if rawResult is an array of objects or primitive/single-value
        if (rawResult.length > 0 && typeof rawResult[0] === 'object' && rawResult[0] !== null) {
          rows = rawResult;
        } else if (rawResult.length > 0) {
          rows = rawResult.map((val) => ({ result: val }));
        }
      } else if (rawResult && typeof rawResult === 'object') {
        rows = [rawResult];
      } else if (rawResult !== undefined && rawResult !== null) {
        rows = [{ result: rawResult }];
      }

      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

      return {
        success: true,
        rows,
        columns,
        rowCount: rows.length,
        executionTimeMs,
      };
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      return {
        success: false,
        errorMessage: err.message || 'Syntax or runtime error in SQL execution.',
        executionTimeMs,
      };
    } finally {
      try {
        alasql(`DROP DATABASE IF EXISTS ${dbName};`);
      } catch {
        // ignore cleanup errors
      }
    }
  }

  /**
   * Validate user SQL against expected solution query
   */
  public static validateSolution(
    setupSql: string,
    userQuery: string,
    solutionQuery: string
  ): ValidationResult {
    // Run user query
    const userResult = this.executeQuery(setupSql, userQuery);
    if (!userResult.success) {
      return {
        isCorrect: false,
        feedback: `SQL Execution Error: ${userResult.errorMessage}`,
        userResult,
      };
    }

    // Run solution query
    const expectedResult = this.executeQuery(setupSql, solutionQuery);
    if (!expectedResult.success) {
      return {
        isCorrect: false,
        feedback: `Internal evaluation error checking solution: ${expectedResult.errorMessage}`,
        userResult,
        expectedResult,
      };
    }

    const differences: string[] = [];

    // 1. Check Row Count
    const userRows = userResult.rows || [];
    const expectedRows = expectedResult.rows || [];

    if (userRows.length !== expectedRows.length) {
      differences.push(
        `Row count mismatch: Your query returned ${userRows.length} rows, but expected ${expectedRows.length} rows.`
      );
    }

    // 2. Check Column Names (case-insensitive normalized)
    const userCols = (userResult.columns || []).map((c) => c.toLowerCase());
    const expectedCols = (expectedResult.columns || []).map((c) => c.toLowerCase());

    if (userCols.length !== expectedCols.length) {
      differences.push(
        `Column count mismatch: Returned ${userCols.length} columns (${userCols.join(', ')}), expected ${expectedCols.length} columns (${expectedCols.join(', ')}).`
      );
    }

    // 3. Deep compare rows
    if (differences.length === 0 && expectedRows.length > 0) {
      const normalizeObj = (obj: any) => {
        const norm: Record<string, any> = {};
        for (const [k, v] of Object.entries(obj)) {
          let val = v;
          if (typeof val === 'number') {
            val = Math.round(val * 1000) / 1000;
          } else if (val === null || val === undefined) {
            val = 'NULL';
          } else {
            val = String(val).trim();
          }
          norm[k.toLowerCase()] = val;
        }
        return norm;
      };

      const normUser = userRows.map(normalizeObj);
      const normExpected = expectedRows.map(normalizeObj);

      // Check if rows match
      let matchCount = 0;
      const expectedKeys = Object.keys(normExpected[0] || {});

      for (let i = 0; i < Math.min(normUser.length, normExpected.length); i++) {
        const u = normUser[i];
        const e = normExpected[i];

        // Check if values match across expected keys
        let rowMatches = true;
        for (const key of expectedKeys) {
          // If user has exact key or match
          const userVal = u[key];
          const expVal = e[key];

          if (userVal !== expVal) {
            rowMatches = false;
            if (differences.length < 3) {
              differences.push(
                `Row #${i + 1} discrepancy in column "${key}": Got "${userVal ?? 'undefined'}", expected "${expVal}".`
              );
            }
            break;
          }
        }
        if (rowMatches) matchCount++;
      }

      if (matchCount !== normExpected.length && differences.length === 0) {
        differences.push('Data rows do not match expected records. Check your filtering or join criteria.');
      }
    }

    const isCorrect = differences.length === 0;

    return {
      isCorrect,
      feedback: isCorrect
        ? 'Verification Passed! Your query correctly reconciles the data and satisfies all QA assertion rules.'
        : `Verification Failed: ${differences[0] || 'Result set does not match the expected dataset.'}`,
      userResult,
      expectedResult,
      differences,
    };
  }
}
