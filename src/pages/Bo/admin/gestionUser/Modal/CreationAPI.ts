import axios from "axios";
import instance from "@config/API";
import { host } from "@config/API/endpoints";
import { getOrganisationId, getRole } from  "@utils/getToken";
import { ROLE } from  "@utils/ROLE";
import { filterData } from  "@utils/serialize";
import { updateTechincienInfo } from "@config/API/CONST";

const createTechnician = (data: {
  techName: string;
  techEmail: string;
  techPassword: string;
  organizationId: string | number
}) => instance.post(`${host.base_url_account}/create/technician`, data);

const createPrestataire = (data: {
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  organizationId: string;
}) => instance.post(`${host.base_url_account}/create/organization`, data);

const createAdmin = (data: {
  name : string,
  email: string,
  password : string
}) => instance.post(`${host.base_url_account}/create/admin`, data)

const updateAdmin = (data: {
  newPassword?: string
  newName?: string
  newEmail?: string 
},id: number) => instance.put(`${host.base_url_account}/admin/${id}`, data)

const updateAdminOrg = (data: {
  newPassword?: string
  newName?: string
  newEmail?: string 
  organizationId?: string
},id: number) => instance.patch(`${host.base_url_account}/manager/${id}`, data)

type Data = {
  nom: string;
  email: string;
  password: string;
  organizationName?: {
    id?: string | number,
    name?: string
  };
};

// TODO: use createAsyncThunk instead

export const createUser = async (datas: Data, type?: number) => {
  let response, error;

  const role = getRole();

  const createViaRole = {
    [ROLE.ADMIN_ORGANIZATION]: (data: Data) => {
      const newData = {
        techName: data.nom,
        techEmail: data.email,
        techPassword: data.password,
        organizationId: getOrganisationId()
      };

      return createTechnician(newData);
    },
    [ROLE.SUPER_ADMIN]: (data: Data, type?: number) => {
      const newData = {
        adminName: data.nom,
        adminEmail: data.email,
        adminPassword: data.password,
        organizationId: data.organizationName?.id as string,
      };
      const techData = {
        techName: data.nom,
        techEmail: data.email,
        techPassword: data.password,
        organizationId: data.organizationName?.id as string,
      };
      return type === 1 ? createPrestataire(newData) : type === 2 ? createTechnician(techData) : createAdmin({email: data.email, name: data.nom, password: data.password});
    },
  };

  try {
    if (role) {
      const res = await createViaRole[role as keyof typeof createViaRole](
        datas, type
      );
        response = res.data;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = e.response?.data.message;
    } else {
      error = "Une erreur inattendue s'est produite.";
    }
  }

  return [response, error];
};

export const updateAdminService = async (data: {
  newPassword?: string
  meetLink?: string
  newName?: string
  newEmail?: string  
  organizationId?: string
}, id: number, type: string) => {
  let response, error;

  try {
    let res
    switch (type) {
      case ROLE.ADMIN:
        res = await updateAdmin(filterData(data),id)
        break;
      case ROLE.ADMIN_ORGANIZATION:
        res = await updateAdminOrg(filterData(data),id)
        break;
      case ROLE.TECHNICIAN:
        res = await updateTechincienInfo(id, filterData(data))
        break;
    }
    if((res?.status === 201 || res?.status === 200) && res?.data.success === true ) {
      response = res.data
    } else {
      error = res?.data.message
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = e.response?.data.message;
    } else {
      error = "Une erreur inattendue s'est produite.";
    }
  }

  return [response, error]
}