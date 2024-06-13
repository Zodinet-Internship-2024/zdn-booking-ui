import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';
import { sportField } from '@/mocks/sport-fields';
import NearestFields from './components/NearestFields';

const HomePage = () => {
    const sportFields = Array(7).fill(sportField);
    return (
        <div>
            <NearestFields sportFields={sportFields} />
        </div>
    );
};
export default HomePage;
