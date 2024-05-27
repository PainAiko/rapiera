import ApresIntervention from "@pages/apresIntervention/ApresIntervention";
import AvantIntervention from "@pages/avantIntervention/AvantIntervention";
import ChangeMacAddress from "@pages/changeMacAddress/ChangeMacAddress";
import Intervention from "@features/intervention/Intervention";
import BoLayout from "@pages/Bo";
import { BoRoute } from "./admin";
import { userRoute } from "./technicien";
import Home from "@pages/home/Home";
import Login from "@pages/login/Login";
import CanLogin from "@shared/Guard/CanLogin";
import IsAuthenticated from "@shared/Guard/IsAuth";
import AuthGuard from "@shared/Guard/AuthGuard";
import { Outlet } from "react-router-dom";
import CheckTechnician from "@features/initialiseIntervention";
import Rapport from "@pages/rapport/Rapport";
import ForgotPassword from "@pages/forgotpassword/ForgotPassword";
import RapportGuard from "@shared/Guard/RapportGuard";

export const childRoute = [
  {
    path: "",
    element: <IsAuthenticated element={<Home />} redirection="/login" />
  },
  {
    path: "intervention",
    element: <Outlet/>,
    children: [
      {
        path: "supplementaire",
        element: <IsAuthenticated element={<Intervention title="Photos supplémentaires" description={true} type="additional" />} redirection="/login" />
      },
      {
      path: ":id",
      element: <CheckTechnician />
    }]
  },
  {
    path: "rapport",
    element: <RapportGuard element={<Rapport />} redirection="/" />
  },
  {
    path: "mac-address/:id",
    element:<IsAuthenticated element={<ChangeMacAddress />} redirection="/login" /> ,
  },
  {
    path: "avant-intervention/:id",
    element:<IsAuthenticated element={<AvantIntervention />} redirection="/login" /> ,
  },
  {
    path: "apres-intervention/:id",
    element: <IsAuthenticated element={<ApresIntervention />} redirection="/login" /> ,
  },
  {
    path: "dashboard",
    element: <AuthGuard element={<BoLayout />} redirection="/login" />,
    children: BoRoute,
  },
  {
    path: "technicien",
    element: <IsAuthenticated element={<BoLayout />} redirection="/login" />,
    children: userRoute,
  },
  {
    path: "login",
    element: <BoLayout>
      <CanLogin element={<Login />} redirection="/" />
    </BoLayout>,
  },
  {
    path: "mot-de-passe-oublie",
    element: <ForgotPassword />,
  }

];
