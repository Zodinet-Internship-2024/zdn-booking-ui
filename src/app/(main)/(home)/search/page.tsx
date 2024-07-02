import AdvancedFilter from '@/components/common/AdvancedFilter';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import SearchBreadcrumb from './SearchBreadcrumb';
import SearchList from './SearchList';

type SearchPageProps = {
  searchParams: {
    q: string;
    page: string;
    size: string;
  };
};
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  return (
    <div className="container mx-auto py-12">
      <SearchBreadcrumb />

      <div className="mb-8 flex items-center justify-between">
        <FieldTypeFilter />
        <AdvancedFilter />
      </div>
      <SearchList />
    </div>
  );
};
export default SearchPage;
