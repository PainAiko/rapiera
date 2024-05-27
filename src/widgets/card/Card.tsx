import { FunctionComponent, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  addClassName?: string
}>

const Card: FunctionComponent<Props> = ({addClassName,children}) => {
  return <div className={`wfx-card ${addClassName ? addClassName : ""}`}>
   {children}
</div>
}

export default Card
