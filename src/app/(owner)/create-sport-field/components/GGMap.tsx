import React, { useState } from 'react';
import axios from 'axios';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapOptions {
  center: Location;
  zoom: number;
}

interface SearchProps {
  onSearch?: (location: Location) => void;
}

const SearchCom: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`,
      );
      const location = response.data[0] as Location;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search location..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchCom;

// options={
//   searchAddress.length > 0
//     ? searchAddress?.map((item: Location, index: number) => {
//         return {
//           value: JSON.stringify(item),
//           label: item.display_name ?? item.displayName ?? item.name,
//         };
//       })
//     : address
//       ? [
//           {
//             value: JSON.stringify({
//               name: address,
//               lat: 0,
//               lng: 0,
//             }),
//             label: address,
//           },
//         ]
//       : []
// }

// const isoMap = await axios
//   .get('https://api.iso-maps.com/v1/map/geocoding', {
//     params: {
//       api_key: isoKey,
//       address: fullAddress,
//       limit: 10,
//       lang: 'en-GB',
//     },
//   })
//   .then((response) => {
//     console.log(response.data.result);
//     if (response.data.result.length) {
//       return response.data.result.map(
//         (item: any) =>
//           ({
//             lat: item.address.lat,
//             lng: item.address.lng,
//             name: `${item.address.street_number} ${item.address.street}`,
//             display_name: item.address.formatted,
//           }) as Location,
//       ) as Location[];
//     }
//     return response.data.result as Location[];
//   });

        

// Forward Geocode (Convert human-readable address to coordinates):
// https://geocode.maps.co/search?q=address&api_key=668e39fd2f308111208009ojh17974b

// Reverse Geocode (Convert coordinates to human-readable address):
// https://geocode.maps.co/reverse?lat=latitude&lon=longitude&api_key=668e39fd2f308111208009ojh17974b