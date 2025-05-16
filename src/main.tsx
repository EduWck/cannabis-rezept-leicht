
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
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="bg-blob w-[60vw] h-[50vh] bg-gradient-to-r from-cannabis-green-100/40 to-blue-100/40 dark:from-cannabis-green-800/10 dark:to-blue-900/10 blur-3xl -top-[10%] -left-[10%] absolute rounded-full animate-blob"></div>
        <div className="bg-blob w-[70vw] h-[60vh] bg-gradient-to-r from-purple-100/30 to-pink-100/30 dark:from-purple-900/10 dark:to-pink-900/10 blur-3xl top-[60%] -right-[20%] absolute rounded-full animate-blob animation-delay-2000"></div>
        <div className="bg-blob w-[50vw] h-[45vh] bg-gradient-to-r from-amber-100/20 to-orange-100/20 dark:from-amber-900/5 dark:to-orange-900/5 blur-3xl top-[40%] -left-[10%] absolute rounded-full animate-blob animation-delay-4000"></div>
      </div>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
