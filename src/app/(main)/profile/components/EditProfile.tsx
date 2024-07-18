import { cn } from "@/libs/utils";
import { Button, Input, notification } from 'antd';
import s from './profile.module.scss';
import UploadAvatar from './UploadAvatar';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ChangeEvent, use, useEffect, useState } from 'react';
import { updateUserProfile } from '../../api/profile-update.api';

type EditProfileProps = {
  img: string;
  name: string;
  phoneNum: string;
  onCancel: () => void;
};

export default function EditProfile({
  onCancel,
  img,
  name,
  phoneNum,
}: EditProfileProps) {
  const [api, contextHolder] = notification.useNotification();

  const [imageUrl, setImageUrl] = useState(img);
  const [fullName, setFullName] = useState(name);
  const [phone, setPhone] = useState(phoneNum);

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validateName = (name: string): string | null => {
    if (!name) {
      return 'Tên là bắt buộc';
    }
    if (name.length < 3) {
      return 'Tên phải có ít nhất 3 ký tự';
    }
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phone) {
      return 'Số điện thoại là bắt buộc';
    }
    if (!phoneRegex.test(phone)) {
      return 'Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.';
    }
    return null;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFullName(value);
    setNameError(validateName(value));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    setPhoneError(validatePhone(value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const nameValidationError = validateName(fullName);
    const phoneValidationError = validatePhone(phone);

    setNameError(nameValidationError);
    setPhoneError(phoneValidationError);

    if (!nameValidationError && !phoneValidationError) {
      const res = await updateUserProfile({
        name: fullName,
        phone: phone,
        imageUrl: imageUrl,
      });

      if (res.statusCode === 400) {
        api.error({
          message: 'Cập nhật thông tin không thành công',
          description: 'Vui lòng thử lại sau! Hoặc thay đổi thông tin khác.',
          duration: 2,
          showProgress: true,
        });
      } else {
        api.success({
          message: 'Cập nhật thông tin thành công',
          description:
            'Thông tin của bạn sẽ thay đổi trong lần đăng nhập tiếp theo.',
          duration: 2,
          showProgress: true,
        });
        onCancel();
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setFullName(name);
    setPhone(phoneNum);
    setImageUrl(img);
  }, [name, phoneNum, img]);

  return (
    <div
      className={cn(
        s.editProfileContainer,
        'flex w-full flex-col gap-5 rounded-large border-2 border-primary-400 bg-primary-100 p-10',
      )}
    >
      {contextHolder}
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <ArrowLeftOutlined className="mr-4 text-xl" />
        </button>

        <span className="cursor-pointer text-[28px] font-bold leading-7">
          Edit profile
        </span>
      </div>

      <div className="mt-10 flex flex-col">
        <div className="mb-10 h-[84px] w-[84px] self-center">
          <UploadAvatar imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <div className={cn(s.inputContainer, 'flex flex-col items-center')}>
          <label
            htmlFor="name"
            className="mb-2 text-lg font-bold leading-6 text-primary-600"
          >
            Tên
          </label>
          <Input
            id="name"
            name="name"
            value={fullName}
            onChange={(e) => handleNameChange(e)}
            placeholder="Nhập tên"
            className="text-center"
          />
          {nameError && <p className="text-red-600">{nameError}</p>}
        </div>

        <div
          className={cn(s.inputContainer, 'mt-6 flex flex-col items-center')}
        >
          <label
            htmlFor="phone"
            className="mb-2 text-lg font-bold leading-6 text-primary-600"
          >
            Số điện thoại
          </label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => handlePhoneChange(e)}
            maxLength={10}
            minLength={10}
            placeholder="Nhập số điện thoại"
            className=""
          />
          {phoneError && <p className="text-red-600">{phoneError}</p>}
        </div>

        <Button
          type="primary"
          className="mt-12"
          disabled={phoneError != null || nameError != null || loading}
          onClick={handleSubmit}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
}
