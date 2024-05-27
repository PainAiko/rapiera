import axios from "axios";
import { useState, useEffect } from "react";
import { Data } from "./Model";
import { getAdmin, getInterventionInfo } from "@config/API/CONST";



export const useGetInterventionInfo = (interventionId: string) => {
  const [response, setResponse] = useState<Data | null>(null);
    const [error, setError] = useState<string>("");
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
      (async () => {
        setIsloading(true);
        try {
          const res = await getInterventionInfo(interventionId);
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
    }, [interventionId]);

    return {
      response,
      error,
      isloading,
    };
}

export const useGetAllAdminService = () => {
    const [response, setResponse] = useState<Record<string, []>>({});
    const [error, setError] = useState<string>("");
    const [isloading, setIsloading] = useState(false);
  
    useEffect(() => {
      (async () => {
        setIsloading(true);
        try {
          const res = await getAdmin();
          if (res?.status === 200) {
            setResponse(res.data);
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