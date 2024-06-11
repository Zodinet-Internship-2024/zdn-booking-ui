"use client";
import React from "react";
import { ConfigProvider, Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import styles from "./SearchBar.module.scss";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const SearchBar: React.FC = () => (
  <Search
    className="w-[486px] h-10 grid items-center"
    placeholder="input search text"
    onSearch={onSearch}
    enterButton
  />
);

export default SearchBar;
