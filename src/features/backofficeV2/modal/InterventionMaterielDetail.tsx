import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { hideModal } from "@entities/backofficev2/listInterventionSlice";
import PhotoValidation from "@components/PhotoValidation";
import { ROLE } from "@utils/ROLE";
import { getRole } from "@utils/getToken";
import Button from "@widgets/button/Button";
import Card from "@widgets/card/Card";
import CardBody from "@widgets/card/CardBody";
import Cardheader from "@widgets/card/CardHeader";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import BodyModal from "@widgets/modal/BodyModal";
import FooterModal from "@widgets/modal/FooterModal";
import HeaderModal from "@widgets/modal/HeaderModal";
import Modal from "@widgets/modal/Modal";
import ChangeAddressMacIntervention from "../../changeMacAddressFeatures/ChangeAddressMacIntervention";
import { useMaterielInterventionDetails } from "./hooks";
import { Material } from "@pages/rapport/Model";

function InterventionMaterielDetail() {
  const { materilesDetails, showModal } = useAppSelector(
    (state) => state.listInterventionSlice
  );
  const { image_after, image_before, isloading, response } =
    useMaterielInterventionDetails({
      id: materilesDetails?.interventionId as string,
      materielId: materilesDetails?.id as string,
    });
  const dispatch = useAppDispatch();
  return (
    showModal && (
      <Modal large={true}>
        <HeaderModal>
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold">
              {response && ((response as Material).name as string)}
            </h2>
            <div className="d-flex gap-5 flex-wrap">
              <div className="wfx-btn bg-primary text-white px-2">
                {materilesDetails?.interventionGraphId}
              </div>
              {materilesDetails?.admin && (
                <div className="wfx-btn bg-primary text-white px-2">
                  {materilesDetails?.admin}
                </div>
              )}
              {!materilesDetails?.admin && (
                <div className="wfx-btn bg-danger text-white px-2">
                  Non allouée
                </div>
              )}
              <div className="wfx-btn bg-primary text-white px-2">
                {materilesDetails?.siteName}
              </div>
              <div className="wfx-btn bg-primary text-white px-2">
                {response && (response as Material).tech.name}
              </div>
            </div>
          </div>
        </HeaderModal>
        <BodyModal addClassName="wfx-modal__body-content">
          {isloading ? (
            <LoadingComponent />
          ) : (
            <div className="pg-intervetion-dash">
              <Card addClassName="br-none">
                <CardBody>
                  <PhotoValidation
                    type="avant"
                    labelSelectionAll="Séléctionner toutes les photos avant intervention"
                    images={image_before}
                  />
                  <PhotoValidation
                    type="après"
                    labelSelectionAll="Séléctionner toutes les photos apès intervention"
                    images={image_after}
                  />
                  {(getRole() === ROLE.ADMIN ||
                    getRole() === ROLE.SUPER_ADMIN) && (
                    <div className="d-flex justify-content-center mb-5">
                      <Button color="green" addClassName="w-50">
                        Transferer vers OTS
                      </Button>
                    </div>
                  )}
                  <div className="pg-intervention__item mb-5">
                    <Card addClassName="br-none no-border">
                      <Cardheader>
                        <h3 className="font-bold">Adresse MAC à valider</h3>
                      </Cardheader>
                      <CardBody>
                        <ChangeAddressMacIntervention />
                      </CardBody>
                    </Card>
                  </div>
                  {/* <ListPhotoIntervention
                title="Photos supplémentaires"
                images={[`${image}`, `${image}`, `${image}`, `${image}`]}
              >
                 <div className="wfx-row w-full">
                  <ImageIntervention image={image}>
                    <div className="legende m-2 font-bold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quasi, rem in delectus consequatur sunt nam.
                    </div>
                  </ImageIntervention>
                  <ImageIntervention image={image}>
                    <div className="legende m-2 font-bold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quasi, rem in delectus consequatur sunt nam.
                    </div>
                  </ImageIntervention>
                  <ImageIntervention image={image}>
                    <div className="legende m-2 font-bold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quasi, rem in delectus consequatur sunt nam.
                    </div>
                  </ImageIntervention>
                </div>
              </ListPhotoIntervention> */}
                </CardBody>
              </Card>
            </div>
          )}
        </BodyModal>

        <FooterModal>
          {isloading ? (
            <LoadingComponent />
          ) : (
            <Button
              textColor="white"
              color="blue"
              onClick={() => dispatch(hideModal())}
            >
              {getRole() !== ROLE.ADMIN_ORGANIZATION ? "Confirmer" : "Fermer"}
            </Button>
          )}
        </FooterModal>
      </Modal>
    )
  );
}

export default InterventionMaterielDetail;
