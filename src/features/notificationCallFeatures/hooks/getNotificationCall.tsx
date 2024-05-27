import { getNotificationCall } from "@shared/config/API/CONST";
import { useEffect, useState } from "react";
import { NotificationCallData } from "../model";
import axios from "axios";

export const useGetNotificationsCall = () => {
  const [response, setResponse] = useState<NotificationCallData>();
  const [error, setError] = useState<string>();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        const res = await getNotificationCall();
        if (res?.status === 200) {
          setResponse(res.data.data);
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data.message);
        } else {
          setError("Une erreur inattendue s'est produite.");
        }
      }
      setIsloading(false);
    })();
  }, []);
  return {
    response,
    error,
    isloading,
  };
};
