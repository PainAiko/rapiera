import { PropsWithChildren } from "react"

type Props = PropsWithChildren

export default function CardFooter({ children }: Props) {
  return <div className="wfx-card__footer">{children}</div>;
}
