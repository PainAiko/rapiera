import { RapportFile } from "@pages/Bo/admin/rapport/Modal";
import ActionButton, { ActionButtonLayout } from "@widgets/Bov2/ActionButton";
import { downloadImage } from "../../utils/genererPDF";
import { COLUMNSV2 } from "../../utils/tableau";
import type { TableColumn } from "react-data-table-component";
import { useState } from "react";
import LoadingComponent from "@widgets/loading/LoadingComponent";

export const RAPPORT_COLUMNS: TableColumn<{
  [COLUMNSV2.SITE]: string;
  [COLUMNSV2.ID]: string;
  [COLUMNSV2.TECHNICIEN]: string;
  [COLUMNSV2.CREELE]: string;
  rapport: RapportFile;
}>[] = [
  {
    name: COLUMNSV2.SITE,
    selector: (row) => row[COLUMNSV2.SITE],
    sortable: true,
  },
  {
    name: "N° Intervention",
    selector: (row) => row[COLUMNSV2.ID],
    sortable: true,
  },
  {
    name: "Technicien",
    selector: (row) => row[COLUMNSV2.TECHNICIEN],
    sortable: true,
  },
  {
    name: "Créé le",
    selector: (row) => row[COLUMNSV2.CREELE],
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => {
      const [load, setLoading] = useState(false);
      return (
        <ActionButtonLayout>
          <ActionButton>
            <a href={row.rapport.path as string} target="_blank">
              {" "}
              <i className="fa-solid fa-eye"></i>
            </a>
          </ActionButton>
          {load ? (
            <LoadingComponent />
          ) : (
            <ActionButton
              onClick={async () => {
                setLoading(true);
                await downloadImage(
                  row.rapport.path as string,
                  true,
                  row[COLUMNSV2.CREELE]
                );
                setLoading(false);
              }}
            >
              <a>
                <i className="fa-solid fa-download text-gray hover:text-primary"></i>
              </a>
            </ActionButton>
          )}
        </ActionButtonLayout>
      );
    },
  },
];
