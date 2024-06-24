'use client';
import { CloseOutlined } from '@ant-design/icons';
import { Table, TableProps } from 'antd';
import React, { useState } from 'react';

type DeleteFieldBookingProps = {
  isOpen: boolean;
  onClose(): void;
};
interface DataType {
  key: string;
  field: string;
  time: string;
  date: string;
  name: string;
  phone: string;
}
export default function DeleteFieldBooking({
  isOpen,
  onClose,
}: DeleteFieldBookingProps) {
  const data: DataType[] = [
    {
      key: '1',
      field: '1',
      time: '20:00 - 22:00',
      date: 'T2 - 13/5',
      name: 'Phạm Cao Huy',
      phone: '(+84) 939 617 632',
    },
    {
      key: '2',
      field: '4',
      time: '20:00 - 22:00',
      date: 'T2 - 13/5',
      name: 'Phạm Cao Huy',
      phone: '(+84) 939 617 632',
    },
    {
      key: '3',
      field: '6',
      time: '20:00 - 22:00',
      date: 'T2 - 13/5',
      name: 'Phạm Cao Huy',
      phone: '(+84) 939 617 632',
    },
    {
      key: '4',
      field: '7',
      time: '20:00 - 22:00',
      date: 'T2 - 13/5',
      name: 'Phạm Cao Huy',
      phone: '(+84) 939 617 632',
    },
  ];
  const [fieldBooking, setFieldBooking] = useState<DataType[]>(data);
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Sân',
      dataIndex: 'name',
      key: 'name',
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
        <p className="0 cursor-pointer text-sm font-medium text-accent-600 underline underline-offset-1">
          {text}
        </p>
      ),
    },
  ];

  const handleBackgroundClick = () => {
    onClose(); // Call the function to close the modal
  };
  const handleDeleteAllField = () => {
    console.log(12);
    setFieldBooking([]);
  };
  const handleDeleteBookings = () => {
    if (fieldBooking.length === 0) {
      onClose();
    }
  };
  return (
    <div
      className={`${isOpen ? 'absolute flex' : 'hidden'} z-1 right-0 top-0 h-full w-full items-center justify-center rounded-[20px] transition`}
    >
      <div
        className="absolute inset-0 bg-black opacity-40"
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
            Sân bóng đá Vạn Phúc
          </span>
          <p className="text-xs font-normal text-natural-500">
            12 Nguyễn Thị Nhung, Hiệp Bình Phước, Thủ Đức, Tp. Hồ Chí Minh
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
            Xóa tất cả
          </span>
        </div>
        <div>
          {fieldBooking.length > 0 ? (
            <Table columns={columns} dataSource={data} />
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
            className={`${fieldBooking.length > 0 ? 'bg-natural-300' : 'bg-accent-600 hover:bg-accent-500'} rounded-[40px] px-10 py-4 leading-6 text-natural-100`}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
