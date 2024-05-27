import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
function Header({ children }: Props) {
  return (
    <header className="wfx-dashi__header">
      <div className="wfx-dashi__header-content">{children}</div>
    </header>
  );
}

export default Header;
