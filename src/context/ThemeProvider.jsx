import {createContext, useContext, useEffect, useState} from 'react';

// This function now checks if we're on the client before accessing window
function getInitialColorMode() {
    if (typeof window !== 'undefined') {
        const persistedColorPreference = window.localStorage.getItem('theme'); // Ensure key consistency
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        if (hasPersistedPreference) {
            return persistedColorPreference;
        }
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
            return mql.matches ? 'dark' : 'light';
        }
    }
    return 'light'; // Default theme if not on client or no preference found
}

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(getInitialColorMode); // Set default theme to 'light'

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // Si aucune préférence n'est stockée, déterminez le thème basé sur les préférences système.
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            const systemPreference = mql.matches ? 'dark' : 'light';
            setTheme(systemPreference);
        }
    }, []);


    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setTheme(mediaQuery.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        window.localStorage.setItem('theme', theme); // Use 'theme' key for localStorage
    }, [theme]);

    const toggleTheme = () => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div id="app" className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
