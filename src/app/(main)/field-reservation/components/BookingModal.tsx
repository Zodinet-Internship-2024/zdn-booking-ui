import QRBooking from '@/app/(owner)/table-booking/components/QRBooking';
import { cn } from '@/libs/utils';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './../booking.module.scss';
import AccentButton from '@/components/common/components/AccentButton';
import { Dayjs } from 'dayjs';

// {
//       startTimeISO: startTimeResult.toISOString(),
//       endTimeISO: endTimeResult.toISOString(),
//       startTime: startTimeResult,
//       endTime: endTimeResult,
//       sportField,
//       fieldId,
//       amount: timesChosen.length * sportField.price,
//     }
export type ModalData = {
  startTimeISO: string;
  endTimeISO: string;
  startTime: Dayjs;
  endTime: Dayjs;
  sportField: SportField;
  fieldId: string;
  amount: number;
}
type BookingProps = {
  isOpen: boolean;
  isClose: () => void;
  // bookingId: string;
  data: ModalData;
};
export default function BookingModal({ isOpen, data, isClose }: BookingProps) {
  const startTime = new Date(data.startTimeISO);
  const endTime = new Date(data.endTimeISO);
  return (
    <div
      className={cn(
        styles.modal,
        `${isOpen ? 'absolute flex' : 'hidden'} right-0 top-0 z-[999] h-full w-full items-center justify-center transition`,
      )}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="flex flex-wrap">
        <div className={`z-10 rounded-[40px] bg-white px-10 py-6 md:w-[740px]`}>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold leading-5 text-natural-700">
              Đặt chỗ
            </span>

            <CloseOutlined className="cursor-pointer text-xl text-natural-700" />
          </div>
          <div className="mt-6 flex flex-col gap-y-6">
            <div>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-5 text-neutral-500">
                  {startTime.toLocaleDateString()}
                </p>
                <div className="flex w-fit items-center rounded-[40px] bg-neutral-100 px-4 py-2 text-xs font-normal leading-4 text-neutral-700">
                  {startTime.toLocaleTimeString()} -{' '}
                  {endTime.toLocaleTimeString()}
                  {/* <CloseCircleOutlined className="ml-2 text-base" /> */}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap text-sm font-medium leading-5 text-neutral-700">
              <div className="mr-8 font-bold leading-5">
                <span>Sân đã chọn</span>
                <div className="mt-4 flex w-fit items-center rounded-[40px] bg-neutral-100 px-4 py-2 text-xs font-normal leading-4 text-neutral-700">
                  A1
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div>
              <div className="mt-3 text-sm font-medium leading-5">
                Tên sân{' '}
                <p className="text-base font-bold">{data.sportField.name}</p>
              </div>
            </div>
            <div className="submit flex items-center">
              <Button
                // onClick={handleSubmit}
                // loading={isLoading}
                type="default"
                className="mr-3"
                // {...(isDeleteForm ? { danger: true } : {})}
              >
                Hủy bỏ
              </Button>
              <Button
                // onClick={handleSubmit}
                // loading={isLoading}
                type="primary"

                // {...(isDeleteForm ? { danger: true } : {})}
              >
                Đặt chỗ
              </Button>
            </div>
          </div>
        </div>
        <QRBooking isClose={true} />
      </div>
    </div>
  );
}
