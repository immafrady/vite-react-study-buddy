import * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useThemeSwitcher } from '@/hooks/use-theme-switcher'
import { InitState, useDatabase } from '@/stores/use-database'

export default function App() {
  // themes
  const { theme, contextValue} = useThemeSwitcher()
  const { initState } = useDatabase() // todo 到时做个更好的loading页
  return (
    <>
      <ColorModeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={initState !== InitState.Initialized}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </>
  );
}
