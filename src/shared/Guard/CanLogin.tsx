import { ReactNode } from "react";
import isAuthenticated from "./isAuthenticated";
import { Navigate } from "react-router-dom";
import { getRole } from "../utils/getToken";

function CanLogin({
  element,
  redirection,
}: {
  element: ReactNode;
  redirection: string;
}) {
  let myRedirect = redirection;
  if (!isAuthenticated()) {
    return element;
  }
  const userRole = getRole();

  if (userRole) {
    myRedirect =
      userRole === "admin"
        ? "/dashboard"
        : userRole === "technician"
        ? "/technicien/profil"
        : redirection;
  }
  return <Navigate to={myRedirect} />;
}

export default CanLogin;
