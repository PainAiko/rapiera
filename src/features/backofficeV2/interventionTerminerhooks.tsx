import axios from 'axios';
import { useEffect, useState } from 'react'
import { getAllInterventionTerminer } from '@config/API/CONST';

function useInterventionTerminerhooks() {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState<string>();
    const [isloading, setIsloading] = useState(false);
  
    useEffect(() => {
      (async () => {
        setIsloading(true);
        try {
          const res = await getAllInterventionTerminer();
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
}

export default useInterventionTerminerhooks
