'use client';
import type { FormProps, GetProp, UploadFile, UploadProps } from 'antd';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import dayjs from 'dayjs';
import iconUpImage from '/public/images/icons_add_image.png';
import CustomNumberInput from './CustomNumberInput';
import RangePickerComponent from '@/components/common/RangePickerComponent';
// import { District, Province, Ward } from '@/types/location.type';
import { uploadImage } from '../../apis/upload-img.api';
import { postData } from '../../apis/create-sport-field.api';
import styles from './SportFieldForm.module.scss';

import { CATEGORY_MAPPING, CRUD_ACTIONS } from '@/constants/constant';

import { cn } from '@/libs/utils';
import { isObject } from 'util';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const MAX_IMAGE_COUNT = 5;

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

  return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
};

type SportFieldFormProps = {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  sportFieldTypes: SportFieldType[];
  defaultValues?: SportField | null;
  label?: string | 'create';
};

const SportFieldForm: React.FC<SportFieldFormProps> = ({
  provinces,
  districts,
  wards,
  sportFieldTypes,
  defaultValues,
  label = 'create',
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    undefined,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(
    undefined,
  );
  const [selectedWard, setSelectedWard] = useState<string | undefined>(
    undefined,
  );

  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultValues?.sportFieldImages.map((img) => {
      return {
        uid: img.id || '',
        name: img.name,
        status: 'done',
        url: img.url,
      };
    }) || [],
  );

  const [removeFile, setRemoveFile] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const [form] = Form.useForm();

  const handleChangeFile: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    form.setFieldsValue({ images: newFileList });
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict(undefined);
    setSelectedWard(undefined);
    form.setFieldsValue({
      district: undefined,
      ward: undefined,
    });
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedWard(undefined);
    form.setFieldsValue({
      ward: undefined,
    });
  };

  const onFinish: FormProps<any>['onFinish'] = async (values) => {
    setLoading(true);
    message.loading({ content: 'Đang xử lý...', key: 'loading' });
    const { phone, fields, images, time, ...rest } = values;
    let uploadImages: any[] = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i].originFileObj) {
        const formData = new FormData();
        formData.append('file', images[i].originFileObj as File);
        const result = await uploadImage(formData);
        uploadImages.push(result);
      }
    }
    const province = provinces.find((p) => p.id === selectedProvince);
    const district = districts.find((d) => d.id === selectedDistrict);
    const ward = wards.find((w) => w.id === selectedWard);

    const startTime = isObject(time[0]) ? time[0].format('HH:mm') : time[0];
    const endTime = isObject(time[1]) ? time[1].format('HH:mm') : time[1];

    const location = {
      id: defaultValues?.location?.id,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      wardId: selectedWard,
      addressDetail: `${rest.address}, ${ward?.name}, ${district?.name}, ${province?.name}`,
    };

    const result = await postData(
      {
        id: defaultValues?.id,
        ...rest,
        phone: `0${phone}`,
        sportFieldImages: [...uploadImages],
        removeImageIds: removeFile.map((uid) => {
          if (uid.includes('rc-upload')) {
            return;
          } else {
            return uid;
          }
        }),
        location,
        startTime: startTime < endTime ? startTime : endTime,
        endTime: startTime < endTime ? endTime : startTime,
      },
      label,
    );

    if (result.statusCode === 201 || result.statusCode === 200) {
      setLoading(false);
      message.success(result.message);
      router.push('/owner?type=all');

      // } else if (result.status === 200) {
      //   message.success(result.message);
    } else {
      setLoading(false);
      message.error(result.message);
    }
  };

  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    message.error('Lỗi: ' + errorInfo);
  };

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        name: defaultValues.name,
        sportFieldTypeId: defaultValues.sportFieldTypeId,
        phone: defaultValues.phone.slice(1),
        // address: defaultValues.location ? defaultValues.location.address : '',
        price: defaultValues.price,
        rule: defaultValues.rule,
        quantity: defaultValues.quantity,
        images: defaultValues.sportFieldImages,
        time: [defaultValues.startTime, defaultValues.endTime],
      });

      if (defaultValues.location) {
        form.setFieldsValue({
          province: defaultValues.location?.provinceId
            ? defaultValues.location.provinceId
            : '',
          district: defaultValues.location?.districtId
            ? defaultValues.location.districtId
            : '',
          ward: defaultValues.location?.wardId
            ? defaultValues.location.wardId
            : '',

          address: defaultValues.location.addressDetail.split(', ')[0],
        });
        setSelectedProvince(defaultValues.location.provinceId);
        setSelectedDistrict(defaultValues.location.districtId);
        setSelectedWard(defaultValues.location.wardId);
      }
    } else {
      form.setFieldsValue({
        quantity: 1,
      });
    }
  }, [defaultValues]);

  const onCancel = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        styles.createSportFileContainer,
        '3xl:w-1/2 rounded-form mx-auto mt-12 flex w-1/2 flex-col gap-8 bg-neutral p-10 md:w-11/12 lg:w-4/5 xl:w-3/4 2xl:w-2/3',
      )}
    >
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <ArrowLeftOutlined className="mr-4 text-xl" />
        </button>

        <h4 className="font-bold text-natural-700">
          {`${CRUD_ACTIONS[label]} sân`}
        </h4>
      </div>

      <Form
        form={form}
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
                  {CATEGORY_MAPPING[sportFieldType.name]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Địa chỉ">
            <Space.Compact block>
              <Form.Item
                noStyle
                label="Tỉnh/Thành Phố"
                name="province"
                rules={[
                  { required: true, message: 'Vui lòng chọn tỉnh/thành phố' },
                ]}
              >
                <Select
                  placeholder="Tinh/Thành Phố"
                  onChange={handleProvinceChange}
                  value={selectedProvince}
                >
                  {provinces.map((province) => {
                    return (
                      <Select.Option key={province.id} value={province.id}>
                        {province.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Quận/Huyện"
                noStyle
                name="district"
                dependencies={['province']}
                rules={[
                  { required: true, message: 'Vui lòng chọn quận/huyện' },
                ]}
              >
                <Select
                  disabled={!selectedProvince}
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
                      <Option key={district.id} value={district.id}>
                        {district.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                label="Phường/Xã"
                name="ward"
                dependencies={['province', 'district']}
                rules={[
                  { required: false, message: 'Vui lòng chọn phường/xã' },
                ]}
              >
                <Select
                  disabled={!selectedDistrict}
                  placeholder="Phường/Xã"
                  value={selectedWard}
                  onChange={(value) => setSelectedWard(value)}
                >
                  {wards
                    .filter(
                      (ward) =>
                        ward.districtId === selectedDistrict?.toString(),
                    )
                    .map((ward) => (
                      <Option key={ward.id} value={ward.id}>
                        {ward.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Space.Compact>
            <br />
            <Form.Item
              // label="Địa chỉ"
              name="address"
              rules={[
                { required: true, message: 'Vui lòng nhập Địa chỉ chi tiết' },
              ]}
            >
              <Input
                placeholder="Nhập địa chỉ chi tiết"
                style={{ width: '100%', borderRadius: '40px' }}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Số điện thoại' },
              {
                type: 'string',
                len: 9,
                message: 'Số điện thoại không vượt quá 9 số',
              },
            ]}
          >
            <Input
              prefix="(+84) "
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Thời gian mở cửa"
            name={'time'}
            style={{ width: '100%', borderRadius: '40px' }}
            rules={[
              { required: true, message: 'Vui lòng nhập Thời gian mở cửa' },
            ]}
            getValueFromEvent={(e) => {
              console.log(e);
              return e;
            }}
          >
            <RangePickerComponent
              defaultValue={
                defaultValues
                  ? [defaultValues.startTime, defaultValues.endTime]
                  : undefined
              }
            />
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
              suffix="VND/giờ"
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
            <CustomNumberInput
              value={defaultValues?.quantity}
              isDisabled={label === 'edit'}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">
            Hình ảnh{' '}
            <span className="body-5 mx-3 text-natural-400">
              Kích thước tiêu chuẩn 360*280 px
            </span>
            <span className="body-5 mx-3 text-natural-400">
              Tối đa 5 hình ảnh
            </span>
          </p>
          <Form.Item
            valuePropName="fileList"
            name="images"
            rules={[{ required: true, message: 'Vui lòng thêm hình ảnh' }]}
          >
            <ImgCrop rotationSlider aspect={36 / 28}>
              <Upload
                action=""
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChangeFile}
                onRemove={(file) => setRemoveFile([...removeFile, file.uid])}
                listType="picture-card"
                maxCount={MAX_IMAGE_COUNT}
              >
                {fileList.length < MAX_IMAGE_COUNT && (
                  <button
                    disabled={fileList.length == MAX_IMAGE_COUNT}
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
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </div>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          className={cn(styles.buttonCustom, 'flex justify-end')}
        >
          <Button type="primary" htmlType="submit" disabled={loading}>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SportFieldForm;
