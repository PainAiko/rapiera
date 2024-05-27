import { FunctionComponent, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  title?: string,
  addClassName?: string
}>

const Cardheader: FunctionComponent<Props> =  ({title,addClassName,children}) => {
  return <div className={`wfx-card__header ${addClassName}`}>
  <h2>
    {title}
  </h2>
  {children}
</div>
}

export default Cardheader
