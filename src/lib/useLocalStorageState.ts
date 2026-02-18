import { useEffect, useState } from "react";

export function useLocalStorageState<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initialValue;

      const parsed = JSON.parse(raw);

      // ✅ MIGRACIÓN: rellena campos nuevos y evita undefined
      return { ...initialValue, ...(parsed ?? {}) };
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState] as const;
}