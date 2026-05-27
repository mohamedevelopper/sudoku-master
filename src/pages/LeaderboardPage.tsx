import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameStats, DailyStreak, Difficulty } from '../types';
import { DIFFICULTY_LABELS } from '../utils/sudoku';
import { loadFromStorage, STORAGE_KEYS } from '../utils/storage';

const DEFAULT_STATS: GameStats = {
  easy: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  medium: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  hard: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  expert: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  master: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  extreme: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
};

const DIFFS: Difficulty[] = ['easy', 'medium', 'hard', 'expert', 'master', 'extreme'];

export default function LeaderboardPage() {
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
  const [streak, setStreak] = useState<DailyStreak>({
    current: 0, longest: 0, lastPlayed: null, completedDates: [],
  });

  useEffect(() => {
    setStats({ ...DEFAULT_STATS, ...loadFromStorage<GameStats>(STORAGE_KEYS.STATS, DEFAULT_STATS) });
    setStreak(loadFromStorage<DailyStreak>(STORAGE_KEYS.STREAK, streak));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalSolved = DIFFS.reduce((s, d) => s + stats[d].gamesWon, 0);
  const totalPlayed = DIFFS.reduce((s, d) => s + stats[d].gamesPlayed, 0);

  const fmt = (s: number | null) => {
    if (s === null) return '—';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="page-content">
      <div className="crumbs"><Link to="/">Home</Link> › Leaderboard</div>
      <h1>🏆 Your Sudoku Leaderboard</h1>
      <p className="lead">
        Your personal best solving times — stored locally in your browser. No account needed.
      </p>

      <div className="leaderboard-stats">
        <div className="stat-card"><div className="stat-num">{totalSolved}</div><div className="stat-lbl">Solved</div></div>
        <div className="stat-card"><div className="stat-num">{totalPlayed}</div><div className="stat-lbl">Played</div></div>
        <div className="stat-card"><div className="stat-num">{streak.current}</div><div className="stat-lbl">Current streak</div></div>
        <div className="stat-card"><div className="stat-num">{streak.longest}</div><div className="stat-lbl">Best streak</div></div>
      </div>

      <h2>Best times by difficulty (9×9)</h2>
      <div className="lb-grid">
        {DIFFS.map((d) => (
          <div className="lb-tile" key={d}>
            <div className="lb-size">9 × 9</div>
            <div data-diff={d} className="diff-btn lb-tag" style={{ pointerEvents: 'none', padding: '2px 8px', justifyContent: 'center' }}>
              {DIFFICULTY_LABELS[d]}
            </div>
            <div className="lb-time">{fmt(stats[d].bestTime)}</div>
          </div>
        ))}
      </div>

      <h2>Improve your score</h2>
      <p>
        Best times are saved in your browser. Play regularly to build records. Practice daily puzzles to build
        consistency — the streak counter shows consecutive days you've played.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginTop: 12 }}>
        <Link to="/" className="print-tile">
          <div className="pt-title">🎮 Play more</div>
          <div className="pt-sub">Practice makes perfect</div>
        </Link>
        <Link to="/daily" className="print-tile">
          <div className="pt-title">📅 Daily puzzle</div>
          <div className="pt-sub">Build consistency</div>
        </Link>
        <Link to="/how-to-play" className="print-tile">
          <div className="pt-title">📚 Learn techniques</div>
          <div className="pt-sub">Advanced strategies</div>
        </Link>
      </div>

      <blockquote>
        <strong>Tip:</strong> Learn <Link to="/how-to-play#techniques">solving techniques</Link> like naked
        singles and hidden pairs. They let you fill cells faster and with fewer mistakes.
      </blockquote>
    </div>
  );
}
