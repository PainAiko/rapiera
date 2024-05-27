import axios from "axios";
import { useState, useEffect } from "react";
import instance from "@config/API";
import { InterventionDetail } from "./Modal";

const getRapportIntervention = () => instance.get(`/rapports`)

export const useGetRapportIntervention = () => {
    const [response, setResponse] = useState<InterventionDetail[]>([]);
    const [error, setError] = useState<string>();
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        (async () => {
          setIsloading(true);
          try {
            const res = await getRapportIntervention();
            
            setResponse( res.data);
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
}