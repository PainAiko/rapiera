import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { useGetNotificationsCall } from "./hooks/getNotificationCall";
import { useEffect, useRef } from "react";
import {
  notificationNextpage,
  setNextNotificationPage,
  setNotifications,
} from "@entities/backofficev2/notificationCall";
import Error from "@shared/components/Error";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import ListNotification from "./ui/ListNotification";

type Props = {};

export default function NotificationCallFeatures({}: Props) {
  const { response, isloading, error } = useGetNotificationsCall();
  const { notifications, next_page } = useAppSelector(
    (state) => state.notificationCall
  );
  const dispatch = useAppDispatch();
  const observerRef = useRef(null);

  useEffect(() => {
    if (response) {
      dispatch(setNotifications(response.data));
      response.next_page_url && dispatch(setNextNotificationPage(2));
    }
  }, [response?.data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Si l'élément observé est dans la vue, charge plus d'éléments
          next_page && dispatch(notificationNextpage(next_page));
          //   fetchMoreItems();
        }
      },
      { threshold: 1 } // Déclenche l'intersection lorsque l'élément est entièrement visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, next_page]);
  return (
    <>
      {error && <Error error={error} />}
      {isloading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full h-full overflow-scroll">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((value, index) => {
                return (
                  <ListNotification
                    key={index}
                    userName={value.techName}
                    timeStamp={value.triggeredAt}
                    meetLink={value.meetLink}
                  />
                );
              })}
              <div ref={observerRef}>{next_page && <LoadingComponent />}</div>
            </div>
          ) : (
            <h2 className="text-3xl flex items-center w-full h-full justify-center">
              Aucun appels aujourd'hui.
            </h2>
          )}
        </div>
      )}
    </>
  );
}
