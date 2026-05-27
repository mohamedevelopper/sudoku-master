import { Difficulty, GridSize } from '../types';
import { DIFFICULTY_LABELS, DIFFICULTY_FILL_PCT } from '../utils/sudoku';

interface GameHeaderProps {
  difficulty: Difficulty;
  gridSize: GridSize;
  seconds: number;
  isPaused: boolean;
  hintsRemaining: number;
  onTogglePause: () => void;
  onNewGame: () => void;
}

export function GameHeader({
  difficulty,
  gridSize,
  seconds,
  isPaused,
  hintsRemaining,
  onTogglePause,
  onNewGame,
}: GameHeaderProps) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return (
    <div className="game-header">
      <div className="game-info">
        <h2>{gridSize}×{gridSize} — {DIFFICULTY_LABELS[difficulty]}</h2>
        <div className="game-sub">Tap a cell, then a number</div>
      </div>
      <div className="game-controls">
        <span className="hints-pill">💡 {hintsRemaining}</span>
        <span className="timer-pill">{m}:{s}</span>
        <button
          className={`btn-pause ${isPaused ? 'paused' : ''}`}
          onClick={onTogglePause}
          aria-label={isPaused ? 'Resume' : 'Pause'}
          title={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? '▶' : '❚❚'}
        </button>
        <button className="btn-new-game" onClick={onNewGame} aria-label="New game">
          <span className="btn-new-icon">↻</span>
          New
        </button>
      </div>
    </div>
  );
}

export function MistakeRow({ mistakes, maxMistakes }: { mistakes: number; maxMistakes: number }) {
  return (
    <div className="mistake-row">
      <span className="mistake-lbl">Mistakes:</span>
      {Array.from({ length: maxMistakes }).map((_, i) => (
        <span key={i} className={`mistake-dot ${i < mistakes ? 'used' : ''}`} />
      ))}
      <span className="mistake-lbl">{mistakes}/{maxMistakes}</span>
    </div>
  );
}

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="progress-wrap">
      <div className="progress-bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

interface SidebarProps {
  gridSize: GridSize;
  onChangeGridSize: (s: GridSize) => void;
  difficulty: Difficulty;
  onChangeDifficulty: (d: Difficulty) => void;
  streak: number;
  totalSolved: number;
  bestTime: number | null;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
  sfxVolume: number;
  onChangeSfxVolume: (v: number) => void;
  theme: string;
  onChangeTheme: (id: any) => void;
  isOpen: boolean;
}

const ALL_GRIDS: GridSize[] = [4, 6, 9, 12, 16];
const ALL_DIFFS: Difficulty[] = ['easy', 'medium', 'hard', 'expert', 'master', 'extreme'];

export function Sidebar({
  gridSize, onChangeGridSize,
  difficulty, onChangeDifficulty,
  streak, totalSolved, bestTime,
  sfxEnabled, onToggleSfx,
  sfxVolume, onChangeSfxVolume,
  theme, onChangeTheme,
  isOpen,
}: SidebarProps) {
  const fmtTime = (s: number | null) => {
    if (s === null) return '—';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };
  return (
    <aside id="sidebar" className={isOpen ? 'open' : ''} aria-label="Game options">
      <div className="sidebar-section">
        <div className="streak-banner">
          <div>
            <div className="streak-text">🔥 Daily streak</div>
            <div style={{ fontSize: 10, opacity: 0.8 }}>Keep playing every day!</div>
          </div>
          <div className="streak-num">{streak}</div>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-label">Grid size</span>
        <div className="grid-btns">
          {ALL_GRIDS.map((s) => (
            <button
              key={s}
              className={`grid-btn ${s === gridSize ? 'active' : ''}`}
              onClick={() => onChangeGridSize(s)}
            >
              {s} × {s}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-label">Difficulty</span>
        <div className="diff-btns">
          {ALL_DIFFS.map((d) => (
            <button
              key={d}
              data-diff={d}
              className={`diff-btn ${d === difficulty ? 'active' : ''}`}
              onClick={() => onChangeDifficulty(d)}
            >
              {DIFFICULTY_LABELS[d]} <span className="fill-pct">{DIFFICULTY_FILL_PCT[d]}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-label">Audio</span>
        <div className="audio-panel">
          <div className="toggle-row">
            <span>Sound effects</span>
            <button
              className={`toggle ${sfxEnabled ? 'on' : 'off'}`}
              onClick={onToggleSfx}
              aria-label="Toggle sound effects"
            >
              <div className="toggle-knob" />
            </button>
          </div>
          <div className="toggle-row">
            <span style={{ fontSize: 11 }}>Volume</span>
            <span style={{ fontSize: 10, color: 'var(--c-text3)', fontFamily: 'var(--font-mono)' }}>
              {Math.round(sfxVolume * 100)}%
            </span>
          </div>
          <input
            type="range" min={0} max={100}
            value={Math.round(sfxVolume * 100)}
            onChange={(e) => onChangeSfxVolume(parseInt(e.target.value) / 100)}
            aria-label="Volume"
          />
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-label">Theme</span>
        <div className="theme-swatches">
          {[
            { id: 'classic', color: '#534AB7' },
            { id: 'ocean', color: '#185FA5' },
            { id: 'forest', color: '#3B6D11' },
            { id: 'sakura', color: '#993556' },
            { id: 'sand', color: '#854F0B' },
            { id: 'cosmic', color: '#1a1a2e' },
            { id: 'retro', color: '#030d0a' },
          ].map((t) => (
            <button
              key={t.id}
              className={`swatch ${theme === t.id ? 'active' : ''}`}
              style={{ background: t.color, border: t.id === 'cosmic' ? '1px solid #534AB7' : t.id === 'retro' ? '1px solid #1D9E75' : undefined }}
              onClick={() => onChangeTheme(t.id)}
              aria-label={`${t.id} theme`}
              title={t.id}
            />
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-label">Your stats</span>
        <div className="stats-mini">
          <div className="stat-card">
            <div className="stat-num">{totalSolved}</div>
            <div className="stat-lbl">Solved</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{streak}</div>
            <div className="stat-lbl">Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{fmtTime(bestTime)}</div>
            <div className="stat-lbl">Best</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
