import { ReactNode } from 'react'
import isAuthenticated from './isAuthenticated'
import { Navigate } from 'react-router-dom'
import { getRole } from '@utils/getToken'

function IsAuthenticated({element, redirection}: {element: ReactNode, redirection: string}) {
    if(isAuthenticated() && getRole() === "technician") {
        return element
    }
    
  return <Navigate to={getRole() !== "technician" ? "/dashboard" : redirection} />
}

export default IsAuthenticated
