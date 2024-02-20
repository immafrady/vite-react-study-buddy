import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useThemeSwitcher } from '@/hooks/use-theme-switcher';

export default function App() {
  // themes
  const { theme, contextValue} = useThemeSwitcher()
  return (
    <>
      <ColorModeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}/>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </>
  );
}
