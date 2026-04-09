'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { HeroImage } from './CalendarHeader/HeroImage';
import { ChevronDivider } from './CalendarDivider/ChevronDivider';
import { CalendarGrid } from './CalendarGrid/CalendarGrid';
import { NotesPanel } from './NotesPanel/NotesPanel';
import { useCalendar } from './hooks/useCalendar';
import { useDateRange } from './hooks/useDateRange';
import { getHolidayMap } from './holidays';
import styles from './WallCalendar.module.css';

export interface WallCalendarProps {
  /** Initial month to display (default: current month) */
  initialDate?: Date;
  /** Override hero image URL */
  heroSrc?: string;
  /** Accent colour hex (default: '#1A7CC4') */
  accentColor?: string;
  /** Callback fired when range is committed */
  onRangeChange?: (start: Date, end: Date) => void;
  /** Callback fired when notes change */
  onNotesChange?: (notes: string, year: number, month: number) => void;
  /** Clear selection when navigating months (default: false) */
  clearRangeOnMonthChange?: boolean;
  /** Locale string (default: 'en-US') */
  locale?: string;
}

export function WallCalendar({
  initialDate,
  heroSrc,
  accentColor = '#1A7CC4',
  onRangeChange,
  onNotesChange,
  clearRangeOnMonthChange = false,
  locale = 'en-US',
}: WallCalendarProps): React.JSX.Element {
  const {
    viewYear,
    viewMonth,
    days,
    goNextMonth,
    goPrevMonth,
  } = useCalendar(initialDate);

  const {
    start,
    end,
    selectDate,
    hoverDate,
    clearRange,
    isStart,
    isEnd,
    isInRange,
    isHoverRange,
  } = useDateRange();

  // Track direction for slide animation
  const [direction, setDirection] = useState<number>(0);
  const monthKey = `${viewYear}-${viewMonth}`;

  // Holidays for current view year
  const holidays = useMemo(() => getHolidayMap(viewYear), [viewYear]);

  // Fire range change callback
  useEffect(() => {
    if (start && end && onRangeChange) {
      onRangeChange(start, end);
    }
  }, [start, end, onRangeChange]);

  const handlePrevMonth = useCallback((): void => {
    setDirection(-1);
    goPrevMonth();
    if (clearRangeOnMonthChange) {
      clearRange();
    }
  }, [goPrevMonth, clearRangeOnMonthChange, clearRange]);

  const handleNextMonth = useCallback((): void => {
    setDirection(1);
    goNextMonth();
    if (clearRangeOnMonthChange) {
      clearRange();
    }
  }, [goNextMonth, clearRangeOnMonthChange, clearRange]);

  // Keyboard: Escape clears range
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        clearRange();
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [clearRange]);

  // Framer Motion: page-flip variant for month transition
  const gridVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.97,
    }),
  };

  return (
    <motion.div
      className={styles.flipContainer}
      style={{ '--cal-accent': accentColor } as React.CSSProperties}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.calendarCard}>
        {/* Wire Binding */}
        <CalendarHeader accentColor={accentColor} />

        {/* Hero Image */}
        <HeroImage
          src={heroSrc}
          alt={`Calendar hero image for ${new Date(viewYear, viewMonth).toLocaleDateString(locale, { month: 'long', year: 'numeric' })}`}
        />

        {/* Chevron Divider with Month/Year label and navigation */}
        <ChevronDivider
          year={viewYear}
          month={viewMonth}
          accentColor={accentColor}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Content area: Notes + Grid */}
        <div className={styles.contentArea}>
          {/* Notes Panel */}
          <NotesPanel
            year={viewYear}
            month={viewMonth}
            accentColor={accentColor}
            onNotesChange={onNotesChange}
          />

          {/* Calendar Grid — animated on month change */}
          <div className={styles.gridArea}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={gridVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <CalendarGrid
                  days={days}
                  viewYear={viewYear}
                  viewMonth={viewMonth}
                  accentColor={accentColor}
                  holidays={holidays}
                  isStart={isStart}
                  isEnd={isEnd}
                  isInRange={isInRange}
                  isHoverRange={isHoverRange}
                  onSelect={selectDate}
                  onHover={hoverDate}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Status bar showing selected range */}
        <AnimatePresence>
          {start && (
            <motion.div
              className={styles.statusBar}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>
                {start.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                {end && (
                  <>
                    {' → '}
                    {end.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                  </>
                )}
                {!end && ' — select end date'}
              </span>
              <motion.button
                onClick={clearRange}
                className="text-xs px-3 py-1 rounded-md font-medium"
                style={{ color: accentColor, backgroundColor: `${accentColor}10` }}
                aria-label="Clear date range"
                whileHover={{ scale: 1.05, backgroundColor: `${accentColor}20` }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom padding */}
        <div className="h-2 md:h-3" />
      </div>
    </motion.div>
  );
}
