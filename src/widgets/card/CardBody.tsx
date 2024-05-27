import { PropsWithChildren } from "react"

type Props = PropsWithChildren

export default function CardBody({children}: Props) {
  return (
    <div className="wfx-card__content">
        {children}
    </div>
  )
}
