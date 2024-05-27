import { ROLE } from "./ROLE";
import Cookies  from "js-cookie"

export const token = () => {
    return Cookies.get("accessToken")
}

export const tokenGraphql = () => {
    return import.meta.env.VITE_TOKEN_GRAPHQL
}

export interface LocalData {
    accessToken: string;
    role: string
    infoUser?: unknown
    organizationId?: number
}
export const setItemLocalStorage = (data: LocalData) => {
    Cookies.set('accessToken', data.accessToken, {expires: 7, secure: true})
    Cookies.set('role', data.role, {expires: 7, secure: true})
    if (data.infoUser) {
        localStorage.setItem('infoUser', JSON.stringify({...data.infoUser, organizationId: data.organizationId}))
    }
}

export const setInterventionIdGraphql = (data:  {interventionId?: number, interventionIdGraphql?:number}) => {
    data.interventionIdGraphql && localStorage.setItem("interventionIdGraphql", `${data.interventionIdGraphql}`)
    data.interventionId && localStorage.setItem("interventionId", `${data.interventionId}`)
}

export const getRole = () => {
    return Cookies.get("role")
}

export const getOrganisationId = () => {
    return localStorage.getItem("infoUser") && JSON.parse(localStorage.getItem("infoUser") as string)?.organizationId
}

export const setTitle = () => {
    return getRole() && getRole() === ROLE.ADMIN
      ? "Création"
      : getRole() === ROLE.ADMIN_ORGANIZATION
      ? "Créer un technicien"
      : "Créer un utilisateur";
  };
  
export const getUserConnectedId = () => {
    return localStorage.getItem("infoUser") !== null ? JSON.parse(localStorage.getItem("infoUser") as string).id : null
}

export const getUserConnectedEmail = () => {
    return localStorage.getItem("infoUser") !== null ? JSON.parse(localStorage.getItem("infoUser") as string).email : ""
}

export const getUserConnectedName = () => {
    return localStorage.getItem("infoUser") !== null ? JSON.parse(localStorage.getItem("infoUser") as string).name : ""
}

export const getGraphqlId = () => {
    return localStorage.getItem("interventionIdGraphql") !== null ? localStorage.getItem("interventionIdGraphql") as string : ""
}

export const getInterventionId = () => {
    return localStorage.getItem("interventionId") !== null ? localStorage.getItem("interventionId") as string : ""
}

export const logOut = () => {
    Cookies.remove("accessToken")
    Cookies.remove("accessGraph")
    Cookies.remove("role")
    localStorage.clear()
}

export const headersNotification = () => {
    return {
          Authorization: `Bearer ${token()}`,
          "Access-Control-Allow-Origin":"*"
        };
}