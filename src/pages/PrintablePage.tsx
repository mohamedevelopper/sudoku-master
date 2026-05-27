import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Difficulty, GridSize } from '../types';
import { generateSudoku, getBoxDims, cellDisplay, DIFFICULTY_LABELS, DIFFICULTY_FILL_PCT } from '../utils/sudoku';
import AdSlot from '../components/AdSlot';

const QUICK: { size: GridSize; difficulty: Difficulty; title: string; subtitle: string }[] = [
  { size: 9, difficulty: 'easy', title: '9×9 Easy', subtitle: 'Beginner — 55% filled' },
  { size: 9, difficulty: 'medium', title: '9×9 Medium', subtitle: 'Intermediate — 40% filled' },
  { size: 9, difficulty: 'hard', title: '9×9 Hard', subtitle: 'Challenging — 30% filled' },
  { size: 9, difficulty: 'expert', title: '9×9 Expert', subtitle: 'Very hard — 22% filled' },
  { size: 4, difficulty: 'easy', title: '4×4 Mini', subtitle: 'For kids' },
  { size: 6, difficulty: 'easy', title: '6×6 Easy', subtitle: 'Step up' },
  { size: 12, difficulty: 'medium', title: '12×12', subtitle: 'Extended' },
  { size: 16, difficulty: 'medium', title: '16×16 Giant', subtitle: 'Hex Sudoku' },
];

export default function PrintablePage() {
  const [gridSize, setGridSize] = useState<GridSize>(9);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [count, setCount] = useState(4);
  const [puzzles, setPuzzles] = useState<number[][][]>(() =>
    Array.from({ length: 4 }, () => generateSudoku('medium', 9).puzzle)
  );

  const regen = (s: GridSize, d: Difficulty, n: number) => {
    setPuzzles(Array.from({ length: n }, () => generateSudoku(d, s).puzzle));
  };

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    try {
      // @ts-ignore
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const margin = 15, pageW = 210, pageH = 297;
      const cols = count <= 2 ? 1 : 2;
      const rows = Math.ceil(count / cols);
      const boardSize = Math.min((pageW - margin * 2) / cols - 5, (pageH - margin * 2 - 20) / rows - 10);

      puzzles.forEach((puzzle, idx) => {
        if (idx > 0 && idx % count === 0) pdf.addPage();
        const pos = idx % count;
        const col = pos % cols;
        const row = Math.floor(pos / cols);
        const x = margin + col * (boardSize + 5);
        const y = margin + 10 + row * (boardSize + 15);
        pdf.setFontSize(10);
        pdf.text(`Puzzle ${idx + 1} — ${gridSize}×${gridSize} ${DIFFICULTY_LABELS[difficulty]}`, x, y - 2);
        drawBoard(pdf, puzzle, x, y, boardSize, gridSize);
      });
      pdf.save(`sudoku-${gridSize}x${gridSize}-${difficulty}.pdf`);
    } catch {
      alert('PDF generation failed. Use the Print button instead.');
    }
  };

  return (
    <div className="page-content">
      <div className="crumbs no-print"><Link to="/">Home</Link> › Printable</div>
      <h1 className="no-print">🖨️ Free Printable Sudoku</h1>
      <p className="lead no-print">
        Free printable Sudoku PDFs in every size and difficulty. No software needed — print or save as PDF straight from your browser.
      </p>

      <div className="no-print">
        <h2>Quick links</h2>
        <div className="print-grid">
          {QUICK.map((q) => (
            <button
              key={`${q.size}-${q.difficulty}-${q.title}`}
              className="print-tile"
              onClick={() => {
                setGridSize(q.size);
                setDifficulty(q.difficulty);
                regen(q.size, q.difficulty, count);
              }}
            >
              <div className="pt-title">{q.title}</div>
              <div className="pt-sub">{q.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="info-card no-print">
        <h3>Custom — choose your settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginTop: 10 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text3)', textTransform: 'uppercase' }}>Grid size</label>
            <select
              value={gridSize}
              onChange={(e) => { const s = parseInt(e.target.value) as GridSize; setGridSize(s); regen(s, difficulty, count); }}
              style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid var(--c-border)', background: 'var(--c-surface)', color: 'var(--c-text)' }}
            >
              <option value={4}>4×4 Mini</option>
              <option value={6}>6×6</option>
              <option value={9}>9×9 Classic</option>
              <option value={12}>12×12</option>
              <option value={16}>16×16 Giant</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text3)', textTransform: 'uppercase' }}>Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => { const d = e.target.value as Difficulty; setDifficulty(d); regen(gridSize, d, count); }}
              style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid var(--c-border)', background: 'var(--c-surface)', color: 'var(--c-text)' }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
              <option value="master">Master</option>
              <option value="extreme">Extreme</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text3)', textTransform: 'uppercase' }}>Puzzles</label>
            <select
              value={count}
              onChange={(e) => { const n = parseInt(e.target.value); setCount(n); regen(gridSize, difficulty, n); }}
              style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid var(--c-border)', background: 'var(--c-surface)', color: 'var(--c-text)' }}
            >
              <option value={1}>1 puzzle</option>
              <option value={2}>2 puzzles</option>
              <option value={4}>4 puzzles</option>
              <option value={6}>6 puzzles</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="action-btn primary" onClick={handlePrint}>🖨 Print</button>
          <button className="action-btn" onClick={handleDownloadPDF}>⬇ Download PDF</button>
        </div>
      </div>

      <AdSlot slot="7890123456" />

      <div className="print-board-wrap">
        {puzzles.map((puzzle, i) => (
          <div key={i} className="pb">
            <div className="pb-title">Puzzle {i + 1} — {gridSize}×{gridSize} {DIFFICULTY_LABELS[difficulty]}</div>
            <PrintBoard puzzle={puzzle} size={gridSize} />
          </div>
        ))}
      </div>

      <div className="no-print">
        <blockquote>
          <strong>How to save as PDF:</strong> Click Print → change destination to "Save as PDF" → Save. Free, no software needed.
        </blockquote>
        <h2>About printable Sudoku</h2>
        <p>
          Printable Sudoku is perfect for offline play, travel, and classrooms. Each puzzle is freshly generated
          with a unique solution. Easy puzzles reveal {DIFFICULTY_FILL_PCT.easy}% of cells. Hard puzzles
          ({DIFFICULTY_FILL_PCT.hard}%) require pencil marks and intermediate techniques.
        </p>
      </div>
    </div>
  );
}

function PrintBoard({ puzzle, size }: { puzzle: number[][]; size: GridSize }) {
  const { boxRows, boxCols } = getBoxDims(size);
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', aspectRatio: '1' }}>
      <tbody>
        {puzzle.map((row, r) => (
          <tr key={r}>
            {row.map((val, c) => {
              const needsRight = (c + 1) % boxCols === 0 && c + 1 < size;
              const needsBottom = (r + 1) % boxRows === 0 && r + 1 < size;
              return (
                <td
                  key={c}
                  style={{
                    border: '1px solid #888',
                    borderRight: needsRight ? '2px solid #000' : '1px solid #888',
                    borderBottom: needsBottom ? '2px solid #000' : '1px solid #888',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#000',
                    background: '#fff',
                    aspectRatio: '1',
                    fontSize: size <= 6 ? '1.4rem' : size <= 9 ? '1rem' : size === 12 ? '0.75rem' : '0.6rem',
                  }}
                >
                  {val === 0 ? '' : cellDisplay(val, size)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function drawBoard(pdf: any, puzzle: number[][], x: number, y: number, size: number, gridSize: GridSize) {
  const { boxRows, boxCols } = getBoxDims(gridSize);
  const cellSize = size / gridSize;
  pdf.setLineWidth(0.15); pdf.setDrawColor(150);
  for (let r = 0; r <= gridSize; r++) pdf.line(x, y + r * cellSize, x + size, y + r * cellSize);
  for (let c = 0; c <= gridSize; c++) pdf.line(x + c * cellSize, y, x + c * cellSize, y + size);
  pdf.setLineWidth(0.5); pdf.setDrawColor(0);
  for (let r = 0; r <= gridSize; r += boxRows) pdf.line(x, y + r * cellSize, x + size, y + r * cellSize);
  for (let c = 0; c <= gridSize; c += boxCols) pdf.line(x + c * cellSize, y, x + c * cellSize, y + size);
  pdf.setFont('helvetica', 'bold');
  const fs = gridSize <= 6 ? 14 : gridSize <= 9 ? 10 : gridSize === 12 ? 7 : 5;
  pdf.setFontSize(fs); pdf.setTextColor(0);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const v = puzzle[r][c];
      if (v !== 0) {
        const t = cellDisplay(v, gridSize);
        pdf.text(t, x + c * cellSize + cellSize / 2, y + r * cellSize + cellSize / 2 + fs / 4, { align: 'center' });
      }
    }
  }
}
