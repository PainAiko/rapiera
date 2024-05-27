import { TableColumn } from "react-data-table-component";
import { COLUMNS } from "../../utils/tableau";

export const PRESTATAIRE_COLUMNS: TableColumn<{ [key: string]: string }>[] = [
    {
      name: COLUMNS.id,
      selector: (row) => row[COLUMNS.id],
      sortable: true,
    },
    {
      name: COLUMNS.firstName,
      selector: (row) => row[COLUMNS.firstName],
      sortable: true,
    }
  ];