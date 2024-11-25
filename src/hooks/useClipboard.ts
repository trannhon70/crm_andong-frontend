

import { useState } from "react";
import { message } from "antd";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      message.success("Copy thành công!"); // Thông báo thành công
    } catch (error) {
      setIsCopied(false);
      message.error("Copy không thành công!"); // Thông báo lỗi
    }
  };

  return { isCopied, copyToClipboard };
};

export default useClipboard;