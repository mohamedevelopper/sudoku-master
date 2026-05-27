import { useState, useEffect, useRef, useCallback } from 'react';
import { Difficulty, GridSize, SudokuCell, HistoryItem, GameStats } from '../types';
import {
  generateSudoku,
  generateDailyPuzzle,
  initializeBoard,
  checkBoardConflicts,
  isCompletedAndCorrect,
  findHintCell,
} from './sudoku';
import { SFX } from './sounds';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage';
import { trackGameStart, trackGameWin, trackGameAction } from './analytics';

const DEFAULT_STATS: GameStats = {
  easy: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  medium: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  hard: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  expert: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  master: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
  extreme: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
};

const MAX_HINTS = 3;
const MAX_MISTAKES = 3;

interface UseSudokuGameOptions {
  initialDifficulty?: Difficulty;
  initialSize?: GridSize;
  daily?: boolean;
  dateStr?: string;
}

export function useSudokuGame(options: UseSudokuGameOptions = {}) {
  const { initialDifficulty = 'medium', initialSize = 9, daily = false, dateStr } = options;

  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [gridSize, setGridSize] = useState<GridSize>(initialSize);
  const [cells, setCells] = useState<SudokuCell[]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = loadFromStorage<GameStats>(STORAGE_KEYS.STATS, DEFAULT_STATS);
    setStats({ ...DEFAULT_STATS, ...saved });
  }, []);

  useEffect(() => {
    if (isStarted && !isPaused && !isWon && !isGameOver) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isPaused, isWon, isGameOver]);

  const startNewGame = useCallback(
    (level?: Difficulty, size?: GridSize) => {
      const d = level ?? difficulty;
      const s = size ?? gridSize;

      let puzzle: number[][], sol: number[][];
      if (daily && dateStr) {
        ({ puzzle, solution: sol } = generateDailyPuzzle(dateStr, s, d));
      } else {
        ({ puzzle, solution: sol } = generateSudoku(d, s));
      }

      const initial = initializeBoard(puzzle, s);
      setDifficulty(d);
      setGridSize(s);
      setCells(initial);
      setSolution(sol);
      setSelectedCellId(null);
      setSeconds(0);
      setIsPaused(false);
      setIsWon(false);
      setIsGameOver(false);
      setHistory([]);
      setHintsUsed(0);
      setMistakes(0);
      setIsStarted(true);

      setStats((prev) => {
        const next = {
          ...prev,
          [d]: { ...prev[d], gamesPlayed: prev[d].gamesPlayed + 1 },
        };
        saveToStorage(STORAGE_KEYS.STATS, next);
        return next;
      });

      trackGameStart(d, s);
      SFX.newGame();
    },
    [difficulty, gridSize, daily, dateStr]
  );

  const recordHistory = useCallback(() => {
    const backup = cells.map((c) => ({ ...c, candidates: [...c.candidates] }));
    setHistory((prev) => [...prev, { cells: backup, description: '' }]);
  }, [cells]);

  const handleWin = useCallback(
    (finalCells: SudokuCell[]) => {
      if (isCompletedAndCorrect(finalCells, solution)) {
        setIsWon(true);
        SFX.win();
        setStats((prev) => {
          const cur = prev[difficulty];
          const isNewRecord = cur.bestTime === null || seconds < cur.bestTime;
          const next = {
            ...prev,
            [difficulty]: {
              ...cur,
              gamesWon: cur.gamesWon + 1,
              bestTime: isNewRecord ? seconds : cur.bestTime,
            },
          };
          saveToStorage(STORAGE_KEYS.STATS, next);
          return next;
        });
        trackGameWin(difficulty, gridSize, seconds);
        return true;
      }
      return false;
    },
    [solution, seconds, difficulty, gridSize]
  );

  const handleCellInput = useCallback(
    (num: number) => {
      if (!selectedCellId || isWon || isPaused || isGameOver) return;
      const idx = cells.findIndex((c) => c.id === selectedCellId);
      if (idx === -1) return;
      const cell = cells[idx];
      if (cell.given) return;

      recordHistory();
      const updated = [...cells];
      const newVal = cell.value === num ? 0 : num;
      const isWrong = newVal !== 0 && newVal !== solution[cell.row][cell.col];
      updated[idx] = { ...cell, value: newVal, candidates: [], hinted: false };

      if (isWrong) {
        setMistakes((m) => {
          const nm = m + 1;
          if (nm >= MAX_MISTAKES) {
            setIsGameOver(true);
            trackGameAction('game_over', { difficulty, grid_size: gridSize });
          }
          return nm;
        });
        SFX.numberWrong();
      } else if (newVal !== 0) {
        SFX.numberPlace();
      } else {
        SFX.erase();
      }

      const errors = checkBoardConflicts(updated, gridSize);
      const finalized = updated.map((c) => ({ ...c, error: errors.has(c.id) }));
      setCells(finalized);
      handleWin(finalized);
    },
    [selectedCellId, isWon, isPaused, isGameOver, cells, recordHistory, gridSize, solution, handleWin, difficulty]
  );

  const togglePencilCandidate = useCallback(
    (num: number) => {
      if (!selectedCellId || isWon || isPaused) return;
      const idx = cells.findIndex((c) => c.id === selectedCellId);
      if (idx === -1) return;
      const cell = cells[idx];
      if (cell.given || cell.value !== 0) return;
      recordHistory();
      const updated = [...cells];
      let next = [...cell.candidates];
      if (next.includes(num)) next = next.filter((x) => x !== num);
      else next.push(num);
      updated[idx] = { ...cell, candidates: next, error: false };
      setCells(updated);
      SFX.numberPlace();
    },
    [selectedCellId, isWon, isPaused, cells, recordHistory]
  );

  const eraseCurrentCell = useCallback(() => {
    if (!selectedCellId || isWon || isPaused) return;
    const idx = cells.findIndex((c) => c.id === selectedCellId);
    if (idx === -1) return;
    const cell = cells[idx];
    if (cell.given) return;
    recordHistory();
    const updated = [...cells];
    updated[idx] = { ...cell, value: 0, candidates: [], error: false, hinted: false };
    const errors = checkBoardConflicts(updated, gridSize);
    setCells(updated.map((c) => ({ ...c, error: errors.has(c.id) })));
    SFX.erase();
  }, [selectedCellId, isWon, isPaused, cells, gridSize, recordHistory]);

  const getSmartHint = useCallback(() => {
    if (hintsUsed >= MAX_HINTS || isWon || isPaused) return;
    const hint = findHintCell(cells, solution);
    if (!hint) return;
    recordHistory();
    const updated = [...cells];
    updated[hint.index] = {
      ...updated[hint.index],
      value: hint.value,
      candidates: [],
      error: false,
      hinted: true,
    };
    const errors = checkBoardConflicts(updated, gridSize);
    const finalized = updated.map((c) => ({ ...c, error: errors.has(c.id) }));
    setCells(finalized);
    setSelectedCellId(finalized[hint.index].id);
    setHintsUsed((h) => h + 1);
    SFX.hint();
    handleWin(finalized);
    trackGameAction('hint_used', { difficulty, grid_size: gridSize });
  }, [hintsUsed, isWon, isPaused, cells, solution, recordHistory, gridSize, handleWin, difficulty]);

  const undoLastMove = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setCells(previous.cells);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  const resetAllStats = useCallback(() => {
    saveToStorage(STORAGE_KEYS.STATS, DEFAULT_STATS);
    setStats(DEFAULT_STATS);
  }, []);

  const conflictingIds = new Set<string>(cells.filter((c) => c.error).map((c) => c.id));

  return {
    difficulty, setDifficulty,
    gridSize, setGridSize,
    cells, solution,
    selectedCellId, setSelectedCellId,
    seconds, isPaused, setIsPaused,
    isWon, isGameOver, isStarted,
    stats,
    hintsUsed, hintsRemaining: MAX_HINTS - hintsUsed, maxHints: MAX_HINTS,
    mistakes, maxMistakes: MAX_MISTAKES,
    history, conflictingIds,
    startNewGame, handleCellInput, togglePencilCandidate,
    eraseCurrentCell, getSmartHint, undoLastMove, resetAllStats,
  };
}
