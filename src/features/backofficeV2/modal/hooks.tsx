import { useState, useEffect } from "react";
import { useGetPhotoIntervention } from "../../intervention/PhotoIntervention/photoInterventionAPI";
import { Material } from "@pages/rapport/Model";
import { FileObject } from "@features/intervention/PhotoIntervention/Model";
import { ImageFile } from "@pages/Bo/admin/intervention/model";

export const useMaterielInterventionDetails = ({
  id,
  materielId,
}: {
  id: string;
  materielId: string;
}) => {
  const [image_before, setImage_before] = useState<FileObject[]>([]);
  const [image_after, setImage_after] = useState<FileObject[]>([]);
  const { response, isloading } = useGetPhotoIntervention(id, materielId);

  useEffect(() => {
    if (response) {
      const before: ImageFile = (response as Material).before_images as ImageFile;
      const after: ImageFile = (response as Material).after_images as ImageFile;
      setImage_before([
        before.loin,
        before.pres,
        before.cablage,
        before.macAddress,
      ]);
      setImage_after([after.loin, after.pres, after.cablage, after.macAddress]);
    }
  }, [response]);
  return {
    image_before,
    image_after,
    isloading,
    response
  };
};
