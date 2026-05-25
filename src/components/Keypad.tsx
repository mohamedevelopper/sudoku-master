import React from 'react';
import { Pencil, Eraser, Undo, Lightbulb } from 'lucide-react';
import { ThemeColors } from '../types';

interface KeypadProps {
  onNumberClick: (num: number) => void;
  onErase: () => void;
  onUndo: () => void;
  onHint: () => void;
  pencilMode: boolean;
  onTogglePencil: () => void;
  canUndo: boolean;
  themeColors: ThemeColors;
}

export default function Keypad({
  onNumberClick,
  onErase,
  onUndo,
  onHint,
  pencilMode,
  onTogglePencil,
  canUndo,
  themeColors,
}: KeypadProps) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full max-w-md mx-auto space-y-4" id="sudoku-keypad-panel">
      {/* Utility Controls Row */}
      <div className="grid grid-cols-4 gap-2 md:gap-3" id="hud-actions">
        {/* Pencil Mode Toggle */}
        <button
          onClick={onTogglePencil}
          className={`
            flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer
            ${
              pencilMode
                ? `${themeColors.btnPrimary} ring-2 ring-violet-200/20`
                : `${themeColors.keypadBtn} opacity-90`
            }
          `}
          title="Toggle Pencil Draft Marks Mode"
          id="btn-toggle-pencil"
        >
          <Pencil className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide uppercase">Notes</span>
        </button>

        {/* Clear/Erase Input */}
        <button
          onClick={onErase}
          className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border ${themeColors.keypadBtn} hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-400/50 transition-all duration-200 cursor-pointer`}
          title="Erase Current Cell"
          id="btn-erase-cell"
        >
          <Eraser className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide uppercase">Erase</span>
        </button>

        {/* Undo Action */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`
            flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer
            ${
              canUndo
                ? `${themeColors.keypadBtn}`
                : themeColors.type === 'retro'
                  ? 'bg-zinc-950/20 border-green-950 text-green-900/40 cursor-not-allowed opacity-40'
                  : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-50'
            }
          `}
          title="Undo Last Move"
          id="btn-undo-move"
        >
          <Undo className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide uppercase">Undo</span>
        </button>

        {/* Instant Hint */}
        <button
          onClick={onHint}
          className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border ${themeColors.keypadBtn} hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-400/50 transition-all duration-200 cursor-pointer`}
          title="Get a Smart Hint"
          id="btn-smart-hint"
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide uppercase">Hint</span>
        </button>
      </div>

      {/* Digits Matrix Keypad */}
      <div className="grid grid-cols-9 gap-1.5 md:gap-2" id="keypad-digits">
        {digits.map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className={`aspect-square flex items-center justify-center text-lg md:text-xl font-bold rounded-xl border shadow-premium focus:ring-2 focus:ring-indigo-300 transition-all duration-150 cursor-pointer ${themeColors.keypadBtn} hover:scale-105`}
            id={`btn-digit-${num}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
