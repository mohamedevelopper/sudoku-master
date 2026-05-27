import { ThemeType } from '../types';

export interface ThemeInfo {
  id: ThemeType;
  name: string;
  className: string; // empty for default
  color: string;     // swatch background
}

export const THEMES: ThemeInfo[] = [
  { id: 'classic',  name: 'Purple',   className: '',                color: '#534AB7' },
  { id: 'ocean',    name: 'Ocean',    className: 'theme-ocean',     color: '#185FA5' },
  { id: 'forest',   name: 'Forest',   className: 'theme-forest',    color: '#3B6D11' },
  { id: 'sakura',   name: 'Rose',     className: 'theme-rose',      color: '#993556' },
  { id: 'sand',     name: 'Amber',    className: 'theme-amber',     color: '#854F0B' },
  { id: 'cosmic',   name: 'Dark',     className: 'theme-dark',      color: '#1a1a2e' },
  { id: 'retro',    name: 'Midnight', className: 'theme-midnight',  color: '#030d0a' },
];

export function themeClassName(theme: ThemeType): string {
  return THEMES.find((t) => t.id === theme)?.className ?? '';
}
