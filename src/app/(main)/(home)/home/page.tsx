import type { Metadata } from 'next';
import Banner from './components/Banner/Banner';
import NearestFields from './components/nearest/NearestFields';
import PopularPlaces from './components/popular/PopularPlaces';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Home Page',
  description: 'Zodinet Booking - Home: Find Your Sport Field with Ease',
};
const HomePage = async () => {
  return (
    <div>
      <Banner />
      <PopularPlaces />
      <NearestFields />
      {/* <SportFieldsByTime sportFields={sportFields} /> */}
    </div>
  );
};
export default HomePage;
