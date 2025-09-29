import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NFTProvider } from './blockchain/cropContext.tsx';

// Add MetaMask type declaration


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NFTProvider>
    <App />
    </NFTProvider>
  </StrictMode>
);
