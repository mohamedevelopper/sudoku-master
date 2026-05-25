import React from 'react';
import { SudokuCell, ThemeColors } from '../types';

interface BoardProps {
  cells: SudokuCell[];
  selectedCellId: string | null;
  onSelectCell: (id: string) => void;
  conflictingIds: Set<string>;
  themeColors: ThemeColors;
}

export default function Board({
  cells,
  selectedCellId,
  onSelectCell,
  conflictingIds,
  themeColors,
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
    <div className={`w-full max-w-md mx-auto aspect-square ${themeColors.cardBg} rounded-2xl shadow-premium border ${themeColors.cardBorder} p-2 md:p-3 overflow-hidden transition-all duration-300`} id="sudoku-board-container">
      <div 
        className={`grid grid-cols-9 grid-rows-9 gap-0 w-full h-full border-t border-l ${themeColors.boardGridColor} rounded-lg overflow-hidden bg-slate-100/5`} 
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
          let bgClass = themeColors.cellBg;
          if (isSelected) {
            bgClass = themeColors.cellSelected;
          } else if (hasError) {
            bgClass = themeColors.cellError;
          } else if (hasSameValue) {
            bgClass = themeColors.cellSameValue;
          } else if (isRelated) {
            bgClass = themeColors.cellRelated;
          }

          // Compute text styles
          const textStyle = cell.given
            ? themeColors.cellGiven
            : hasError 
              ? themeColors.cellError
              : themeColors.cellUser;

          return (
            <button
              key={cell.id}
              id={cell.id}
              onClick={() => onSelectCell(cell.id)}
              className={`
                relative flex items-center justify-center aspect-square select-none outline-none transition-all duration-150 cursor-pointer text-base md:text-xl
                border-r border-b ${themeColors.boardGridColor}
                ${needsRightBorder ? `border-r-2 ${themeColors.boardSubgridBorder}` : ''}
                ${needsBottomBorder ? `border-b-2 ${themeColors.boardSubgridBorder}` : ''}
                ${bgClass} ${textStyle}
                ${themeColors.type === 'retro' ? 'font-mono-tech' : ''}
                focus:ring-2 focus:ring-indigo-400 focus:z-10
              `}
            >
              {/* Value or Notes layer */}
              {cell.value > 0 ? (
                <span>{cell.value}</span>
              ) : (
                /* Pencil candidates marks 3x3 layout matrix */
                <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5 text-[8px] md:text-[10px] text-slate-400 opacity-70 leading-none">
                  {Array.from({ length: 9 }).map((_, index) => {
                    const num = index + 1;
                    const active = cell.candidates.includes(num);
                    return (
                      <div
                        key={num}
                        className={`flex items-center justify-center font-mono-tech ${
                          active 
                            ? `opacity-100 ${themeColors.type === 'retro' ? 'text-green-400 font-bold' : 'text-indigo-500 font-medium'} scale-110` 
                            : 'opacity-0'
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
                <span className={`absolute top-0.5 right-0.5 w-1 h-1 rounded-full ${themeColors.type === 'retro' ? 'bg-green-700' : 'bg-slate-400'}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
