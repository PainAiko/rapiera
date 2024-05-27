import { TableColumn } from "react-data-table-component";
import { COLUMNS } from "../../utils/tableau";

export const USER_LIST_COLUMNS: TableColumn<{ [key: string]: string }>[] = [
    {
      name: COLUMNS.name,
      selector: (row) => row[COLUMNS.name],
      sortable: true,
    },
    {
      name: COLUMNS.role,
      selector: (row) => row[COLUMNS.role],
      sortable: true,
    },
    {
      name: COLUMNS.organisation,
      selector: (row) => row[COLUMNS.organisation],
      sortable: true,
    },
  ];