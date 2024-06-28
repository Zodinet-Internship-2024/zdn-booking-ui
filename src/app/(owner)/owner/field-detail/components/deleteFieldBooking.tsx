'use client';
import { CloseOutlined } from '@ant-design/icons';
import { message, notification, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getBookingSportField,
  removeBookingOfSportField,
  removeSportField,
} from '../../api/sportField.api';
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type DeleteFieldBookingProps = {
  isOpen: boolean;
  onClose(): void;
  sportField: SportField;
};
interface DataType {
  key: string;
  field: string;
  time: string;
  date: string;
  name: string;
  phone: string;
}
interface ApiResponseItem {
  id: string;
  createdAt: string;
  phone: string;
  fullName: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  field: { name: string };
}
export default function DeleteFieldBooking({
  isOpen,
  onClose,
  sportField,
}: DeleteFieldBookingProps) {
  const route = useRouter();

  const [fieldBooking, setFieldBooking] = useState<DataType[]>();
  const [api, contextHolder] = notification.useNotification();
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Sân',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Khung giờ',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'SĐT',
      key: 'phone',
      dataIndex: 'phone',
      render: (text) => (
        <p className="cursor-pointer text-sm font-medium text-accent-600 underline underline-offset-1">
          {text}
        </p>
      ),
    },
  ];

  const handleBackgroundClick = () => {
    onClose();
  };
  const handleDeleteAllField = async () => {
    if (fieldBooking && fieldBooking?.length > 0) {
      await removeBookingOfSportField(sportField.id);
      api.success({
        message: 'Xóa lịch đặt chỗ  thành công ',
        placement: 'top',
        showProgress: true,
        pauseOnHover: false,
      });
      fetchSportFieldBooking();
    }
  };
  const handleDeleteBookings = async () => {
    if (fieldBooking && fieldBooking.length > 0) {
      api.error({
        message: 'Bạn  phải xóa lịch đặt c của sân',
        placement: 'top',
        showProgress: true,
        pauseOnHover: false,
      });
    } else {
      await removeSportField(sportField.id);
      message.success('Xóa sân thành công');
      onClose();
      route.refresh();
      route.push('/owner?type=all');
    }
  };

  const mapToDataType = (item: ApiResponseItem): DataType => ({
    key: item.id,
    field: item.field.name,
    time: `${new Date(item.startTime).toLocaleTimeString()} - ${new Date(item.endTime).toLocaleTimeString()}`,
    date: new Date(item.startTime).toLocaleDateString(),
    name: item.fullName,
    phone: item.phone,
  });

  const fetchSportFieldBooking = async () => {
    const res = await getBookingSportField(sportField.id);

    if (res.data) {
      const transformedData = res.data.map(mapToDataType);
      setFieldBooking(transformedData);
    }
  };
  useEffect(() => {
    fetchSportFieldBooking();
  }, [sportField]);
  return (
    <>
      {contextHolder}
      <div
        className={`${isOpen ? 'absolute flex' : 'hidden'} right-0 top-0 z-[999] h-full w-full items-center justify-center rounded-[20px] transition`}
      >
        <div
          className="z-9 absolute inset-0 h-full bg-black opacity-40"
          onClick={handleBackgroundClick}
        ></div>
        <div className="py relative z-10 w-[740px] rounded-2xl bg-white px-10 py-6 shadow-lg">
          <div className="mb-9 flex items-center justify-between">
            {' '}
            <p className="text-xl font-bold text-natural-700">Xóa sân</p>
            <CloseOutlined
              className="cursor-pointer"
              onClick={handleBackgroundClick}
            />
          </div>

          <div>
            <span className="text-base font-bold leading-6 text-natural-700">
              {sportField.name ?? 'Unknown'}
            </span>
            <p className="text-xs font-normal text-natural-500">
              {sportField?.location
                ? sportField?.location?.addressDetail
                : 'Chưa cập nhật'}
            </p>
          </div>
          <div className="mb-5 mt-8 flex items-center justify-between">
            <span className="text-base font-bold leading-6 text-natural-700">
              Lịch đặt chỗ đang có
            </span>
            <span
              className="cursor-pointer text-sm font-medium text-alerts-red underline underline-offset-1"
              onClick={handleDeleteAllField}
            >
              {fieldBooking && fieldBooking?.length ? 'Xóa tất cả' : ''}
            </span>
          </div>
          <div>
            {fieldBooking && fieldBooking.length > 0 ? (
              <Table
                columns={columns}
                dataSource={fieldBooking}
                pagination={{ pageSize: 5 }}
              />
            ) : (
              <p className="text-xs font-normal text-natural-500">Không có</p>
            )}
          </div>
          <div className="mt-10 flex w-full justify-end text-base font-bold">
            <button
              onClick={handleBackgroundClick}
              className="mr-3 rounded-[40px] bg-accent-200 px-10 py-4 leading-6 text-accent-600 hover:bg-accent-300"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleDeleteBookings}
              disabled={fieldBooking && fieldBooking.length > 0}
              className={`${fieldBooking && fieldBooking.length > 0 ? 'bg-natural-300' : 'bg-accent-600 hover:bg-accent-500'} rounded-[40px] px-10 py-4 leading-6 text-natural-100`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
