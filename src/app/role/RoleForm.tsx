"use client";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/OBJECTS.svg";
import { cn } from "@/libs/utils";
import s from "../role/role.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function RoleForm() {
  const router = useRouter();

  const { data: session } = useSession();

  if (session?.user) {
    router.push('/home');
  }

  const handleNavigate = (role: string) => {
    router.push(`/login?role=${role}`);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={cn(s.main, "flex flex-col  items-center ")}>
        <Image src={logo} width={73} height={88} alt={"logo"} />
        <div className="text-center mt-[68px] bg-primary-100 rounded-[40px] p-10 border border-primary-400">
          <p className="mb-12 font-bold text-neutral-700 text-[28px]">
            {" "}
            Chọn vai trò của bạn
          </p>
          <div className="flex items-center justify-center">
            <Button
              type="primary"
              className="mr-5"
              onClick={() => handleNavigate("owner")}
            >
              Chủ sân
            </Button>
            <Button onClick={() => handleNavigate("user")}>Người thuê</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
