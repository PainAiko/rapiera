import { ButtonHTMLAttributes, FunctionComponent, PropsWithChildren } from "react"

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  textColor?: string,
  color?: string,
  addClassName?: string
};

const Button: FunctionComponent<Props> = ({textColor = "white",color,addClassName, children, ...rest}) => {
  return <button className={`wfx-btn wfx-btn-${color} text-${textColor} ${addClassName}`} {...rest} >
  {children}
</button>
}

export default Button
