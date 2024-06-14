import React from 'react';
import { Dropdown, Space, Table, Tag } from 'antd';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { sportField } from '@/mocks/sport-fields';
import { MoreOutlined } from '@ant-design/icons';
import styles from './sportFieldManagement.module.scss';

const SportFieldManagementTable = () => {
  type DataType = {
    key: React.Key;
    id: string;
    name: string;
    category: string;
    quantity: number;
    address: string;
  };

  const items = [
    { key: '1', label: 'Chỉnh sửa' },
    { key: '2', label: 'Chi tiết' },
    { key: '3', label: 'Quản lý đặt chỗ' },
  ];

  // Extracting required fields
  const sportFields = Array(80).fill(sportField);

  const dataSource = sportFields.map((field, index) => ({
    key: index + 1,
    id: field.id,
    name: field.name,
    category: field.sportFieldType.name,
    quantity: field.quantity,
    address: field.location.addressDetail,
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
      render: () => (
        <Space size="middle">
          <Dropdown menu={{ items }} placement="bottomRight">
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
