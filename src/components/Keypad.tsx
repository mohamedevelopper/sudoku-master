import React from 'react';
import { Pencil, Eraser, Undo, Lightbulb } from 'lucide-react';

interface KeypadProps {
  onNumberClick: (num: number) => void;
  onErase: () => void;
  onUndo: () => void;
  onHint: () => void;
  pencilMode: boolean;
  onTogglePencil: () => void;
  canUndo: boolean;
}

export default function Keypad({
  onNumberClick,
  onErase,
  onUndo,
  onHint,
  pencilMode,
  onTogglePencil,
  canUndo,
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
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-fancy ring-2 ring-indigo-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
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
          className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all duration-200 cursor-pointer"
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
                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
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
          className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all duration-200 cursor-pointer"
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
            className="aspect-square flex items-center justify-center text-lg md:text-xl font-bold bg-white text-slate-800 rounded-xl border border-slate-200/80 shadow-premium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-300 transition-all duration-150 cursor-pointer"
            id={`btn-digit-${num}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
