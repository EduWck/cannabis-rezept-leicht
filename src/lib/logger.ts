export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levelOrder: LogLevel[] = ['debug', 'info', 'warn', 'error'];
const envLevel = (import.meta.env.VITE_LOG_LEVEL || 'info') as LogLevel;

function shouldLog(level: LogLevel): boolean {
  return levelOrder.indexOf(level) >= levelOrder.indexOf(envLevel);
}

export const logger = {
  debug: (...args: unknown[]) => {
    if (shouldLog('debug')) {
      console.log(...args);
    }
  },
  info: (...args: unknown[]) => {
    if (shouldLog('info')) {
      console.info(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (shouldLog('warn')) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (shouldLog('error')) {
      console.error(...args);
    }
  },
};
