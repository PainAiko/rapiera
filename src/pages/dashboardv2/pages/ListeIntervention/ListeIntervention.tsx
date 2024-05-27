import PageLayout from "@widgets/Bov2/PageLayout";
import { COLUMNSV2 } from "@utils/tableau";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/App";
import { useEffect, useState } from "react";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import {
  assignedInterventionToAdmin,
  interventionService,
  resetAssignRes,
  setInterventionId,
  showModal,
  toggleCompteRendu,
} from "@entities/backofficev2/listInterventionSlice";
import InterventionMaterielDetail from "@features/backofficeV2/modal/InterventionMaterielDetail";
import MyDataTable from "@components/MyDataTable";
import { InteventionColumns } from "@components/columns/intervention";
import CompteRenduModal from "@features/backofficeV2/modal/CompteRenduModal";
import {
  getRole,
  getUserConnectedId,
  getUserConnectedName,
} from "@shared/utils/getToken";
import { ROLE } from "@shared/utils/ROLE";
import {
  setAdminList,
  setList,
  updateListIntervention,
} from "@entities/backofficev2/dashboardv2Slice";
import { popup } from "@shared/utils/popupSwealert";
import { useGetAllAdminService } from "@pages/rapport/rapportAPI";
import { Admin } from "@features/rapportFeatures/Model";
import {
  ASSIGNATION_INTERVENTION_SUCCESS,
  CONFIRM_TO_TAKE_INTERVENTION_CHARGE,
  TYPE,
} from "@shared/utils/const";
import { useGetAllInteventionService } from "@shared/config/API/getAPI";
import Button from "@widgets/button/Button";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

interface Row {
  id: string;
  admin_id: string | null;
  meet: string | null;
  adminOnCall: string;
  [COLUMNSV2.SITE]: string;
  [COLUMNSV2.ID]: number;
  [COLUMNSV2.TECHNICIEN]: number;
  [COLUMNSV2.ADMIN_ASSIGNED]: string | { title: string; value: number }[];
  [COLUMNSV2.NUMBER_MATERIELS]: number;
  [COLUMNSV2.DATE]: string;
}

function ListeIntervention() {
  const { listIntervention, loading: loadData } = useAppSelector(
    (state) => state.dashboard
  );
  const { res, resAssign, error, loading, has_rapport, materialsConfirmer } =
    useAppSelector((state) => state.listInterventionSlice);
  const dispatch = useAppDispatch();
  const [intervention, setIntervention] =
    useState<Record<string, string | number | null | undefined>>();
  const { response: listInterventions, isloading: loadIntervention } =
    useGetAllInteventionService();
  const { response } = useGetAllAdminService();

  const handleRowClick = (row: Row ) => {
    dispatch(interventionService(`${row.id}`));
    dispatch(setInterventionId(`${row.id}`));
    setIntervention({
      site: row[COLUMNSV2.SITE],
      idGraphql: row.id,
      interventionId: row[COLUMNSV2.ID],
      technicien: row[COLUMNSV2.TECHNICIEN],
      date: row[COLUMNSV2.DATE],
      adminId: row.admin_id,
      admin: row[COLUMNSV2.ADMIN_ASSIGNED] as string,
      meet: row?.meet,
    });
  };

  const assignInterventionToAdmin = () => {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      text: CONFIRM_TO_TAKE_INTERVENTION_CHARGE,
      position: "center",
      cancelButtonColor: "red",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          assignedInterventionToAdmin({
            id: intervention?.idGraphql as string,
            adminId: getUserConnectedId(),
            adminName: getUserConnectedName(),
          })
        );
      }
    });
  };
  useEffect(() => {
    if (listInterventions) {
      dispatch(
        setList({ type: TYPE.INTERVENTION, response: listInterventions })
      );
    }
  }, [listInterventions]);

  useEffect(() => {
    if (response.data) {
      dispatch(
        setAdminList(
          response.data.map((admin: Admin) => ({
            title: admin.name,
            value: admin.id,
          }))
        )
      );
    }
  }, [response.data]);

  useEffect(() => {
    if (error) {
      popup("error", error, 2000, "right");
      return;
    }
    if (resAssign) {
      popup("success", ASSIGNATION_INTERVENTION_SUCCESS, 2000);
      const actualIntervention = listIntervention.find(
        (value) => value.id == resAssign.id
      );
      dispatch(
        updateListIntervention({
          id: resAssign.id,
          adminName: resAssign.adminName,
          adminId: resAssign.adminId,
        })
      );
      setIntervention({
        site: actualIntervention?.Site,
        interventionId: actualIntervention?.Intervention,
        idGraphql: actualIntervention?.id,
        technicien: actualIntervention?.Technicien,
        date: actualIntervention?.Date,
        adminId: resAssign.adminId,
        admin: resAssign.admin,
        meet: actualIntervention?.meet,
      });
      dispatch(resetAssignRes());
    }
    return () => {
      dispatch(resetAssignRes());
    };
  }, [dispatch, error, intervention?.idGraphql, resAssign]);

  useEffect(() => {
    if (listIntervention.length > 0) {
      setIntervention({
        site: listIntervention[0].Site,
        interventionId: listIntervention[0].Intervention,
        idGraphql: listIntervention[0].id,
        technicien: listIntervention[0].Technicien,
        date: listIntervention[0].Date,
        adminId: listIntervention[0].admin_id,
        admin: listIntervention[0][COLUMNSV2.ADMIN_ASSIGNED] as string,
        meet: listIntervention[0].meet,
      });
      dispatch(interventionService(`${listIntervention[0]?.id}`));
      dispatch(setInterventionId(`${listIntervention[0]?.id}`));
    }
  }, [dispatch, listIntervention.length]);

  return (
    <>
      <PageLayout title="Liste des interventions en cours">
        <div className="col-12 col-xl-8 list">
          <MyDataTable
            columns={InteventionColumns()}
            data={listIntervention}
            onClick={handleRowClick}
            loading={loadData || loadIntervention}
          />
        </div>
        <div className="col-12 col-xl-4 detail">
          <div className="detail__head">
            <h2>
              Detail de l'intervention{" "}
              <span>#{intervention?.interventionId}</span>
            </h2>
          </div>
          <div className="detail__content">
            {intervention?.adminId &&
              intervention?.adminId != getUserConnectedId() &&
              getRole() === ROLE.ADMIN && (
                <Button color="green" onClick={assignInterventionToAdmin}>
                  Devenir propriétaire
                </Button>
              )}
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">Nom du Site : </strong>
              <span className="text-primary font-bold">
                {intervention?.site ?? "Aucun"}
              </span>
            </div>
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">Technicien : </strong>
              <span className="text-primary font-bold">
                {intervention?.technicien ?? "Aucun"}{" "}
              </span>
            </div>
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">Date : </strong>
              <span className="text-primary font-bold">
                {intervention?.date ?? "Aucun"}
              </span>
            </div>
            {intervention?.meet && (
              <div className="mb-2 d-flex justify-content-between my-3">
                <strong className="font-bold">Faire une réunion : </strong>
                <Link
                  className="wfx-btn wfx-btn-primary text-white"
                  to={intervention?.meet as string}
                  target="_blank"
                >
                  Commencer
                </Link>
              </div>
            )}
            <div className="my-3">
              <div className="font-bold mb-3">
                {
                  res.length > 0 &&  "Liste des materiels ayant une intervention :"
                }
              </div>
              <ul className="wfx-list">
                {loading ? (
                  <LoadingComponent />
                ) : (
                  res?.map(
                    (value: {
                      id: string;
                      name: string;
                      material_id: string;
                    }) => {
                      return (
                        <li
                          className={`${
                            materialsConfirmer.find(
                              (material) => material == value.id
                            )
                              ? "bg-green text-white"
                              : ""
                          }`}
                          key={value.id}
                          onClick={() =>
                            dispatch(
                              showModal({
                                id: value.material_id,
                                interventionId: intervention?.idGraphql,
                                idMateriel: value.id,
                                siteName: intervention?.site,
                                interventionGraphId:
                                  intervention?.interventionId,
                                admin: Array.isArray(intervention?.admin)
                                  ? undefined
                                  : intervention?.admin,
                              })
                            )
                          }
                        >
                          <h2>
                            {" "}
                            {value.name}{" "}
                            {materialsConfirmer.find(
                              (material) => material == value.id
                            ) && (
                              <span className="ml-1">
                                <i className="fa-solid fa-circle-check"></i>
                              </span>
                            )}{" "}
                          </h2>
                        </li>
                      );
                    }
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="detail__footer d-flex justify-content-center">
            {loading ? (
              <LoadingComponent />
            ) : (
              listIntervention.length > 0 && (
                <>
                  {getRole() !== ROLE.ADMIN_ORGANIZATION && (
                    <button
                      className="wfx-btn wfx-btn-primary text-white"
                      onClick={() => dispatch(toggleCompteRendu())}
                      disabled={
                        !has_rapport ||
                        intervention?.adminId != getUserConnectedId()
                      }
                    >
                      {has_rapport ? "Terminer l'intervention" : "En cours..."}
                    </button>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </PageLayout>
      <InterventionMaterielDetail />
      <CompteRenduModal />
    </>
  );
}

export default ListeIntervention;
