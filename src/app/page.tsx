import Calendar from '@/components/calendar/Calendar';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Calendar />
      {/* <Pagination /> */}
    </main>
  );
}
