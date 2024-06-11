// "use client";
// import React, { useState } from "react";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { Flex, message, Upload } from "antd";
// import type { GetProp, UploadProps } from "antd";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

// const UploadAvatar: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string>();

//   const handleChange: UploadProps["onChange"] = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj as FileType, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );

//   return (
//     <Flex gap="middle" wrap>
//       <Upload
//         name="avatar"
//         listType="picture-circle"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//       >
//         {imageUrl ? (
//           <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
//         ) : (
//           uploadButton
//         )}
//       </Upload>
//     </Flex>
//   );
// };

// export default UploadAvatar;


"use client";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import { RcFile } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
    return false;
  }
  return isJpgOrPng && isLt2M;
};

const UploadAvatar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Simulate an API call delay
      setTimeout(() => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }, 1000);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess && onSuccess("ok");
        }, 1000);
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadAvatar;
