
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
      {/* Enhanced Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Primary large blobs with increased visibility */}
        <div className="bg-blob w-[70vw] h-[60vh] bg-gradient-to-r from-cannabis-green-200/60 to-blue-200/50 dark:from-cannabis-green-800/15 dark:to-blue-900/12 blur-3xl -top-[15%] -left-[15%] absolute rounded-full animate-blob"></div>
        <div className="bg-blob w-[80vw] h-[70vh] bg-gradient-to-r from-purple-200/45 to-pink-200/40 dark:from-purple-900/12 dark:to-pink-900/10 blur-3xl top-[50%] -right-[25%] absolute rounded-full animate-blob animation-delay-2000"></div>
        <div className="bg-blob w-[60vw] h-[55vh] bg-gradient-to-r from-amber-200/35 to-orange-200/30 dark:from-amber-900/8 dark:to-orange-900/6 blur-3xl top-[30%] -left-[15%] absolute rounded-full animate-blob animation-delay-4000"></div>
        
        {/* Additional smaller accent elements */}
        <div className="bg-blob w-[40vw] h-[35vh] bg-gradient-to-br from-cannabis-green-300/40 to-cannabis-green-100/30 dark:from-cannabis-green-700/10 dark:to-cannabis-green-900/8 blur-2xl top-[70%] right-[10%] absolute rounded-full animate-blob animation-delay-6000"></div>
        <div className="bg-blob w-[45vw] h-[40vh] bg-gradient-to-tl from-cannabis-green-400/35 to-teal-200/25 dark:from-cannabis-green-600/8 dark:to-teal-900/6 blur-2xl top-[10%] right-[5%] absolute rounded-full animate-blob animation-delay-8000"></div>
        
        {/* Geometric accent shapes */}
        <div className="absolute top-[20%] left-[70%] w-32 h-32 bg-cannabis-green-300/20 dark:bg-cannabis-green-600/8 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-[60%] left-[15%] w-24 h-24 bg-cannabis-green-400/25 dark:bg-cannabis-green-500/10 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-[40%] right-[20%] w-28 h-28 bg-cannabis-green-200/30 dark:bg-cannabis-green-700/12 rounded-full blur-xl animate-pulse-slow animation-delay-3000"></div>
        
        {/* Subtle line accents */}
        <div className="absolute top-[25%] left-[50%] w-0.5 h-32 bg-gradient-to-b from-transparent via-cannabis-green-300/40 to-transparent dark:via-cannabis-green-600/20 blur-sm animate-float animation-delay-1000"></div>
        <div className="absolute top-[75%] right-[30%] w-0.5 h-24 bg-gradient-to-b from-transparent via-cannabis-green-400/35 to-transparent dark:via-cannabis-green-500/15 blur-sm animate-float animation-delay-5000"></div>
      </div>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
