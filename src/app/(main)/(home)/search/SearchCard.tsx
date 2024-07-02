import SportFieldSwiper from '@/components/common/SportFieldSwiper';
import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';

type SearchCardProps = {
  sportField: SportField;
};

const SearchCard = ({ sportField }: SearchCardProps) => {
  const imageUrls = sportField.sportFieldImages?.map((image) => image.url);

  return (
    <div className="flex justify-between rounded-large bg-primary-100">
      <SportFieldInfoCard className="w-[313px]" sportField={sportField} />
      <SportFieldSwiper className="w-[336px]" images={imageUrls} />
    </div>
  );
};
export default SearchCard;
