export const storage = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (key: string, data: any): void => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  },
  get: <T>(key: string, fallbackData: T): T => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return fallbackData;
  },
};
