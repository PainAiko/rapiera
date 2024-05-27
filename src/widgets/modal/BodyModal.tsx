import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  addClassName?: string
}>

export default function BodyModal({addClassName = "popup d-flex justify-content-center gap-5 flex-column h-full", children}: Props) {
  return <div className="wfx-modal__body-content">
  <div
    className={`${addClassName}`}
  >
    {children}
  </div>
</div>
}
