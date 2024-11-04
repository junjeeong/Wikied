import useAuthStore from "@/store/AuthStore";
import FilledButton from "./ui/Button/FilledButton";
import { useRouter } from "next/router";
import ModalOverlay from "./ModalOverlay";

//위키 참여하기 버튼을 누르고 5분 후에 ConnectLostModal 띄우기

interface ConnectLostModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCancel: () => void;
}

const ConnectLostModal = ({
  isOpen,
  onClose,
  handleCancel,
}: ConnectLostModalProps) => {
  const handelClickConfirm = () => {
    handleCancel();
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} handleCancel={handleCancel}>
      <div className="flex flex-col justify-center gap-[10px] pl-[10px] pr-[38px] pt-10 pb-[33px] Mobile:pl-0 Mobile:pr-[22px]">
        <span className="font-semibold text-gray-500 text-2lg Mobile:text-lg">
          5분 이상 글을 쓰지 않아 접속이 끊어졌어요.
        </span>
        <span className="text-lg text-gray-400 Mobile:text-md">
          위키 참여하기를 통해 다시 위키를 수정해 주세요.
        </span>
      </div>
      <div className="flex justify-end">
        <FilledButton size="small" onClick={handelClickConfirm}>
          확인
        </FilledButton>
      </div>
    </ModalOverlay>
  );
};

export default ConnectLostModal;
