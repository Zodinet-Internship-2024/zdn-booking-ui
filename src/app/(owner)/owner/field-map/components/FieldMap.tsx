'use client';
import React from 'react';
import { Button } from 'antd';
import { FaArrowLeft } from 'react-icons/fa6';
import { cn } from '@/libs/utils';
import styles from './fieldMap.module.scss';
import { useRouter } from 'next/navigation';

const FieldMap = ({ sportField }: { sportField: SportField }) => {
  const fieldNames = sportField.fields || [];
  const router = useRouter();

  console.log(fieldNames, 'fieldNames');

  const handleButtonClick = (index: number) => {
    console.log(`Đã chọn sân ${fieldNames[index].id}`);
    router.push(`/table-booking?fieldId=${fieldNames[index].id}`);
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        styles.fieldMapContainer,
        'rounded-large-sm mx-auto mt-12 flex h-fit w-fit flex-col gap-8 bg-neutral p-10',
      )}
    >
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <FaArrowLeft className="mr-4 text-xl" />
        </button>

        <h4 className="font-bold text-natural-700">
          Quản lý đặt chỗ - Sơ đồ sân
        </h4>
      </div>
      {fieldNames.length > 0 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {fieldNames.map((fieldName, index) => (
            <Button
              type="primary"
              key={index}
              onClick={() => handleButtonClick(index)}
            >
              {`Sân ${fieldName.name}`}
            </Button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <p className="body-4 font-medium">Tên sân</p>
        <p className="body-3 font-bold">Sân bóng đá Vạn Phúc</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="body-4 font-medium">Tổng</p>
        <p className="body-3 font-bold">{fieldNames.length} sân</p>
      </div>
    </div>
  );
};

export default FieldMap;
