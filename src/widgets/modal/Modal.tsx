import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{large?: boolean}>
function Modal({children, large=false}: Props) {
  return <div className="wfx-modal active">
  <div className="wfx-modal__bg"></div>
  <div className={`wfx-modal__body ${large ? "w-11/12 h-5/6" : ""}`}>
    {children}
  </div>
</div>
}

export default Modal
