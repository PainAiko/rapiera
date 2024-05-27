import { getLog } from "@shared/config/API/CONST";
import axios from "axios";
import { useEffect, useState } from "react";
import { LogData } from "../Modal";

export const useGetLog = () => {
  const [response, setResponse] = useState<LogData>();
  const [error, setError] = useState<string>();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        const res = await getLog();
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
