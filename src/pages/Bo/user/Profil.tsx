import { useAppDispatch } from "@app/hooks/App";
import { isConnected } from "@app/stateslice";
import ProfilTechnicien from "@features/profil/ProfilTechnicien";
import { getGraphqlId, getInterventionId, logOut } from "@shared/utils/getToken";
import MainBo from "@widgets/Bo/MainBo";
import Header from "@widgets/Header";
import { Link, useNavigate } from "react-router-dom";
import "./profil.scss";
import { reset } from "@entities/login/loginSlice";
import { resetState } from "@entities/backofficev2/GestionUserSlice";

function Profil() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handClick = () => {
    logOut();
    dispatch(reset())
    dispatch(isConnected())
    dispatch(resetState())
    navigate("/login");
  };
  return (
    <>
      <Header>
        {
          (getInterventionId() && getGraphqlId()) && <Link to="/" className="go-home">
          <div className="wfx-image hover:bg-green hover:text-white">
            <i className="fa-solid fa-chevron-left relative text-3xl top-3.5 left-5"></i>
          </div>
        </Link>
        }
        <div className="title w-full">
          <h1>Profil</h1>
        </div>
        <div className="go-home" onClick={handClick}>
          <div className="wfx-image hover:bg-green hover:text-white center-icon">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </Header>
      <MainBo>
        <ProfilTechnicien />
      </MainBo>
    </>
  );
}

export default Profil;
