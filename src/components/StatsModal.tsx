import React from 'react';
import { Trophy, Clock, PlayCircle, BarChart3, RotateCcw, X } from 'lucide-react';
import { GameStats, Difficulty } from '../types';

interface StatsModalProps {
  stats: GameStats;
  onClose: () => void;
  onResetStats: () => void;
}

export default function StatsModal({ stats, onClose, onResetStats }: StatsModalProps) {
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const calculateWinRate = (played: number, won: number): number => {
    if (played === 0) return 0;
    return Math.round((won / played) * 100);
  };

  const difficultyLevels: { id: Difficulty; name: string; color: string }[] = [
    { id: 'easy', name: 'Easy', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { id: 'medium', name: 'Medium', color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { id: 'hard', name: 'Hard', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { id: 'expert', name: 'Expert', color: 'bg-rose-50 text-rose-700 border-rose-100' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all" id="stats-modal">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900">Your Statistics</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            id="btn-close-stats"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4" id="stats-grid-difficulty">
            {difficultyLevels.map((level) => {
              const item = stats[level.id];
              const winRate = calculateWinRate(item.gamesPlayed, item.gamesWon);

              return (
                <div
                  key={level.id}
                  className="p-4 rounded-xl border border-slate-100 bg-white shadow-premium hover:shadow-md transition-all space-y-3"
                >
                  {/* Title Bar */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${level.color}`}>
                      {level.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Best:</span>
                      <strong className="text-slate-950">{formatTime(item.bestTime)}</strong>
                    </div>
                  </div>

                  {/* Stat Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Played
                      </span>
                      <span className="text-lg font-bold text-slate-800">
                        {item.gamesPlayed}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Won
                      </span>
                      <span className="text-lg font-bold text-emerald-600">
                        {item.gamesWon}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Win Rate
                      </span>
                      <span className="text-lg font-bold text-indigo-600">
                        {winRate}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Stats Control Button */}
          <div className="flex justify-between items-center bg-rose-50/50 p-4 rounded-xl border border-rose-100/30">
            <div>
              <p className="text-xs font-bold text-rose-950">Reset Board History</p>
              <p className="text-[11px] text-slate-500">This will clean all your historical times and win records.</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all historical statistics?')) {
                  onResetStats();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-white hover:bg-rose-600 bg-rose-100 rounded-lg border border-rose-200 transition-all cursor-pointer"
              id="btn-reset-stats-confirm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
