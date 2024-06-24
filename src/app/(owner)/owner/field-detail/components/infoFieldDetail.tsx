'use client';
import { LeftOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import fieldImg from '../../../../../../public/images/Field.png';
import Image from 'next/image';
import s from '../components/infoFieldDetail.module.scss';
import { cn, formatCurrency } from '@/libs/utils';
import DeleteFieldBooking from './deleteFieldBooking';
import { useRouter } from 'next/navigation';

export default function InfoFieldDetail({ sportField }: { sportField: any }) {
  const route = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleBack = () => {
    route.push('/owner');
  };
  console.log(sportField);
  return (
    <div className="flex h-full w-full justify-center">
      <DeleteFieldBooking isOpen={openModal} onClose={handleCloseModal} />
      <div className="mt mt-12 w-[850px] rounded-t-[20px] bg-neutral p-10">
        <div className="mb-7 flex items-center justify-between">
          <div
            onClick={handleBack}
            className="flex cursor-pointer items-center text-2xl text-natural-700"
          >
            <span>
              <LeftOutlined className="mr-1 text-xl" />
            </span>
            <p className="font-bold">Chi tiết</p>
          </div>
          <div className="flex text-base font-bold leading-6">
            <p
              className="mr-5 cursor-pointer text-natural-400"
              onClick={handleOpenModal}
            >
              Xóa sân
            </p>
            <p className="cursor-pointer text-accent-600">Chỉnh sửa</p>
          </div>
        </div>
        <div className={cn(s.main, '')}>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Tên{' '}
            <span className="ml-3 font-bold text-natural-700">
              {sportField.name}
            </span>
          </p>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Xếp hạng{' '}
            <span className="ml-3 font-bold text-natural-700">
              5.0 <StarFilled className="text-yellow-500" />
            </span>
          </p>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Danh mục{' '}
            <span className="ml-3 font-bold text-natural-700">
              Sân bóng đá{' '}
            </span>
          </p>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Số lượng sân/bàn{' '}
            <span className="ml-3 font-bold text-natural-700">
              {sportField.quantity}
            </span>
          </p>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Địa chỉ{' '}
            <span className="ml-3 font-bold text-natural-700">
              12 Nguyễn Thị Nhung, Hiệp Bình Phước, Thủ Đức, Tp. Hồ Chí Minh
            </span>
          </p>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Số điện thoại{' '}
            <span className="ml-3 font-bold text-natural-700">
              {sportField.phone}
            </span>
          </p>
          <p className="mb-6 text-base font-normal leading-6 text-natural-500">
            Thời gian mở cửa{' '}
            <span className="ml-3 font-bold text-natural-700">
              {' '}
              {sportField.startTime} - {sportField.endTime}
            </span>
          </p>
          <div className="mb-6 flex items-center text-base font-normal leading-6 text-natural-700">
            <div>
              <p className="mb-4 text-base font-medium text-natural-500">
                Khung giờ
              </p>
              <span className="font-bold">Cả ngày</span>
            </div>
            <div className="ml-10">
              <p
                className="mb-4 text-base font-medium text-natural-500"
                text-base
                font-medium
                text-natural-500
              >
                Giá tiền
              </p>
              <span className="font-bold">
                {' '}
                {formatCurrency(sportField.price)}/ tiếng
              </span>
            </div>
          </div>
          <div className="mb-6 text-base font-normal leading-6 text-natural-700">
            {}
            <p className="mb-4 text-base font-medium text-natural-500">
              Hình ảnh
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (image) => (
                  <Image
                    key={image}
                    className="rounded-xl"
                    src={fieldImg}
                    alt={`Image ${image}`}
                    width={144}
                    height={100}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
