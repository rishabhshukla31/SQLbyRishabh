import React from 'react';
import { Terminal, Award, BookOpen, Layers, Briefcase, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: 'questions' | 'companies' | 'lab' | 'mock' | 'cheatsheet';
  onSelectTab: (tab: 'questions' | 'companies' | 'lab' | 'mock' | 'cheatsheet') => void;
  onStartRandom: () => void;
  solvedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onStartRandom,
  solvedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single brand wordmark */}
        <button
          onClick={() => onSelectTab('questions')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shadow-sm shadow-cyan-500/20">
            <Terminal className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="font-sans font-extrabold tracking-tight">
            SQL QA <span className="text-cyan-400">Master</span>
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('questions')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'questions'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-white'
            }`}
          >
            Question Bank
          </button>
          <button
            onClick={() => onSelectTab('companies')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'companies'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-white'
            }`}
          >
            Company Tracks
          </button>
          <button
            onClick={() => onSelectTab('lab')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'lab'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-white'
            }`}
          >
            Live SQL Lab
          </button>
          <button
            onClick={() => onSelectTab('mock')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'mock'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-white'
            }`}
          >
            Mock Interview
          </button>
          <button
            onClick={() => onSelectTab('cheatsheet')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'cheatsheet'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-white'
            }`}
          >
            QA Cheat Sheet
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono tabular-nums bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-md">
            <span className="text-emerald-400 font-semibold">{solvedCount}</span>
            <span className="text-slate-500">/</span>
            <span>2000 Solved</span>
          </div>

          <button
            onClick={onStartRandom}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm shadow-cyan-400/20 whitespace-nowrap shrink-0"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Random Question</span>
          </button>
        </div>
      </div>
    </header>
  );
};
