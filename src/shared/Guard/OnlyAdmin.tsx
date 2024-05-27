import { ReactNode } from 'react'
import { getRole } from '@utils/getToken';
import { Navigate } from 'react-router-dom';
import { ROLE } from '@utils/ROLE';

function OnlyAdmin({element, redirection, onlySup}: {element: ReactNode, redirection: string, onlySup: boolean}) {
    if(getRole() === ROLE.SUPER_ADMIN || (getRole() === ROLE.ADMIN_ORGANIZATION && !onlySup)) {
        return element
    }
    return <Navigate to={redirection} />
}

export default OnlyAdmin
