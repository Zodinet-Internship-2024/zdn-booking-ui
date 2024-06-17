import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { uploadImage } from '@/services/firebase/upload-avatar';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UploadAvatar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done' || true) {
      uploadImage(info.file.originFileObj as File).then((res) => {
        console.log(res);
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
