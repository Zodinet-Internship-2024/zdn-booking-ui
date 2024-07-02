import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import { sportField } from "@/mocks/sport-fields";
import CustomTimePicker from "@/components/filter/CustomTimePicker";
import Banner from "./components/Banner/Banner";
import PopularPlaces from "./components/popular/PopularPlaces";
import NearestFields from "./components/nearest/NearestFields";
import SportFieldsByTime from './components/fields-by-time/SportFieldsByTime';
import type { Metadata } from 'next';
import axiosInstance from '@/libs/axios';
import { getSportFields } from '@/libs/api/sport-field.api';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Home Page',
  description: 'Zodinet Booking - Home: Find Your Sport Field with Ease',
};
type HomePageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
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