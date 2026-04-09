'use client';

interface WeekdayHeaderProps {
  accentColor: string;
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export function WeekdayHeader({ accentColor }: WeekdayHeaderProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-7 mb-1">
      {WEEKDAYS.map((day) => {
        const isWeekend = day === 'SAT' || day === 'SUN';
        return (
          <div
            key={day}
            className="text-center text-xs font-semibold tracking-wider py-2"
            style={{ color: isWeekend ? accentColor : '#6b7280' }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
