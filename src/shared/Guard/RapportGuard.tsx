import { ReactNode } from 'react'
import { useAppSelector } from '@app/hooks/App'
import { Navigate } from 'react-router-dom'

function RapportGuard({element, redirection}: {element: ReactNode, redirection: string}) {
    const {isTechnicianChangeMaterial} = useAppSelector(state => state.homePage)

    if(isTechnicianChangeMaterial) {
        return element
    }
  return <Navigate to={redirection} />
}

export default RapportGuard
