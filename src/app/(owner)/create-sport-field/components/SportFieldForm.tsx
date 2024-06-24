'use client';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import { cn } from '@/libs/utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormProps, GetProp, UploadProps } from 'antd';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './SportFieldForm.module.scss';
import iconUpImage from '/public/images/icons_add_image.png';
import { District, Province, Ward } from '@/types/location.type';
import { getLocation, postData } from '../../apis/create-sport-field.api';
import CustomNumberInput from './CustomNumberInput';
import { uploadImage } from '../../apis/upload-img.api';
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const normalFiles = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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

type SportFieldFormProps = {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  sportFieldTypes: SportFieldType[];
};

const SportFieldForm: React.FC<SportFieldFormProps> = ({
  provinces,
  districts,
  wards,
  sportFieldTypes,
}) => {
  // const { provinces, districts, wards } = await getLocation();

  const [selectedProvince, setSelectedProvince] = useState<number | undefined>(
    undefined,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<number | undefined>(
    undefined,
  );
  const [selectedWard, setSelectedWard] = useState<number | undefined>(
    undefined,
  );

  const handleProvinceChange = (value: number) => {
    setSelectedProvince(value);
    setSelectedDistrict(undefined); // Reset district when province changes
    setSelectedWard(undefined); // Reset ward when province changes
  };

  const handleDistrictChange = (value: number) => {
    setSelectedDistrict(value);
    setSelectedWard(undefined); // Reset ward when district changes
  };

  const onFinish: FormProps<any>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const { images, time, ...rest } = values;
    let uploadImages: any[] = [];

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('file', images[i].originFileObj as File);
      const img = await uploadImage(formData);
      uploadImages.push(img);
    }

    const startTime = time[0].format('HH:mm');
    const endTime = time[1].format('HH:mm');

    postData(
      {
        ...rest,
        sportFieldImages: [...uploadImages],
        startTime,
        endTime,
      },
      'create',
    );
  };

  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className={cn(
        styles.createSportFileContainer,
        'mx-auto mt-12 flex w-1/2 flex-col gap-8 rounded-form bg-neutral p-10',
      )}
    >
      <h4 className="font-bold text-natural-700">Tạo sân</h4>
      <Form
        // form={form}
        name="Create Sport Field"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ minWidth: '100%', maxWidth: 6 }}
        initialValues={{ remember: true }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">
            Thông tin cơ bản
          </p>
          <Form.Item
            label="Tên sân"
            name="name"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Tên sân!' },
              { type: 'string', min: 6, message: 'Tên sân tối thiểu 6 ký tự' },
              {
                type: 'string',
                max: 120,
                message: 'Tên sân không vượt quá 120 ký tự',
              },
            ]}
          >
            <Input
              showCount
              maxLength={120}
              placeholder="Nhập tên sân"
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="sportFieldTypeId"
            rules={[{ required: true, message: 'Vui lòng nhập Danh mục' }]}
          >
            <Select placeholder="Nhập Danh mục">
              {sportFieldTypes.map((sportFieldType) => (
                <Select.Option
                  key={sportFieldType.id}
                  value={sportFieldType.id}
                >
                  {sportFieldType.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div>
            <p className="body-2 mb-5 font-bold text-natural-700">Địa chỉ</p>
            <Form.Item label="Tỉnh/Thành Phố" name="province">
              <Select
                placeholder="Tỉnh"
                onChange={handleProvinceChange}
                value={selectedProvince}
              >
                {provinces.map((province) => (
                  <Select.Option key={province.id} value={province.id}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Quận/Huyện" name="district">
              <Select
                placeholder="Quận/Huyện"
                onChange={handleDistrictChange}
                value={selectedDistrict}
              >
                {districts
                  .filter(
                    (district) =>
                      district.provinceId === selectedProvince?.toString(),
                  )
                  .map((district) => (
                    <Select.Option key={district.id} value={district.id}>
                      {district.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Phường/Xã" name="ward">
              <Select
                placeholder="Phường/Xã"
                value={selectedWard}
                onChange={(value) => setSelectedWard(value)}
              >
                {wards
                  .filter(
                    (ward) => ward.districtId === selectedDistrict?.toString(),
                  )
                  .map((ward) => (
                    <Select.Option key={ward.id} value={ward.id}>
                      {ward.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ' }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </div>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Số điện thoại' },
              {
                type: 'string',
                max: 10,
                message: 'Số điện thoại không vượt quá 9 số',
              },
            ]}
          >
            <Input style={{ width: '100%', borderRadius: '40px' }} />
          </Form.Item>
          <Form.Item
            label="Thời gian mở cửa"
            name={'time'}
            style={{ width: '100%', borderRadius: '40px' }}
            rules={[
              { required: true, message: 'Vui lòng nhập Thời gian mở cửa' },
            ]}
            getValueFromEvent={(e) => e}
          >
            <RangePickerComponent />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Giá tiền</p>
          <Form.Item
            name="price"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Vui lòng nhập Giá tiền',
              },
            ]}
          >
            <InputNumber
              suffix="đ / tiếng"
              style={{ width: '120%', borderRadius: '40px' }}
            />
          </Form.Item>
        </div>

        <div className="flex w-full flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Quy đinh sân</p>
          <Form.Item
            name="rule"
            rules={[{ required: true, message: 'Vui lòng nhập Quy định sân' }]}
            style={{ width: '120%' }}
          >
            <TextArea rows={5} style={{ borderRadius: '20px' }} />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Số sân</p>

          <Form.Item
            name="quantity"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Vui lòng nhập Số sân',
              },
            ]}
            getValueFromEvent={(e) => e}
          >
            <CustomNumberInput />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">
            Hình ảnh{' '}
            <span className="body-5 mx-3 text-natural-400">
              Kích thước tiêu chuẩn 1200*389 px
            </span>
          </p>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normalFiles}
            name="images"
            rules={[{ required: true, message: 'Vui lòng thêm hình ảnh' }]}
          >
            <Upload
              action=""
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              <button
                style={{
                  border: '2px',
                  background: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                type="button"
              >
                <Image
                  src={iconUpImage}
                  alt="icon-up-image"
                  width={40}
                  height={40}
                />
                <div
                  style={{ marginTop: 8 }}
                  className="body-5 text-accent-600"
                >
                  Tải hình ảnh lên
                </div>
              </button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SportFieldForm;
