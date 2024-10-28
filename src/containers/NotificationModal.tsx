import { useEffect, useState, useMemo } from "react";
import Close from "/public/icons/ic_close.svg";
import Dot from "/public/icons/ic_dot.svg";
import { getNotifications, deleteNotifications } from "@/api/notification";
import { timeDiff, getDotColor } from "@/utils/timeDiff";

interface Notification {
  createdAt: string;
  content: string;
  id: number;
}

interface NotificationModalProps {
  createdAt: string;
  content: string;
  id: number;
  // onDelete: (id: number) => void;
}

const NotificationModal = ({
  createdAt,
  content,
  id,
  // onDelete,
}: NotificationModalProps) => {
  const timeText = useMemo(() => timeDiff(createdAt), [createdAt]);
  const dotColor = useMemo(() => getDotColor(timeText), [timeText]);

  const handleDelete = async () => {
    await deleteNotifications(id);
    // onDelete(id);
  };

  return (
    <div className="w-[328px] px-3 py-4 mb-2 bg-background border border-green-50 rounded-[5px]">
      <div className=" flex justify-between">
        <Dot className={dotColor} />
        <button type="button" onClick={handleDelete}>
          <Close width={24} height={24} />
        </button>
      </div>
      <div className="mb-1 text-[14px] leading-[22px] text-notic-text">
        {content}
      </div>
      <div className="text-[12px] leading-[16px] text-notice-gray-2">
        {timeDiff(createdAt)}
      </div>
    </div>
  );
};

const NotificatonModalList = () => {
  // const [totalCount, setTotalCount] = useState<number>(0);
  // const [notifications, setNotifications] = useState<Notification[]>([]);

  const test = [
    {
      id: 1,
      content: "내 위키가 수정되었습니다.",
      createdAt: "2024-10-20T15:30:00",
    },
    {
      id: 2,
      content: "새로운 댓글이 달렸습니다.",
      createdAt: "2024-10-21T12:00:00",
    },
    {
      id: 3,
      content: "좋아요를 받았습니다.",
      createdAt: "2024-10-22T18:15:00",
    },
    {
      id: 4,
      content: "새로운 팔로워가 생겼습니다.",
      createdAt: "2024-10-28T08:45:00",
    },
    {
      id: 5,
      content: "프로필이 업데이트되었습니다.",
      createdAt: "2024-10-28T20:00:00",
    },
  ];

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const res = await getNotifications({ page: 1, pageSize: 10 });
  //     console.log(res)
  //     setTotalCount(res.totalCount);
  //     setNotifications(res.list);
  //   };
  //   fetchNotifications();
  // }, []);

  // const handleDelete = (id: number) => {
  //   setNotifications((prev) =>
  //     prev.filter((notification) => notification.id !== id)
  //   );
  // };

  // if (totalCount === 0) {
  //   return <div className="w-[328px]">새로운 알림이 없습니다.</div>;
  // }

  return (
    <>
      <div>
        <div className="mt-1 text-[25px] leading-[25.04px] font-bold text-notice-text mb-4">
          {`알림${test.length}개`}
        </div>
        {test.map((notification) => (
          <NotificationModal
            key={notification.id}
            id={notification.id}
            createdAt={notification.createdAt}
            content={notification.content}
            // onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default NotificatonModalList;
