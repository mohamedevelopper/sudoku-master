import { useEffect, useState } from 'react';
import { ThemeType, DailyStreak } from '../types';
import { useSudokuGame } from '../utils/useSudokuGame';
import { getTodayDateStr } from '../utils/sudoku';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import Board from '../components/Board';
import Keypad from '../components/Keypad';
import { GameHeader, MistakeRow, ProgressBar, Sidebar } from '../components/GameControls';
import AdSlot from '../components/AdSlot';

const DEFAULT_STREAK: DailyStreak = {
  current: 0, longest: 0, lastPlayed: null, completedDates: [],
};

function updateStreak(streak: DailyStreak, dateStr: string): DailyStreak {
  if (streak.completedDates.includes(dateStr)) return streak;
  const newDates = [...streak.completedDates, dateStr].sort();
  const today = new Date(dateStr);
  let current = 1;
  const check = new Date(today);
  check.setDate(check.getDate() - 1);
  while (newDates.includes(check.toISOString().slice(0, 10))) {
    current++;
    check.setDate(check.getDate() - 1);
  }
  return {
    current,
    longest: Math.max(streak.longest, current),
    lastPlayed: dateStr,
    completedDates: newDates,
  };
}

interface Props {
  theme: ThemeType;
  onChangeTheme: (t: ThemeType) => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
  sfxVolume: number;
  onChangeSfxVolume: (v: number) => void;
}

export default function DailyPage({ theme, onChangeTheme, sfxEnabled, onToggleSfx, sfxVolume, onChangeSfxVolume }: Props) {
  const today = getTodayDateStr();
  const game = useSudokuGame({ initialDifficulty: 'medium', initialSize: 9, daily: true, dateStr: today });
  const [streak, setStreak] = useState<DailyStreak>(() => loadFromStorage(STORAGE_KEYS.STREAK, DEFAULT_STREAK));
  const [pencilMode, setPencilMode] = useState(false);

  useEffect(() => {
    if (!game.isStarted) game.startNewGame('medium', 9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (game.isWon) {
      setStreak((prev) => {
        const next = updateStreak(prev, today);
        saveToStorage(STORAGE_KEYS.STREAK, next);
        return next;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.isWon]);

  const onNumber = (n: number) => (pencilMode ? game.togglePencilCandidate(n) : game.handleCellInput(n));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (game.isPaused || game.isWon) return;
      const key = e.key;
      if (game.selectedCellId) {
        const cell = game.cells.find((c) => c.id === game.selectedCellId);
        if (cell) {
          let tr = cell.row, tc = cell.col;
          if (key === 'ArrowUp' && tr > 0) tr--;
          else if (key === 'ArrowDown' && tr < 8) tr++;
          else if (key === 'ArrowLeft' && tc > 0) tc--;
          else if (key === 'ArrowRight' && tc < 8) tc++;
          if (tr !== cell.row || tc !== cell.col) {
            e.preventDefault();
            game.setSelectedCellId(`cell-${tr}-${tc}`);
            return;
          }
        }
      }
      if (/^[1-9]$/.test(key)) onNumber(parseInt(key, 10));
      else if (key === 'Backspace' || key === 'Delete') game.eraseCurrentCell();
      else if (key.toLowerCase() === 'n') setPencilMode((v) => !v);
      else if (key.toLowerCase() === 'h') game.getSmartHint();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.selectedCellId, game.isPaused, game.isWon, pencilMode, game.cells]);

  const totalSolved = streak.completedDates.length;
  const todayDate = new Date(today);
  const dayName = todayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const filledCells = game.cells.filter((c) => c.value > 0).length;
  const progress = Math.round((filledCells / 81) * 100);

  return (
    <div id="app">
      <Sidebar
        gridSize={9}
        onChangeGridSize={() => {}}
        difficulty={game.difficulty}
        onChangeDifficulty={() => {}}
        streak={streak.current}
        totalSolved={totalSolved}
        bestTime={null}
        sfxEnabled={sfxEnabled}
        onToggleSfx={onToggleSfx}
        sfxVolume={sfxVolume}
        onChangeSfxVolume={onChangeSfxVolume}
        theme={theme}
        onChangeTheme={onChangeTheme}
        isOpen={false}
      />

      <main id="main" role="main">
        <div style={{ width: '100%', maxWidth: 520, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--c-text3)' }}>{dayName}</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-text)', marginTop: 2 }}>📅 Daily Puzzle</h1>
          <div style={{ fontSize: 12, color: 'var(--c-text2)', marginTop: 4 }}>
            Same puzzle for everyone, worldwide. Solve to keep your streak alive.
          </div>
        </div>

        <GameHeader
          difficulty={game.difficulty}
          gridSize={9}
          seconds={game.seconds}
          isPaused={game.isPaused}
          hintsRemaining={game.hintsRemaining}
          onTogglePause={() => game.setIsPaused((v) => !v)}
          onNewGame={() => {}}
        />
        <ProgressBar percent={progress} />
        <MistakeRow mistakes={game.mistakes} maxMistakes={game.maxMistakes} />

        <div className="board-container">
          <div style={{ position: 'relative', width: '100%' }}>
            <Board
              cells={game.cells}
              size={9}
              selectedCellId={game.selectedCellId}
              onSelectCell={(id) => !game.isPaused && game.setSelectedCellId(id)}
              conflictingIds={game.conflictingIds}
            />
            {game.isPaused && !game.isWon && (
              <div className="board-overlay">
                <h3>⏸ Paused</h3>
                <button className="btn-resume" onClick={() => game.setIsPaused(false)}>Resume</button>
              </div>
            )}
            {game.isWon && (
              <div className="board-overlay">
                <h3>🏆 Daily solved!</h3>
                <p>Streak: {streak.current} day{streak.current !== 1 ? 's' : ''}. Come back tomorrow.</p>
              </div>
            )}
          </div>
        </div>

        <Keypad size={9} cells={game.cells} onNumberClick={onNumber} onErase={game.eraseCurrentCell} />

        <div className="actions">
          <button className={`action-btn ${pencilMode ? 'notes-active' : ''}`} onClick={() => setPencilMode((v) => !v)}>
            ✎ Notes
          </button>
          <button className="action-btn" onClick={game.undoLastMove} disabled={game.history.length === 0}>
            ↶ Undo
          </button>
          <button className="action-btn" onClick={game.getSmartHint} disabled={game.hintsRemaining <= 0}>
            💡 Hint ({game.hintsRemaining})
          </button>
        </div>

        <AdSlot slot="4567890123" />

        <section className="text-section">
          <h2>About the daily puzzle</h2>
          <p>
            Every day at midnight UTC a new Sudoku puzzle is generated for the whole world. The puzzle is the
            same for everyone — your daily streak counter ticks up each consecutive day you solve it. Miss a
            day and the streak resets.
          </p>
          <p>The daily puzzle is always 9×9 medium difficulty, perfect for a quick 5–10 minute coffee break.</p>
        </section>
      </main>
    </div>
  );
}
