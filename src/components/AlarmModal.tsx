import ModalOverlay from "./ModalOverlay";
import Alarm from "/public/icons/ic_alarm.svg";
import NotificationModalContainer from "../containers/NotificationModalContainer";

interface AlarmModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newAlarmExist: boolean;
  setNewAlarmExist: (isExist: boolean) => void;
}

const AlarmModal = ({
  isOpen,
  setIsOpen,
  newAlarmExist,
  setNewAlarmExist,
}: AlarmModalProps) => {
  return (
    <>
      <Alarm
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer text-gray-400 hover:text-gray-500 Mobile:hidden"
      />
      {/* <div>
        <NotificationModalContainer
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        />
      </div> */}
    </>
  );
};

export default AlarmModal; // default export 문법 수정
