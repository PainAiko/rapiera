import axios from "axios";
import { ROLE } from "../../utils/ROLE";
import { useEffect, useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMembers, getAllOrganisations, getAllIntervention, deleteOrganisation, deleteTechnicien } from "./CONST";
// import { getRole } from "../../utils/getToken";
import { CompteRendu } from  "@entities/backofficev2/interventionTerminer";
import { getRole } from "@shared/utils/getToken";



export const useGetMembersService = () => {
  const [response, setResponse] = useState<{data?: []}>({});
  const [error, setError] = useState<string>();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        const res = await getAllMembers();
        if (res?.status === 200) {
          setResponse(res.data.data);
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data.message);
        } else {
          setError("Une erreur inattendue s'est produite.");
        }
      }
      setIsloading(false);
    })();
  }, []);

  return {
    response,
    error,
    isloading,
  };
};

export const useGetAllOrganisationService = () => {
  const [response, setResponse] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        if(getRole() === ROLE.ADMIN) {
          return
        }
        const res = await getAllOrganisations();
        if (res?.status === 200) {
          setResponse(res.data);
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data.message);
        } else {
          setError("Une erreur inattendue s'est produite.");
        }
      }
      setIsloading(false);
    })();
  }, []);

  return {
    response,
    error,
    isloading,
  };
};

export const deleteMembers = createAsyncThunk<
  { [key: string]: string | [] },
  { role: string; id: number }
>("delete-members", async (credentials: { role: string; id: number }) => {
  try {
    let res;
    switch (credentials.role) {
      case ROLE.TECHNICIAN:
        res = await deleteTechnicien(credentials.id);
        break;
      case ROLE.ADMIN_ORGANIZATION:
        res = await deleteOrganisation(credentials.id);
        break;
    }
    return { ...res?.data, id: credentials.id };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    } else {
      throw new Error("Une erreur inattendue s'est produite.");
    }
  }
});

export interface InterventionParent {
  id: number;
  intervention_id_graphql: number;
  site_name: string;
  status: "en cours" | "terminée";
  technician_id: number;
  created_at: string,
  admin: string | null,
  admin_id: string | null,
  adminAtPhone: string,
  techMeetLink: string | null,
  technicien_responsable: {
    id: number,
    name: string,
  },
  materials_count: number
  compte_rendu?: CompteRendu
}

export const useGetAllInteventionService = () => {
  const [response, setResponse] = useState<InterventionParent[]>([]);
  const [error, setError] = useState<string>("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        const res = await getAllIntervention();
        setResponse(res.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data.message);
        } else {
          setError("Une erreur inattendue s'est produite.");
        }
      }
      setIsloading(false);
    })();
  }, []);

  return {
    response,
    error,
    isloading,
  };
};
export { deleteOrganisation };

