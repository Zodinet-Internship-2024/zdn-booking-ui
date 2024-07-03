import PopularFilter from './PopularFilter';
import PopularList from './PopularList';

const PopularPlaces = () => {
  return (
    <div
      className="container mx-auto flex flex-col justify-center px-8 py-16"
      id="popular-places"
    >
      <h4 className="py-5 font-bold">Địa điểm nổi bật</h4>
      <PopularFilter />
      <PopularList />
    </div>
  );
};

export default PopularPlaces;
