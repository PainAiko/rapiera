import { useEffect, useState } from "react";
import useInterventionTerminerhooks from "@features/backofficeV2/interventionTerminerhooks";
import MyDataTable from "@components/MyDataTable";
import { InteventionColumns } from "@components/columns/intervention";
import PageLayout from "@widgets/Bov2/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/App";
import {
  CompteRendu,
  addCompteRenduInfo,
  setList,
  toggleModalCompteRendu,
} from "@entities/backofficev2/interventionTerminer";
import { COLUMNSV2 } from "@utils/tableau";
import Error from "@components/Error";
import InterventionCompteRendu from "@features/backofficeV2/modal/InterventionCompteRendu";
import Button from "@widgets/button/Button";
import { downloadImage } from "@shared/utils/genererPDF";
interface Row {
  id: string;
  compteRendu?: CompteRendu;
  meet: string | null;
  adminOnCall: string;
  [COLUMNSV2.SITE]: string;
  [COLUMNSV2.ID]: number;
  [COLUMNSV2.TECHNICIEN]: number;
  [COLUMNSV2.NUMBER_MATERIELS]: number;
  [COLUMNSV2.DATE]: string;
  [COLUMNSV2.ADMIN_ASSIGNED]: string | { title: string; value: number }[];
}

function ListInterventionTermier() {
  const { response, isloading, error } = useInterventionTerminerhooks();
  const { list, showModalCompteRendu } = useAppSelector(
    (state) => state.interventionTerminer
  );
  const dispatch = useAppDispatch();
  const [intervention, setIntervention] = useState<{
    site: string;
    interventionId: number;
    technicien: number;
    date: string;
    compteRendu: CompteRendu;
    admin?: string;
    meet: string | null;
    adminOnCall: string;
  }>();

  const handleRowClick = (row: Row) => {
    setIntervention({
      site: row[COLUMNSV2.SITE],
      interventionId: row[COLUMNSV2.ID],
      technicien: row[COLUMNSV2.TECHNICIEN],
      date: row[COLUMNSV2.DATE],
      compteRendu: row.compteRendu as CompteRendu,
      admin: row[COLUMNSV2.ADMIN_ASSIGNED] as string,
      meet: row?.meet,
      adminOnCall: row.adminOnCall,
    });
  };

  const showModal = () => {
    dispatch(
      addCompteRenduInfo({
        site: intervention?.site,
        interventionId: intervention?.interventionId,
        adminName: intervention?.admin,
        compteRendu: intervention?.compteRendu,
      })
    );
    dispatch(toggleModalCompteRendu());
  };

  useEffect(() => {
    if (response.length > 0) {
      dispatch(setList(response));
    }
  }, [dispatch, response]);

  useEffect(() => {
    if (list.length > 0) {
      setIntervention({
        site: list[0].Site,
        interventionId: list[0].Intervention,
        technicien: list[0].Technicien,
        date: list[0].Date,
        compteRendu: list[0].compteRendu as CompteRendu,
        admin: list[0][COLUMNSV2.ADMIN_ASSIGNED],
        meet: list[0].meet,
        adminOnCall: list[0].adminOnCall,
      });
    }
  }, [dispatch, list]);
  return (
    <>
      <PageLayout title="Liste des interventions terminées">
        <div className="col-12 col-xl-8 list">
          <MyDataTable
            columns={InteventionColumns()}
            data={list}
            onClick={handleRowClick}
            loading={isloading}
          />
        </div>
        <div className="col-12 col-xl-4 detail">
          {error && <Error error={error} />}
          <div className="detail__head">
            <h2>
              Detail de l'intervention{" "}
              <span>#{intervention?.interventionId}</span>
            </h2>
          </div>
          <div className="detail__content">
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">Nom du Site : </strong>
              <span className="text-primary font-bold">
                {intervention ? intervention.site : "Aucun"}
              </span>
            </div>
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">Technicien : </strong>
              <span className="text-primary font-bold">
                {intervention ? intervention.technicien : "Aucun"}
              </span>
            </div>
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">
                Administrateur au téléphone :{" "}
              </strong>
              <span className="text-primary font-bold">
                {intervention ? intervention.adminOnCall : "Aucun"}
              </span>
            </div>
            <div className="mb-2 d-flex justify-content-between my-3">
              <strong className="font-bold">Date : </strong>
              <span className="text-primary font-bold">
                {intervention ? intervention.date : "Aucun"}
              </span>
            </div>
            <div className="my-3">
              <div className="font-bold mb-3">
                {intervention && "Compte rendu de l'intervention :"}
              </div>
              <article className="text-wrap">
                <p>{intervention?.compteRendu.compte_rendu}</p>
              </article>
              <div className="wfx-row w-full">
                {intervention?.compteRendu.photos.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="col-xl-4 col-12 flex-col border border-black "
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={value.path}
                          style={{ objectFit: "cover", height: 150 }}
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <span
                          className="text-3xl cursor-pointer py-2"
                          onClick={async () => await downloadImage(value.path)}
                        >
                          <i className="fa-solid fa-download"></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="detail__footer d-flex justify-content-center">
            {intervention && (
              <Button color="primary" onClick={showModal}>
                Voir
              </Button>
            )}
          </div>
        </div>
      </PageLayout>
      {showModalCompteRendu && <InterventionCompteRendu />}
    </>
  );
}

export default ListInterventionTermier;
