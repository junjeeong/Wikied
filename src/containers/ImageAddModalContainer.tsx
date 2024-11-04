import { useState, useRef, useEffect } from "react";
import Camera from "/public/icons/ic_camera.svg";
import Image from "next/image";
import { postImage } from "@/api/image";
import ModalOverlay from "@/components/ModalOverlay";

interface ImageAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUpload: (url: string) => void; //부모 페이지에서 보여주기 위해 전달
}

const ImageAddModalContainer = ({
  isOpen,
  onClose,
  onImageUpload,
}: ImageAddModalProps) => {
  const [preview, setPreview] = useState<string>(""); //미리보기
  const [file, setFile] = useState<File | null>(null); //post 보낼 file
  const [failedMsg, setFailedMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      const localPreview = URL.createObjectURL(selectedFile);
      setPreview(localPreview);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    const convertFileName = (fileName: string) => {
      return fileName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    };

    if (file) {
      const maxSizeInMB = 5;
      if (file.size / 1024 / 1024 > maxSizeInMB) {
        alert(
          `파일 크기가 너무 큽니다. ${maxSizeInMB}MB 이하의 파일을 선택해주세요.`
        );
      }

      const newFileName = convertFileName(file.name);
      const newFile = new File([file], newFileName, { type: file.type });
      const formData = new FormData();
      formData.append("image", newFile);

      try {
        const res = await postImage(formData);
        onClose();
        setPreview("");
        if (res && res.url) {
          onImageUpload(res.url);
        }
      } catch (error) {
        setFailedMsg("이미지 업로드에 실패했습니다.");
      } finally {
        setPreview("");
        setFailedMsg("");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col items-center gap-5 pt-[30px] mb-5">
          <span className="text-2lg font-semibold">이미지</span>
          <label
            htmlFor="image"
            className="flex rounded-[10px] text-gray-300 bg-gray-100 w-[354px] h-[160px] relative Mobile:w-[240px] Mobile:h-[160px]"
          >
            {preview ? (
              <Image
                src={preview}
                alt="미리보기"
                width={354}
                height={160}
                className="object-cover w-full h-full rounded-[10px]"
              />
            ) : (
              <Camera
                width={36}
                height={36}
                className="absolute top-[62px] left-[159px] Mobile:left-[102px]"
              />
            )}
          </label>
          <input
            ref={inputRef}
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          ></input>
        </div>
        {failedMsg && (
          <span className="text-red-200" role="alert">
            {failedMsg}
          </span>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            className={`rounded-[10px] text-background text-md font-semibold px-5 py-[8px] ${
              preview ? "bg-green-200" : "bg-gray-300"
            }`}
            onClick={handleUpload}
            disabled={!preview}
          >
            삽입하기
          </button>
        </div>
      </ModalOverlay>
    </>
  );
};

export default ImageAddModalContainer;
