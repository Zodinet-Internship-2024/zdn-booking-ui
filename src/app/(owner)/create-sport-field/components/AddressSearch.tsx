import { Input, Select } from 'antd';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { searchSportFieldAddress } from '../../apis/create-sport-field.api';
import { debounce, set } from 'lodash';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddressSelection from './AddressSelection';

interface AddressSearchProps {
  province?: Province;
  district?: District;
  ward?: Ward;
  defaultValue?: string;
  onChange?: (value: any) => void;
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
  display_name?: string;
  displayName?: string;
}

async function beSearch(address: string): Promise<Location[]> {
  const host = process.env.NEXT_PUBLIC_API_HOST || '';
  const auth = `Bearer ${Cookies.get('access_token')}`;

  const response = await axios.get(`${host}/location/address`, {
    headers: {
      Authorization: auth,
    },
    params: {
      address,
    },
  });
  return response.data as Location[];
}

async function streetMapSearch(address: string): Promise<Location[]> {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${address}&format=json`,
  );
  return response.data as Location[];
}

// async function geocodeSearch(address: string): Promise<Location[]> {
//   const api_key = process.env.NEXT_PUBLIC_GEOCODE_API_KEY || '';
//   const response = await axios.get(
//     `https://geocode.maps.co/search?q=${address}&api_key=${api_key}`,
//   );
//   return response.data as Location[];
// }

const AddressSearch: React.FC<AddressSearchProps> = ({
  province = null,
  district = null,
  ward = null,
  onChange,
  defaultValue,
}) => {
  const [address, setAddress] = useState<string>(''); // input value
  const [defaultAddress, setDefaultAddress] = useState<string>('');
  const [searchAddress, setSearchAddress] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const debouncedAddress = useCallback(debounce(setAddress, 500), []);

  const handleSearch = async () => {
    setIsLoading(true);
    if (!address) {
      setIsLoading(false);
      return;
    }

    const fullAddress = `${address.trim()}, ${ward?.name}, ${district?.name}, ${province?.name}`;

    try {
      const [locations, searchings] = await Promise.all([
        beSearch(fullAddress),
        streetMapSearch(fullAddress),
      ]);

      const results = [...locations, ...searchings];

      setSearchAddress(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedAddress(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    handleSearch();
  }, [address]);

  useEffect(() => {
    setIsLoading(false);
  }, [searchAddress]);

  useEffect(() => {
    if (defaultValue) {
      const addressObj = JSON.parse(defaultValue);
      setDefaultAddress(
        addressObj.displayName || addressObj.display_name || addressObj.name,
      );
      setSelectedAddress(defaultValue);
    }
    onChange && onChange(defaultValue);
  }, [defaultValue]);

  useLayoutEffect(() => {
    setAddress('');
    setSearchAddress([]);
    setSelectedAddress('');
    onChange && onChange(null);
  }, [province, district, ward]);

  return (
    <div>
      <Select
        disabled={!district}
        showSearch
        placeholder={defaultAddress || 'Nhập địa chỉ chi tiết'}
        style={{ width: '100%', borderRadius: '40px' }}
        onSearch={(e) => debouncedAddress(e)}
        value={selectedAddress}
        // onSelect={handleSelect}
        onChange={handleSelect}
      >
        {!isLoading && searchAddress.length > 0 ? (
          searchAddress?.map((item: Location, index: number) => {
            return (
              <Select.Option key={index} value={JSON.stringify(item)}>
                {item.display_name
                  ? item.display_name
                  : item.displayName
                    ? item.displayName
                    : item.name}
              </Select.Option>
            );
          })
        ) : (
          // <AddressSelection selections={searchAddress} />
          <Select.Option key={0} value={selectedAddress}>
            {defaultAddress}
          </Select.Option>
        )}
        {address && !isLoading && (
          <Select.Option
            key={0}
            value={JSON.stringify({
              name: address,
              lat: 0,
              lng: 0,
            })}
          >
            {address}
          </Select.Option>
        )}
      </Select>
    </div>
  );
};

export default AddressSearch;
