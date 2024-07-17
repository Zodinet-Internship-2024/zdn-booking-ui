import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, notification, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';
import { uploadImage } from '@/services/firebase/upload-avatar';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    notification.error({
      message: 'Tải lên hình ảnh không thành công',
      description: 'Bạn chỉ có thể tải lên tệp JPG/PNG!',
      duration: 2,
      showProgress: true,
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({
      message: 'Tải lên hình ảnh không thành công',
      description: 'Hình ảnh phải nhỏ hơn 2MB!',
      duration: 2,
      showProgress: true,
    });
  }
  return isJpgOrPng && isLt2M;
};

const UploadAvatar: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done' || true) {
      uploadImage(info.file.originFileObj as File).then((res) => {
        setLoading(false);
        setImageUrl(`${res}?alt=media`);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      {contextHolder}
      <ImgCrop rotationSlider>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          // action="http://localhost:5000/firebase/upload-avatar"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%', borderRadius: '50%' }}
              width={360}
              height={360}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    </Flex>
  );
};

export default UploadAvatar;
