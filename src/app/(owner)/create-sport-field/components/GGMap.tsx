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