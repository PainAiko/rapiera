import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
function Main({ children }: Props) {
  return (
    <main className="wfx-dashi__main">
      <div className="wfx-dashi__main-content pg-intervetion-dash">
        {children}
      </div>
    </main>
  );
}

export default Main;
