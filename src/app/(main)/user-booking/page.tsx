import BookingPage from './components/BookingPage';
import BookingStatusFilter from './components/BookingStatusFilter';

function Page() {
  return (
    <section className="flex h-full w-full flex-grow bg-primary-100">
      <div className="mx-auto flex w-[90%] flex-col gap-4 rounded-large-sm bg-neutral p-8 lg:w-[80%] lg:gap-8 xl:w-[70%] xl:p-10 2xl:w-[60%]">
        <div className="flex flex-col gap-3 lg:gap-5">
          <h4 className="font-bold text-natural-700">Danh sách đặt chỗ</h4>
          <BookingStatusFilter />
        </div>
        <BookingPage />
      </div>
    </section>
  );
}

export default Page;
