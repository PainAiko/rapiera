import { ReactNode } from 'react'
import isAuthenticated from './isAuthenticated'
import { Navigate } from 'react-router-dom'
import { getRole } from '@utils/getToken';
import { ROLE } from '@utils/ROLE';

function AuthGuard({element, redirection}: {element: ReactNode, redirection: string}) {
    let myRedirect = redirection;
    const userRole = getRole()
    if (userRole) {
        myRedirect =
          userRole === ROLE.TECHNICIAN
            ? "/technicien/profil"
            : redirection;
      }
    if(isAuthenticated() && (userRole === ROLE.ADMIN || userRole === ROLE.ADMIN_ORGANIZATION || userRole === ROLE.SUPER_ADMIN)) {
        return element
    }
    
  return <Navigate to={myRedirect} />
}

export default AuthGuard
