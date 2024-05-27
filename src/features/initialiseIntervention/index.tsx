import { useNavigate, useParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import Modal from "@widgets/modal/Modal";
import HeaderModal from "@widgets/modal/HeaderModal";
import BodyModal from "@widgets/modal/BodyModal";
import Input from "@widgets/form/Input";
import FooterModal from "@widgets/modal/FooterModal";
import Button from "@widgets/button/Button";
import MainBo from "@widgets/Bo/MainBo";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import { setState } from "@entities/home/homeSlice";
import { reset } from "@entities/login/loginSlice";
import { useHandlerLogin } from "../Login/hooks";
import { FormLogin } from "../Login/LoginFeature";
import { useQuery } from "@apollo/client";
import { GET_SITE } from "@pages/home/HomeAPI";
import {
  getUserConnectedId,
  logOut,
  setInterventionIdGraphql,
  tokenGraphql,
} from "@shared/utils/getToken";
import { setLevelMaps, setMateriels } from "@features/mapFeatures/mapFeatureSlice";
import { initialize } from "./interventionCheckTechAPI";
import { materielSerializer } from "@shared/utils/serialize";
import { INTERVENTION_TECHNICIEN_ERROR } from "@shared/utils/const";

const CheckTechnician = memo(() => {
  const [form, setForm] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const {
    res,
    loading: check,
    error: errorIntialization,
  } = useAppSelector((state) => state.checkTech);
  const { id } = useParams();
  const { handleSubmit, handleInputChange, loading, serverError, ok } =
    useHandlerLogin({ form, setForm, setError });
  const {
    data,
    loading: loadingGraph,
    error: errorGraph,
  } = useQuery(GET_SITE, {
    variables: {
      interventionId: +(id as string),
    },
    skip: !ok,
  });
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError || errorGraph || errorIntialization) {
      setError(
        errorIntialization
          ? (errorIntialization as string)
          : INTERVENTION_TECHNICIEN_ERROR
      );
      logOut()
      dispatch(reset());
      return;
    }
  }, [errorGraph, errorIntialization, serverError]);

  useEffect(() => {
    if (data) {
      dispatch(
        initialize({
          interventionId: +(id as string),
          consigne: data.findSite.consigne,
          siteName: data.findSite.name,
          techId: getUserConnectedId(),
          materials: materielSerializer(data.findSite.devices),
        })
      );
      dispatch(setMateriels(materielSerializer(data.findSite.devices)));
      dispatch(setLevelMaps(data.findSite.levelmaps))
      setError("")
    }
  }, [data, dispatch, id]);

  useEffect(() => {
    if (res && data) {
      dispatch(
        setState({
          interventionId: res.interventionId,
          consigne: data.findSite.consigne,
          token: tokenGraphql(), 
          interventionIdGraphql: id,
        })
      );
      setInterventionIdGraphql({
        interventionIdGraphql: data.findSite.interventionId,
        interventionId: res.interventionId as number,
      });
      dispatch(reset());
      setToggle(false);
      navigate("/");
    }
  }, [data, dispatch, id, navigate, res]);

  // html render
  return (
    toggle && (
      <div className="pg-users-dash">
        <MainBo>
          <Modal>
            <HeaderModal title="AUTHENTIFICATION" />
            <BodyModal>
              <div className="text-primary text-center">
                Bonjour, veuillez vous connecter à votre compte Wifix pour
                débuter cette intervention.
              </div>
              {error && (
                <div className="text-center bg-danger text-white p-2 br-xs">
                  <div>{error}</div>
                </div>
              )}
              <div className="wfx-form">
                <label>Votre email </label>
                <input
                  type="text"
                  name="email"
                  className="w-full font-normal"
                  placeholder="example@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                />
                <div className="prepend-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
              </div>
              <div className="col-12">
                <Input label="Mot de passe">
                  <input
                    type="password"
                    className="w-full"
                    placeholder="Saisir le mot de passe"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                  />
                  <div className="prepend-icon">
                    <i className="fa-solid fa-key"></i>
                  </div>
                </Input>
              </div>
            </BodyModal>
            <FooterModal>
              {loading || check || loadingGraph ? (
                <LoadingComponent />
              ) : (
                <Button textColor="white" color="blue" onClick={handleSubmit}>
                  Valider
                </Button>
              )}
            </FooterModal>
          </Modal>
        </MainBo>
      </div>
    )
  );
})

export default CheckTechnician;