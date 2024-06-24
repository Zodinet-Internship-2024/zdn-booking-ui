import { getLocation } from '../apis/create-sport-field.api';
import { getSportFieldTypes } from '../apis/sport-field.api';
import FormCreateSportField from './components/SportFieldForm';

const OwnerCreateSportFieldPage = async () => {
  const { provinces, districts, wards } = await getLocation();
  const { sportFieldTypes } = await getSportFieldTypes();

  return (
    <div className="item-center flex h-full w-full flex-col justify-center">
      <FormCreateSportField
        provinces={provinces}
        wards={wards}
        districts={districts}
        sportFieldTypes={sportFieldTypes}
      />
    </div>
  );
};

export default OwnerCreateSportFieldPage;
