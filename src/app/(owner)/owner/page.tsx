import SportFieldManagement from './components/SportFieldManagement';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Owner Home Page',
  description: 'Zodinet Booking - Owner Home: Manage Your Sport Fields with Ease',
}

const OwnerHomePage = () => {
  return (
    <div className="flex h-[800px] w-full justify-center bg-[#f7f7f7]">
      <SportFieldManagement />
    </div>
  );
};
export default OwnerHomePage;
