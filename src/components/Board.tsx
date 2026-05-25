import React from 'react';
import { SudokuCell } from '../types';

interface BoardProps {
  cells: SudokuCell[];
  selectedCellId: string | null;
  onSelectCell: (id: string) => void;
  conflictingIds: Set<string>;
}

export default function Board({
  cells,
  selectedCellId,
  onSelectCell,
  conflictingIds,
}: BoardProps) {
  // Find selected cell to do intelligent highlighting
  const selectedCell = cells.find((c) => c.id === selectedCellId);

  // Helper check if this cell shares row, col or box with the selected cell
  const getIsRelated = (cell: SudokuCell) => {
    if (!selectedCell) return false;
    if (cell.id === selectedCell.id) return false;

    // Check row or column
    if (cell.row === selectedCell.row || cell.col === selectedCell.col) {
      return true;
    }

    // Check 3x3 box
    const cellBox = Math.floor(cell.row / 3) * 3 + Math.floor(cell.col / 3);
    const selectedBox = Math.floor(selectedCell.row / 3) * 3 + Math.floor(selectedCell.col / 3);
    return cellBox === selectedBox;
  };

  // Check if cell has the same value as the selected cell (where value > 0)
  const getHasSameValue = (cell: SudokuCell) => {
    if (!selectedCell || selectedCell.value === 0) return false;
    return cell.id !== selectedCell.id && cell.value === selectedCell.value;
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square bg-white rounded-2xl shadow-fancy border border-slate-200 p-2 md:p-3 overflow-hidden" id="sudoku-board-container">
      <div 
        className="grid grid-cols-9 grid-rows-9 gap-0 w-full h-full border-t border-l border-slate-300 rounded-lg overflow-hidden bg-slate-100" 
        id="sudoku-grid"
      >
        {cells.map((cell) => {
          const isSelected = cell.id === selectedCellId;
          const isRelated = getIsRelated(cell);
          const hasSameValue = getHasSameValue(cell);
          const hasError = conflictingIds.has(cell.id);

          // Subgrid borders calculations (3x3 outlines thick borders)
          const needsRightBorder = cell.col === 2 || cell.col === 5;
          const needsBottomBorder = cell.row === 2 || cell.row === 5;

          // Compute cell background color classes based on states
          let bgClass = 'bg-white';
          if (isSelected) {
            bgClass = 'bg-indigo-100 text-indigo-950 font-semibold';
          } else if (hasError) {
            bgClass = 'bg-rose-100 text-rose-700 animate-pulse';
          } else if (hasSameValue) {
            bgClass = 'bg-violet-100 font-semibold text-violet-900';
          } else if (isRelated) {
            bgClass = 'bg-slate-50/80 text-slate-800';
          }

          // Compute text styles
          const textStyle = cell.given
            ? 'text-slate-900 font-bold'
            : hasError 
              ? 'text-rose-600'
              : 'text-indigo-600 font-medium';

          return (
            <button
              key={cell.id}
              id={cell.id}
              onClick={() => onSelectCell(cell.id)}
              className={`
                relative flex items-center justify-center aspect-square select-none outline-none transition-all duration-150 cursor-pointer text-base md:text-xl
                border-r border-b border-slate-200
                ${needsRightBorder ? 'border-r-2 border-r-slate-400' : ''}
                ${needsBottomBorder ? 'border-b-2 border-b-slate-400' : ''}
                ${bgClass} ${textStyle}
                hover:bg-slate-100 focus:ring-2 focus:ring-indigo-400 focus:z-10
              `}
            >
              {/* Value or Notes layer */}
              {cell.value > 0 ? (
                <span>{cell.value}</span>
              ) : (
                /* Pencil candidates marks 3x3 layout matrix */
                <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5 text-[8px] md:text-[10px] text-slate-400 leading-none">
                  {Array.from({ length: 9 }).map((_, index) => {
                    const num = index + 1;
                    const active = cell.candidates.includes(num);
                    return (
                      <div
                        key={num}
                        className={`flex items-center justify-center font-mono-tech ${
                          active ? 'opacity-100 text-indigo-500 scale-110 font-medium' : 'opacity-0'
                        }`}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Little lock indicator for starting numbers */}
              {cell.given && (
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
