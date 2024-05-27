import { ROLE } from "./ROLE";
import { LINKSIDE_BAR } from "./const";
import { getRole } from "./getToken";

type FormState<T> = {
  [K in keyof T]: T[K];
};

export const validateForm = <T extends object>(states: FormState<T>) => {
  for (const key in states) {
    if (typeof states[key] === "object" && states[key] !== null) {
      if (
        (states[key] as object) instanceof Object &&
        Object.keys(states[key] as object).length === 0
      ) {
        return false;
      }
    } else if (!states[key]) {
      return false;
    }
  }
  return true;
};

export function extractFromUrl(chaine: string): boolean {
  const parties = chaine.split("/");
    switch (parties[2]) {
      case LINKSIDE_BAR.G_USER:
        if (getRole() === ROLE.ADMIN) {
          return false;
        }
        return true
      case LINKSIDE_BAR.G_PRESTATAIRE:
        if (getRole() === ROLE.ADMIN || getRole() === ROLE.ADMIN_ORGANIZATION) {
          return false;
        }
        return true
      case LINKSIDE_BAR.HISTORY:
        if(getRole() !== ROLE.SUPER_ADMIN) {
          return false
        }
        return true
      default:
        return true
    }
}
