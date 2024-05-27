import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { isConnected } from "@app/stateslice";

const Layout = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.rootState.isAuthenticated
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isConnected());
  }, [isAuthenticated, dispatch]);
  return (
    <div className="wfx-app">
      <Outlet />
    </div>
  );
};

export default Layout;
