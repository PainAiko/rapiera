import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CreateFormulaire from "../../gestionUserFeatures/CreateFormulaire";
import { useHandleUser } from "./hooks";
import Error from "@components/Error";
import LoadingComponent from  "@widgets/loading/LoadingComponent";
import { ROLE } from  "@utils/ROLE";
import { getRole } from "@shared/utils/getToken";

function GestionUserFeatures({user, setType}:{user:string, setType: Dispatch<SetStateAction<string>>} ) {
  const [activeTab, setActiveTab] = useState(0);
  const { loading, error, handleSubmit, reset } = useHandleUser(activeTab);

  const handleclick = (tab: number) => {
    setActiveTab(tab);
    reset()
    tab === 0 ? setType(ROLE.ADMIN) : tab === 1 ? setType(ROLE.ADMIN_ORGANIZATION) : setType(ROLE.TECHNICIAN)
  };


  useEffect(() => {
    const witchUser = (type: string) => {
      switch (type) {
        case ROLE.TECHNICIAN:
          setType(ROLE.TECHNICIAN)
          setActiveTab(2)
          break;
          case ROLE.ADMIN:
            setType(ROLE.ADMIN)
            setActiveTab(0)
            break;
          case ROLE.ADMIN_ORGANIZATION:
            setType(ROLE.ADMIN_ORGANIZATION)
            setActiveTab(1)
            break;
      }
    }
    if(getRole() === ROLE.ADMIN_ORGANIZATION) {
      witchUser(ROLE.TECHNICIAN)
      return
    }
    if(user) {
      witchUser(user)
    }
  },[setType, user])
  return (
    <>
      <div className="col-lg-12 col-12">
        <div className="d-flex justify-center ">
          {
            getRole() !== ROLE.ADMIN_ORGANIZATION && <>
            <button
            className={`wfx-btn br-none ${
              activeTab === 0 ? "wfx-btn-primary text-white" : ""
            } `}
            onClick={() => handleclick(0)}
          >
            Admin
          </button>
          <button
            className={`wfx-btn br-none ${
              activeTab === 1 ? "wfx-btn-primary text-white" : ""
            } `}
            onClick={() => handleclick(1)}
          >
            Admin Organisation
          </button>
            </>
          }
          <button
            className={`wfx-btn br-none ${
              activeTab === 2 ? "wfx-btn-primary text-white" : ""
            } `}
            onClick={() => handleclick(2)}
          >
            Technicien
          </button>
        </div>
      </div>
      {error && <Error error={error} />}
      <CreateFormulaire isOrg={activeTab} />
      <>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <button
              className="wfx-btn wfx-btn-primary text-white"
              onClick={handleSubmit}
            >
              Enregister
            </button>
            <button className="wfx-btn" onClick={reset}>Annuler</button>
          </>
        )}
      </>
    </>
  );
}

export default GestionUserFeatures;
