import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-content" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 72, fontWeight: 700, color: 'var(--c-text)' }}>404</div>
      <h1 style={{ fontSize: 22, marginTop: 8 }}>Page not found</h1>
      <p style={{ color: 'var(--c-text2)', marginTop: 6, marginBottom: 20 }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-new-game" style={{ display: 'inline-flex' }}>
        ← Back to Sudoku
      </Link>
    </div>
  );
}
