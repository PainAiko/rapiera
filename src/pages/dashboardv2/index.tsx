import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Content from "@widgets/Bov2/Content";
import Header from "@widgets/Bov2/Header";
import Main from "@widgets/Bov2/Main";
import Sidebar from "@widgets/Bov2/Sidebar";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { getRole, getUserConnectedName, logOut } from "@utils/getToken";
import { useEffect } from "react";
import { setList as setListOrg } from "@entities/backofficev2/gestionPrestataireSlice";
import { SIDE_BAR_NAVIGATION } from "@utils/const";
import { useGetAllOrganisationService } from "@config/API/getAPI";
import {
  resetState,
  setOrganizationListe,
} from "@entities/backofficev2/GestionUserSlice";
import { ROLE } from "@utils/ROLE";
import { isConnected } from "@app/stateslice";
import { reset } from "@entities/login/loginSlice";
import { useGetNotificationForCall } from "@app/hooks/eventSource";
import "./index.scss";
import CallNotification from "@shared/components/CallNotification";

function Dashboard() {
  const { showSidebar } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const { response: organisations } = useGetAllOrganisationService();
  const location = useLocation();
  useGetNotificationForCall();

  const navigate = useNavigate();
  const handClick = () => {
    logOut();
    dispatch(reset());
    dispatch(isConnected());
    dispatch(resetState());
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/intervention");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (organisations.data) {
      if (
        getRole() &&
        (getRole() === ROLE.ADMIN || getRole() === ROLE.SUPER_ADMIN)
      ) {
        dispatch(setOrganizationListe(organisations.data));
      }
      dispatch(setListOrg(organisations.data));
    }
  }, [dispatch, organisations.data]);
  return (
    <div className={`wfx-dashi ${showSidebar ? "toggle" : ""}`}>
      <Sidebar navigation={SIDE_BAR_NAVIGATION} />
      <Content>
        <Header>
          <CallNotification />
          <div className="d-flex align-items-center">
            <div className="user-info w-full">
              <div className="font-bold">{getUserConnectedName()}</div>
              <div className="role">{getRole()}</div>
            </div>
          </div>
          <div className="logout">
            <button onClick={handClick}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </Header>
        <Main>
          <Outlet />
        </Main>
      </Content>
    </div>
  );
}

export default Dashboard;
