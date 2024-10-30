import Alarm from "/public/icons/ic_alarm.svg";
import NotificatonModalContainer from "@/containers/NotificationModalContainer";

interface AlarmModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AlarmModal = ({ isOpen, setIsOpen }: AlarmModalProps) => {
  return (
    <>
      <Alarm
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer text-gray-400 hover:text-gray-500 Mobile:hidden"
      />
      {isOpen && (
        <div className="absolute -bottom-[50%] right-[80px]">
          <NotificatonModalContainer />
        </div>
      )}
    </>
  );
};

export default AlarmModal; // default export 문법 수정
