import { GameStats, Difficulty } from '../types';
import { DIFFICULTY_LABELS } from '../utils/sudoku';

interface StatsModalProps {
  stats: GameStats;
  onClose: () => void;
  onReset: () => void;
}

const DIFFS: Difficulty[] = ['easy', 'medium', 'hard', 'expert', 'master', 'extreme'];

export default function StatsModal({ stats, onClose, onReset }: StatsModalProps) {
  const fmt = (s: number | null) => {
    if (s === null) return '—';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h3>📊 Your statistics</h3>
        <p>Records are saved locally in your browser.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DIFFS.map((d) => {
            const item = stats[d];
            const rate = item.gamesPlayed === 0 ? 0 : Math.round((item.gamesWon / item.gamesPlayed) * 100);
            return (
              <div key={d} style={{
                background: 'var(--c-bg)', border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-sm)', padding: '10px 12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span data-diff={d} className="diff-btn" style={{ pointerEvents: 'none', flex: 'none', padding: '3px 10px', fontSize: 11 }}>
                    {DIFFICULTY_LABELS[d]}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--c-text3)' }}>
                    Best: <strong style={{ color: 'var(--c-text)', fontFamily: 'var(--font-mono)' }}>{fmt(item.bestTime)}</strong>
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{item.gamesPlayed}</div>
                    <div style={{ fontSize: 9, color: 'var(--c-text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Played</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--easy)' }}>{item.gamesWon}</div>
                    <div style={{ fontSize: 9, color: 'var(--c-text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Won</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--c-primary)' }}>{rate}%</div>
                    <div style={{ fontSize: 9, color: 'var(--c-text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Win rate</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="action-btn"
          style={{ marginTop: 16, color: 'var(--expert)', borderColor: 'var(--expert-bg)', background: 'var(--expert-bg)' }}
          onClick={() => {
            if (window.confirm('Reset all statistics? This cannot be undone.')) onReset();
          }}
        >
          Reset all statistics
        </button>
      </div>
    </div>
  );
}
