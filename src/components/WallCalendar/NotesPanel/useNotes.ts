'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseNotesReturn {
  notes: string;
  setNotes: (value: string) => void;
}

function getStorageKey(year: number, month: number): string {
  return `cal-notes-${year}-${month}`;
}

export function useNotes(year: number, month: number): UseNotesReturn {
  const [notes, setNotesState] = useState<string>('');

  // Load notes from localStorage on mount and when month changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(getStorageKey(year, month));
      setNotesState(stored ?? '');
    }
  }, [year, month]);

  // Save notes to localStorage on change
  const setNotes = useCallback(
    (value: string): void => {
      setNotesState(value);
      if (typeof window !== 'undefined') {
        localStorage.setItem(getStorageKey(year, month), value);
      }
    },
    [year, month]
  );

  return { notes, setNotes };
}
