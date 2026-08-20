import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GamePlaqueShowcase } from './GamePlaqueShowcase';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GamePlaqueShowcase />
  </StrictMode>,
);
