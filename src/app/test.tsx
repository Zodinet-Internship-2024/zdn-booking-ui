'use client';
import { Button, DatePicker } from 'antd';
import { useState } from 'react';

const { RangePicker } = DatePicker;

export default function Test() {
    const [info, setInfo] = useState('');
    return (
        <RangePicker
            picker="month"
            format="YYYY-MM-DD"
            onChange={(dateString, info) => {
                console.log(dateString);
            }}
        />
    );
}
