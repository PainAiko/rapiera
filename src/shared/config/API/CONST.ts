import instance from ".";
import { PhotoType } from  "@features/intervention/PhotoIntervention/photoInterventionAPI";
import { Data } from  "@features/initialiseIntervention/interventionCheckTechAPI";
import { UpdateData } from  "@features/profil/Model";
import { host } from "./endpoints";
import { Data as SendRapportType } from  "@features/rapportFeatures/RapportFeatureAPI";
import { Data as UpdateMacAddressType } from  "@pages/changeMacAddress/changeMacAddressAPI";

export const getAllMembers = () =>
  instance.get(`${host.base_url_account}/users`);

export const getAllOrganisations = () =>
  instance.get(`${host.base_url_account}/organizations`);
export const getAllIntervention = () => instance.get("/intervention");
export const getAllInterventionTerminer = () => instance.get("/intervention?status=terminée");

export const checkTech = (data: { email: string; society: string }) =>
  instance.get(
    `${host.base_url_account}/check?email=${data.email}&society=${data.society}`
  );

export const initializeIntervention = (data: Data) =>
  instance.post(`/intervention/initialize`, data);

export const login = (data: { email: string; password: string }) =>
  instance.post(`${host.base_url_auth}/login`, data);

export const sendPhotoIntervention = (data: PhotoType) =>
  instance.post(`/intervention/upload/${data.type}`, data.data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getPhotoIntervention = (data: {
  interventionId: string;
  materielId: string;
}) =>
  instance.get(
    `/intervention/${data.interventionId}/material/${data.materielId}`
  );
export const photoSupplementaire = (data: {
  interventionId: string;
  data: FormData;
}) =>
  instance.post(`/intervention/${data.interventionId}/photo-sup`, data.data);

export const getTechnicienInfo = (id: number) =>
  instance.get(`${host.base_url_account}/technician/${id}`);

export const updateTechincienInfo = (id: number, data: UpdateData) =>
  instance.put(`${host.base_url_account}/technician/${id}`, data);

export const sendRapport = (data: SendRapportType) =>
  instance.post(`/rapports/intervention/${data.interventionId}`, data.data);

export const searchBySuperAdmin = (query: string) =>
  instance.get(`${host.base_url_account}/search?q=${query}`);

export const searchBySuperAdminNextPage = (query: string, page: string) =>
  instance.get(`${host.base_url_account}/search?q=${query}&page=${page}`);

export const changeMacAddress = (data: UpdateMacAddressType) =>
  instance.post(
    `intervention/adiresy`,
    data
  );

export const getAdmin = () => instance.get(`${host.base_url_account}/admin`);
export const getInterventionInfo = (interventionId: string) =>
  instance.get(`/intervention/${interventionId}/final`);

export const getInterventionAdmin = (id: string) =>
  instance.get(`/intervention/${id}/all`);

export const createOrganization = (data: { [key: string]: string }) =>
  instance.post(`${host.base_url_account}/create/organization-profil`, data);
export const updateOrganization = (data: { [key: string]: string }) =>
  instance.put(`${host.base_url_account}/organization/${data.id}`, {organizationName: data.organizationName});

export const deleteOrganisation = (id: number) =>
  instance.delete(`${host.base_url_account}/organization/${id}`);
export const deleteTechnicien = (id: number) =>
  instance.delete(`${host.base_url_account}/technician/${id}`);

export const finishingIntervention = (id: string, data: FormData) => instance.post(`/intervention/${id}/finished`, data)

export const assignedAdminToIntervention = (id: string, adminId: string) => instance.put(`/intervention/${id}/assign`, {adminId})

export const getLog = () => instance.get(`/logs`)
export const getLogNextPage = (page: string) => instance.get(`/logs?page=${page}`)

export const APInotifcation = {
  getNotification: `${host.origin}/notification`,
}

export const sendNotificationForMeet = (data: {meetLink: string, technicianId: number}) => instance.post(`/request-join`, data)

export const getNotificationCall = () => instance.get(`/notifications`)
export const getNotificationCallNextPage = (page: string) => instance.get(`/notifications?page=${page}`)