import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { popup } from  "@utils/popupSwealert";
import { hideUserModal, updateUserInfo, resetForm, setNewUser, updateUser } from  "@entities/backofficev2/GestionUserSlice";
import { updateAdminService, createUser } from  "@pages/Bo/admin/gestionUser/Modal/CreationAPI";
import { ROLE } from  "@utils/ROLE";
import { getRole } from  "@utils/getToken";
import { COLUMNS } from  "@utils/tableau";
import Swal from "sweetalert2";
import { deleteMembers } from "@config/API/getAPI";
import { useGetTechnicienInfo } from "../../profil/profilAPI";

export const useHandleUser = (activeTab: number) => {
    const {
        id,
        nom,
        email,
        organizationName,
        password,
        meetLink,
        updateAnUser,
        userList
      } = useAppSelector((state) => state.gestionUser);
      const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

      const dispatch = useAppDispatch();

      const serializeData = (data: {
        newPassword: string;
        meetLink: string | undefined;
        newName: string;
        newEmail: string;
        organizationId: string;
      }) => {
        const isNewEmailOrgAdmin = userList.find(
          (user) => user?.id == (id as string | number)
        );
        if (
          updateAnUser === ROLE.ADMIN_ORGANIZATION &&
          isNewEmailOrgAdmin?.email === email
        ) {
          return {
            ...data,
            newEmail: "",
          };
        }
        return data;
      };

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // validation des donnees
        if (nom === "" && email === "" && password === "") {
          setError("Tous les champs sont obligatoires.");
          return;
        }
        setLoading(true);
    
        // si c'est une mis a jour
        if (updateAnUser) {
          const data = {
            newPassword: password,
            meetLink: meetLink,
            newName: nom,
            newEmail: email,
            organizationId: organizationName?.id as string,
          };
    
          const [response, errorRes] = await updateAdminService(
            serializeData(data),
            id as number,
            updateAnUser
          );
    
          if (errorRes) {
            setError(errorRes);
            setLoading(false);
            return;
          }
          dispatch(hideUserModal());
          dispatch(
            updateUserInfo({
              name: response.data.newName,
              role:
                getRole() && getRole() === ROLE.ADMIN && activeTab === 0
                  ? "admin"
                  : activeTab === 1
                  ? "admin-organization"
                  : null,
              organization: organizationName,
              email: response.data.newEmail,
              id,
            })
          );
          setLoading(false);
          popup("success", `${response.message}`);
          dispatch(resetForm());
          return;
        }
    
        // si on veut cree un nouveau utilisateur
        const [response, errorRes] = await createUser(
          {
            nom,
            email,
            organizationName,
            password,
          },
          activeTab as number
        );
    
        if (errorRes) {
          setError(errorRes);
          setLoading(false);
          return;
        }
        if (response) {
          popup("success", `${response.message}`);
          dispatch(hideUserModal());
          dispatch(resetForm());
          dispatch(
            setNewUser({
              name: response.data.name,
              role:
                getRole() && getRole() === ROLE.SUPER_ADMIN && activeTab === 0
                  ? "admin"
                  : activeTab === 1
                  ? "admin-organization"
                  : null,
              organization: organizationName?.name,
              email: response.data.email,
              id: response.data.id,
            })
          );
        }
        setLoading(false);
      };

      const reset = () => {
        dispatch(resetForm());
        setError("")
      }

      return {
        loading,
        error,
        handleSubmit,
        reset
      }
}

export const useUpdateUser = (id: number, role: string) => {
  const dispatch = useAppDispatch();
  const  {response} = useGetTechnicienInfo(id);
  const [meet, setMeet] = useState<string>("")

  useEffect(() => {
    if (
      role === ROLE.TECHNICIAN &&
      (getRole() === ROLE.ADMIN_ORGANIZATION || getRole() === ROLE.SUPER_ADMIN)
    ) {
      setMeet(response?.meet as string)
    }
  }, [response?.meet, role])
  const handleEdit = (item: { [key: string]: string }) => {
    dispatch(
      updateUser({
        type: item[COLUMNS.role],
        userInfo: {
          ...item,
          meetLink: item.meetLink ? item.meetLink : meet,
        },
      })
    );
  };

  const handleDelete = (item: { [key: string]: string }) => {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      title: `Supprimer ${item[COLUMNS.role]}`,
      text: "Voulez vous vraiment le supprimer?",
      position: "center",
      cancelButtonColor: "red",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteMembers({ role: item[COLUMNS.role], id: +item.id }));
      }
    });
  };
  return {handleEdit, handleDelete}
}
