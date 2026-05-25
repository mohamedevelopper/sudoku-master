import React from 'react';
import { Play, Pause, RefreshCw, Trophy, ShieldAlert, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { Difficulty } from '../types';

interface HeaderControlsProps {
  difficulty: Difficulty;
  onChangeDifficulty: (diff: Difficulty) => void;
  seconds: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onNewGame: () => void;
  onOpenStats: () => void;
  onSolveBoard: () => void;
}

export default function HeaderControls({
  difficulty,
  onChangeDifficulty,
  seconds,
  isPaused,
  onTogglePause,
  onNewGame,
  onOpenStats,
  onSolveBoard,
}: HeaderControlsProps) {
  // Format MM:SS helper
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const difficulties: { id: Difficulty; label: string; icon: React.ReactNode; color: string }[] = [
    { 
      id: 'easy', 
      label: 'Easy', 
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: 'active:bg-emerald-500 checked:bg-emerald-600 focus:ring-emerald-400' 
    },
    { 
      id: 'medium', 
      label: 'Medium', 
      icon: <Flame className="w-3.5 h-3.5" />,
      color: 'active:bg-blue-500 checked:bg-blue-600 focus:ring-blue-400' 
    },
    { 
      id: 'hard', 
      label: 'Hard', 
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
      color: 'active:bg-amber-500 checked:bg-amber-600 focus:ring-amber-400' 
    },
    { 
      id: 'expert', 
      label: 'Expert', 
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      color: 'active:bg-rose-500 checked:bg-rose-600 focus:ring-rose-400' 
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4" id="header-controls">
      {/* Upper Status Line: Timer & High Level Actions */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/60 shadow-premium" id="status-dashboard-hud">
        {/* Timer Control Panel */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-lg flex items-center gap-2 font-mono-tech text-base md:text-lg font-bold text-slate-800" id="game-timer">
            <span>{formatTime(seconds)}</span>
          </div>
          <button
            onClick={onTogglePause}
            className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              isPaused 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isPaused ? "Resume Game" : "Pause Game"}
            id="btn-timer-pause"
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary Command Interactions */}
        <div className="flex items-center gap-2">
          {/* Solve/Check Board */}
          <button
            onClick={onSolveBoard}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:text-white hover:bg-indigo-600 bg-indigo-50 border border-indigo-100 hover:border-indigo-600 rounded-lg transition-all cursor-pointer"
            id="btn-auto-solve"
            title="Reveal current puzzle solution"
          >
            Solve
          </button>

          {/* New Game trigger */}
          <button
            onClick={onNewGame}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm border border-slate-900 transition-all cursor-pointer"
            id="btn-trigger-new-game"
            title="Start a fresh puzzle grid"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Game</span>
          </button>

          {/* Stats Dialog trigger */}
          <button
            onClick={onOpenStats}
            className="p-1 px-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
            id="btn-open-stats-modal"
            title="View personal statistics"
          >
            <Trophy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Level Selection Tabs */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">Select Level</span>
        <div className="grid grid-cols-4 gap-1 bg-slate-200/40 p-1 rounded-xl border border-slate-200/40" id="level-selection-box">
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              onClick={() => onChangeDifficulty(diff.id)}
              className={`
                flex items-center justify-center gap-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer
                ${
                  difficulty === diff.id
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                }
              `}
              id={`tab-level-${diff.id}`}
            >
              {diff.icon}
              <span className="hidden leading-none sm:inline">{diff.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
