import { useEffect, useState } from 'react';
import { Difficulty, GridSize, ThemeType, DailyStreak } from '../types';
import { useSudokuGame } from '../utils/useSudokuGame';
import { loadFromStorage, STORAGE_KEYS } from '../utils/storage';
import Board from '../components/Board';
import Keypad from '../components/Keypad';
import { GameHeader, MistakeRow, ProgressBar, Sidebar } from '../components/GameControls';
import StatsModal from '../components/StatsModal';
import AdSlot from '../components/AdSlot';

interface PlayPageProps {
  theme: ThemeType;
  onChangeTheme: (t: ThemeType) => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
  sfxVolume: number;
  onChangeSfxVolume: (v: number) => void;
  forceDifficulty?: Difficulty;
}

const FAQS = [
  {
    q: 'How do I play Sudoku?',
    a: 'Fill the grid so every row, column, and box contains each digit exactly once. Tap a cell, then a number from the keypad. Use the Notes button to write small candidate numbers while you reason.',
  },
  {
    q: 'What grid sizes are available?',
    a: '4×4, 6×6, 9×9, 12×12 and 16×16. The 9×9 is the classic Sudoku you know from newspapers. 4×4 and 6×6 are great for kids. 12×12 and 16×16 use letters for digits above 9.',
  },
  {
    q: 'Do I need to create an account?',
    a: "No. Stats, themes and your daily streak live in your browser's local storage. Play instantly, no email required.",
  },
  {
    q: 'How do hints and mistakes work?',
    a: 'You get 3 hints and 3 mistakes per puzzle. A wrong number is a mistake. After 3 mistakes the puzzle ends — no harm done, just start a new one.',
  },
  {
    q: 'What is the difference between Master and Extreme?',
    a: 'Master reveals around 22% of the cells; Extreme reveals just 18%. Both require advanced techniques like X-Wing and Swordfish — they reward patience.',
  },
];

export default function PlayPage({
  theme, onChangeTheme,
  sfxEnabled, onToggleSfx,
  sfxVolume, onChangeSfxVolume,
  forceDifficulty,
}: PlayPageProps) {
  // Read URL params for size
  const urlParams = new URLSearchParams(window.location.search);
  const urlSize = parseInt(urlParams.get('size') || '0', 10);
  const validSizes: GridSize[] = [4, 6, 9, 12, 16];
  const initialSize: GridSize = validSizes.includes(urlSize as GridSize) ? (urlSize as GridSize) : 9;

  const game = useSudokuGame({
    initialDifficulty: forceDifficulty ?? 'medium',
    initialSize,
  });

  const [statsOpen, setStatsOpen] = useState(false);
  const [pencilMode, setPencilMode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load streak for sidebar display
  const streak = loadFromStorage<DailyStreak>(STORAGE_KEYS.STREAK, {
    current: 0, longest: 0, lastPlayed: null, completedDates: [],
  });

  // Watch body class
  useEffect(() => {
    const handler = () => setSidebarOpen(document.body.classList.contains('sidebar-open'));
    const observer = new MutationObserver(handler);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Override game.handleCellInput to support pencilMode
  const onNumber = (n: number) => {
    if (pencilMode) game.togglePencilCandidate(n);
    else game.handleCellInput(n);
  };

  // Start a game on first mount
  useEffect(() => {
    if (!game.isStarted) game.startNewGame(forceDifficulty ?? 'medium', initialSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (game.isPaused || game.isWon || game.isGameOver) return;
      const key = e.key;

      // Arrow navigation
      if (game.selectedCellId) {
        const cell = game.cells.find((c) => c.id === game.selectedCellId);
        if (cell) {
          let tr = cell.row, tc = cell.col;
          if (key === 'ArrowUp' && tr > 0) tr--;
          else if (key === 'ArrowDown' && tr < game.gridSize - 1) tr++;
          else if (key === 'ArrowLeft' && tc > 0) tc--;
          else if (key === 'ArrowRight' && tc < game.gridSize - 1) tc++;
          if (tr !== cell.row || tc !== cell.col) {
            e.preventDefault();
            game.setSelectedCellId(`cell-${tr}-${tc}`);
            return;
          }
        }
      }

      // Numbers 1-9
      if (/^[1-9]$/.test(key)) {
        onNumber(parseInt(key, 10));
      } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        game.eraseCurrentCell();
      } else if (key.toLowerCase() === 'n') {
        setPencilMode((v) => !v);
      } else if (key.toLowerCase() === 'h') {
        game.getSmartHint();
      } else if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'z') {
        e.preventDefault();
        game.undoLastMove();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.selectedCellId, game.isPaused, game.isWon, game.isGameOver, pencilMode, game.cells, game.gridSize]);

  const totalSolved = (Object.keys(game.stats) as Difficulty[]).reduce(
    (sum, d) => sum + game.stats[d].gamesWon, 0
  );
  const bestTimeOverall = (Object.keys(game.stats) as Difficulty[])
    .map((d) => game.stats[d].bestTime)
    .filter((t): t is number => t !== null)
    .sort((a, b) => a - b)[0] ?? null;

  // Progress
  const filledCells = game.cells.filter((c) => c.value > 0).length;
  const totalCells = game.gridSize * game.gridSize;
  const progress = totalCells === 0 ? 0 : Math.round((filledCells / totalCells) * 100);

  return (
    <div id="app">
      <Sidebar
        gridSize={game.gridSize}
        onChangeGridSize={(s) => game.startNewGame(game.difficulty, s)}
        difficulty={game.difficulty}
        onChangeDifficulty={(d) => game.startNewGame(d, game.gridSize)}
        streak={streak.current}
        totalSolved={totalSolved}
        bestTime={bestTimeOverall}
        sfxEnabled={sfxEnabled}
        onToggleSfx={onToggleSfx}
        sfxVolume={sfxVolume}
        onChangeSfxVolume={onChangeSfxVolume}
        theme={theme}
        onChangeTheme={onChangeTheme}
        isOpen={sidebarOpen}
      />

      <main id="main" role="main">
        <h1 className="sr-only">Free Sudoku Online — Play Free Sudoku Puzzles No Login | SudokuMaster.vip</h1>

        <GameHeader
          difficulty={game.difficulty}
          gridSize={game.gridSize}
          seconds={game.seconds}
          isPaused={game.isPaused}
          hintsRemaining={game.hintsRemaining}
          onTogglePause={() => game.setIsPaused((v) => !v)}
          onNewGame={() => game.startNewGame()}
        />

        <ProgressBar percent={progress} />
        <MistakeRow mistakes={game.mistakes} maxMistakes={game.maxMistakes} />

        <div className="board-container">
          <div style={{ position: 'relative', width: '100%' }}>
            <Board
              cells={game.cells}
              size={game.gridSize}
              selectedCellId={game.selectedCellId}
              onSelectCell={(id) => !game.isPaused && game.setSelectedCellId(id)}
              conflictingIds={game.conflictingIds}
            />
            {game.isPaused && !game.isWon && (
              <div className="board-overlay">
                <h3>⏸ Game paused</h3>
                <p>Take a breath. Resume when you're ready.</p>
                <button className="btn-resume" onClick={() => game.setIsPaused(false)}>Resume</button>
              </div>
            )}
            {game.isWon && (
              <div className="board-overlay">
                <h3>🏆 Solved!</h3>
                <p>
                  {game.gridSize}×{game.gridSize} {game.difficulty} in {Math.floor(game.seconds / 60)}:
                  {(game.seconds % 60).toString().padStart(2, '0')}
                </p>
                <button className="btn-resume" onClick={() => game.startNewGame()}>Play another</button>
              </div>
            )}
            {game.isGameOver && (
              <div className="board-overlay">
                <h3>💔 Game over</h3>
                <p>Too many mistakes. Try again — you've got this.</p>
                <button className="btn-resume" onClick={() => game.startNewGame()}>New puzzle</button>
              </div>
            )}
          </div>
        </div>

        <Keypad
          size={game.gridSize}
          cells={game.cells}
          onNumberClick={onNumber}
          onErase={game.eraseCurrentCell}
        />

        <div className="actions">
          <button
            className={`action-btn ${pencilMode ? 'notes-active' : ''}`}
            onClick={() => setPencilMode((v) => !v)}
          >
            ✎ Notes {pencilMode ? '(ON)' : ''}
          </button>
          <button
            className="action-btn"
            onClick={game.undoLastMove}
            disabled={game.history.length === 0}
          >
            ↶ Undo
          </button>
          <button
            className="action-btn"
            onClick={game.getSmartHint}
            disabled={game.hintsRemaining <= 0}
          >
            💡 Hint ({game.hintsRemaining})
          </button>
          <button className="action-btn" onClick={() => setStatsOpen(true)}>
            📊 Stats
          </button>
        </div>

        <div style={{ fontSize: 11, color: 'var(--c-text3)', maxWidth: 520, textAlign: 'center', marginBottom: 16 }}>
          Arrows / Tab to move · 1–9 to fill · Backspace to erase · N for Notes · H for Hint · Ctrl+Z to undo
        </div>

        <AdSlot slot="2345678901" />

        <section className="text-section" aria-label="Frequently asked questions">
          <h2>Frequently Asked Questions</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
              </div>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </section>

        <AdSlot slot="3456789012" />
      </main>

      {statsOpen && (
        <StatsModal
          stats={game.stats}
          onClose={() => setStatsOpen(false)}
          onReset={() => {
            game.resetAllStats();
            setStatsOpen(false);
          }}
        />
      )}
    </div>
  );
}
