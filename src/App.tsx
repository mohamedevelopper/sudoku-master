import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import PlayPage from './pages/PlayPage';
import DailyPage from './pages/DailyPage';
import HowToPlayPage from './pages/HowToPlayPage';
import LeaderboardPage from './pages/LeaderboardPage';
import PrintablePage from './pages/PrintablePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeType } from './types';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/storage';
import { setSfxEnabled, setSfxVolume } from './utils/sounds';
import { trackPageView } from './utils/analytics';

export default function App() {
  const [theme, setTheme] = useState<ThemeType>(() =>
    loadFromStorage<ThemeType>(STORAGE_KEYS.THEME, 'classic')
  );
  const [sfxEnabled, setSfxEnabledState] = useState<boolean>(() =>
    loadFromStorage(STORAGE_KEYS.AUDIO, { sfxEnabled: true, sfxVolume: 1 }).sfxEnabled
  );
  const [sfxVolume, setSfxVolumeState] = useState<number>(() =>
    loadFromStorage(STORAGE_KEYS.AUDIO, { sfxEnabled: true, sfxVolume: 1 }).sfxVolume ?? 1
  );
  const location = useLocation();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.AUDIO, { sfxEnabled, sfxVolume });
    setSfxEnabled(sfxEnabled);
    setSfxVolume(sfxVolume);
  }, [sfxEnabled, sfxVolume]);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const shared = {
    theme,
    onChangeTheme: setTheme,
    sfxEnabled,
    onToggleSfx: () => setSfxEnabledState((v) => !v),
    sfxVolume,
    onChangeSfxVolume: setSfxVolumeState,
  };

  return (
    <Layout {...shared}>
      <Routes>
        <Route path="/" element={<PlayPage {...shared} />} />
        <Route path="/easy-sudoku" element={<PlayPage {...shared} forceDifficulty="easy" />} />
        <Route path="/medium-sudoku" element={<PlayPage {...shared} forceDifficulty="medium" />} />
        <Route path="/hard-sudoku" element={<PlayPage {...shared} forceDifficulty="hard" />} />
        <Route path="/expert-sudoku" element={<PlayPage {...shared} forceDifficulty="expert" />} />
        <Route path="/daily" element={<DailyPage {...shared} />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/printable" element={<PrintablePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
