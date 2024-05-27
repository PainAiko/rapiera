import LoadingComponent from "@widgets/loading/LoadingComponent";
import { frenchOptions } from "@utils/tableau";
import DataTable, { TableColumn } from "react-data-table-component";
import Search from "@features/Search/Search";
import useSearchDataTable from "@features/Search/hooks/searchDataTable";

interface Props<T> {
  columns: TableColumn<T>[];
  data: T[];
  onClick?: (row: T) => void;
  loading: boolean;
}

function MyDataTable<T>({ columns, data, onClick, loading }: Props<T>) {
  const {filteredData, searchInDataTable} = useSearchDataTable(data)
  return (
    <>
      <Search handlechange={searchInDataTable} />
      <DataTable
        columns={columns}
        data={filteredData}
        className="wfx-table"
        pagination={true}
        paginationComponentOptions={frenchOptions.Pagination}
        noDataComponent={frenchOptions.noDataComponent}
        onRowClicked={onClick}
        progressComponent={<LoadingComponent />}
        progressPending={loading}
        fixedHeader={true}
        fixedHeaderScrollHeight="400px"
        highlightOnHover={true}
        defaultSortAsc={true}
      />
    </>
  );
}

export default MyDataTable;
