import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getUserConnectedId } from "@utils/getToken";
import { updateTechnicienInfo, useGetTechnicienInfo } from "./profilAPI";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import { popup } from "@utils/popupSwealert";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { resetTechInfo } from "@entities/profil/technicienSlice";
import CallButton from "@pages/Bo/user/ui/CallButton";

function ProfilTechnicien() {
  const [technicienInfo, setTechnicienInfo] = useState<{
    [key: string]: string;
  }>({
    meetLink: "",
    newPassword: "",
  });
  const dispatch = useAppDispatch();
  const id = getUserConnectedId();
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const { response, isloading, error: serverError } = useGetTechnicienInfo(id);
  const {
    res,
    loading,
    error: updateError,
  } = useAppSelector((state) => state.technicienSlice);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTechnicienInfo((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateTechnicienInfo({
        id,
        datas: {
          meetLink: technicienInfo.meetLink,
          newPassword: technicienInfo.newPassword,
        },
      })
    );
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    setUpdate(true);
  };

  useEffect(() => {
    if (updateError) {
      setError(updateError);
      return;
    }
    if (res) {
      popup("success", res.message, 2000, "left");
      setTechnicienInfo((p) => ({ ...p, newPassword: "" }));
      setError("");
      setUpdate(false);
      dispatch(resetTechInfo());
    }
  }, [res, updateError]);
  useEffect(() => {
    if (serverError) {
      setError(serverError);
      return;
    }
    if (response) {
      setTechnicienInfo((p) => ({
        ...p,
        meetLink: response.meet,
        name: response.name,
      }));
    }
    return () => {
      dispatch(resetTechInfo());
    };
  }, [dispatch, response, serverError]);
  return (
    <div className="pg-profil-technicien">
      <div className="wfx-card br-none no-border">
        <div className="wfx-card__header text-center">
          <h2>Information du Technicien</h2>
        </div>
        {!isloading && technicienInfo?.meetLink && (
          <CallButton meetLink={technicienInfo?.meetLink} />
        )}
        {isloading && <LoadingComponent />}
        {!isloading && error && (
          <div className="text-center">
            <div className="text-red-600">{error}</div>
          </div>
        )}
        {!isloading && (
          <div className="wfx-card__content">
            <form className="wfx-row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="wfx-form">
                  <label>Nom du Technicien</label>
                  <input
                    type="text"
                    className="w-full"
                    value={technicienInfo?.name || ""}
                    disabled
                  />
                  <div className="prepend-icon">
                    <i className="fa-solid fa-info"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="wfx-form">
                  <label>Lien du Google Meet</label>
                  <input
                    type="text"
                    className="w-full"
                    name="meetLink"
                    value={technicienInfo?.meetLink || ""}
                    onChange={handleChange}
                    disabled={!update}
                  />
                  <div className="prepend-icon">
                    <i className="fa-regular fa-comments"></i>
                  </div>
                </div>
              </div>
              {update && (
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="wfx-form">
                    <label>Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={technicienInfo?.newPassword || ""}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Votre nouveau mot de passe"
                    />
                    <div className="prepend-icon">
                      <i className="fa-solid fa-key"></i>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-end w-full">
                {loading ? (
                  <LoadingComponent />
                ) : update ? (
                  <button
                    className="wfx-btn wfx-btn-blue text-white"
                    onClick={handleSubmit}
                  >
                    Sauvegarder
                  </button>
                ) : (
                  <button
                    className="wfx-btn wfx-btn-blue text-white"
                    onClick={handleClick}
                  >
                    Activer la modification
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilTechnicien;
