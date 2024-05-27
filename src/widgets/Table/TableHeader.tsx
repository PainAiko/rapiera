import { FC } from "react";

interface TableHeaderProps {
  columns: string[];
}

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} scope="col">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader
