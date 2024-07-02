import { sportField } from "@/mocks/sport-fields";
import NearestCard from "./NearestCard";
import NearestImage from "./NearestImage";
import { getSportFields } from '@/libs/api/sport-field.api';

type NearestFieldsProps = {
  sportFields: SportField[];
};
const NearestFields = async () => {
  const res = await getSportFields({ page: 0, size: 7 });
  const sportFields: SportField[] = res.data;

  return (
    <div className="bg-primary-100 px-8">
      <div className="container mx-auto grid grid-cols-1 place-content-center justify-center gap-4 py-16 md:grid-cols-4">
        <NearestCard />
        {sportFields?.map((sportField) => (
          <NearestImage key={sportField.id} sportField={sportField} />
        ))}
      </div>
    </div>
  );
};
export default NearestFields;
