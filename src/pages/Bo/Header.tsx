import { Link, useNavigate } from "react-router-dom";
import logo from  "@assets/images/logo.svg";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { isConnected } from "@app/stateslice";
import { resetState } from  "@entities/backofficev2/GestionUserSlice";
import { reset } from  "@entities/login/loginSlice";
import { logOut } from "@utils/getToken";

type Props = PropsWithChildren;

function Header({ children }: Props) {
  const isAuthenticated = useAppSelector((state) => state.rootState.isAuthenticated);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(isConnected())
  }, [dispatch])
  const handClick = () => {
    logOut()
    dispatch(reset())
    dispatch(isConnected())
    dispatch(resetState())
    navigate("/login");
  };
  return (
    <header className="wfx-dash-header">
      <div className="wfx-dash-header__content">
        <div className="wfx-dash-header__content-body">
        {children}
          <Link to="/" className="wfx-image">
            <img src={logo} alt="..." />
          </Link>
          {isAuthenticated && (
            <div className="logout" onClick={handClick}>
              <div className="wfx-image hover:bg-green hover:text-white">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

{
  /* <i class="fa-solid fa-arrow-right-from-bracket"></i> */
}

export default Header;
