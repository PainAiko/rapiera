import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/App";
import GestionUserFeatures from "@features/backofficeV2/gestionUserFeatures/gestionUserFeatures";
import { COLUMNS } from "@utils/tableau";
import PageLayout from "@widgets/Bov2/PageLayout";
import { useUpdateUser } from "@features/backofficeV2/gestionUserFeatures/hooks";
import { useGetMembersService } from "@config/API/getAPI";
import { setUserList } from "@entities/backofficev2/GestionUserSlice";
import MyDataTable from "@components/MyDataTable";
import { USER_LIST_COLUMNS } from "@components/columns/gestionUser";
import ActionButton, {
  ActionButtonLayout,
} from "@widgets/Bov2/ActionButton";
import { ROLE } from "@utils/ROLE";

function GestionUser() {
  const { userList, updateAnUser } = useAppSelector(
    (state) => state.gestionUser
  );
  const { response: membres, isloading } = useGetMembersService();
  const [user, setUser] = useState("");
  const [theUser, setTheUser] = useState("Admin");
  const [userToUpdate, setUserToUpdate] = useState<{id: number, role: string}>()
  const { handleEdit, handleDelete } = useUpdateUser(userToUpdate?.id as number, userToUpdate?.role as string);
  const dispatch = useAppDispatch();

  const columns = [
    ...USER_LIST_COLUMNS,
    {
      name: COLUMNS.actions,
      cell: (row: { [key: string]: string }) => (
        <ActionButtonLayout>
          <ActionButton
            onClick={() => {
              setUser(row[COLUMNS.role]);
              setUserToUpdate({id: +row.id, role: row[COLUMNS.role]})
              handleEdit(row);
            }}
          >
            <i className="fa-solid fa-edit text-blue"></i>
          </ActionButton>
          {row[COLUMNS.role] === ROLE.TECHNICIAN && (
            <ActionButton
              onClick={() => {
                handleDelete(row);
              }}
            >
              <i className="fa-solid fa-trash text-danger"></i>
            </ActionButton>
          )}
        </ActionButtonLayout>
      ),
    },
  ];

  useEffect(() => {
    if (Array.isArray(membres)) {
      dispatch(setUserList(membres));
    }
  }, [dispatch, membres]);

  return (
    <PageLayout title="Liste des utilisateurs">
      <div className="col-12 col-xl-8 list">
        <MyDataTable columns={columns} data={userList} loading={isloading} />
      </div>
      <div className="col-12 col-xl-4 detail">
        <div className="detail__head">
          <h2>
            {" "}
            {updateAnUser ? "Modification" : "Créaction de nouveau"} {theUser}{" "}
          </h2>
        </div>
        <div className="detail__content">
          <div className="wfx-row ">
            <GestionUserFeatures user={user} setType={setTheUser} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default GestionUser;
