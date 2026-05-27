import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const SITE = 'https://sudokumaster.vip';

const ROUTES = [
  { path: '/easy-sudoku',     file: 'easy-sudoku.html',     title: 'Easy Sudoku - Play Free Easy Sudoku Online for Beginners | SudokuMaster.vip',         description: 'Play free Easy Sudoku puzzles online. Perfect for beginners and kids. 9x9 grid with ~55% of cells filled. No login. New puzzles every visit.' },
  { path: '/medium-sudoku',   file: 'medium-sudoku.html',   title: 'Medium Sudoku - Free Online Medium Sudoku Puzzles | SudokuMaster.vip',                 description: 'Play free Medium Sudoku puzzles online. The perfect difficulty between Easy and Hard - ~40% of cells filled. Train your logic. No login.' },
  { path: '/hard-sudoku',     file: 'hard-sudoku.html',     title: 'Hard Sudoku - Free Online Hard Sudoku Puzzles | SudokuMaster.vip',                     description: 'Play free Hard Sudoku puzzles online. Challenging 9x9 grid with ~30% cells filled. Requires intermediate techniques. No login.' },
  { path: '/expert-sudoku',   file: 'expert-sudoku.html',   title: 'Expert Sudoku - Play Hardest Free Expert Sudoku Online | SudokuMaster.vip',            description: 'Play free Expert-level Sudoku puzzles online. Very hard 9x9 grid with ~22% cells filled. Master advanced techniques: X-Wing, Swordfish. No login.' },
  { path: '/daily',           file: 'daily.html',           title: "Daily Sudoku Puzzle - Today's Free Sudoku Challenge | SudokuMaster.vip",                description: "Solve today's free daily Sudoku puzzle. Same puzzle for everyone worldwide. Build your streak by solving every day. 9x9 medium difficulty. No login." },
  { path: '/how-to-play',     file: 'how-to-play.html',     title: 'How to Play Sudoku - Complete Guide with Rules, Tips and Techniques | SudokuMaster.vip', description: 'Learn how to play Sudoku from basic rules to advanced techniques. Naked singles, hidden pairs, X-Wing, Swordfish explained with examples. Free guide for beginners and experts.' },
  { path: '/leaderboard',     file: 'leaderboard.html',     title: 'Sudoku Leaderboard - Your Best Times and Streaks | SudokuMaster.vip',                    description: 'View your personal Sudoku leaderboard - best solving times across all difficulties and daily streak history. Stats saved locally in your browser.' },
  { path: '/printable',       file: 'printable.html',       title: 'Free Printable Sudoku PDF - Print or Download Sudoku Puzzles | SudokuMaster.vip',      description: 'Free printable Sudoku puzzles in PDF. Choose 4x4 to 16x16 grid sizes and 6 difficulties. Print directly or download PDF. Perfect for travel, classrooms, kids.' },
  { path: '/about',           file: 'about.html',           title: 'About SudokuMaster.vip - Free Online Sudoku for Everyone',                             description: 'Learn about SudokuMaster.vip - a free, ad-supported online Sudoku platform with 5 grid sizes, 6 difficulties, daily puzzles, printable PDFs, and an Android app.' },
  { path: '/contact',         file: 'contact.html',         title: 'Contact Us | SudokuMaster.vip',                                                        description: 'Contact SudokuMaster.vip for support, feature requests, bug reports, partnerships, or privacy requests.' },
  { path: '/privacy',         file: 'privacy.html',         title: 'Privacy Policy | SudokuMaster.vip',                                                    description: 'Privacy Policy for SudokuMaster.vip and Sudoku Master Android app. Covers AdSense, AdMob, Google Analytics, Google Play Data Safety, GDPR, CCPA, COPPA.' },
  { path: '/terms',           file: 'terms.html',           title: 'Terms of Service | SudokuMaster.vip',                                                  description: 'Terms of Service for SudokuMaster.vip free online Sudoku game and Android app.' },
  { path: '/cookies',         file: 'cookies.html',         title: 'Cookie Policy | SudokuMaster.vip',                                                     description: 'Cookie Policy for SudokuMaster.vip - what cookies we use, why, and how to opt out.' },
];

function htmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let success = 0;
for (const route of ROUTES) {
  const url = SITE + route.path;
  let html = baseHtml;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${htmlEscape(route.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${htmlEscape(route.description)}"`);
  html = html.replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${htmlEscape(route.title)}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${htmlEscape(route.title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${htmlEscape(route.description)}"`);
  html = html.replace(/<meta name="twitter:url" content="[^"]*"/, `<meta name="twitter:url" content="${url}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${htmlEscape(route.title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${htmlEscape(route.description)}"`);

  fs.writeFileSync(path.join(distDir, route.file), html);
  console.log(`  OK ${route.file.padEnd(28)} ${route.title.slice(0, 60)}...`);
  success++;
}

console.log(`\nPre-rendered ${success} routes with unique SEO metadata`);
