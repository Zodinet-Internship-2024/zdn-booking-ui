'use client';

import * as React from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

export default function App() {
  const [photos, setPhotos] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  async function fetchData(searchTerm: string) {
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?title_like=${searchTerm}`,
    );
    setPhotos(data.data);
  }
  const debounced = React.useCallback(debounce(fetchData, 500), []);

  React.useEffect(() => {
    // for the first render load
    fetchData('');
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debounced(e.target.value);
        }}
      />
      <div>
        {photos?.map((photo: any) => (
          <div key={photo.id}>{JSON.stringify(photo.title)}</div>
        ))}
      </div>
    </div>
  );
}
