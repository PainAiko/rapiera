import { PropsWithChildren } from "react";

type Props = PropsWithChildren
function MainBo({children}: Props) {
  return (
    <main className="wfx-main-dash">
      <div className="wfx-main-dash__content">
        <div className="wfx-main-dash__content-body">
            {children}
        </div>
      </div>
    </main>
  );
}

export default MainBo;
