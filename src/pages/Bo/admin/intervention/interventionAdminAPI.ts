import { useEffect, useState } from "react";
import axios from "axios";
import { getInterventionAdmin } from "@config/API/CONST";
import { MaterielData } from "./model";



export const useGetInterventionAdmin = (id: string) => {
    const [response, setResponse] = useState<MaterielData[]>([]);
    const [error, setError] = useState<string>();
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        (async () => {
          setIsloading(true);
          try {
            const res = await getInterventionAdmin(id);
              
            setResponse( res.data.data.materiels);
          } catch (e) {
            if (axios.isAxiosError(e)) {
              setError(e.response?.data.message);
            } else {
              setError("Une erreur inattendue s'est produite.");
            }
          }
          setIsloading(false);
        })();
      }, [id]);
    
      return {
        response,
        error,
        isloading,
      };
}