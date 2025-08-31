import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://869f2b57b98cbe1f86a16043a6f3fd51@o267366.ingest.us.sentry.io/4509940389707776',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

ReactGA.initialize('G-1K72061LE9');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
