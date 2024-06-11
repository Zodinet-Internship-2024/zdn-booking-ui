"use client";
import { Button, DatePicker } from "antd";
import { useState } from "react";
import styles from "../styles/CenteredInput.module.scss";
const { RangePicker } = DatePicker;

export default function Test() {
  return (
    <div className={styles.centeredInput}>
      <input type="text" placeholder="123" />
    </div>
  );
}
