/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    effectiveTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(
        () => {
            if (globalThis.window === undefined) return 'auto';
            return localStorage.getItem('theme') as Theme || 'auto';
        }
    );

    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

    const setAndStoreTheme = useCallback((newTheme: Theme) => {
        setTheme(newTheme);

        if (globalThis.window !== undefined) localStorage.setItem('theme', newTheme);
    }, []);

    const valuesMemo = useMemo(() => ({
        theme,
        setTheme: setAndStoreTheme,
        effectiveTheme
    }), [theme, setAndStoreTheme, effectiveTheme]);

    useEffect(() => {
        if (theme === 'auto') {
            const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');

            setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light');

            const handleChange = (e: MediaQueryListEvent) => setEffectiveTheme(e.matches ? 'dark' : 'light');

            mediaQuery.addEventListener('change', handleChange);

            return () => mediaQuery.removeEventListener('change', handleChange);
        }

        setEffectiveTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (globalThis.window === undefined) return;

        if (effectiveTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [effectiveTheme]);

    return (
        <ThemeContext.Provider value={valuesMemo}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
}
