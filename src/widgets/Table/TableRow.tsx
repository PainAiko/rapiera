import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  data: { [key: string]: string };
  exclude: string[]
}>
function TableRow({ data, children, exclude = [] }: Props) {
  return (
    <tr>
      {Object.keys(data).map((key, index) => {
        return exclude.includes(key) ? (
        <td key={index} data-label={key}>
          {data[key]}
        </td>
      ) : null})}
      {children}
    </tr>
  );
}

export default TableRow
