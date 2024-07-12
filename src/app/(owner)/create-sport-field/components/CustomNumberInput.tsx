'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import styles from './SportFieldForm.module.scss';

type CustomNumberInputProps = {
  isDisabled?: boolean;
  value?: number;
  onChange?: (value: number) => void;
};

const CustomNumberInput: React.FC<CustomNumberInputProps> = (props) => {
  const { value, onChange, isDisabled } = props;
  const [number, setNumber] = useState<number>(value ? value : 1);

  const handleChange = (num: number) => {
    if (num < 1) return;
    if (num > 99) {
      setNumber(99);
      onChange && onChange(99);
      return;
    }
    setNumber(num);
    onChange && onChange(num);
  };

  useEffect(() => {
    setNumber(value ? value : 1);
  }, [value]);

  return (
    <div className="flex flex-row">
      <Button
        disabled={number === 1 || isDisabled}
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
      <div
        className={`${styles.inputNumber} flex h-full items-center justify-center`}
      >
        <InputNumber
          disabled={isDisabled}
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
          max={99}
        />
      </div>
      <Button
        disabled={isDisabled || number === 99}
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
