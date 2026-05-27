import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot';

export default function HowToPlayPage() {
  return (
    <div className="page-content">
      <div className="crumbs">
        <Link to="/">Home</Link> › How to Play
      </div>
      <h1>How to Play Sudoku</h1>
      <p className="lead">
        A complete guide from the basic rules to advanced solving techniques. For beginners and experienced players alike.
      </p>

      <div className="info-card">
        <strong>In this guide:</strong>
        <ol>
          <li><a href="#rules">Basic rules</a></li>
          <li><a href="#grid">Understanding the grid</a></li>
          <li><a href="#start">How to start solving</a></li>
          <li><a href="#techniques">Solving techniques</a></li>
          <li><a href="#tips">Tips for beginners</a></li>
          <li><a href="#advanced">Advanced strategies</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ol>
      </div>

      <h2 id="rules">1. The basic rules</h2>
      <p>
        Sudoku is a logic puzzle played on a grid — most commonly 9×9, but also 4×4, 6×6, 12×12, and 16×16.
        Three rules govern every puzzle:
      </p>
      <ul>
        <li>Every <strong>row</strong> must contain each digit exactly once.</li>
        <li>Every <strong>column</strong> must contain each digit exactly once.</li>
        <li>Every <strong>box</strong> (the smaller sub-grid sections) must contain each digit exactly once.</li>
      </ul>
      <blockquote>
        <strong>Key rule:</strong> The same digit can never appear twice in the same row, column, or box.
        If you remember only one thing, remember this.
      </blockquote>

      <h2 id="grid">2. Understanding the grid</h2>
      <p>
        A standard 9×9 grid has 81 cells split into nine 3×3 boxes. Some cells start filled in (called
        <em> given numbers</em> or <em>clues</em>). Your job is to fill the empty cells without breaking the rules.
      </p>

      <h2 id="start">3. How to start solving</h2>
      <ol>
        <li>Scan rows, columns, and boxes for digits already present.</li>
        <li>Find cells where only one digit is possible — fill those first.</li>
        <li>After every fill, re-check affected row, column, and box.</li>
        <li>Repeat until done.</li>
      </ol>

      <AdSlot slot="6789012345" />

      <h2 id="techniques">4. Solving techniques</h2>

      <div className="info-card">
        <h3>Naked single<span className="tag beginner">Beginner</span></h3>
        <p>
          When a cell has only one possible digit remaining — because all others are already in its row, column, or box —
          that digit must go there. The most common easy-puzzle technique.
        </p>
      </div>
      <div className="info-card">
        <h3>Hidden single<span className="tag beginner">Beginner</span></h3>
        <p>
          When a particular digit can only go in one cell within a row, column, or box, place it there — even if
          that cell has multiple candidates.
        </p>
      </div>
      <div className="info-card">
        <h3>Naked pair<span className="tag intermediate">Intermediate</span></h3>
        <p>
          Two cells in the same unit both contain exactly the same two candidate digits. Those two digits can be
          eliminated from every other cell in that unit.
        </p>
      </div>
      <div className="info-card">
        <h3>Pointing pair<span className="tag intermediate">Intermediate</span></h3>
        <p>
          When a digit can only appear in one row (or column) within a box, that digit can be eliminated from the
          rest of that row outside the box.
        </p>
      </div>
      <div className="info-card">
        <h3>X-Wing<span className="tag advanced">Advanced</span></h3>
        <p>
          A digit appears in exactly two cells across two different rows, and those cells share the same columns.
          The digit can be eliminated from those columns elsewhere.
        </p>
      </div>
      <div className="info-card">
        <h3>Swordfish<span className="tag advanced">Advanced</span></h3>
        <p>
          X-Wing extended to three rows and three columns. Eliminate the candidate from those columns in any
          other rows.
        </p>
      </div>

      <h2 id="tips">5. Tips for beginners</h2>
      <ul>
        <li><strong>Use pencil notes.</strong> Track candidates with small numbers — toggle Notes mode (N key).</li>
        <li><strong>Start with frequent digits.</strong> Find the digit that appears most in given clues, place its remaining copies.</li>
        <li><strong>Don't guess.</strong> Every Sudoku is logically solvable. If you're guessing, try another technique.</li>
        <li><strong>Undo freely.</strong> Made a mistake? Ctrl+Z, or click Undo.</li>
        <li><strong>Take breaks.</strong> Fresh eyes spot what tired eyes miss.</li>
      </ul>

      <h2 id="advanced">6. Advanced strategies</h2>
      <p>For Expert, Master, and Extreme puzzles, you may need to combine techniques:</p>
      <ul>
        <li><strong>Naked / hidden triple:</strong> Three cells, three candidates.</li>
        <li><strong>Coloring / chains:</strong> Follow logical chains through the puzzle.</li>
        <li><strong>Candidate elimination:</strong> Write all candidates, then eliminate systematically.</li>
        <li><strong>BUG (Bivalue Universal Grave):</strong> Detect impossible bivalue states.</li>
      </ul>

      <h2 id="faq">7. FAQ</h2>
      <div className="info-card">
        <h3>Does Sudoku require maths?</h3>
        <p>No. Digits are just symbols — you could replace them with letters or colors.</p>
      </div>
      <div className="info-card">
        <h3>How long does a puzzle take?</h3>
        <p>Easy: 5–10 min. Hard: 30–60 min. Extreme: an hour or more.</p>
      </div>
      <div className="info-card">
        <h3>Can a Sudoku have multiple solutions?</h3>
        <p>No — a proper Sudoku always has exactly one solution.</p>
      </div>

      <div className="info-card" style={{ marginTop: 24, textAlign: 'center', background: 'var(--c-primary-l)', borderColor: 'var(--c-primary)' }}>
        <h3 style={{ marginBottom: 8 }}>Ready to practice?</h3>
        <p style={{ marginBottom: 12 }}>Start with an Easy puzzle and work your way up.</p>
        <Link to="/easy-sudoku" className="btn-new-game" style={{ display: 'inline-flex' }}>Play free Sudoku →</Link>
      </div>
    </div>
  );
}
