'use client';

import Item from '@/components/common/Item';
import { Modal } from 'antd';
import { useState } from 'react';
import ApproveBookingModal from './ApproveBookingModal';

import styles from './styles/Booking.module.scss';

interface BookingProps {
  bookings?: any[];
  filter?: any;
}

const OwnerBooking: React.FC<BookingProps> = ({ filter, bookings }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [booking, setBooking] = useState();

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleOk = () => {
    setIsOpenModal(false);
  };

  const handleClick = (booking: any) => {
    setIsOpenModal(true);
    setBooking(booking);
  };

  return (
    <div className={`${styles.bookingContainer}`}>
      <div className="flex flex-col gap-3">
        {Array.isArray(bookings) &&
          bookings.map((booking: any, index: number) => {
            return (
              <Item
                key={index}
                data={booking}
                label="booking"
                onClick={handleClick}
              />
            );
          })}
        <Item data={'nguuu'} label="booking" onClick={handleClick} />
        <Item data={'nguuu'} label="booking" onClick={handleClick} />
      </div>
      <div className="lg:w-3/4 xl:w-2/3">
        {isOpenModal && (
          <Modal
            // visible={true} // Set this to control modal visibility
            footer={null} // If you don't want a footer, set it to null
            style={{ padding: '20px' }}
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            modalRender={(node) => (
              <div className={`${styles.modalContainer}`}>{node}</div>
            )}
            className={`${styles.modalContainer}`}
          >
            <ApproveBookingModal onCancel={handleCancel} booking={booking} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default OwnerBooking;
