import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import '@styles/index.scss';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme.dark}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
