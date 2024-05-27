import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import MainBo from  "@widgets/Bo/MainBo";
import { useEffect, useState } from "react";
import { getRole } from  "@utils/getToken";
import { ROLE } from  "@utils/ROLE";
import {
  InterventionParent,
  useGetAllInteventionService,
} from "@config/API/getAPI";
import LoadingComponent from  "@widgets/loading/LoadingComponent";

function Admin() {
  const [role, setRole] = useState("");
  const { response, isloading } = useGetAllInteventionService();
  const [listIntervention, setListIntervention] = useState<
    { link: string; content: string; status: "en cours" | "terminée" }[]
  >([]);

  const navigate = useNavigate();
  useEffect(() => {
    const r = getRole();
    if (r) {
      setRole(r);
    }
    if (response.length > 0) {
      setListIntervention(
        response.map((value: InterventionParent) => {
          return {
            link: `/dashboard/intervention/${value.id}`,
            content: `${value.site_name} / ${value.id}`,
            status: value.status,
          };
        })
      );
    }
  }, [response]);
  return (
    <>
      <Header />
      <MainBo>
        <div className="pg-home-dash">
          <ul className="wfx-list-collapse">
            <li>
              <input type="checkbox" id="list-item-1" />
              <label htmlFor="list-item-1" className="first">
                Interventions en cours
              </label>
              <ul>
                {isloading ? (
                  <LoadingComponent />
                ) : (
                  listIntervention.map((value, index) => (
                    <li className="p-2" key={index}>
                      <button
                        className="wfx-btn wfx-btn-blue text-white"
                        onClick={() => {
                          navigate(`${value.link}`);
                        }}
                      >
                        {value.content}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </li>
            <li>
              <input type="checkbox" id="list-item-2" />
              <label htmlFor="list-item-2" className="first">
                Interventions terminées
              </label>
            </li>
            <li>
              <label htmlFor="list-item-2" className="no-icon">
                <Link
                  to="/dashboard/list-intervention-rapport"
                  className="font-bold-large w-full d-block"
                >
                  Liste des rapports d'interventions
                </Link>
              </label>
            </li>
            {role === ROLE.SUPER_ADMIN || role === ROLE.ADMIN_ORGANIZATION ? (
              <li>
                <label htmlFor="list-item-2" className="no-icon">
                  <Link
                    to="/dashboard/gestion-utilisateur"
                    className="font-bold-large w-full d-block"
                  >
                    Gestion des utilisateurs
                  </Link>
                </label>
              </li>
            ) : null}
            {role === ROLE.SUPER_ADMIN ? (
              <li>
                <label htmlFor="list-item-2" className="no-icon">
                  <Link
                    to="/dashboard/gestion-prestataire"
                    className="font-bold-large w-full d-block"
                  >
                    Gestion des prestataires
                  </Link>
                </label>
              </li>
            ) : null}
          </ul>
        </div>
      </MainBo>
    </>
  );
}

export default Admin;
