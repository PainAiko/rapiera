import { Link } from "react-router-dom";
import logowifix from  "@assets/images/logo.svg";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { toggleSideBar } from  "@entities/backofficev2/dashboardv2Slice";
import { NavLink } from "react-router-dom";
import { extractFromUrl } from "@utils/Validator";

function Sidebar({
  navigation,
}: {
  navigation: { link: string; title: string; icon: string }[];
}) {
    const {showSidebar} = useAppSelector(state => state.dashboard)
    const dispatch = useAppDispatch()

  return (
    <nav className="wfx-dashi__sidebar">
      <div className="wfx-dashi__sidebar-head">
        <Link to="/dashboard" className="logo">
          <div className="wfx-image">
            <img src={logowifix} alt="" />
          </div>
        </Link>
        <div className="hamburger">
          <button id="hamburger-btn" onClick={() => dispatch(toggleSideBar())}>
            <i className={`fa-solid ${showSidebar ? "fa-bars-staggered" : "fa-xmark"}`}></i>
          </button>
        </div>
      </div>
      <div className="wfx-dashi__sidebar-content">
        <ul className="side-menu">
          {navigation.map((value, index) => {
            return (
              extractFromUrl(value.link) ? <li key={index}>
                <NavLink to={value.link} className={({isActive}) => (isActive ? 'active' : 'inactive')}>
                  <div className="icon">
                    <i className={value.icon}></i>
                  </div>
                  <span>{value.title}</span>
                </NavLink>
              </li> : null
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
