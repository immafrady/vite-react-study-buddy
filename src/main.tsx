import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/index.scss';
import { MyAppDatabase } from '@/db';
import { fetchData } from '@/db/init';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

new MyAppDatabase()
fetchData()
