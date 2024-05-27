import { PropsWithChildren } from "react"

type Props = PropsWithChildren
function Content({children}: Props) {
  return (
    <div className="wfx-dashi__right">
      {children}
    </div>
  )
}

export default Content
