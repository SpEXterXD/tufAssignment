'use client';

import { useReducer, useCallback } from 'react';
import { isBefore, isAfter, isSameDay, isWithinInterval } from 'date-fns';

interface DateRangeState {
  start: Date | null;
  end: Date | null;
  hovering: Date | null;
}

type DateRangeAction =
  | { type: 'SELECT'; date: Date }
  | { type: 'HOVER'; date: Date }
  | { type: 'CLEAR' };

function dateRangeReducer(state: DateRangeState, action: DateRangeAction): DateRangeState {
  switch (action.type) {
    case 'SELECT': {
      // If nothing selected, set start
      if (!state.start) {
        return { start: action.date, end: null, hovering: null };
      }
      // If start is set but no end, set end (swap if needed)
      if (state.start && !state.end) {
        if (isBefore(action.date, state.start)) {
          return { start: action.date, end: state.start, hovering: null };
        }
        if (isSameDay(action.date, state.start)) {
          return { start: null, end: null, hovering: null };
        }
        return { start: state.start, end: action.date, hovering: null };
      }
      // If both set, reset and start new range
      return { start: action.date, end: null, hovering: null };
    }
    case 'HOVER':
      return { ...state, hovering: action.date };
    case 'CLEAR':
      return { start: null, end: null, hovering: null };
    default:
      return state;
  }
}

interface UseDateRangeReturn {
  start: Date | null;
  end: Date | null;
  hovering: Date | null;
  selectDate: (date: Date) => void;
  hoverDate: (date: Date) => void;
  clearRange: () => void;
  isStart: (date: Date) => boolean;
  isEnd: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isHoverRange: (date: Date) => boolean;
}

export function useDateRange(): UseDateRangeReturn {
  const [state, dispatch] = useReducer(dateRangeReducer, {
    start: null,
    end: null,
    hovering: null,
  });

  const selectDate = useCallback((date: Date): void => {
    dispatch({ type: 'SELECT', date });
  }, []);

  const hoverDate = useCallback((date: Date): void => {
    dispatch({ type: 'HOVER', date });
  }, []);

  const clearRange = useCallback((): void => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const isStart = useCallback(
    (date: Date): boolean => {
      return state.start !== null && isSameDay(date, state.start);
    },
    [state.start]
  );

  const isEnd = useCallback(
    (date: Date): boolean => {
      return state.end !== null && isSameDay(date, state.end);
    },
    [state.end]
  );

  const isInRange = useCallback(
    (date: Date): boolean => {
      if (!state.start || !state.end) return false;
      return isWithinInterval(date, { start: state.start, end: state.end });
    },
    [state.start, state.end]
  );

  const isHoverRange = useCallback(
    (date: Date): boolean => {
      if (!state.start || state.end || !state.hovering) return false;
      const hoverStart = isBefore(state.hovering, state.start) ? state.hovering : state.start;
      const hoverEnd = isAfter(state.hovering, state.start) ? state.hovering : state.start;
      if (isSameDay(hoverStart, hoverEnd)) return false;
      return isWithinInterval(date, { start: hoverStart, end: hoverEnd });
    },
    [state.start, state.end, state.hovering]
  );

  return {
    start: state.start,
    end: state.end,
    hovering: state.hovering,
    selectDate,
    hoverDate,
    clearRange,
    isStart,
    isEnd,
    isInRange,
    isHoverRange,
  };
}
