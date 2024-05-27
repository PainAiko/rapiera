import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import Button from  "@widgets/button/Button";
import Input from  "@widgets/form/Input";
import BodyModal from  "@widgets/modal/BodyModal";
import FooterModal from  "@widgets/modal/FooterModal";
import HeaderModal from  "@widgets/modal/HeaderModal";
import Modal from  "@widgets/modal/Modal";
import { toggleModal, updateList } from  "@entities/backofficev2/gestionPrestataireSlice";
import { createOrganizationService } from "@pages/Bo/admin/gestionPrestataire/gestionPrestataireAPI";
import LoadingComponent from  "@widgets/loading/LoadingComponent";
import { popup } from "../utils/popupSwealert";

function PrestataireModal() {
  const { show } = useAppSelector((state) => state.gestionPrestataire);
  const dispatch = useAppDispatch();

  const [nameOrg, setNameOrg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameOrg(value);
  };

  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (nameOrg === "") {
      return;
    }

    setLoading(true);

    const [response, serverError] = await createOrganizationService({
      organizationName: nameOrg,
    });

    if (serverError) {
      setError(serverError);
      setLoading(false);
      return;
    }

    if (response) {
      dispatch(updateList(response.data))
      dispatch(toggleModal());
      setNameOrg("");
      popup("success", `${response.message}`)
    }
  };
  return (
    show && (
      <Modal>
        <HeaderModal title="Créaction de nouveau Prestataire" />
        <BodyModal addClassName="wfx-row">
          {error && (
            <div className="text-center w-full">
              <div className="text-red-600">{error}</div>
            </div>
          )}
          <div className="col-12">
            <Input label="Nom de l'organisation">
              <input
                type="text"
                className="w-full"
                placeholder="wifix"
                name="organizationName"
                value={nameOrg}
                onChange={handleChange}
              />
              <div className="prepend-icon">
                <i className="fa-solid fa-user"></i>
              </div>
            </Input>
          </div>
        </BodyModal>
        <FooterModal>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <Button
                textColor="white"
                color="danger"
                onClick={() => {
                  dispatch(toggleModal());
                }}
              >
                Annuler
              </Button>
              <Button textColor="white" color="blue" onClick={HandleSubmit}>
                Enregister
              </Button>
            </>
          )}
        </FooterModal>
      </Modal>
    )
  );
}

export default PrestataireModal;
