import { SudokuCell, GridSize } from '../types';
import { getBoxDims, cellDisplay } from '../utils/sudoku';

interface BoardProps {
  cells: SudokuCell[];
  size: GridSize;
  selectedCellId: string | null;
  onSelectCell: (id: string) => void;
  conflictingIds: Set<string>;
  highlightRelated?: boolean;
  highlightSameValue?: boolean;
}

export default function Board({
  cells,
  size,
  selectedCellId,
  onSelectCell,
  conflictingIds,
  highlightRelated = true,
  highlightSameValue = true,
}: BoardProps) {
  const selectedCell = cells.find((c) => c.id === selectedCellId);
  const { boxRows, boxCols } = getBoxDims(size);

  const isRelated = (cell: SudokuCell) => {
    if (!highlightRelated || !selectedCell || cell.id === selectedCell.id) return false;
    if (cell.row === selectedCell.row || cell.col === selectedCell.col) return true;
    return (
      Math.floor(cell.row / boxRows) === Math.floor(selectedCell.row / boxRows) &&
      Math.floor(cell.col / boxCols) === Math.floor(selectedCell.col / boxCols)
    );
  };

  const sameValue = (cell: SudokuCell) =>
    highlightSameValue && selectedCell && selectedCell.value !== 0
      && cell.id !== selectedCell.id && cell.value === selectedCell.value;

  return (
    <div
      id="board"
      data-size={size}
      role="grid"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {cells.map((cell) => {
        const isLastCol = cell.col === size - 1;
        const isLastRow = cell.row === size - 1;
        // Thick sub-box right border: only at internal box boundaries
        const isBoxRight  = !isLastCol && (cell.col + 1) % boxCols === 0;
        const isBoxBottom = !isLastRow && (cell.row + 1) % boxRows === 0;

        const cls = ['cell'];
        if (cell.given) cls.push('given');
        else if (cell.value > 0) cls.push('user-filled');
        if (cell.id === selectedCellId) cls.push('selected');
        else if (isRelated(cell)) cls.push('highlight');
        if (sameValue(cell)) cls.push('same-num');
        if (conflictingIds.has(cell.id) || cell.error) cls.push('error');
        if (cell.hinted) cls.push('hint-flash');
        if (isBoxRight) cls.push('box-right');
        if (isBoxBottom) cls.push('box-bottom');
        if (isLastCol) cls.push('last-col');
        if (isLastRow) cls.push('last-row');

        // Pencil-mark display
        const showNotes = cell.value === 0 && cell.candidates.length > 0;
        return (
          <div
            key={cell.id}
            className={cls.join(' ')}
            role="gridcell"
            tabIndex={cell.id === selectedCellId ? 0 : -1}
            aria-label={`Row ${cell.row + 1}, Column ${cell.col + 1}${cell.given ? `, given ${cell.value}` : cell.value > 0 ? `, ${cell.value}` : ', empty'}`}
            onClick={() => onSelectCell(cell.id)}
          >
            {cell.value > 0 ? (
              cellDisplay(cell.value, size)
            ) : showNotes ? (
              <div className="notes-grid">
                {Array.from({ length: size }).map((_, i) => {
                  const n = i + 1;
                  return (
                    <span key={n} className="note-num">
                      {cell.candidates.includes(n) ? cellDisplay(n, size) : ''}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
