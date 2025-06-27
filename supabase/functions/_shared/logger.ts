export const logger = {
  debug: (...args: unknown[]) => {
    if (Deno.env.get('DEBUG_LOGS') === 'true') {
      console.log(...args);
    }
  },
};
