import { PropsWithChildren } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableActions from "./TableActions";
import LoadingComponent from "../loading/LoadingComponent";

type Props = PropsWithChildren<{
  data: { [key: string]: string }[];
  onEdit: (item: { [key: string]: string }) => void;
  onDelete: (item: { [key: string]: string }) => void;
  columns: string[];
  loading: boolean;
}>;

function Table({ data, onEdit, onDelete, columns, loading = false}: Props) {
  return (
    <>
      <table className="wfx-table">
        <TableHeader columns={columns} />
        {!loading && (
          <tbody>
            {data.map((theData, index) => (
              <TableRow key={index} data={theData} exclude={columns}>
                <TableActions
                  listrole={theData["Rôle"]}
                  onEdit={() => onEdit(theData)}
                  onDelete={() => onDelete(theData)}
                />
              </TableRow>
            ))}
          </tbody>
        )}
      </table>
      {loading && <LoadingComponent />}
    </>
  );
}

export default Table;
