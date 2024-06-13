import React from "react";
import { Button } from "antd";
import Image from "next/image";
import styles from "./banner.module.scss";
import { cn } from "@/libs/utils";

const Banner = () => {
  return (
    <div
      className={cn(
        styles.bannerContainer,
        "flex justify-between items-center h-[520px] bg-primary-100 py-12 px-30 gap-36"
      )}
    >
      <div className="gap-10 flex flex-col w-[738px]">
        <h1 className="font-bold text-primary-600">
          Booking sân tập ngay hôm nay!
        </h1>
        <p className="body-2 font-medium text-neutral-700">
          Đặt sân tập ngay hôm nay để nâng cao kỹ năng và thể lực. Chúng tôi
          cung cấp các sân tập hiện đại, đảm bảo an toàn và thoải mái cho bạn.
          Hãy đăng ký ngay để trải nghiệm những giây phút sôi động trên sân!
        </p>
        <Button className="flex items-center mt-4 text-h gap-3" type="primary">
          Booking now
          <Image
            src="/icons/arrow-right-icon.svg"
            alt="logout"
            width={24}
            height={24}
          />
        </Button>
      </div>
      <div className="relative w-[612px] h-[424px] rounded-large overflow-hidden">
        <Image src="https://picsum.photos/612/425" fill alt={"Banner Photo"} />
      </div>
    </div>
  );
};

export default Banner;
