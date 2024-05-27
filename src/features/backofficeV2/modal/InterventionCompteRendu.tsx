import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { toggleModalCompteRendu } from "@entities/backofficev2/interventionTerminer";
import { downloadImage } from "@shared/utils/genererPDF";
import Button from "@widgets/button/Button";
import BodyModal from "@widgets/modal/BodyModal";
import FooterModal from "@widgets/modal/FooterModal";
import HeaderModal from "@widgets/modal/HeaderModal";
import Modal from "@widgets/modal/Modal";

function InterventionCompteRendu() {
  const { compteRenduInfo } = useAppSelector(
    (state) => state.interventionTerminer
  );
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggleModalCompteRendu());
  };
  const HandleImageDownload = async (image: string) => {
    await downloadImage(image);
  };
  return (
    <Modal>
      <HeaderModal>
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Le compte rendu: </h2>
        </div>
        <div className="d-flex gap-5 flex-wrap ml-2">
          <div className="wfx-btn bg-primary text-white px-2">
            {compteRenduInfo?.site}
          </div>
          <div className="wfx-btn bg-primary text-white px-2">
            #{compteRenduInfo?.interventionId}
          </div>
          <div className="wfx-btn bg-primary text-white px-2">
            {compteRenduInfo?.adminName}
          </div>
        </div>
      </HeaderModal>
      <BodyModal addClassName="wfx-modal__body-content">
        <article className="text-wrap">
          <p>{compteRenduInfo?.compteRendu.compte_rendu}</p>
        </article>
        <div className="wfx-row w-full">
          {compteRenduInfo?.compteRendu.photos.map((value, index) => {
            return (
              <div
                key={index}
                className="col-xl-4 col-12 flex-col border border-black "
              >
                <div className="flex justify-center items-center">
                  <img
                    src={value.path}
                    style={{ objectFit: "cover", height: 150 }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <span
                    className="text-3xl cursor-pointer py-2"
                    onClick={async () => await HandleImageDownload(value.path)}
                  >
                    <i className="fa-solid fa-download"></i>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </BodyModal>
      <FooterModal>
        <Button color="danger" onClick={closeModal}>
          Fermer
        </Button>
      </FooterModal>
    </Modal>
  );
}

export default InterventionCompteRendu;
