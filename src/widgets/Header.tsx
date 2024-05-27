import { PropsWithChildren } from "react"

type Props = PropsWithChildren

export default function Header({children}: Props) {
  return <header className="wfx-header">
  <div className="wfx-header__content">
    <div className="wfx-header__content-body">
        {children}
    </div>
  </div>
</header>
}
