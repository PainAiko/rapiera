import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;
function PageLayout({ title, children }: Props) {
  return (
    <>
      <div className="wfx-dashi__main-content-head">
        <h1 className="font-bold">{title}</h1>
      </div>
      <div className="wfx-dashi__main-content-body">
        <div className="wfx-row h-full">
            {children}
        </div>
      </div>
    </>
  );
}

export default PageLayout;
