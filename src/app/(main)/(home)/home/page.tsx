import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import { sportField } from "@/mocks/sport-fields";
import CustomTimePicker from "@/components/filter/CustomTimePicker";
import Banner from "./components/Banner/Banner";
import PopularPlaces from "./components/popular/PopularPlaces";
import NearestFields from "./components/nearest/NearestFields";
import SportFieldsByTime from './components/fields-by-time/SportFieldsByTime';
import type { Metadata } from 'next';
import axiosAuth from '@/libs/axios';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Home Page',
  description: 'Zodinet Booking - Home: Find Your Sport Field with Ease',
};
const HomePage = async () => {
  const test = await axiosAuth.get('/location');
  console.log(test);
  const sportFields = Array(12).fill(sportField);
  return (
    <div>
      <Banner />
      <PopularPlaces sportFields={sportFields} />
      <NearestFields sportFields={sportFields} />
      <SportFieldsByTime sportFields={sportFields} />
    </div>
  );
};
export default HomePage;
