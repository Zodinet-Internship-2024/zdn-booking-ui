import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import { sportField } from "@/mocks/sport-fields";
import CustomTimePicker from "@/components/filter/CustomTimePicker";
import Banner from "./components/Banner/Banner";
import PopularPlaces from "./components/popular/PopularPlaces";
import NearestFields from "./components/nearest/NearestFields";
import SportFieldsByTime from "./components/fileds-by-time/SportFieldsbyTime";

const HomePage = () => {
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
