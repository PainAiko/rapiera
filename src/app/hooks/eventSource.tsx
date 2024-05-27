import { APInotifcation } from "@shared/config/API/CONST";
import { ROLE } from "@shared/utils/ROLE";
import { getRole, headersNotification } from "@shared/utils/getToken";
import { askForJoinCall } from "@shared/utils/popupSwealert";
import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import notifSound from "../../shared/assets/audio/notification.wav";
import { useAppDispatch } from "./App";
import {
  decriseNotification,
  incriseNotification,
} from "@entities/backofficev2/notificationCall";

export interface DataNotification {
  message: string;
  meetLink: string;
  time: string;
  id: number;
}

export const notificationSound = () => {
  return new Audio(notifSound);
};

export const useGetNotificationForCall = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let eventSource: EventSource | undefined;
    if (
      getRole() &&
      (getRole() === ROLE.SUPER_ADMIN || getRole() === ROLE.ADMIN)
    ) {
      eventSource = new EventSourcePolyfill(APInotifcation.getNotification, {
        headers: headersNotification(),
      });

      eventSource.onmessage = (ev: MessageEvent<any>) => {
        dispatch(incriseNotification());
        const data: DataNotification = JSON.parse(ev.data);
        notificationSound().play();
        askForJoinCall(
          data.message,
          data.meetLink,
          () => {
            dispatch(decriseNotification());
          },
          () => {
            dispatch(decriseNotification());
          }
        );
      };
    }
    return () => {
      eventSource?.close();
    };
  }, []);
};
