/**
 * App color-scheme state — the single source of truth for light vs. dark.
 *
 * Defaults to following the OS appearance; once the operator toggles, the
 * explicit choice is persisted (AsyncStorage) and wins over the system on
 * subsequent launches. `useTheme()` reads the resolved scheme from here, so
 * every themed component re-renders on toggle.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export type Scheme = 'light' | 'dark';

const STORAGE_KEY = 'swarmbuild:color-scheme';

type ThemeContextValue = {
  /** The resolved scheme currently in effect. */
  scheme: Scheme;
  /** Flip between light and dark (persists the choice). */
  toggle: () => void;
  /** Set an explicit scheme (persists the choice). */
  setScheme: (scheme: Scheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // 'light' | 'dark' | null (follows the OS)
  const [override, setOverride] = useState<Scheme | null>(null);

  // Hydrate the persisted preference (if any) on mount.
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (mounted && (stored === 'light' || stored === 'dark')) setOverride(stored);
      })
      .catch(() => {
        /* ignore — fall back to the system scheme */
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Explicit choice wins; otherwise follow the OS, defaulting to the brand dark.
  const scheme: Scheme = override ?? (system === 'light' ? 'light' : 'dark');

  function setScheme(next: Scheme) {
    setOverride(next);
    void AsyncStorage.setItem(STORAGE_KEY, next);
  }

  const value: ThemeContextValue = {
    scheme,
    setScheme,
    toggle: () => setScheme(scheme === 'dark' ? 'light' : 'dark'),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const ctx = use(ThemeContext);
  // Fallback keeps useTheme() functioning if a consumer mounts outside the
  // provider (e.g. an isolated test) — defaults to the brand dark canvas.
  if (!ctx) {
    return { scheme: 'dark', toggle: () => {}, setScheme: () => {} };
  }
  return ctx;
}
