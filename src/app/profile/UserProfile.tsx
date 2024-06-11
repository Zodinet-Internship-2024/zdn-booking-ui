import Image from "next/image";

export default function UserProfile() {
  return (
    <div className="bg-primary-100 rounded-large flex gap-5 p-10 w-1/2">
      <div className="relative w-[84px] h-[84px]">
        <Image src="/images/avt.png" className="rounded-xl" alt="avatar" fill />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <p className="body-2 font-bold text-neutral-600">Nguyễn Thu Hà</p>
          <button className="ml-5 body-4 bg-neutral text-accent-600 py-1 px-3 font-medium rounded-large">
            Chỉnh sửa
          </button>
          <button className="relative ml-2 w-4 h-4">
            <Image
              src="/icons/logout.svg"
              className="rounded-xl "
              alt="logout"
              fill
            />
          </button>
        </div>

        <p className="body-4 text-primary-600 font-medium flex gap-1">
          <Image
            src="/icons/phone.svg"
            className="phone-icon rounded-xl"
            alt="phone icon"
            width="15"
            height="15"
          />

          (+84) 333 594 124
        </p>
        <p className="body-4 text-primary-600 font-medium flex gap-1">
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
  );
}
