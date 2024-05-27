import { PropsWithChildren, useEffect, useState } from "react";
import { getRole } from "@utils/getToken";
import { ROLE } from "@utils/ROLE";

type Props = PropsWithChildren<{
  onEdit?: () => void;
  onDelete?: () => void;
  listrole: string;
}>;

function TableActions({ onEdit, onDelete, listrole, children }: Props) {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const isRole = getRole();
    if (isRole) {
      setRole(isRole);
    }
  }, []);
  return (
    <td className="action d-flex gap-5 align-items-center justify-content-center">
      <div>
        <button
          className="bg-transparent border-none cursor-pointer font-lg"
          onClick={onEdit}
        >
          <i className="fa-solid fa-edit text-blue"></i>
        </button>
      </div>
      {listrole === ROLE.ADMIN && role === ROLE.ADMIN ? null : (
        <div>
          <button
            className="bg-transparent border-none cursor-pointer font-lg"
            onClick={onDelete}
          >
            <i className="fa-solid fa-trash text-danger"></i>
          </button>
        </div>
      )}

      {children}
    </td>
  );
}

export default TableActions;
