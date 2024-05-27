import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { finishIntervention } from "@features/mapFeatures/mapFeatureSlice";
import { useGetInterventionInfo } from "@pages/rapport/rapportAPI";
import { TYPE } from "@shared/utils/ROLE";
import { useEffect } from "react";

export const useCheckImage = (materielId: string) => {
  const { interventionId } = useAppSelector((state) => state.homePage);
  const { response } = useGetInterventionInfo(interventionId as string);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      response &&
      response.materials.find(
        (materiel) => materiel.id_graphql === materielId
      ) !== undefined
    ) {
      response.materials.find((materiel) => materiel.id_graphql === materielId)
        ?.before_images.pres !== null &&
        dispatch(
          finishIntervention({
            type: TYPE.BEFORE,
            id: materielId,
          })
        );
      response.materials.find((materiel) => materiel.id_graphql === materielId)
        ?.after_images.pres !== null &&
        dispatch(
          finishIntervention({
            type: TYPE.AFTER,
            id: materielId,
          })
        );
    }
  }, [dispatch, materielId, response]);
};
