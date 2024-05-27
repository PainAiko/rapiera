import { token } from "../utils/getToken"

function isAuthenticated() {
  return token() ? true : false
}

export default isAuthenticated
