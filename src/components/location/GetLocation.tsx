// components/GetLocation.tsx
'use client';
import { useEffect, useState } from 'react';

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
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState | null>(null);

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
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state);
        if (result.state === 'granted') {
          getLocation();
        } else if (result.state === 'prompt') {
          getLocation();
        } else if (result.state === 'denied') {
          setError('Location access denied by user.');
        }
        result.onchange = () => {
          setPermissionStatus(result.state);
          if (result.state === 'granted') {
            getLocation();
          } else if (result.state === 'denied') {
            setError('Location access denied by user.');
          }
        };
      });
    } else {
      getLocation();
    }
  }, []);

  return (
    <div className="hidden">
      {permissionStatus === 'prompt' && (
        <p>Requesting location permission...</p>
      )}
      {permissionStatus === 'denied' && <p>Location access denied by user.</p>}
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
