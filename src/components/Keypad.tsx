import { SudokuCell, GridSize } from '../types';
import { cellDisplay } from '../utils/sudoku';

interface KeypadProps {
  size: GridSize;
  cells: SudokuCell[];
  onNumberClick: (num: number) => void;
  onErase: () => void;
}

export default function Keypad({ size, cells, onNumberClick, onErase }: KeypadProps) {
  const digits = Array.from({ length: size }, (_, i) => i + 1);

  const remaining = (n: number) =>
    Math.max(0, size - cells.filter((c) => c.value === n).length);

  const sizeClass =
    size === 4 ? 'size-4' :
    size === 6 ? 'size-6' :
    size === 9 ? 'size-9' :
    size === 12 ? 'size-12' : 'size-16';

  return (
    <div className={`numpad ${sizeClass}`}>
      {digits.map((n) => {
        const r = remaining(n);
        const complete = r === 0;
        return (
          <button
            key={n}
            className={`num-btn ${complete ? 'completed' : ''}`}
            onClick={() => onNumberClick(n)}
            aria-label={`Place ${cellDisplay(n, size)}`}
          >
            {cellDisplay(n, size)}
            {!complete && <span className="count-badge">{r}</span>}
          </button>
        );
      })}
      <button className="num-btn erase" onClick={onErase} aria-label="Erase">
        ✕
      </button>
    </div>
  );
}
