'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface ChevronDividerProps {
  year: number;
  month: number;
  accentColor: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function ChevronDivider({
  year,
  month,
  accentColor,
  onPrevMonth,
  onNextMonth,
}: ChevronDividerProps): React.JSX.Element {
  const monthName = format(new Date(year, month, 1), 'MMMM').toUpperCase();

  return (
    <div className="relative w-full" style={{ marginTop: '-2px' }}>
      {/* SVG Chevron Shape */}
      <svg
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
        className="block w-full h-14 sm:h-16 md:h-20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="chevronGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
            <stop offset="40%" stopColor={accentColor} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Background light chevron shape */}
        <polygon
          points="0,0 320,0 380,80 0,80"
          fill={`${accentColor}10`}
        />

        {/* Main accent chevron shape */}
        <polygon
          points="250,0 600,0 600,80 310,80"
          fill={accentColor}
        />

        {/* Lighter overlay triangle for depth effect */}
        <polygon
          points="280,0 350,80 310,80 240,0"
          fill="rgba(255,255,255,0.15)"
        />
      </svg>

      {/* Navigation overlay — right-aligned on the blue chevron area */}
      <div className="absolute inset-0 flex items-center justify-end pr-3 sm:pr-4 md:pr-8 pointer-events-none">
        <div className="flex items-center pointer-events-auto">
          {/* Previous month button */}
          <motion.button
            key={`prev-${year}-${month}`}
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="p-1.5 sm:p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
          </motion.button>

          {/* Month/Year label — fixed width, centered text, AnimatePresence for transitions */}
          <div className="w-[110px] sm:w-[130px] md:w-[140px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${year}-${month}`}
                className="text-center select-none"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="text-white/80 text-[10px] sm:text-xs font-medium tracking-widest leading-tight">
                  {year}
                </div>
                <div className="text-white text-base sm:text-lg md:text-xl font-bold tracking-wider leading-tight">
                  {monthName}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next month button */}
          <motion.button
            key={`next-${year}-${month}`}
            onClick={onNextMonth}
            aria-label="Next month"
            className="p-1.5 sm:p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ChevronRight size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
