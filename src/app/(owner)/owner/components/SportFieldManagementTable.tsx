import React from 'react';
import { Dropdown, Space, Table, Tag } from 'antd';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import styles from './sportFieldManagement.module.scss';
import { useRouter } from 'next/navigation';

interface SportFieldManagementTableProps {
  filter: string;
  sportFields: SportField[];
}

const SportFieldManagementTable: React.FC<SportFieldManagementTableProps> = ({
  filter,
  sportFields,
}) => {
  type DataType = {
    key: React.Key;
    id: string;
    name: string;
    category: string;
    quantity: number;
    address: string;
  };
  const router = useRouter();

  const items = (fieldId: string) => [
    { key: '1', label: 'Chỉnh sửa' },
    { key: '2', label: 'Chi tiết', onClick: () => handleEdit(fieldId) },
    { key: '3', label: 'Quản lý đặt chỗ' },
  ];
  const handleEdit = (id: string) => {
    console.log(id);
    router.push(`owner/field-detail/${id}`);
  };
  const dataSource = sportFields?.map((sportField, index) => ({
    key: index + 1,
    id: sportField.id,
    name: sportField?.name ?? '',
    category: sportField?.sportFieldType?.name ?? '',
    quantity: sportField?.quantity ?? '',
    address: sportField?.location?.addressDetail ?? '',
  }));

  const columns: ColumnsType<DataType> = [
    // Changed to ColumnsType<DataType>
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      ellipsis: true,
      width: 62,
      render: (key: React.Key) => (
        <p style={{ color: '#5D5E5B' }} key={key}>
          {key}
        </p>
      ),
    },
    {
      title: 'Tên sân',
      dataIndex: 'name',
      key: 'name',
      width: 320,
      ellipsis: {
        showTitle: false,
      },
      render: (name: string) => (
        <Tooltip
          placement="topLeft"
          title={name}
          style={{ color: '#5D5E5B' }}
          key={name}
        >
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 200,
      render: (category: string) => (
        <p style={{ color: '#5D5E5B' }} key={category}>
          {category}
        </p>
      ),
    },
    {
      title: 'Số lượng sân/bàn',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 190,
      render: (quantity: number) => (
        <p style={{ color: '#5D5E5B' }} key={quantity}>
          {quantity}
        </p>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 512,
      ellipsis: {
        showTitle: false,
      },
      render: (address: string) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 72,
      ellipsis: true,
      render: (_, record) => (
        <Space size="middle">
          <Dropdown menu={{ items: items(record.id) }} placement="bottomRight">
            <a>
              <MoreOutlined style={{ color: '#939393' }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={false}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        tableLayout="fixed"
      />
    </div>
  );
};

export default SportFieldManagementTable;
