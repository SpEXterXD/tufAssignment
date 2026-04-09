'use client';

import { useState, useCallback } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addDays,
} from 'date-fns';

interface CalendarState {
  viewYear: number;
  viewMonth: number; // 0-indexed
}

interface UseCalendarReturn {
  viewYear: number;
  viewMonth: number;
  days: Date[];
  goNextMonth: () => void;
  goPrevMonth: () => void;
  goToMonth: (year: number, month: number) => void;
}

export function useCalendar(initialDate?: Date): UseCalendarReturn {
  const now = initialDate ?? new Date();
  const [state, setState] = useState<CalendarState>({
    viewYear: now.getFullYear(),
    viewMonth: now.getMonth(),
  });

  const days = generateDays(state.viewYear, state.viewMonth);

  const goNextMonth = useCallback((): void => {
    setState((prev) => {
      const next = addMonths(new Date(prev.viewYear, prev.viewMonth, 1), 1);
      return { viewYear: next.getFullYear(), viewMonth: next.getMonth() };
    });
  }, []);

  const goPrevMonth = useCallback((): void => {
    setState((prev) => {
      const next = subMonths(new Date(prev.viewYear, prev.viewMonth, 1), 1);
      return { viewYear: next.getFullYear(), viewMonth: next.getMonth() };
    });
  }, []);

  const goToMonth = useCallback((year: number, month: number): void => {
    setState({ viewYear: year, viewMonth: month });
  }, []);

  return {
    viewYear: state.viewYear,
    viewMonth: state.viewMonth,
    days,
    goNextMonth,
    goPrevMonth,
    goToMonth,
  };
}

function generateDays(year: number, month: number): Date[] {
  const monthStart = startOfMonth(new Date(year, month, 1));
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Always ensure 6 rows (42 days) for consistent grid height
  const TARGET_CELLS = 42;
  const remaining = TARGET_CELLS - days.length;
  if (remaining > 0) {
    const lastDay = days[days.length - 1];
    for (let i = 1; i <= remaining; i++) {
      days.push(addDays(lastDay, i));
    }
  }

  return days;
}
