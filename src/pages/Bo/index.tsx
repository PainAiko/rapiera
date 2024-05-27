import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"

function BoLayout({children}: PropsWithChildren) {
  return <div className="wfx-app-dash">
        <Outlet />
        {children}
</div>
}

export default BoLayout
