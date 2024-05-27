import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { resetNotification } from "@entities/backofficev2/notificationCall";
import { ROLE } from "@shared/utils/ROLE";
import { getRole } from "@shared/utils/getToken";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function CallNotification({}: Props) {
  const { newNotification } = useAppSelector((state) => state.notificationCall);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const checkNotification = () => {
    dispatch(resetNotification());
    navigate("/dashboard/notification-call")
  };
  return <>
  {
    (getRole() && (getRole() === ROLE.ADMIN || getRole() === ROLE.SUPER_ADMIN)) && <div
    className="relative text-2xl rounded-full border border-black cursor-pointer transition-colors duration-200 ease-in-out"
    onClick={checkNotification}
  >
    <i className="fa-solid fa-phone p-2 hover:text-primary text-gray "></i>
    {newNotification > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {newNotification}
      </span>
    )}
  </div>
  }
  </>
}
