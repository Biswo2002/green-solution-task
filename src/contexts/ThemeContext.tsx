
import React, { createContext } from 'react';
import { useColorScheme } from 'react-native';

// Define context type
interface ThemeContextType {
    isDarkMode: boolean;
}

// Create context
export const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
});

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <ThemeContext.Provider value={{ isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
