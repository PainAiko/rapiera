import { PropsWithChildren } from "react";

function ActionButton({children, onClick}: PropsWithChildren<{onClick?: () => void}>) {
  return (
    <div>
      <button
        className="bg-transparent border-none cursor-pointer font-lg"
        onClick={onClick ? onClick : () => {}}
      >
        {children}
      </button>
    </div>
  );
}

export const ActionButtonLayout = ({ children }: PropsWithChildren) => (
  <div className="action d-flex gap-5 align-items-center justify-content-center">
    {children}
  </div>
);

export default ActionButton;
