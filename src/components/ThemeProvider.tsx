
import { createContext, useContext, useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <SunIcon size={18} className={`${theme === 'light' ? 'text-cannabis-green-500' : 'text-gray-400'}`} />
      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <MoonIcon size={18} className={`${theme === 'dark' ? 'text-cannabis-green-500' : 'text-gray-400'}`} />
    </div>
  );
};
