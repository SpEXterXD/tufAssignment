'use client';

import { isToday as isTodayFn, getDay } from 'date-fns';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface DayCellProps {
  date: Date;
  isOverflow: boolean;
  accentColor: string;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverRange: boolean;
  isHoliday: boolean;
  holidayName?: string;
  onSelect: (date: Date) => void;
  onHover: (date: Date) => void;
}

export function DayCell({
  date,
  isOverflow,
  accentColor,
  isStart,
  isEnd,
  isInRange,
  isHoverRange,
  isHoliday,
  holidayName,
  onSelect,
  onHover,
}: DayCellProps): React.JSX.Element {
  const dayOfWeek = getDay(date);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isToday = isTodayFn(date);

  const handleClick = (): void => {
    if (!isOverflow) {
      onSelect(date);
    }
  };

  const handleMouseEnter = (): void => {
    if (!isOverflow) {
      onHover(date);
    }
  };

  const isAccentBg = isStart || isEnd;
  const dayNumber = date.getDate();

  // Cell background: range tint or hover tint
  const cellBg = isInRange && !isStart && !isEnd
    ? `${accentColor}18`
    : isHoverRange && !isStart && !isEnd
      ? `${accentColor}10`
      : undefined;

  // Cell border-radius for pill shape
  const cellRadius = isStart
    ? '9999px 0 0 9999px'
    : isEnd
      ? '0 9999px 9999px 0'
      : undefined;

  // Number styles
  const numberBg = isAccentBg ? accentColor : undefined;
  const numberColor = isAccentBg
    ? '#ffffff'
    : isWeekend && !isOverflow
      ? accentColor
      : isOverflow
        ? '#9ca3af'
        : '#1f2937';
  const numberRadius = isAccentBg || isToday ? '9999px' : undefined;
  const numberShadow = isToday && !isAccentBg ? `inset 0 0 0 2px ${accentColor}` : undefined;

  return (
    <motion.div
      className={clsx(
        'relative flex items-center justify-center select-none',
        'h-10 sm:h-11 md:h-10',
        'text-sm',
        isOverflow && 'opacity-40 pointer-events-none',
        !isOverflow && 'cursor-pointer',
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{
        touchAction: 'manipulation',
        backgroundColor: cellBg,
        borderRadius: cellRadius,
      }}
      role="button"
      tabIndex={isOverflow ? -1 : 0}
      aria-label={`${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}${isHoliday ? `, ${holidayName}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      whileHover={!isOverflow ? { scale: 1.08 } : undefined}
      whileTap={!isOverflow ? { scale: 0.92 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.span
        className={clsx(
          'relative z-10 flex items-center justify-center text-sm',
          'w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9',
          isToday && !isStart && !isEnd && 'font-bold',
        )}
        style={{
          backgroundColor: numberBg,
          color: numberColor,
          borderRadius: numberRadius,
          boxShadow: numberShadow,
        }}
        animate={{
          scale: isAccentBg ? 1 : 1,
          backgroundColor: numberBg ?? 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.2 }}
      >
        {dayNumber}
      </motion.span>

      {/* Holiday dot */}
      {isHoliday && !isOverflow && (
        <motion.span
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
          title={holidayName}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
        />
      )}
    </motion.div>
  );
}
