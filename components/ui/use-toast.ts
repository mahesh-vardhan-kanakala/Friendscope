'use client';

import { useState, useCallback, useEffect } from 'react';

interface Toast {
  title: string;
  description?: string;
}

// A global placeholder for the toast function
let globalToastFn: (toast: Toast) => void = () => {};

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback(({ title, description }: Toast) => {
    setToast({ title, description });
    setTimeout(() => setToast(null), 3000); // Clear the toast after 3 seconds
  }, []);

  useEffect(() => {
    globalToastFn = showToast; // Assign the local showToast to the global variable
  }, [showToast]);

  return { toast }; // Provide the current toast state to components using this hook
}

// A globally available toast function
export const toast = (toast: Toast) => {
  globalToastFn(toast);
};
