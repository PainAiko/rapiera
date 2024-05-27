import { ChangeEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { sendPhoto, sendPhotosupplementaire } from "./photoInterventionAPI";
import { HandlerArgs, TypeImage, InitialState } from "./Model";
import { compressFile } from "@shared/utils/compressFile";

export function usePhotoInterventionHandler({
  images,
  types,
  desc,
  description,
  materielId,
}: HandlerArgs) {
  const { ok, loading, photos } = useAppSelector(
    (state) => state.photoIntervention
  );
  const { interventionId } = useAppSelector((state) => state.homePage);
  const { interventionType } = useAppSelector((state) => state.mapAppareil);

  const fileInputRef = useRef<HTMLInputElement>(null!);
  const dispatch = useAppDispatch();
  const setPhoto = (type: TypeImage, file: File | undefined) => {
    const setState = {
      loin: () => images[1]((p) => ({ ...p, loin: file })),
      pres: () => images[1]((p) => ({ ...p, pres: file })),
      cablage: () => images[1]((p) => ({ ...p, cablage: file })),
      macAddress: () => images[1]((p) => ({ ...p, macAddress: file })),
    };
    setState[type as "loin" | "pres" | "cablage" | "macAddress"]();
  };
  const getFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    const filecompressed = await compressFile(selectedFile?.[0] as File)
    setPhoto(types[0], filecompressed as File);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    desc[1]({ ...desc[0], [name]: value });
  };

  const triggerFileInput = (type: TypeImage) => {
    fileInputRef.current.click();
    types[1](type);
  };

  const handleSubmit = async () => {
    if (
      images[0].loin === undefined ||
      images[0].macAddress === undefined ||
      images[0].cablage === undefined ||
      images[0].pres === undefined
    ) {
      return;
    }
    const formData = new FormData();

    if (description) {
      let i = 1;
      for (const key in images[0]) {
        if (
          images[0][key as keyof InitialState] !== undefined &&
          images[0][key as keyof InitialState] instanceof File
        ) {
          formData.append(
            `photo_${i}`,
            images[0][key as keyof InitialState] as File
          );
          i++;
        }
      }
      formData.append(`desc_photo_1`, desc[0].desc1);
      formData.append(`desc_photo_2`, desc[0].desc2);
      formData.append(`desc_photo_3`, desc[0].desc3);
      formData.append(`desc_photo_4`, desc[0].desc4);
      dispatch(
        sendPhotosupplementaire({
          interventionId: interventionId as string,
          data: formData,
        })
      );
      return;
    }

    for (const dataKey in images[0]) {
      if (
        images[0][dataKey as keyof InitialState] !== undefined &&
        images[0][dataKey as keyof InitialState] instanceof File
      ) {
        formData.append(
          dataKey,
          images[0][dataKey as keyof InitialState] as File
        );
      }
    }

    formData.append("interventionId", `${interventionId}`);
    formData.append("materialId", materielId);

    dispatch(sendPhoto({ type: interventionType, data: formData }));
  };

  const showImage = (data: File | string) => {
    if (typeof data === "string") {
      return data;
    }
    return URL.createObjectURL(data);
  };
  return {
    getFile,
    handleChange,
    triggerFileInput,
    handleSubmit,
    showImage,
    ok,
    loading,
    photos,
    fileInputRef,
  };
}
