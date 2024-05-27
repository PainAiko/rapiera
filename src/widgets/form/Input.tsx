import { FunctionComponent, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  label?: string,
  labelClass?: string
}>

const Input: FunctionComponent<Props> = ({label, labelClass, children}) => {
  return <div className="wfx-form">
  <label className={labelClass}>{label}</label>
  {children}
</div>
}

export default Input
