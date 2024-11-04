import { timeDiff, getDotColor } from "@/utils/timeDiff";
import { useMemo } from "react";
import { deleteNotifications } from "@/api/notification";
import Dot from "/public/icons/ic_dot.svg";
import Close from "/public/icons/ic_close.svg";

interface NotificationModalProps {
  createdAt: string;
  content: string;
  id: number;
  onDelete: (id: number) => void;
}

const NotificationModal = ({
  createdAt,
  content,
  id,
  onDelete,
}: NotificationModalProps) => {
  const timeText = useMemo(() => timeDiff(createdAt), [createdAt]);
  const dotColor = useMemo(() => getDotColor(timeText), [timeText]);

  const handleDelete = async () => {
    await deleteNotifications(id);
    onDelete(id);
  };

  return (
    <li className="w-[328px] px-3 py-4 mb-2 bg-background border border-green-50 rounded-[5px]">
      <div className="flex justify-between">
        <Dot className={dotColor} />
        <button type="button" onClick={handleDelete}>
          <Close width={24} height={24} />
        </button>
      </div>
      <div className="mb-1 text-[14px] leading-[22px] text-notic-text">
        {content}
      </div>
      <div className="text-[12px] leading-[16px] text-notice-gray-2">
        {timeText}
      </div>
    </li>
  );
};

export default NotificationModal;
