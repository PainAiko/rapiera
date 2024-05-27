import { PropsWithChildren, HTMLAttributes } from "react";

type MyProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const PhotoLayout = ({ children, ...rest }: MyProps) => {
  return (
    <div className="hover:cursor-pointer" {...rest}>
      <div className="border-dashed-2 border-green p-1 image-selector flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};


export default PhotoLayout