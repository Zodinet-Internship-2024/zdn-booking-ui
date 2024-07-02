import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";

const SearchBreadcrumb = () => {
  return (
    <div className="mb-6 flex items-center">
      <Link
        href="/home"
        className="mr-3 cursor-pointer text-sm font-medium text-natural-400"
      >
        Trang chủ
      </Link>
      <RightOutlined className="mr-3 h-4 w-4 text-natural-400" />
      <p className="cursor-pointer text-sm font-medium text-primary-600">
        Kết quả tìm kiếm
      </p>
    </div>
  );
};
export default SearchBreadcrumb;
