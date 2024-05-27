import { FunctionComponent, InputHTMLAttributes, PropsWithChildren } from "react"

type Props = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> & {
  type?: string,
  label?: string
}

const Field: FunctionComponent<Props> = ({type, label, children, ...rest}) => {
  return <div className="wfx-form">
  <label>{label}</label>
  <input type={type} {...rest} />
  {children}
</div>
}

export default Field