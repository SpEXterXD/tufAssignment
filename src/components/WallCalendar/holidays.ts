/**
 * Static US Public Holidays map
 * Key format: "YYYY-MM-DD"
 * Value: Holiday name
 */

export interface HolidayEntry {
  date: string;
  name: string;
}

// Generate holidays for a given year
function getHolidaysForYear(year: number): HolidayEntry[] {
  return [
    { date: `${year}-01-01`, name: "New Year's Day" },
    { date: `${year}-01-15`, name: 'Martin Luther King Jr. Day' },
    { date: `${year}-02-14`, name: "Valentine's Day" },
    { date: `${year}-02-19`, name: "Presidents' Day" },
    { date: `${year}-03-17`, name: "St. Patrick's Day" },
    { date: `${year}-05-27`, name: 'Memorial Day' },
    { date: `${year}-06-19`, name: 'Juneteenth' },
    { date: `${year}-07-04`, name: 'Independence Day' },
    { date: `${year}-09-02`, name: 'Labor Day' },
    { date: `${year}-10-14`, name: 'Columbus Day' },
    { date: `${year}-10-31`, name: 'Halloween' },
    { date: `${year}-11-11`, name: "Veterans Day" },
    { date: `${year}-11-28`, name: 'Thanksgiving Day' },
    { date: `${year}-12-25`, name: 'Christmas Day' },
    { date: `${year}-12-31`, name: "New Year's Eve" },
  ];
}

export function getHolidayMap(year: number): Record<string, string> {
  const holidays = getHolidaysForYear(year);
  const map: Record<string, string> = {};
  for (const h of holidays) {
    map[h.date] = h.name;
  }
  return map;
}
