import { PropsWithChildren } from "react"

type Props = PropsWithChildren
export default function FooterModal({children}: Props) {
  return <div className="wfx-modal__body-footer d-flex justify-content-end">
    {children}
</div>
}
