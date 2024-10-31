import { useEffect, useState } from "react";
import { getNotifications } from "@/api/notification";
import NotificationModal from "@/components/NotificationModal";
import NotificationModalOverlay from "@/components/NotifiCationModalOverlay";

interface Notification {
  createdAt: string;
  content: string;
  id: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificatonModalContainer = ({ isOpen, onClose }: ModalProps) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications({ page: 1, pageSize: 10 });
      console.log(res);
      setTotalCount(res.totalCount);
      setNotifications(res.list);


    };

    fetchNotifications();
  }, [isOpen]);

  const handleDelete = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    setTotalCount((prev) => prev - 1);
  };

  return totalCount === 0 ? (
    <NotificationModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="w-[328px] mt-10 px-3 py-4 font-semibold bg-background border border-green-50 rounded-[5px]">
        새로운 알림이 없습니다.
      </div>
    </NotificationModalOverlay>
  ) : (
    <NotificationModalOverlay isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="mt-1 text-[25px] leading-[25.04px] font-bold text-notice-text mb-4">
          {`알림${totalCount}개`}
        </div>
        <ul>
          {notifications.map((notification) => (
            <NotificationModal
              key={notification.id}
              id={notification.id}
              createdAt={notification.createdAt}
              content={notification.content}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </NotificationModalOverlay>
  );
};

export default NotificatonModalContainer;
