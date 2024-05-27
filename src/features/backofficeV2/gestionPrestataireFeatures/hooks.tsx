import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { createOrganizationService, deleteOrganizationService, updateOrganizationService } from  "@pages/Bo/admin/gestionPrestataire/gestionPrestataireAPI";
import { updateList, toggleModal, reset, changeName } from  "@entities/backofficev2/gestionPrestataireSlice";
import { popup } from  "@utils/popupSwealert";
import Swal from "sweetalert2";


export const useHandlePrestataire = () => {
    const dispatch = useAppDispatch();
  const {update, orgInfo} = useAppSelector(state => state.gestionPrestataire)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeName(value))
  };

  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if(update) {
      dispatch(updateOrganizationService({id: orgInfo?.id as string, organizationName: orgInfo?.name as string }))
      setLoading(false);
      return
    }

    const [response, serverError] = await createOrganizationService({
      organizationName: orgInfo?.name as string,
    });

    if (serverError) {
      setError(serverError);
      setLoading(false);
      return;
    }

    if (response) {
      dispatch(updateList(response.data))
      dispatch(toggleModal());
      popup("success", `${response.message}`)
      resetState()
    }
    setLoading(false);
  };
  const resetState = () => {
    dispatch(reset())
  }

  return {
    loading, 
    error,
    HandleSubmit,
    handleChange,
    resetState
  }
}

export const useUpdateListPrestataire = () => {
    const dispatch = useAppDispatch();
    const {res} = useAppSelector(state => state.gestionPrestataire)


    const handleDelete = (item: { [key: string]: string }) => {
        Swal.fire({
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Supprimer",
          cancelButtonText: "Annuler",
          title: "Supprimer un Prestataire",
          text: "Voulez-vous vraiment le supprimer?",
          position: "center",
          cancelButtonColor: "red",
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            dispatch(deleteOrganizationService(+item.Id))
          }
        });
      };

      useEffect(() => {
        if(res) {
            popup("success", `${res}`)
        }
        return () => {
            dispatch(reset())
        }
      }, [dispatch, res])
    return {
        handleDelete
    }
}