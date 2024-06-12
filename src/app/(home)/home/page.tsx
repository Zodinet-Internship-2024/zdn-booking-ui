import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';
import { sportField } from '@/mocks/sport-fields';

const HomePage = () => {
    return (
        <div>
            <SportFieldInfoCard sportField={sportField} />
        </div>
    );
};
export default HomePage;
