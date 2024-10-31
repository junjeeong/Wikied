import { useEffect, useState } from "react";
import { toast, ToastOptions } from "react-toastify";

const useNotify = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const notify = (
    message: string,
    type: "info" | "success" | "warning" | "error"
  ) => {
    if (!isToastVisible) {
      setIsToastVisible(true);

      const toastOptions: ToastOptions = {
        onClose: () => setIsToastVisible(false),
        position: isMobile ? "bottom-center" : "top-center",
        autoClose: 2000,
        closeButton: false,
        pauseOnHover: false,
        draggable: true,
        closeOnClick: true,
        bodyClassName: "font-pretendard text-md font-semibold p-0 m-0",
        className:
          "px-[20px] py-[13px] rounded-[10px] border inline-block whitespace-nowrap mt-[120px] Tablet:mt-[100px] Mobile:mb-[80px]",
      };

      switch (type) {
        case "info":
          toast.info(message, {
            ...toastOptions,
            bodyClassName: `${toastOptions.bodyClassName} text-blue-500`,
            className: `${toastOptions.className} bg-blue-100 border-blue-500`,
          });
          break;
        case "success":
          toast.success(message, {
            ...toastOptions,
            bodyClassName: `${toastOptions.bodyClassName} text-green-300`,
            className: `${toastOptions.className} bg-green-50 border-green-200`,
          });
          break;
        case "warning":
          toast.warning(message, {
            ...toastOptions,
            bodyClassName: `${toastOptions.bodyClassName} text-yellow-500`,
            className: `${toastOptions.className} bg-amber-50 border-yellow-500`,
          });
          break;
        case "error":
          toast.error(message, {
            ...toastOptions,
            bodyClassName: `${toastOptions.bodyClassName} text-red-200`,
            className: `${toastOptions.className} bg-red-100 border-red-200`,
          });
          break;
      }
    }
  };

  return notify;
};

export default useNotify;
