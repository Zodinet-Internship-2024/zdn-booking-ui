import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const useServerSentEvents = (callback: (...args: any) => unknown) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    let eventSource: EventSource;
    if (userId) {
      eventSource = new EventSource(
        `${API_HOST}/notification/events?userId=${session?.user?.id}`,
      );
      eventSource.onmessage = ({ data }) => {
        callback(data);
      };
    }
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userId]);
};
export default useServerSentEvents;
