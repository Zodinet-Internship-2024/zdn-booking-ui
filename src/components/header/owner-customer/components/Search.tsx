"use client";
import React from "react";
import { ConfigProvider, Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import styles from "./search.module.scss";
import { cn } from "@/libs/utils";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const SearchBar: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#F4F1FF",
        colorPrimaryActive: "#967DDD",
        borderRadius: 40,
        controlHeight: 12,
        fontSize: 16,
        lineWidth: 0,
      },
      components: {
        Input: {
          inputFontSizeLG: 14,
          paddingBlockLG: 10,
          paddingInlineLG: 16,
          colorText: "#40423F",
          colorTextPlaceholder: "#939393",

          addonBg: "#ffffff",
        },
      },
    }}
  >
    <Search
      className={cn(styles.searchContainer, "w-[486px] h-10 grid items-center")}
      placeholder="Tìm kiếm..."
      onSearch={onSearch}
      style={{ width: "486px" }}
      enterButton
      size="large"
      id="search-bar"
    />
  </ConfigProvider>

  // <Input addonBefore={<MessageOutlined style={{ fontSize: '16px', color: '#ff0000' }} />} placeholder="large size" />
);

export default SearchBar;
