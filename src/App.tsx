import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  HelpCircle, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  Heart,
  Gamepad2,
  Lock,
  ChevronRight
} from 'lucide-react';

import { Difficulty, SudokuCell, GameStats, HistoryItem, ThemeType, ThemeColors } from './types';
import { 
  generateSudoku, 
  initializeBoard, 
  checkBoardConflicts, 
  isCompletedAndCorrect, 
  findHintCell 
} from './utils/sudoku';
import { THEMES } from './utils/themes';

// Component Imports
import Board from './components/Board';
import Keypad from './components/Keypad';
import HeaderControls from './components/HeaderControls';
import StatsModal from './components/StatsModal';
import PrivacyPolicyComponent from './components/PrivacyPolicyComponent';

// Initial default score records
const DEFAULT_STATS: GameStats = {
  easy: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  medium: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  hard: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  expert: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
};

const SudokuLogo = () => {
  const [imgSrc, setImgSrc] = useState<string>("/favicon/icon0.svg");
  const [isFallbackSvg, setIsFallbackSvg] = useState(false);

  const handleError = () => {
    if (imgSrc === "/favicon/icon0.svg") {
      setImgSrc("/favicon/icon1.png");
    } else {
      setIsFallbackSvg(true);
    }
  };

  if (isFallbackSvg) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 select-none drop-shadow-sm flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background rounded card */}
        <rect x="0" y="0" width="100" height="100" rx="18" fill="#ffffff" />
        <rect x="4" y="4" width="92" height="92" rx="14" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        
        {/* Grid Area */}
        <rect x="18" y="14" width="64" height="64" rx="4" fill="none" stroke="#2563eb" strokeWidth="2" />
        
        {/* Grid sub-divisions (3x3 big blocks lines) */}
        <line x1="39.3" y1="14" x2="39.3" y2="78" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="60.6" y1="14" x2="60.6" y2="78" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="18" y1="35.3" x2="82" y2="35.3" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="18" y1="56.6" x2="82" y2="56.6" stroke="#2563eb" strokeWidth="1.5" />

        {/* Thin internal grid lines */}
        <line x1="25.1" y1="14" x2="25.1" y2="78" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="32.2" y1="14" x2="32.2" y2="78" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="46.4" y1="14" x2="46.4" y2="78" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="53.5" y1="14" x2="53.5" y2="78" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="67.7" y1="14" x2="67.7" y2="78" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="74.8" y1="14" x2="74.8" y2="78" stroke="#93c5fd" strokeWidth="0.5" />

        <line x1="18" y1="21.1" x2="82" y2="21.1" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="18" y1="28.2" x2="82" y2="28.2" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="18" y1="42.4" x2="82" y2="42.4" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="18" y1="49.5" x2="82" y2="49.5" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="18" y1="63.7" x2="82" y2="63.7" stroke="#93c5fd" strokeWidth="0.5" />
        <line x1="18" y1="70.8" x2="82" y2="70.8" stroke="#93c5fd" strokeWidth="0.5" />

        {/* Highlight */}
        <rect x="74.8" y="70.8" width="7.2" height="7.2" fill="#dbeafe" rx="1" />

        {/* Numbers */}
        <text x="21.5" y="19" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">4</text>
        <text x="78.4" y="19" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">9</text>
        <text x="57" y="26" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#ea580c" textAnchor="middle" dominantBaseline="central">8</text>
        <text x="21.5" y="32.5" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">3</text>
        <text x="49.9" y="46.5" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#ea580c" textAnchor="middle" dominantBaseline="central">7</text>
        <text x="78.4" y="46.5" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">1</text>
        <text x="35.75" y="61" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">6</text>
        <text x="64.15" y="61" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">5</text>
        <text x="21.5" y="75" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">2</text>
        <text x="57" y="75" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">4</text>
        <text x="78.4" y="75" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" dominantBaseline="central">8</text>

        {/* Text "SUDOKU" below the grid */}
        <text x="50" y="89" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" letterSpacing="1.5">SUDOKU</text>
      </svg>
    );
  }

  return (
    <img
      src={imgSrc}
      onError={handleError}
      alt="Sudoku Master Logo"
      className="w-10 h-10 object-contain rounded-xl select-none drop-shadow-sm flex-shrink-0"
      referrerPolicy="no-referrer"
    />
  );
};

export default function App() {
  // Navigation tab state initialized based on URL pathname
  const [activeTab, setActiveTab] = useState<'game' | 'privacy'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('privacypolicy')) {
      return 'privacy';
    }
    return 'game';
  });

  // Theme selection configuration state with LocalStorage persistence
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sudoku_theme');
      if (savedTheme && ['classic', 'cosmic', 'retro', 'sand', 'sakura'].includes(savedTheme)) {
        return savedTheme as ThemeType;
      }
    }
    return 'classic';
  });

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sudoku_theme', newTheme);
    }
  };

  const themeColors = THEMES[theme] || THEMES.classic;

  // Client-side routing helper with browser History support
  const navigateTo = (tab: 'game' | 'privacy') => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'privacy') {
        window.history.pushState(null, '', '/privacypolicy');
      } else {
        window.history.pushState(null, '', '/');
      }
    }
  };

  // Sync state transitions when browser Back/Forward navigation occurs
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        if (window.location.pathname.includes('privacypolicy')) {
          setActiveTab('privacy');
        } else {
          setActiveTab('game');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Core Sudoku game states
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [cells, setCells] = useState<SudokuCell[]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [pencilMode, setPencilMode] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [hasStartedActiveGame, setHasStartedActiveGame] = useState<boolean>(false);

  // Stats drawer control state
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);

  // Reference hooks
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial mounting configuration load stats from local repository storage
  useEffect(() => {
    const savedStats = localStorage.getItem('sudoku_master_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error("Error reading saved stats:", error);
      }
    }
    // Start game right away on mount
    startNewGame('medium');
  }, []);

  // 2. Play game timer control loop
  useEffect(() => {
    if (activeTab === 'game' && !isPaused && !isWon && hasStartedActiveGame) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTab, isPaused, isWon, hasStartedActiveGame]);

  // 3. Setup global physical keyboard interaction hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'game' || isPaused || isWon) return;

      const key = e.key;

      // Select cells via arrows
      if (selectedCellId) {
        const cell = cells.find((c) => c.id === selectedCellId);
        if (cell) {
          let targetRow = cell.row;
          let targetCol = cell.col;

          if (key === 'ArrowUp' && targetRow > 0) targetRow--;
          else if (key === 'ArrowDown' && targetRow < 8) targetRow++;
          else if (key === 'ArrowLeft' && targetCol > 0) targetCol--;
          else if (key === 'ArrowRight' && targetCol < 8) targetCol++;

          if (targetRow !== cell.row || targetCol !== cell.col) {
            e.preventDefault();
            setSelectedCellId(`cell-${targetRow}-${targetCol}`);
            return;
          }
        }
      }

      // Fill values 1 to 9
      if (/^[1-9]$/.test(key)) {
        handleCellValueInput(parseInt(key, 10));
      } 
      // Erase values using standard keys
      else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        eraseCurrentCell();
      } 
      // Quick key shortcuts
      else if (key.toLowerCase() === 'p' || key.toLowerCase() === 'n') {
        setPencilMode((prev) => !prev);
      } else if (key.toLowerCase() === 'u') {
        undoLastMove();
      } else if (key.toLowerCase() === 'h') {
        getSmartHint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCellId, cells, pencilMode, isPaused, isWon, activeTab]);

  // Command logic: Start puzzle
  const startNewGame = (level: Difficulty) => {
    const { puzzle, solution: solMatrix } = generateSudoku(level);
    const initialBoardCells = initializeBoard(puzzle);

    setDifficulty(level);
    setCells(initialBoardCells);
    setSolution(solMatrix);
    setSelectedCellId(null);
    setSeconds(0);
    setIsPaused(false);
    setIsWon(false);
    setHasStartedActiveGame(true);
    setHistory([]);

    // Record game played
    incrementStatsPlayed(level);
  };

  // Stats calculation updates
  const incrementStatsPlayed = (level: Difficulty) => {
    setStats((prev) => {
      const levelStats = prev[level];
      const nextStats = {
        ...prev,
        [level]: {
          ...levelStats,
          gamesPlayed: levelStats.gamesPlayed + 1,
        },
      };
      localStorage.setItem('sudoku_master_stats', JSON.stringify(nextStats));
      return nextStats;
    });
  };

  const handleLevelWinStats = (level: Difficulty, solveSeconds: number) => {
    setStats((prev) => {
      const levelStats = prev[level];
      const isNewRecord = levelStats.bestTime === null || solveSeconds < levelStats.bestTime;
      const nextStats = {
        ...prev,
        [level]: {
          ...levelStats,
          gamesWon: levelStats.gamesWon + 1,
          bestTime: isNewRecord ? solveSeconds : levelStats.bestTime,
        },
      };
      localStorage.setItem('sudoku_master_stats', JSON.stringify(nextStats));
      return nextStats;
    });
  };

  const resetAllStats = () => {
    localStorage.removeItem('sudoku_master_stats');
    setStats(DEFAULT_STATS);
  };

  // Command: Solve entire board
  const solveActiveBoard = () => {
    if (window.confirm('Do you want to solve the board automatically and reveal all numbers? This game won\'t be recorded in your win statistics.')) {
      const solvedCells = cells.map((cell) => ({
        ...cell,
        value: solution[cell.row][cell.col],
        error: false,
        candidates: [],
      }));
      setCells(solvedCells);
      setIsWon(true);
      setSelectedCellId(null);
    }
  };

  // Game interaction: Handle number cell clicked/pressed
  const handleCellValueInput = (num: number) => {
    if (!selectedCellId) return;

    const cellIndex = cells.findIndex((c) => c.id === selectedCellId);
    if (cellIndex === -1) return;

    const cell = cells[cellIndex];
    if (cell.given) return; // Cant modify starting numbers

    // Push state to Undo history stack
    recordMoveHistory("Enter number");

    const updatedCells = [...cells];

    if (pencilMode) {
      // Toggle the candidates list
      let nextCandidates = [...cell.candidates];
      if (nextCandidates.includes(num)) {
        nextCandidates = nextCandidates.filter((x) => x !== num);
      } else {
        nextCandidates.push(num);
      }
      
      updatedCells[cellIndex] = {
        ...cell,
        value: 0, // pencil marks automatically clears full numbers
        candidates: nextCandidates,
      };
    } else {
      updatedCells[cellIndex] = {
        ...cell,
        value: cell.value === num ? 0 : num, // Toggle number if clicked twice
        candidates: [], // clears pencil marks on active entry values
      };
    }

    // Identify and highlight conflicts standard evaluation
    const errorCellIds = checkBoardConflicts(updatedCells);
    const finalizedCells = updatedCells.map((c) => ({
      ...c,
      error: errorCellIds.has(c.id),
    }));

    setCells(finalizedCells);

    // Evaluate Win condition
    if (isCompletedAndCorrect(finalizedCells, solution)) {
      setIsWon(true);
      handleLevelWinStats(difficulty, seconds);
    }
  };

  // Game interaction: Erase action
  const eraseCurrentCell = () => {
    if (!selectedCellId) return;

    const cellIndex = cells.findIndex((c) => c.id === selectedCellId);
    if (cellIndex === -1) return;

    const cell = cells[cellIndex];
    if (cell.given) return;

    recordMoveHistory("Erase cell");

    const updatedCells = [...cells];
    updatedCells[cellIndex] = {
      ...cell,
      value: 0,
      candidates: [],
      error: false,
    };

    // Re-validate error ids
    const errorCellIds = checkBoardConflicts(updatedCells);
    const finalizedCells = updatedCells.map((c) => ({
      ...c,
      error: errorCellIds.has(c.id),
    }));

    setCells(finalizedCells);
  };

  // Smart hint lookup
  const getSmartHint = () => {
    const hint = findHintCell(cells, solution);
    if (!hint) return;

    recordMoveHistory("Used Hint");

    const updatedCells = [...cells];
    updatedCells[hint.index] = {
      ...updatedCells[hint.index],
      value: hint.value,
      candidates: [],
      error: false,
    };

    const errorCellIds = checkBoardConflicts(updatedCells);
    const finalizedCells = updatedCells.map((c) => ({
      ...c,
      error: errorCellIds.has(c.id),
    }));

    setCells(finalizedCells);
    setSelectedCellId(finalizedCells[hint.index].id);

    if (isCompletedAndCorrect(finalizedCells, solution)) {
      setIsWon(true);
      handleLevelWinStats(difficulty, seconds);
    }
  };

  // Undo engine
  const recordMoveHistory = (desc: string) => {
    const backupCells = cells.map((cell) => ({
      ...cell,
      candidates: [...cell.candidates],
    }));
    setHistory((prev) => [...prev, { cells: backupCells, description: desc }]);
  };

  const undoLastMove = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setCells(previousState.cells);
    setHistory((prev) => prev.slice(0, -1));
  };

  // Conflicting element Set lookup helper
  const conflictingCellIds = new Set<string>(
    cells.filter((c) => c.error).map((c) => c.id)
  );

  return (
    <div className={`min-h-screen ${themeColors.bodyBg} flex flex-col justify-between transition-colors duration-300 font-sans`} id="applet-viewport">
      
      {/* 1. Global Navigation Frame */}
      <header className={`${themeColors.headerBg} border-b ${themeColors.headerBorder} text-white shadow-lg sticky top-0 z-40 transition-all duration-300`} id="sudoku-header">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('game')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            id="logo-button"
          >
            <SudokuLogo />
            <div>
              <span className="font-space-shaper font-bold text-lg tracking-tight select-none block">
                Sudoku Master
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none block">
                MedySoft Studio Built
              </span>
            </div>
          </button>

          {/* Nav Selectors */}
          <nav className="flex items-center gap-1 bg-slate-850 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => navigateTo('game')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'game'
                  ? `${themeColors.type === 'retro' ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-indigo-600 text-white shadow-sm'}`
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
              id="nav-play-mode"
            >
              Play
            </button>
            <button
              onClick={() => navigateTo('privacy')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? `${themeColors.type === 'retro' ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-indigo-600 text-white shadow-sm'}`
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
              id="nav-privacy-mode"
            >
              Privacy Policy
            </button>
          </nav>
        </div>
      </header>

      {/* 2. Main Layout Render Container */}
      <main className="flex-grow w-full py-6 md:py-10 max-w-6xl mx-auto px-4 md:px-8 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          
          {/* A. PLAY GAME TAB */}
          {activeTab === 'game' && (
            <motion.div
              key="game-room"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-6 flex flex-col w-full"
              id="sudoku-view-wrap"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Visual: Control bar, Stats & Info panel */}
                <div className="lg:col-span-5 space-y-5 flex flex-col order-1">
                  
                  {/* Hero Intro text block */}
                  <div className="hidden lg:block space-y-2">
                    <h1 className={`text-3.5xl font-space-shaper font-bold ${
                      theme === 'retro' ? 'text-green-500' : themeColors.textPrimary
                    } tracking-tight leading-none`}>
                      Sudoku Online
                    </h1>
                    <p className={`text-sm ${
                      theme === 'retro' ? 'text-green-600/80' : themeColors.textSecondary
                    } max-w-sm`}>
                      Work your brain muscles with clean logic. Select a difficulty below, use keyboard or numeric keypad to play.
                    </p>
                  </div>

                  {/* Operational and Difficulty selector bar */}
                  <HeaderControls
                    difficulty={difficulty}
                    onChangeDifficulty={startNewGame}
                    seconds={seconds}
                    isPaused={isPaused}
                    onTogglePause={() => setIsPaused((prev) => !prev)}
                    onNewGame={() => startNewGame(difficulty)}
                    onOpenStats={() => setIsStatsOpen(true)}
                    onSolveBoard={solveActiveBoard}
                    themeColors={themeColors}
                  />

                  {/* Theme Selector Widget */}
                  <div className={`${themeColors.cardBg} p-4 rounded-xl border ${themeColors.cardBorder} shadow-premium space-y-3 transition-all duration-300`}>
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-4 h-4 ${themeColors.type === 'retro' ? 'text-green-500' : 'text-indigo-500'}`} />
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${themeColors.type === 'retro' ? 'text-green-500' : 'text-slate-705'}`}>
                        Choose Theme: <span className="opacity-80 lowercase font-medium">({themeColors.name})</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-1.5" id="theme-pill-picker">
                      {(Object.keys(THEMES) as ThemeType[]).map((themeKey) => {
                        const t = THEMES[themeKey];
                        const isSelected = theme === themeKey;
                        
                        let previewColor = "bg-slate-50 border-slate-300";
                        if (themeKey === "cosmic") previewColor = "bg-slate-900 border-slate-700";
                        else if (themeKey === "retro") previewColor = "bg-black border-green-900";
                        else if (themeKey === "sand") previewColor = "bg-[#faf6f0] border-stone-300";
                        else if (themeKey === "sakura") previewColor = "bg-rose-50 border-rose-200";

                        return (
                          <button
                            key={themeKey}
                            onClick={() => changeTheme(themeKey)}
                            className={`flex flex-col items-center gap-1.5 p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? themeColors.type === 'retro'
                                  ? 'border-green-500 bg-zinc-950 text-green-400 font-bold'
                                  : 'border-indigo-500 bg-indigo-50/50 text-indigo-700 font-semibold'
                                : `${themeColors.type === 'retro' ? 'border-transparent text-green-800' : 'border-slate-250 text-slate-500'} hover:bg-slate-100/10`
                            }`}
                            title={t.name}
                          >
                            <span className={`w-6 h-6 rounded-full border shadow-sm flex items-center justify-center ${previewColor} transition-transform hover:scale-110`}>
                              {themeKey === 'classic' && <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                              {themeKey === 'cosmic' && <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />}
                              {themeKey === 'retro' && <span className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                              {themeKey === 'sand' && <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />}
                              {themeKey === 'sakura' && <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
                            </span>
                            <span className="text-[9px] truncate max-w-full font-bold uppercase tracking-tight">
                              {themeKey}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Play instructions panel */}
                  <div className={`${
                    themeColors.type === 'retro' 
                      ? 'bg-black border border-green-950 text-green-600'
                      : themeColors.type === 'cosmic'
                        ? 'bg-slate-900/30 border border-slate-800/80 text-slate-400'
                        : themeColors.type === 'sand'
                          ? 'bg-[#fcfaf7] border border-stone-200/80 text-stone-500'
                          : 'bg-white/80 border border-slate-200/40 text-slate-500'
                  } p-4 rounded-xl text-xs space-y-2 transition-all duration-300 shadow-sm`} id="shortcuts-panel">
                    <p className={`font-semibold ${
                      themeColors.type === 'retro' ? 'text-green-500' : 'text-slate-700'
                    } flex items-center gap-1.5`}>
                      <HelpCircle className={`w-4 h-4 ${themeColors.type === 'retro' ? 'text-green-700' : 'text-slate-400'}`} />
                      Pro Shortcuts & Info:
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Use <strong>Digit Keys [1-9]</strong> to fill values quickly.</li>
                      <li>Use <strong>[Backspace]</strong> or <strong>[Delete]</strong> to erase cell.</li>
                      <li>Press <strong>[N]</strong> or <strong>[P]</strong> on keyboard to toggle draft Pencil marks.</li>
                      <li>Highlighting displays similar numbers and sub-grids to speed up matching.</li>
                    </ul>
                  </div>
                </div>

                {/* Right Visual: Interactive layout sheet */}
                <div className="lg:col-span-7 flex flex-col justify-center items-center gap-5 md:gap-6 order-2">
                  
                  {/* Wrapper featuring relative placement of overlay structures */}
                  <div className="relative w-full max-w-md">
                    
                    {/* Pause sheet overlay */}
                    {isPaused && (
                      <div 
                        className={`absolute inset-2 md:inset-3 rounded-2xl ${
                          themeColors.type === 'retro'
                            ? 'bg-black/95 text-green-500 border-2 border-green-950'
                            : themeColors.type === 'cosmic'
                              ? 'bg-slate-950/90 text-slate-200 border border-slate-800'
                              : 'bg-white/80 text-slate-800 border border-slate-200 shadow-premium'
                        } backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 shadow-premium transition-all duration-300`}
                        id="pause-layer-blur"
                      >
                        <Lock className={`w-12 h-12 ${themeColors.type === 'retro' ? 'text-green-500' : 'text-slate-400'} mb-2 animate-bounce`} />
                        <h3 className={`text-xl font-bold ${themeColors.type === 'retro' ? 'text-green-500' : themeColors.textPrimary}`}>Game Paused</h3>
                        <p className={`text-xs ${themeColors.type === 'retro' ? 'text-green-700' : themeColors.textSecondary} mt-1 mb-5`}>Click below to restore the puzzle board</p>
                        <button
                          onClick={() => setIsPaused(false)}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-fancy text-sm font-semibold transition-transform active:scale-95 cursor-pointer ${themeColors.btnPrimary}`}
                          id="btn-resume-from-layer"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Resume Play</span>
                        </button>
                      </div>
                    )}

                    {/* Confetti or congratulations screen directly on top of board */}
                    {isWon && (
                      <div 
                        className={`absolute inset-2 md:inset-3 rounded-2xl z-30 flex flex-col items-center justify-center p-6 text-center shadow-xl space-y-4 ${
                          themeColors.type === 'retro'
                            ? 'bg-black border-2 border-green-500 text-green-400'
                            : themeColors.type === 'cosmic'
                              ? 'bg-slate-900 border border-slate-800 text-slate-100'
                              : 'bg-white border border-slate-200 text-slate-900'
                        }`}
                        id="victory-achievement-sheet"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className={`p-4 rounded-full ${themeColors.type === 'retro' ? 'bg-green-950 border border-green-500' : 'bg-indigo-500'}`}
                        >
                          <Trophy className={`w-10 h-10 ${themeColors.type === 'retro' ? 'text-green-400' : 'text-amber-300'}`} />
                        </motion.div>
                        <div className="space-y-1">
                          <h2 className={`text-2xl font-space-shaper font-bold tracking-tight ${themeColors.type === 'retro' ? 'text-green-500' : themeColors.textPrimary}`}>Congratulations!</h2>
                          <p className={`text-xs ${themeColors.type === 'retro' ? 'text-green-700' : themeColors.textSecondary}`}>You successfully completed the {difficulty} puzzle</p>
                        </div>

                        {/* Timing achievement badge */}
                        <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
                          themeColors.type === 'retro'
                            ? 'bg-zinc-950 text-green-400 border border-green-850 font-mono-tech'
                            : 'bg-slate-100 text-slate-800 font-mono-tech'
                        }`}>
                          Time solved: {Math.floor(seconds / 60)}m {seconds % 60}s
                        </div>

                        <button
                          onClick={() => startNewGame(difficulty)}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-premium ${themeColors.btnPrimary}`}
                          id="victory-btn-new-game"
                        >
                          <span>Play New Board</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Standard board layout */}
                    <Board
                      cells={cells}
                      selectedCellId={selectedCellId}
                      onSelectCell={(id) => {
                        if (isPaused) return;
                        setSelectedCellId(id);
                      }}
                      conflictingIds={conflictingCellIds}
                      themeColors={themeColors}
                    />
                  </div>

                  {/* Primary control input matrix */}
                  <Keypad
                    onNumberClick={handleCellValueInput}
                    onErase={eraseCurrentCell}
                    onUndo={undoLastMove}
                    onHint={getSmartHint}
                    pencilMode={pencilMode}
                    onTogglePencil={() => setPencilMode((prev) => !prev)}
                    canUndo={history.length > 0}
                    themeColors={themeColors}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* B. PRIVACY POLICY TAB */}
          {activeTab === 'privacy' && (
            <motion.div
              key="privacy-policy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              id="privacy-view-wrap"
            >
              <PrivacyPolicyComponent onClose={() => navigateTo('game')} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Stats dialog popup layer standard */}
      {isStatsOpen && (
        <StatsModal
          stats={stats}
          onClose={() => setIsStatsOpen(false)}
          onResetStats={() => {
            resetAllStats();
            setIsStatsOpen(false);
          }}
        />
      )}

      {/* 4. Footer credits matching style */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 mt-12 transition-all">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-space-shaper font-bold text-sm text-slate-200 block">Sudoku Master</span>
            <p className="text-slate-500 text-[11px]">Play Sudoku directly in your browser. Beautiful interface, unlimited plays, no account required.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 text-[10px] text-slate-500">
            <div className="flex gap-4">
              <button onClick={() => navigateTo('game')} className="hover:text-slate-300">Play Board</button>
              <button onClick={() => navigateTo('privacy')} className="hover:text-slate-300">Privacy Policy</button>
              <a href="https://sudokumaster.vip" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">Website</a>
            </div>
            <span>© 2026 Sudoku Master. Built with absolute UI premium design standards by MedySoft Studio.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
