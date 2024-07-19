'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { updateQrBooking } from '../../api/qrbooking.api';
type responseBooking = {
  type: string;
  message: string;
};
export default function ProcessQrBooking() {
  const [qrBooking, setQrBooking] = useState<responseBooking>();
  const param = useParams();
  const router = useRouter();
  const idBooking = param.id[0];
  const getQrBooking = async () => {
    const res = await updateQrBooking(idBooking);
    if (res.type === 'Error') {
      if (res.message === 'Access token is missing') {
        router.push(`/login?redirect=/booking-qr/${idBooking}`);
        return;
      }
      setQrBooking({
        type: res.type,
        message: res.message,
      });
    } else {
      setQrBooking({
        type: res.type,
        message: 'Check in success',
      });
    }
  };

  useEffect(() => {
    getQrBooking();
  }, []);
  return (
    <div className="flex h-screen items-center justify-center font-bold text-primary-600">
      {qrBooking?.type === 'Error' ? (
        <div className="">{qrBooking.message} !</div>
      ) : (
        <div>{qrBooking?.message}</div>
      )}
    </div>
  );
}
