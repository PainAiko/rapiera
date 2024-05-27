import axios from "axios";
import {
  getTechnicienInfo,
  updateTechincienInfo,
} from "@config/API/CONST";
import { useState, useEffect } from "react";
import { UpdateData } from "./Model";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const useGetTechnicienInfo = (id: number) => {
  const [response, setResponse] = useState<{[key: string]: string}>();
  const [error, setError] = useState<string>();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        if(!id) {
          return
        }
        const res = await getTechnicienInfo(id);
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
  }, [id]);

  return {
    response,
    error,
    isloading,
  };
};

export const updateTechnicienInfo = createAsyncThunk(
  "update-tech-info",
  async (credentials: {id: number,
    datas: UpdateData}) => {
      try {
        const res = await updateTechincienInfo(credentials.id,credentials.datas);
  
        return res.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw new Error(e.response?.data.message);
        } else {
          throw new Error("Une erreur inattendue s'est produite.");
        }
      }
  }
) 