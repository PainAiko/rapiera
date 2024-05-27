import { PropsWithChildren } from "react"

type Props = PropsWithChildren

export default function Main({children}: Props) {
  return <main className="wfx-main">
  <div className="wfx-main__content">
    <div className="wfx-main__content-body">
    {children}
    </div>
  </div>
</main>;
}
