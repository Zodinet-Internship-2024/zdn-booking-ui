import UserProfile from "./components/UserProfile";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Profile Page',
  description: 'Zodinet Booking - Profile: Manage Your Profile with Ease',
}

const ProfilePage = () => {
  return (
    <div className="w-full flex justify-center my-5">
      <UserProfile />
    </div>
  );
};
export default ProfilePage;
