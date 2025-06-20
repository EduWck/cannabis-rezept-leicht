
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
      {/* Enhanced Global Background Accents - Now More Visible */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Primary large blobs with increased visibility */}
        <div className="bg-blob w-[80vw] h-[70vh] bg-gradient-to-r from-cannabis-green-200/80 to-blue-200/65 dark:from-cannabis-green-800/25 dark:to-blue-900/20 blur-3xl -top-[20%] -left-[20%] absolute rounded-full animate-blob"></div>
        <div className="bg-blob w-[90vw] h-[80vh] bg-gradient-to-r from-purple-200/60 to-pink-200/50 dark:from-purple-900/20 dark:to-pink-900/15 blur-3xl top-[40%] -right-[30%] absolute rounded-full animate-blob animation-delay-2000"></div>
        <div className="bg-blob w-[70vw] h-[65vh] bg-gradient-to-r from-amber-200/50 to-orange-200/40 dark:from-amber-900/15 dark:to-orange-900/10 blur-3xl top-[20%] -left-[20%] absolute rounded-full animate-blob animation-delay-4000"></div>
        
        {/* Enhanced medium accent elements */}
        <div className="bg-blob w-[50vw] h-[45vh] bg-gradient-to-br from-cannabis-green-300/60 to-cannabis-green-100/45 dark:from-cannabis-green-700/18 dark:to-cannabis-green-900/12 blur-2xl top-[60%] right-[5%] absolute rounded-full animate-blob animation-delay-6000"></div>
        <div className="bg-blob w-[55vw] h-[50vh] bg-gradient-to-tl from-cannabis-green-400/55 to-teal-200/35 dark:from-cannabis-green-600/15 dark:to-teal-900/10 blur-2xl top-[5%] right-[0%] absolute rounded-full animate-blob animation-delay-8000"></div>
        
        {/* New additional variety elements */}
        <div className="bg-blob w-[35vw] h-[30vh] bg-gradient-to-br from-cannabis-green-500/40 to-emerald-300/30 dark:from-cannabis-green-500/12 dark:to-emerald-700/8 blur-2xl bottom-[20%] left-[60%] absolute rounded-full animate-blob animation-delay-3000"></div>
        <div className="bg-blob w-[40vw] h-[35vh] bg-gradient-to-tr from-green-200/45 to-cannabis-green-200/35 dark:from-green-800/10 dark:to-cannabis-green-800/8 blur-3xl bottom-[40%] right-[40%] absolute rounded-full animate-blob animation-delay-7000"></div>
        
        {/* Enhanced geometric accent shapes */}
        <div className="absolute top-[15%] left-[75%] w-40 h-40 bg-cannabis-green-300/35 dark:bg-cannabis-green-600/15 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-[70%] left-[10%] w-32 h-32 bg-cannabis-green-400/40 dark:bg-cannabis-green-500/18 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-[35%] right-[15%] w-36 h-36 bg-cannabis-green-200/45 dark:bg-cannabis-green-700/20 rounded-full blur-xl animate-pulse-slow animation-delay-3000"></div>
        <div className="absolute bottom-[25%] left-[40%] w-28 h-28 bg-cannabis-green-500/30 dark:bg-cannabis-green-400/12 rounded-full blur-lg animate-float animation-delay-5000"></div>
        
        {/* New organic shapes for natural feel */}
        <div className="absolute top-[50%] left-[20%] w-24 h-48 bg-cannabis-green-300/25 dark:bg-cannabis-green-600/10 rounded-full blur-xl animate-float animation-delay-4000 rotate-45"></div>
        <div className="absolute bottom-[30%] right-[25%] w-20 h-40 bg-cannabis-green-400/30 dark:bg-cannabis-green-500/12 rounded-full blur-lg animate-pulse-slow animation-delay-6000 -rotate-12"></div>
        
        {/* Enhanced subtle line accents */}
        <div className="absolute top-[20%] left-[55%] w-0.5 h-40 bg-gradient-to-b from-transparent via-cannabis-green-300/60 to-transparent dark:via-cannabis-green-600/30 blur-sm animate-float animation-delay-1000"></div>
        <div className="absolute top-[80%] right-[35%] w-0.5 h-32 bg-gradient-to-b from-transparent via-cannabis-green-400/55 to-transparent dark:via-cannabis-green-500/25 blur-sm animate-float animation-delay-5000"></div>
        <div className="absolute top-[60%] left-[70%] w-0.5 h-36 bg-gradient-to-b from-transparent via-cannabis-green-200/50 to-transparent dark:via-cannabis-green-700/20 blur-sm animate-pulse-slow animation-delay-2000"></div>
        
        {/* Cross/Plus medical accents */}
        <div className="absolute top-[25%] right-[60%] w-6 h-1 bg-cannabis-green-300/20 dark:bg-cannabis-green-600/8 blur-sm animate-pulse-slow"></div>
        <div className="absolute top-[25%] right-[60%] w-1 h-6 bg-cannabis-green-300/20 dark:bg-cannabis-green-600/8 blur-sm animate-pulse-slow"></div>
        <div className="absolute bottom-[35%] left-[65%] w-4 h-0.5 bg-cannabis-green-400/25 dark:bg-cannabis-green-500/10 blur-sm animate-float animation-delay-4000"></div>
        <div className="absolute bottom-[35%] left-[65%] w-0.5 h-4 bg-cannabis-green-400/25 dark:bg-cannabis-green-500/10 blur-sm animate-float animation-delay-4000"></div>
      </div>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
