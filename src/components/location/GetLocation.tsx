// components/GetLocation.tsx
'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface Coordinates {
  lat: number | null;
  long: number | null;
}

const GetLocation: React.FC = () => {
  const [location, setLocation] = useState<Coordinates>({
    lat: null,
    long: null,
  });
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: Coordinates = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          setLocation(coords);
          localStorage.setItem('location', JSON.stringify(coords));
          setError(null);
        },
        (err) => {
          setError(err.message);
        },
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {location.lat !== null && location.long !== null ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.long}
        </p>
      ) : (
        <p>No location available</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default GetLocation;
