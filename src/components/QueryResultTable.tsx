import React, { useState } from 'react';
import { SqlExecutionResult } from '../types/question';
import { CheckCircle2, AlertTriangle, Clock, Database, ChevronLeft, ChevronRight } from 'lucide-react';

interface QueryResultTableProps {
  result: SqlExecutionResult | null;
  isLoading?: boolean;
}

export const QueryResultTable: React.FC<QueryResultTableProps> = ({ result, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-slate-400 bg-slate-900/50 rounded-lg border border-slate-800">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent mb-3" />
        <span className="text-xs font-mono">Executing query in AlaSQL in-memory engine...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-slate-500 bg-slate-900/30 rounded-lg border border-slate-800/80">
        <Database className="h-8 w-8 stroke-1 mb-2 text-slate-600" />
        <p className="text-sm font-medium text-slate-400">Ready to execute SQL</p>
        <p className="text-xs text-slate-500 mt-1">Press "Run Query" (Ctrl+Enter) to evaluate output</p>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-200">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono leading-relaxed overflow-x-auto">
            <span className="font-semibold text-rose-300">Execution Error:</span> {result.errorMessage}
          </div>
        </div>
      </div>
    );
  }

  const rows = result.rows || [];
  const columns = result.columns || [];
  const totalPages = Math.ceil(rows.length / rowsPerPage) || 1;
  const paginatedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden">
      {/* Header telemetry summary bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Query Succeeded
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono tabular-nums">
            {rows.length} {rows.length === 1 ? 'row' : 'rows'} returned
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-mono text-xs tabular-nums">
          <Clock className="h-3 w-3" />
          <span>{result.executionTimeMs} ms</span>
        </div>
      </div>

      {/* Table content */}
      {rows.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 font-mono">
          0 rows returned. (Empty result set)
        </div>
      ) : (
        <div className="overflow-x-auto max-h-[340px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-900 text-slate-300 font-mono border-b border-slate-800 shadow-sm">
              <tr>
                <th className="py-2 px-3 text-slate-500 font-normal w-12 text-center border-r border-slate-800/60">
                  #
                </th>
                {columns.map((col) => (
                  <th key={col} className="py-2 px-3 font-semibold tracking-wider text-cyan-300">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {paginatedRows.map((row, idx) => {
                const globalRowIndex = (currentPage - 1) * rowsPerPage + idx + 1;
                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-1.5 px-3 text-center text-slate-500 text-[11px] border-r border-slate-800/60 tabular-nums">
                      {globalRowIndex}
                    </td>
                    {columns.map((col) => {
                      const val = row[col];
                      const isNull = val === null || val === undefined;
                      return (
                        <td key={col} className="py-1.5 px-3 text-slate-200 tabular-nums whitespace-nowrap">
                          {isNull ? (
                            <span className="text-amber-400/80 italic font-mono text-[11px]">NULL</span>
                          ) : typeof val === 'number' ? (
                            <span className="text-emerald-300">{val}</span>
                          ) : (
                            <span>{String(val)}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400">
          <span className="font-mono tabular-nums">
            Showing {(currentPage - 1) * rowsPerPage + 1}–
            {Math.min(currentPage * rowsPerPage, rows.length)} of {rows.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="font-mono tabular-nums text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
