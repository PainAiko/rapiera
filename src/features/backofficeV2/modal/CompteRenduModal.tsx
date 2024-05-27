import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import ImageUploader from "@components/imageUploader/ImageUploader";
import Button from  "@widgets/button/Button";
import TextareaField from  "@widgets/form/TextareaField";
import BodyModal from  "@widgets/modal/BodyModal";
import FooterModal from  "@widgets/modal/FooterModal";
import HeaderModal from  "@widgets/modal/HeaderModal";
import Modal from  "@widgets/modal/Modal";
import {
  finishedIntervention,
  toggleCompteRendu,
} from  "@entities/backofficev2/listInterventionSlice";
import { useImagehandler } from "@components/imageUploader/hooks";
import LoadingComponent from  "@widgets/loading/LoadingComponent";
import Error from "@components/Error";
import { finishIntervention } from  "@entities/backofficev2/dashboardv2Slice";

function CompteRenduModal() {
  const {
    showCompteRendu,
    materialsConfirmer,
    interventionId,
    loading,
    error,
  } = useAppSelector((state) => state.listInterventionSlice);
  const dispatch = useAppDispatch();
  const [rapport, setRapport] = useState("");
  const { handleDrop, images, handleFileInputChange, handleRemove,reset } =
    useImagehandler();
  const handleChange = (newValue: string) => {
    setRapport(newValue);
  };
  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("compte_rendu", rapport);

    for (const image of images) {
      formData.append("image[]", image.blob);
    }
    for (const material of materialsConfirmer) {
      formData.append("materialsConfirmer[]", material);
    }
    dispatch(
      finishedIntervention({ id: interventionId as string, data: formData })
    );
    dispatch(finishIntervention(interventionId));
    setRapport("")
    reset()
  };
  return (
    showCompteRendu && (
      <Modal large={false}>
        <HeaderModal title="compte rendu de l'intervention" />
        <BodyModal addClassName="">
        {error && <Error error={error} />}
          <TextareaField
            label="Votre compte rendu"
            value={rapport}
            onChange={handleChange}
          />
          <ImageUploader
            handleDrop={handleDrop}
            handleFileInputChange={handleFileInputChange}
            handleRemove={handleRemove}
            images={images}
          />
        </BodyModal>
        <FooterModal>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <Button
                textColor="white"
                color="danger"
                onClick={() => dispatch(toggleCompteRendu())}
              >
                Annuler
              </Button>
              <Button textColor="white" color="blue" onClick={handleSubmit}>
                confirmer
              </Button>
            </>
          )}
        </FooterModal>
      </Modal>
    )
  );
}

export default CompteRenduModal;
