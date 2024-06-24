'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { useState } from 'react';

type CustomNumberInputProps = {
  value?: number;
  onChange?: (value: number) => void;
};

const CustomNumberInput: React.FC<CustomNumberInputProps> = (props) => {
  const { value, onChange } = props;
  const [number, setNumber] = useState<number>(value ?? 1);

  const handleChange = (num: number) => {
    if (num < 1) return;
    setNumber(num);
    onChange && onChange(num);
  };

  return (
    <div>
      <Button
        disabled={number === 1}
        type="text"
        style={{
          background: '#F4F1FF',
          border: 'none',
          borderRadius: '40px',
          width: '44px',
          height: '44px',
        }}
        icon={<MinusOutlined style={{ color: '#967DDD' }} />}
        onClick={() => handleChange(number - 1)}
      />
      <InputNumber
        value={number}
        onChange={(num) => handleChange(num as number)}
        style={{
          margin: '0 10px',
          borderRadius: '40px',
          borderColor: '#F4F1FF',
          backgroundColor: '#F4F1FF',
          width: '44px',
          textAlign: 'center',
        }}
      />
      <Button
        type="text"
        style={{
          background: '#F4F1FF',
          border: 'none',
          borderRadius: '40px',
          width: '44px',
          height: '44px',
        }}
        icon={<PlusOutlined style={{ color: '#967DDD' }} />}
        onClick={() => handleChange(number + 1)}
      />
    </div>
  );
};

export default CustomNumberInput;
