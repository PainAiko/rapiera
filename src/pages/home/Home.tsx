import chatImage from "@assets/images/chat.png";
import Header from "@widgets/Header";
import Consigne from "@components/consigne/Consigne";
import MapFeatures from "@features/mapFeatures/MapFeatures";
import AppareilStatus from "@components/appareilStatus/AppareilStatus";
import { Link, useNavigate } from "react-router-dom";
import Main from "@widgets/Main";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { useEffect, useState } from "react";
import { reset } from "@entities/photoIntervention/photoInteventionSlice";
import { resetState } from "@entities/changeAddressMac/changeMacAddressSlice";
import {
  resetRes,
  setIsMaterialChange,
  setState,
} from "../../entities/home/homeSlice";
import Button from "@widgets/button/Button";
import { getGraphqlId, logOut } from "@utils/getToken";
import { GET_SITE, checkIfAdminAssigned } from "./HomeAPI";
import { popup } from "@shared/utils/popupSwealert";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import { useQuery } from "@apollo/client";
import {
  setLevelMaps,
  setListSearch,
  setMateriels,
} from "@features/mapFeatures/mapFeatureSlice";
import ModalAppareils from "@shared/components/appareilModal/ModalAppareils";
import { materielSerializer } from "@shared/utils/serialize";
import { RAPPORT_ERROR_MESSAGE } from "@shared/utils/const";
import { isConnected } from "@app/stateslice";

function Home() {
  const {
    isTechnicianChangeMaterial,
    interventionId,
    interventionIdGraphql,
    res,
    loading,
    error,
  } = useAppSelector((state) => state.homePage);
  const { showModal } = useAppSelector((state) => state.mapAppareil);

  const { data, error: graphError } = useQuery(GET_SITE, {
    variables: {
      interventionId: +(interventionIdGraphql as string),
    },
  });

  const { materiels, levelMaps } = useAppSelector((state) => state.mapAppareil);

  const [doAnIntervention, setDoAnIntervention] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isCheck = () => {
    dispatch(setIsMaterialChange());
  };
  const handleClick = () => {
    dispatch(checkIfAdminAssigned(interventionId as string));
  };

  useEffect(() => {
    if (graphError) {
      logOut();
      dispatch(reset());
      dispatch(isConnected());
      dispatch(resetState());
      navigate("/login");
      return;
    }
    if (data) {
      materiels.length <= 0 &&
        dispatch(setMateriels(materielSerializer(data.findSite.devices)));
      levelMaps.length <= 0 && dispatch(setLevelMaps(data.findSite.levelmaps));
      dispatch(setListSearch());
      dispatch(
        setState({
          consigne: data.findSite.consigne,
        })
      );
    }
  }, [data, dispatch, materiels.length, graphError]);

  useEffect(() => {
    if (error) {
      popup("error", error, 2000, "right");
      return;
    }
    if (res && res.interventionParent.rapporFile !== null) {
      popup("error", RAPPORT_ERROR_MESSAGE, 5000, "left");
      return;
    }
    if (res && res.interventionParent.rapporFile === null) {
      navigate("/rapport");
    }

    return () => {
      dispatch(resetRes());
    };
  }, [dispatch, error, navigate, res]);

  useEffect(() => {
    if (materiels?.some((materiel) => materiel.photoApres === true)) {
      setDoAnIntervention(false);
    }
    dispatch(resetState());
    dispatch(reset());
  }, [dispatch, materiels]);
  return (
    <>
      <Header>
        <div className="title w-full">
          <h1>Intervention {getGraphqlId()}</h1>
        </div>
        <div className="chat">
          <Link to="/technicien/profil">
            <div className="wfx-image hover:bg-green">
              <img src={chatImage} alt="" />
            </div>
          </Link>
        </div>
      </Header>
      <Main>
        <Consigne />
        <MapFeatures />
        <AppareilStatus />
        <div className="p-2">
          <div className="wfx-form mb-3">
            <div className="wfx-checkbox">
              <label className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={isTechnicianChangeMaterial}
                  onChange={isCheck}
                  disabled={doAnIntervention}
                />
                <span className="cr">
                  <i className="cr-icon fa-solid fa-check"></i>
                </span>
                <span>
                  J&apos;ai remplacé des équipements pendant mon intervention
                </span>
              </label>
            </div>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Button
              color="blue"
              addClassName="text-white w-full"
              disabled={!isTechnicianChangeMaterial}
              onClick={handleClick}
            >
              Remplir le rapport d&apos;intervention
            </Button>
          )}
        </div>
        {showModal && <ModalAppareils />}
      </Main>
    </>
  );
}

export default Home;