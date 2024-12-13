import React, { createContext, FC, ReactNode, useContext } from 'react';

interface Theme {
  backgroundColor: string;
  textColor: string;
  focusColor: string;
}

const defaultTheme: Theme = {
  backgroundColor: '#ffffff',
  textColor: '#333333',
  focusColor: '#00f'
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: FC<{ theme?: Partial<Theme>; children: ReactNode }> = ({ theme, children }) => {
  const mergedTheme = { ...defaultTheme, ...theme };
  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
};

export function useTheme(): Theme {
  return useContext(ThemeContext);
}