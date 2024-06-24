"use client";
import Image from "next/image";
import { Button, Modal } from "antd";
import { useState } from "react";
import styles from "./profile.module.scss";
import { cn } from "@/libs/utils";
import EditProfile from "./EditProfile";
import { signOut, useSession } from 'next-auth/react';
import { removeTokens } from '@/app/(auth)/apis/auth.api';

export default function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    removeTokens();
    signOut();
  };

  return (
    <>
      <div
        className={cn(
          styles.userProfileContainer,
          'flex w-1/2 gap-5 rounded-large bg-primary-100 p-10',
        )}
      >
        <div className="relative h-[84px] w-[84px]">
          <Image
            src="/images/avt.png"
            className="rounded-xl"
            alt="avatar"
            fill
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <p className="body-2 font-bold text-neutral-600">
              {session?.user?.name || 'Người dùng của tôi'}
            </p>
            <Button type="primary" onClick={showModal} className="ml-5">
              Chỉnh sửa
            </Button>

            <button
              className="relative ml-2 h-4 w-4"
              onClick={() => handleSignOut()}
            >
              <Image
                src="/icons/logout.svg"
                className="rounded-xl"
                alt="logout"
                fill
              />
            </button>
          </div>

          <p className="body-4 flex gap-1 font-medium text-primary-600">
            <Image
              src="/icons/phone.svg"
              className="phone-icon rounded-xl"
              alt="phone icon"
              width="15"
              height="15"
            />
            {session?.user?.phone || 'Chưa cập nhật'}
          </p>
          <p className="body-4 flex gap-1 font-medium text-primary-600">
            <Image
              src="/icons/location-marker.svg"
              className="rounded-xl"
              alt="logout"
              width="15"
              height="15"
            />
            124 Xô Viết Nghệ Tĩnh, P.6, Q. Bình Thạnh
          </p>
        </div>
      </div>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={() => <></>}
        style={{ padding: 0 }}
        modalRender={(node) => (
          <div className={cn(styles.modalContainer)}>{node}</div>
        )}
      >
        <EditProfile onCancel={handleCancel} />
      </Modal>
    </>
  );
}
