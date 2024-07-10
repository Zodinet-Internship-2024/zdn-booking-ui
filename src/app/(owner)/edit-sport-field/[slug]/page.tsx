import { getLocation } from '../../apis/create-sport-field.api';
import { getSportField, getSportFieldTypes } from '../../apis/sport-field.api';
import SportFieldForm from '../../create-sport-field/components/SportFieldForm';

async function EditSportField({ params }: { params: { slug: string } }) {
  const { provinces, districts, wards } = await getLocation();

  const { sportField } = await getSportField(params.slug);

  const { sportFieldTypes } = await getSportFieldTypes();

  return (
    <div className="item-center flex h-full w-full flex-col justify-center">
      <SportFieldForm
        provinces={provinces}
        wards={wards}
        districts={districts}
        sportFieldTypes={sportFieldTypes}
        defaultValues={sportField}
        label="edit"
      />
    </div>
  );
}

export default EditSportField;
