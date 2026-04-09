'use client';

import { isSameMonth } from 'date-fns';
import { WeekdayHeader } from './WeekdayHeader';
import { DayCell } from './DayCell';

interface HolidayMap {
  [key: string]: string;
}

interface CalendarGridProps {
  days: Date[];
  viewYear: number;
  viewMonth: number;
  accentColor: string;
  holidays: HolidayMap;
  isStart: (date: Date) => boolean;
  isEnd: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isHoverRange: (date: Date) => boolean;
  onSelect: (date: Date) => void;
  onHover: (date: Date) => void;
}

export function CalendarGrid({
  days,
  viewYear,
  viewMonth,
  accentColor,
  holidays,
  isStart,
  isEnd,
  isInRange,
  isHoverRange,
  onSelect,
  onHover,
}: CalendarGridProps): React.JSX.Element {
  const currentMonth = new Date(viewYear, viewMonth, 1);

  return (
    <div>
      <WeekdayHeader accentColor={accentColor} />
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day) => {
          const isOverflow = !isSameMonth(day, currentMonth);
          const dateKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
          const holidayName = holidays[dateKey];

          return (
            <DayCell
              key={day.toISOString()}
              date={day}
              isOverflow={isOverflow}
              accentColor={accentColor}
              isStart={isStart(day)}
              isEnd={isEnd(day)}
              isInRange={isInRange(day)}
              isHoverRange={isHoverRange(day)}
              isHoliday={!!holidayName}
              holidayName={holidayName}
              onSelect={onSelect}
              onHover={onHover}
            />
          );
        })}
      </div>
    </div>
  );
}
