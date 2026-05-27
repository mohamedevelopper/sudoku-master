import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="page-content">
      <div className="crumbs"><Link to="/">Home</Link> › About</div>
      <h1>ℹ️ About Sudoku Master</h1>
      <p className="lead">
        A free, ad-supported online Sudoku for puzzle enthusiasts of all levels — built by puzzle lovers, for puzzle lovers.
      </p>

      <h2>Our mission</h2>
      <p>
        Sudoku is one of the oldest and most beloved logic puzzles in the world. Our mission is simple:
        deliver the cleanest, fastest, most respectful Sudoku experience on the web. That means:
      </p>
      <ul>
        <li><strong>No login required.</strong> Play instantly. Your stats are saved in your browser, not on our servers.</li>
        <li><strong>No paywalls.</strong> Every grid size, every difficulty, every feature is free forever.</li>
        <li><strong>No invasive ads.</strong> We use Google AdSense (web) and AdMob (Android app) to stay free, but we don't use interstitials, autoplay videos, or popups that block gameplay.</li>
        <li><strong>No dark patterns.</strong> We don't try to trick you into playing longer, watching ads, or sharing things.</li>
      </ul>

      <h2>What we offer</h2>
      <div className="info-card">
        <h3>🎯 Five grid sizes</h3>
        <p>
          From the mini <strong>4×4 grid</strong> (perfect for kids and quick warm-ups) all the way to the
          giant <strong>16×16 grid</strong> (a serious workout for experienced solvers). The classic
          <strong> 9×9 grid</strong> is what most people think of when they hear "Sudoku" — and we have it,
          along with <strong>6×6</strong> and <strong>12×12</strong>.
        </p>
      </div>
      <div className="info-card">
        <h3>📊 Six difficulty levels</h3>
        <p>
          <strong>Easy</strong>, <strong>Medium</strong>, <strong>Hard</strong>, <strong>Expert</strong>,
          <strong> Master</strong>, and <strong>Extreme</strong>. Each level differs not only in the number
          of starting clues but in the techniques required to solve it. Easy puzzles can be done with naked
          singles alone; Extreme requires X-Wing, Swordfish, and forcing chains.
        </p>
      </div>
      <div className="info-card">
        <h3>📅 Daily Sudoku</h3>
        <p>
          Every day at midnight UTC, a new puzzle is generated for the entire world. Solve it to maintain
          your daily streak. Miss a day and the streak resets — a small but powerful motivator that has
          helped millions develop a Sudoku habit.
        </p>
      </div>
      <div className="info-card">
        <h3>🖨️ Printable puzzles</h3>
        <p>
          Generate printable Sudoku PDFs in any grid size and difficulty level. No software needed —
          everything happens in your browser. Great for classrooms, travel, or those who simply prefer
          paper.
        </p>
      </div>
      <div className="info-card">
        <h3>🏆 Personal leaderboard</h3>
        <p>
          Track your best solving times by difficulty and grid size. All records are saved locally — you
          control your data and can clear it any time.
        </p>
      </div>
      <div className="info-card">
        <h3>📱 Android app available</h3>
        <p>
          The same Sudoku experience packaged as an Android app on Google Play — for offline play and
          home-screen access.
        </p>
      </div>

      <h2>How we keep it free</h2>
      <p>
        Running a web service costs money: domain names, hosting, content delivery, development time. We
        choose to fund Sudoku Master with non-intrusive advertising through Google AdSense (on the website)
        and Google AdMob (in the Android app), rather than a subscription or a paywall.
      </p>
      <p>
        We strictly limit ads to non-intrusive placements:
      </p>
      <ul>
        <li>No popups that block gameplay</li>
        <li>No autoplay video ads with sound</li>
        <li>No interstitials between every move</li>
        <li>No ads on the game board itself</li>
      </ul>
      <p>
        If you want to support us beyond viewing ads, simply share Sudoku Master with friends and family
        who enjoy puzzles.
      </p>

      <h2>Built with care</h2>
      <p>
        Sudoku Master is built with modern web technology — React, TypeScript, Vite. The puzzle generator
        runs entirely in your browser, which means: instant puzzle generation, no server lag, and complete
        privacy (we never see your puzzle attempts).
      </p>
      <p>
        Every puzzle is mathematically guaranteed to have exactly one solution, and we test our generator
        across all grid sizes and difficulties to ensure consistency and fairness.
      </p>

      <h2>Sudoku — a brief history</h2>
      <p>
        Although the name is Japanese ("Sūdoku" = "single number"), Sudoku as we know it was actually
        invented by Howard Garns, an American architect, in 1979 under the name "Number Place." Japanese
        puzzle company Nikoli popularized it in 1986 with the name we use today. It exploded in global
        popularity in 2004 when the British Times newspaper started publishing it daily.
      </p>
      <p>
        Today, Sudoku is solved by an estimated 100 million people worldwide. Research suggests regular
        Sudoku play may help maintain memory, attention, and reasoning ability — making it both fun and
        good for your brain.
      </p>

      <h2>Get in touch</h2>
      <p>
        Feedback, feature requests, or bug reports? We'd love to hear from you. Use the{' '}
        <Link to="/contact">Contact form</Link> or email{' '}
        <a href="mailto:sudokumaster.vip@gmail.com">sudokumaster.vip@gmail.com</a>.
      </p>

      <blockquote>
        <strong>Thank you</strong> for playing Sudoku Master. Whether you're solving your first 4×4 puzzle
        or your thousandth Extreme 9×9, we hope the experience is as good as it can possibly be — and that
        you have fun.
      </blockquote>
    </div>
  );
}
