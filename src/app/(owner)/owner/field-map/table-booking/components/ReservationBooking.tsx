import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import styles from './ScheduleTable.module.scss';
import React, { useEffect, useId, useState } from 'react';
import { cn, formatCurrency } from '@/libs/utils';
import { Button, message } from 'antd';
import QRBooking from './QRBooking';
import {
  CreateBookingByOwnerDto,
  getBookingById,
  removeBookingById,
} from '../api/booking';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import dayjs, { Dayjs } from 'dayjs';
import {
  createBookingByOwner,
  validateBookingTime,
} from '@/libs/api/booking.api';
import { errorMessageMapping } from '@/constants/constant';
import { validatePhone } from '@/utils/validate';

type ReservationBookingProps = {
  isDeleteForm: boolean;
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  field: FieldResponse;
  bookingTime?: any;
  bookings: BookingData[];
};
type Booking = {
  id: string;
  createdAt: string;
  updatedAt: string;

  createdBy: string;
  updatedBy: string;

  phone: string;
  fullName: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  amount: number;
};
type CreateBookingDto = {
  fullName: string;
  phone: string;
};

export default function ReservationBooking({
  isDeleteForm,
  isOpen,
  onClose,
  bookingId,
  field,
  bookingTime,
  bookings,
}: ReservationBookingProps) {
  const [time, setTime] = useState<[Dayjs, Dayjs]>([
    dayjs(bookingTime?.startTime),
    dayjs(bookingTime?.endTime),
  ]);
  const [amount, setAmount] = useState(field.sportField.price ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeError, setTimeError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string>();
  const route = useRouter();
  const id = useId();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      const errorMessage = validatePhone(value);
      setError(errorMessage);
    }
  };
  const handleDeleteBooking = async () => {
    try {
      setIsLoading(true);
      const res = await removeBookingById(bookingId);
      if (res) {
        message.error('Xóa thành công');
        mutate(
          (key) =>
            typeof key === 'string' &&
            key.startsWith('/booking/owner-schedule?'),
        );
        onClose();
        route.push(`table-booking?fieldId=${field.id}&id=${id}` as any);
      }
    } catch (error) {
      message.error('Xóa thất bại');
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddBooking = async () => {
    try {
      setIsLoading(true);
      if (!time) {
        message.error('Vui lòng chọn thời gian');
        return;
      }
      const { startTime, endTime } = setBookingTimeRange(bookingTime, time);
      const data: CreateBookingByOwnerDto = {
        name: fullName,
        amount,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        fieldId: field.id as string,
        status: 'accepted',
        phone,
      };

      const res: any = await createBookingByOwner(data);
      if (res?.status === 201) {
        message.success('Đặt sân thành công');
        setBookingSuccess(res.data?.data?.id);
        setIsSuccess(true);
        // onClose();
        mutate(
          (key) =>
            typeof key === 'string' &&
            key.startsWith('/booking/owner-schedule?'),
        );
        route.push(`table-booking?fieldId=${field.id}&id=${id}` as any);
      } else {
        console.log(res.response.data);
        message.error(
          errorMessageMapping[res.response.data.message] ?? 'Tạo thất bại',
        );
      }
    } catch (error: any) {
      console.log(error);
      message.error('Tạo thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const calAmount = (startTime: Dayjs, endTime: Dayjs) => {
    const start = startTime.unix();
    const end = endTime.unix();
    const SLOT_SECOND = 30 * 60;
    const amount = ((end - start) / SLOT_SECOND) * field.sportField.price;
    setAmount(amount);
  };

  const handleDateChange = async ([startTime, endTime]: [Dayjs, Dayjs]) => {
    calAmount(startTime, endTime);
    setTime([startTime, endTime]);

    const { startTime: fullStartTime, endTime: fullEndTime } =
      setBookingTimeRange(bookingTime, [startTime, endTime]);
    try {
      const res: any = await validateBookingTime(
        field.id,
        fullStartTime.toISOString(),
        fullEndTime.toISOString(),
      );
      if (res.status !== 200) {
        setTimeError(
          errorMessageMapping[res?.response?.data?.message] ??
            'Thời gian đã chọn không hợp lệ',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (isDeleteForm) {
      await handleDeleteBooking();
    } else {
      await handleAddBooking();
    }
  };

  const setBookingTimeRange = (
    bookingTime: any,
    time: [dayjs.Dayjs, dayjs.Dayjs],
  ) => {
    const startTime = new Date(bookingTime.startTime);
    startTime.setHours(time[0].hour(), time[0].minute());
    const endTime = new Date(bookingTime.startTime);
    endTime.setHours(time[1].hour(), time[1].minute());
    return { startTime, endTime };
  };

  let booking = bookings.find((item) => item.id === bookingId);
  return (
    <div
      className={cn(
        styles.modal,
        `${isOpen ? 'absolute flex' : 'hidden'} right-0 top-0 z-[999] h-full w-full items-center justify-center rounded-[20px] transition`,
      )}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="flex flex-wrap">
        <div
          className={`z-10 max-w-[534px] rounded-l-[20px] ${isDeleteForm ? 'rounded-r-[20px]' : ''} bg-white px-10 py-6 md:w-[534px]`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold leading-5 text-natural-700">
              Đặt chỗ
            </span>
            {isDeleteForm ? (
              <CloseOutlined
                onClick={onClose}
                className="cursor-pointer text-xl text-natural-700"
              />
            ) : (
              ' '
            )}
          </div>
          <div className="mt-6 flex flex-col gap-y-6">
            <div>
              <p className="mb-2 text-sm font-medium leading-5 text-neutral-700">
                Địa điểm
              </p>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-5 text-neutral-500">
                  {field.sportField?.name ?? 'Chưa cập nhật'}
                </p>
                <p className="text-xs font-normal leading-4 text-neutral-700">
                  {field.sportField?.location?.addressDetail ?? 'Chưa cập nhật'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-5 text-neutral-700">
                Thời gian
              </p>
              <div className="flex flex-col flex-wrap gap-x-5 text-sm font-bold text-natural-700">
                <RangePickerComponent
                  onFocus={() => setTimeError('')}
                  status={timeError ? 'error' : undefined}
                  value={[time[0].format('HH:mm'), time[1].format('HH:mm')]}
                  disabled={isDeleteForm}
                  onChange={handleDateChange}
                  defaultValue={[
                    dayjs(
                      isDeleteForm
                        ? booking?.startTime
                        : bookingTime?.startTime,
                    ).format('HH:mm'),
                    dayjs(
                      isDeleteForm ? booking?.endTime : bookingTime?.endTime,
                    ).format('HH:mm'),
                  ]}
                />
                <p className="ml-2 mt-2 h-4 text-xs font-normal leading-4 text-red-500">
                  {timeError}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap text-sm font-medium leading-5 text-neutral-700">
              <div className="mr-8">
                <span>Sân</span>
                <p className="mt-2 text-sm font-bold leading-5">{field.name}</p>
              </div>
              <div>
                <span>Ngày</span>
                <p className="mt-2 text-sm font-bold leading-5">
                  {new Date(
                    isDeleteForm
                      ? (booking?.startTime as string)
                      : (bookingTime?.startTime as string),
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Tên
              </p>
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                name="fullName"
                value={isDeleteForm ? booking?.fullName : fullName}
                className="mt-2 w-full rounded-large border border-neutral-200 px-4 py-[10px] focus:outline-primary-400"
              />
            </div>
            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Số điện thoại
              </p>
              <input
                type="text"
                disabled={isLoading}
                value={isDeleteForm ? booking?.phone : phone}
                name="phone"
                onChange={handleChange}
                className="mt-2 w-full rounded-large border border-neutral-200 px-4 py-[10px] focus:outline-primary-400"
              />

              <p className="mt-1 h-4 text-sm text-red-500">{error}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-between">
            <div>
              <span className="flex cursor-pointer text-sm font-bold leading-5 text-accent-600">
                <EditOutlined className="mr-3" />
                Note
              </span>
              <div className="mt-3 flex items-center text-sm font-medium leading-5">
                Tổng tiền{' '}
                <p className="ml-3 text-base font-bold text-primary-600">
                  {isDeleteForm
                    ? formatCurrency(booking?.amount ?? 0)
                    : formatCurrency(amount)}
                </p>
              </div>
            </div>
            <div className="submit">
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                disabled={
                  isLoading ||
                  !time ||
                  !fullName ||
                  !phone ||
                  !!error ||
                  !!timeError
                }
                type="primary"
                {...(isDeleteForm ? { danger: true } : {})}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
        <QRBooking
          isClose={false}
          isOpacity={isLoading || isSuccess}
          onClose={onClose}
          bookingId={bookingSuccess}
        />
      </div>
    </div>
  );
}

