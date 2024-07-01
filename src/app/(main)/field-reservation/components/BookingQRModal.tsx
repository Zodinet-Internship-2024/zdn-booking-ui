import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './../bookingQR.module.scss';
import { cn } from '@/libs/utils';
import QRBooking from '@/app/(owner)/table-booking/components/QRBooking';

export default function BookingQRModal({
  isOpen,
  isClose,
  data,
}: {
  isOpen: boolean;
  isClose: () => void;
  data: any;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleCreateBooking = () => {
    setIsSuccess(true);
  };
  useEffect(() => {
    setIsSuccess(false);
  }, [isOpen]);
  return (
    <div
      className={cn(
        styles.modal,
        `${isOpen ? 'absolute flex' : 'hidden'} right-0 top-0 z-[999] h-full w-full items-center justify-center transition`,
      )}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="flex flex-wrap">
        <div
          className={`z-10 rounded-l-[40px] bg-white px-10 py-6 md:w-[534px]`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold leading-5 text-natural-700">
              Đặt chỗ
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-y-6">
            <div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-5 text-natural-700">
                  Địa điểm
                </p>
                <div className="flex w-fit items-center rounded-[40px] text-sm font-bold leading-5 text-neutral-700">
                  Sân cầu lông Tada Bình Lợi
                </div>
                <p className="text-xs font-normal leading-4 text-natural-500">
                  42 Kha Vạn Cân, Hiệp Bình Chánh, Thủ Đức, Tp. Hồ Chí Minh{' '}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap text-sm font-medium leading-5 text-neutral-700">
              <div className="mr-8 font-bold leading-5">
                <p className="text-sm font-medium leading-5 text-natural-700">
                  Thời gian
                </p>
                <p className="text-sm font-bold leading-5 text-neutral-500">
                  9:00 - 11:30
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap text-sm font-medium leading-5 text-neutral-700">
              <div className="mr-8 font-bold leading-5">
                <p className="text-sm font-medium leading-5 text-natural-700">
                  Sân
                </p>
                <p className="text-sm font-bold leading-5 text-neutral-500">
                  A1
                </p>
              </div>
              <div className="mr-8 font-bold leading-5">
                <p className="text-sm font-medium leading-5 text-natural-700">
                  Ngày
                </p>
                <p className="text-sm font-bold leading-5 text-neutral-500">
                  Hôm nay 19/5/2024
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 flex w-full justify-between">
            <div className="submit flex w-full items-center">
              {isSuccess ? (
                <Button className="flex w-full items-center">
                  Đặt chỗ thành công <CheckOutlined />
                </Button>
              ) : (
                <Button
                  className="w-full"
                  type="primary"
                  onClick={() => handleCreateBooking()}
                >
                  Đặt chỗ
                </Button>
              )}
            </div>
          </div>
        </div>
        <QRBooking isClose={false} isOpacity={isSuccess} onClose={isClose} />
      </div>
    </div>
  );
}
