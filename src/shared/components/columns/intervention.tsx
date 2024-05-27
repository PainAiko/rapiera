import { TableColumn } from "react-data-table-component";
import { COLUMNSV2 } from "../../utils/tableau";
import { CompteRendu } from "@entities/backofficev2/interventionTerminer";
import { ChangeEvent } from "react";
import { useAppDispatch } from "@app/hooks/App";
import { assignedInterventionToAdmin } from "@entities/backofficev2/listInterventionSlice";

type InterventionColumns = {
  id: string;
  admin_id: string | null;
  compteRendu?: CompteRendu;
  meet: string | null;
  adminOnCall: string;
  [COLUMNSV2.SITE]: string;
  [COLUMNSV2.ID]: number;
  [COLUMNSV2.TECHNICIEN]: number;
  [COLUMNSV2.ADMIN_ASSIGNED]: string | { title: string; value: number }[];
  [COLUMNSV2.NUMBER_MATERIELS]: number;
  [COLUMNSV2.DATE]: string;
}

export const InteventionColumns = (
): TableColumn<InterventionColumns>[] => {
  const dispatch = useAppDispatch()
  const assignAdminToIntervention = (interventionId: string, adminId: string, adminName: string) => {
    dispatch(assignedInterventionToAdmin({id: interventionId, adminId, adminName}));
  }
  return [
    {
      name: COLUMNSV2.SITE,
      selector: (row) => row[COLUMNSV2.SITE],
      sortable: true,
    },
    {
      name: COLUMNSV2.ID,
      selector: (row) => row[COLUMNSV2.ID],
      sortable: true,
    },
    {
      name: COLUMNSV2.TECHNICIEN,
      selector: (row) => row[COLUMNSV2.TECHNICIEN],
      sortable: true,
    },
    {
      name: COLUMNSV2.ADMIN_ASSIGNED,
      cell: (row: InterventionColumns) => {
        if (typeof row[COLUMNSV2.ADMIN_ASSIGNED] === "string") {

          return <>{row[COLUMNSV2.ADMIN_ASSIGNED] as string}</>;
        }
        if (Array.isArray(row[COLUMNSV2.ADMIN_ASSIGNED])) {          
          return (
            <div className="wfx-form position-relative">
              <select className="my-2" onChange={(e: ChangeEvent<HTMLSelectElement>) => assignAdminToIntervention(row.id, e.target.value, e.target.options[e.target.selectedIndex].getAttribute('data-title') as string)}>
                <option defaultValue={""}>
                  choisir un admin
                </option>
                {row[COLUMNSV2.ADMIN_ASSIGNED].map((option, index) => {
                  return (
                    <option key={index} value={option.value} data-title={option.title}>
                      {option.title}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }
      },
      sortable: true,
    },
    {
      name: COLUMNSV2.NUMBER_MATERIELS,
      selector: (row) => row[COLUMNSV2.NUMBER_MATERIELS],
      sortable: true,
    },
    {
      name: COLUMNSV2.DATE,
      selector: (row) => row[COLUMNSV2.DATE],
      sortable: true,
    },
  ]
};