
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
      {/* Enhanced Global Background Accents - Now Much More Visible */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Primary large blobs with increased visibility */}
        <div className="bg-blob w-[80vw] h-[70vh] bg-gradient-to-r from-cannabis-green-200/90 to-blue-200/75 dark:from-cannabis-green-800/35 dark:to-blue-900/30 blur-3xl -top-[20%] -left-[20%] absolute rounded-full animate-blob"></div>
        <div className="bg-blob w-[90vw] h-[80vh] bg-gradient-to-r from-purple-200/70 to-pink-200/60 dark:from-purple-900/30 dark:to-pink-900/25 blur-3xl top-[40%] -right-[30%] absolute rounded-full animate-blob animation-delay-2000"></div>
        <div className="bg-blob w-[70vw] h-[65vh] bg-gradient-to-r from-amber-200/60 to-orange-200/50 dark:from-amber-900/25 dark:to-orange-900/20 blur-3xl top-[20%] -left-[20%] absolute rounded-full animate-blob animation-delay-4000"></div>
        
        {/* Enhanced medium accent elements */}
        <div className="bg-blob w-[50vw] h-[45vh] bg-gradient-to-br from-cannabis-green-300/70 to-cannabis-green-100/55 dark:from-cannabis-green-700/28 dark:to-cannabis-green-900/22 blur-2xl top-[60%] right-[5%] absolute rounded-full animate-blob animation-delay-6000"></div>
        <div className="bg-blob w-[55vw] h-[50vh] bg-gradient-to-tl from-cannabis-green-400/65 to-teal-200/45 dark:from-cannabis-green-600/25 dark:to-teal-900/20 blur-2xl top-[5%] right-[0%] absolute rounded-full animate-blob animation-delay-8000"></div>
        
        {/* New additional variety elements */}
        <div className="bg-blob w-[35vw] h-[30vh] bg-gradient-to-br from-cannabis-green-500/50 to-emerald-300/40 dark:from-cannabis-green-500/22 dark:to-emerald-700/18 blur-2xl bottom-[20%] left-[60%] absolute rounded-full animate-blob animation-delay-3000"></div>
        <div className="bg-blob w-[40vw] h-[35vh] bg-gradient-to-tr from-green-200/55 to-cannabis-green-200/45 dark:from-green-800/20 dark:to-cannabis-green-800/18 blur-3xl bottom-[40%] right-[40%] absolute rounded-full animate-blob animation-delay-7000"></div>
        
        {/* Enhanced geometric accent shapes - Much More Visible */}
        <div className="absolute top-[15%] left-[75%] w-48 h-48 bg-cannabis-green-300/70 dark:bg-cannabis-green-600/35 rounded-full blur-lg animate-pulse-slow z-[-5]"></div>
        <div className="absolute top-[70%] left-[10%] w-36 h-36 bg-cannabis-green-400/75 dark:bg-cannabis-green-500/40 rounded-full blur-md animate-geometric-float z-[-5]"></div>
        <div className="absolute top-[35%] right-[15%] w-40 h-40 bg-cannabis-green-200/80 dark:bg-cannabis-green-700/45 rounded-full blur-lg animate-pulse-slow animation-delay-3000 z-[-5]"></div>
        <div className="absolute bottom-[25%] left-[40%] w-32 h-32 bg-cannabis-green-500/60 dark:bg-cannabis-green-400/30 rounded-full blur-md animate-geometric-float animation-delay-5000 z-[-5]"></div>
        
        {/* New geometric shapes - Squares and Diamonds */}
        <div className="absolute top-[25%] left-[25%] w-20 h-20 bg-cannabis-green-300/50 dark:bg-cannabis-green-600/25 rounded-lg blur-sm animate-geometric-float animation-delay-2000 rotate-45 z-[-8]"></div>
        <div className="absolute bottom-[35%] right-[20%] w-16 h-16 bg-cannabis-green-400/60 dark:bg-cannabis-green-500/30 rounded-lg blur-sm animate-pulse-slow animation-delay-4000 rotate-12 z-[-8]"></div>
        <div className="absolute top-[60%] left-[65%] w-24 h-24 bg-cannabis-green-200/45 dark:bg-cannabis-green-700/25 rounded-lg blur-sm animate-geometric-float animation-delay-6000 -rotate-30 z-[-8]"></div>
        
        {/* Hexagonal shapes */}
        <div className="absolute top-[45%] right-[35%] w-14 h-14 bg-cannabis-green-500/40 dark:bg-cannabis-green-400/20 blur-sm animate-pulse-slow animation-delay-3000 z-[-8]" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}></div>
        <div className="absolute bottom-[15%] left-[30%] w-18 h-18 bg-cannabis-green-300/50 dark:bg-cannabis-green-600/25 blur-sm animate-geometric-float animation-delay-7000 z-[-8]" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}></div>
        
        {/* New organic shapes for natural feel */}
        <div className="absolute top-[50%] left-[20%] w-28 h-56 bg-cannabis-green-300/40 dark:bg-cannabis-green-600/20 rounded-full blur-lg animate-geometric-float animation-delay-4000 rotate-45 z-[-6]"></div>
        <div className="absolute bottom-[30%] right-[25%] w-24 h-48 bg-cannabis-green-400/45 dark:bg-cannabis-green-500/22 rounded-full blur-md animate-pulse-slow animation-delay-6000 -rotate-12 z-[-6]"></div>
        
        {/* Enhanced subtle line accents - More Visible */}
        <div className="absolute top-[20%] left-[55%] w-1 h-48 bg-gradient-to-b from-transparent via-cannabis-green-300/80 to-transparent dark:via-cannabis-green-600/50 blur-sm animate-geometric-float animation-delay-1000 z-[-7]"></div>
        <div className="absolute top-[80%] right-[35%] w-1 h-40 bg-gradient-to-b from-transparent via-cannabis-green-400/75 to-transparent dark:via-cannabis-green-500/45 blur-sm animate-geometric-float animation-delay-5000 z-[-7]"></div>
        <div className="absolute top-[60%] left-[70%] w-1 h-44 bg-gradient-to-b from-transparent via-cannabis-green-200/70 to-transparent dark:via-cannabis-green-700/40 blur-sm animate-pulse-slow animation-delay-2000 z-[-7]"></div>
        
        {/* Enhanced Cross/Plus medical accents - Much More Visible */}
        <div className="absolute top-[25%] right-[60%] w-8 h-2 bg-cannabis-green-300/60 dark:bg-cannabis-green-600/35 blur-sm animate-pulse-slow z-[-9]"></div>
        <div className="absolute top-[25%] right-[60%] w-2 h-8 bg-cannabis-green-300/60 dark:bg-cannabis-green-600/35 blur-sm animate-pulse-slow z-[-9]"></div>
        <div className="absolute bottom-[35%] left-[65%] w-6 h-1.5 bg-cannabis-green-400/65 dark:bg-cannabis-green-500/35 blur-sm animate-geometric-float animation-delay-4000 z-[-9]"></div>
        <div className="absolute bottom-[35%] left-[65%] w-1.5 h-6 bg-cannabis-green-400/65 dark:bg-cannabis-green-500/35 blur-sm animate-geometric-float animation-delay-4000 z-[-9]"></div>
        
        {/* Additional medical crosses */}
        <div className="absolute top-[55%] right-[10%] w-7 h-1.5 bg-cannabis-green-200/55 dark:bg-cannabis-green-700/30 blur-sm animate-pulse-slow animation-delay-3000 z-[-9]"></div>
        <div className="absolute top-[55%] right-[10%] w-1.5 h-7 bg-cannabis-green-200/55 dark:bg-cannabis-green-700/30 blur-sm animate-pulse-slow animation-delay-3000 z-[-9]"></div>
        <div className="absolute bottom-[50%] left-[15%] w-5 h-1 bg-cannabis-green-500/50 dark:bg-cannabis-green-400/25 blur-sm animate-geometric-float animation-delay-8000 z-[-9]"></div>
        <div className="absolute bottom-[50%] left-[15%] w-1 h-5 bg-cannabis-green-500/50 dark:bg-cannabis-green-400/25 blur-sm animate-geometric-float animation-delay-8000 z-[-9]"></div>
      </div>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
