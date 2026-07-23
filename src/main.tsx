import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import { VideoPrefsProvider } from './context/VideoPrefsContext.tsx';
import { SkinProvider } from './context/SkinContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <VideoPrefsProvider>
        <SkinProvider>
          <App />
        </SkinProvider>
      </VideoPrefsProvider>
    </HelmetProvider>
  </StrictMode>,
);
