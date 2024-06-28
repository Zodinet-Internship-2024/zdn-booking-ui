//
import React from 'react';
import { Button } from 'antd';
import styles from '../styles/AccentButton.module.scss';

interface AccentButtonProps {
  label: any;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
  style?: string | '';
  disabled?: boolean;
}

const AccentButton: React.FC<AccentButtonProps> = ({
  label,
  value,
  isActive,
  onClick,
  style,
  disabled,
}) => {
  return (
    <div className={`${styles.buttonContainer} ${style}`}>
      <Button
        disabled={disabled && disabled}
        type={isActive ? 'primary' : 'default'}
        onClick={() => onClick(value)}
        className={`${style} w-full xl:w-fit`}
      >
        {label}
      </Button>
    </div>
  );
};

export default AccentButton;
