import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';
import { sportField } from '@/mocks/sport-fields';
import NearestFields from './components/NearestFields';
import CustomTimePicker from '@/components/filter/CustomTimePicker';

const HomePage = () => {
    const sportFields = Array(7).fill(sportField);
    return (
        <div>
            <CustomTimePicker />
            <NearestFields sportFields={sportFields} />
        </div>
    );
};
export default HomePage;
