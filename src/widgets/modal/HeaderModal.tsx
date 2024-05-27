import { FunctionComponent, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  title?: string
}>
const HeaderModal: FunctionComponent<Props> = ({title,children}) => {
  return <div className="wfx-modal__body-header justify-content-center">
  <h2 className="font-bold">
    {title}
  </h2>
  {children}
</div>
}

export default HeaderModal
