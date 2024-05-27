import axios from "axios";
import { useEffect, useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInterventionInfo, getPhotoIntervention, photoSupplementaire, sendPhotoIntervention } from "@config/API/CONST";
import { Material } from  "@pages/rapport/Model";
import { Photo, additionnalPhotoSerializer } from "@shared/utils/serialize";

export interface PhotoType {
  type: string;
  data: FormData;
}

export const sendPhotosupplementaire = createAsyncThunk(
  "send-photo-supplementaire",
  async (credentials: { interventionId: string; data: FormData }) => {
    try {
      const res = await photoSupplementaire(credentials);

      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
);

export const sendPhoto = createAsyncThunk(
  "send-photo-intervention",
  async (credentials: PhotoType) => {
    try {
      const res = await sendPhotoIntervention(credentials);

      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
);

export const useGetPhotoIntervention = (
  interventionId: string,
  materielId: string
) => {
  const [response, setResponse] =
    useState<Material | Photo>();
  const [error, setError] = useState<string>();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        if(!interventionId) {
          setIsloading(false);
          return
        }
        if(!materielId) {
          const res = await getInterventionInfo(interventionId)
          if (res?.status === 200) {
            setResponse(additionnalPhotoSerializer(res.data.data.interventionParent.additionnalPhoto));
          }
          setIsloading(false);
          return
        }
        const res = await getPhotoIntervention({
          interventionId,
          materielId,
        });
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
  }, [interventionId, materielId]);

  return {
    response,
    error,
    isloading,
  };
};
