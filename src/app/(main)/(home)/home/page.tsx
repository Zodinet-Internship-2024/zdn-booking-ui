import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import { sportField } from "@/mocks/sport-fields";
import CustomTimePicker from "@/components/filter/CustomTimePicker";
import Banner from "./components/Banner/Banner";
import PopularPlaces from "./components/popular/PopularPlaces";
import NearestFields from "./components/nearest/NearestFields";
import SportFieldsByTime from './components/fields-by-time/SportFieldsByTime';
import type { Metadata } from 'next';
import axiosAuth from '@/libs/axios';
import { getSportFields } from '@/libs/api/sport-field.api';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Home Page',
  description: 'Zodinet Booking - Home: Find Your Sport Field with Ease',
};

const HomePage = async () => {
  // const test = await axiosAuth.get('/location');
  // console.log(test);
  const sportFields = Array(12).fill(sportField);
  const popularSportFields = await getPopularSportFields();
  return (
    <div>
      <Banner />
      <PopularPlaces sportFields={popularSportFields} />
      <NearestFields sportFields={sportFields} />
      {/* <SportFieldsByTime sportFields={sportFields} /> */}
    </div>
  );
};
export default HomePage;

const getSportFieldData = (sportFieldRes: any) => {
  if (!sportFieldRes) {
    return null;
  }

  const sportFields: SportField[] = sportFieldRes.data;

  if (!sportFields) {
    return null;
  }

  return sportFields;
};

const getPopularSportFields = async () => {
  const sportFieldRes = await getSportFields({ size: 4 });
  return getSportFieldData(sportFieldRes);
};