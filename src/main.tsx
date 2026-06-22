import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import { VideoPrefsProvider } from './context/VideoPrefsContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <VideoPrefsProvider>
        <App />
      </VideoPrefsProvider>
    </HelmetProvider>
  </StrictMode>,
);
