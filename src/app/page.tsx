import { WallCalendar } from '@/components/WallCalendar';

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[640px]">
        <WallCalendar
          accentColor="#1A7CC4"
          clearRangeOnMonthChange={false}
        />
      </div>
    </main>
  );
}
