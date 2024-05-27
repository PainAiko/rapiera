import { hide } from "@features/mapFeatures/mapFeatureSlice";
import Modal from  "@widgets/modal/Modal";
import HeaderModal from  "@widgets/modal/HeaderModal";
import BodyModal from  "@widgets/modal/BodyModal";
import FooterModal from  "@widgets/modal/FooterModal";
import Button from  "@widgets/button/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { useCheckImage } from "./hooks";

function ModalAppareils() {
  const { title, materielId, materiels } = useAppSelector(
    (state) => state.mapAppareil
  );
  const dispatch = useAppDispatch();
  useCheckImage(materielId)

  return (
    <Modal>
      <HeaderModal title={title} />
      <BodyModal>
        <div>
          <Link
            to={`avant-intervention/${materielId}`}
            className="wfx-btn wfx-btn-primary text-white"
          >
           Ajouter des photos avant intervention {
              materiels?.find(materiel => materiel.id == materielId)?.photoAvant ? <span className="ml-1"><i className="fa-solid fa-circle-check"></i></span> : null
            }
          </Link>
        </div>
        <div>
          <Link
            to={`apres-intervention/${materielId}`}
            className="wfx-btn wfx-btn-primary text-white"
          >
            Ajouter des photos après intervention {
              materiels?.find(materiel => materiel.id == materielId)?.photoApres ?<span className="ml-1"><i className="fa-solid fa-circle-check"></i></span> : null
            }
          </Link>
        </div>
        <div>
          <Link
            to={`mac-address/${materielId}`}
            className="wfx-btn wfx-btn-gray text-white"
          >
            Changer l&apos;adresse MAC {
              materiels?.find(materiel => materiel.id == materielId)?.changeMacAddress ? <span className="ml-1"><i className="fa-solid fa-circle-check"></i></span> : null
            }
          </Link>
        </div>
      </BodyModal>
      <FooterModal>
        <Button
          textColor="white"
          color="green"
          onClick={() => dispatch(hide())}
        >
          Valider
        </Button>
      </FooterModal>
    </Modal>
  )
}

export default ModalAppareils;
