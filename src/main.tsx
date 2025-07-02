
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
