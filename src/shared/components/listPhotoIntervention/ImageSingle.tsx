import { PropsWithChildren } from "react";
import { downloadImage } from "../../utils/genererPDF";

type Props = PropsWithChildren<{
  image: string;
}>;

function ImageSingle({ image }: Props) {
  const handleClick = async () => {
    await downloadImage(image)
  }
  return (
    <div className="intervention-image br-md">
      <div className="wfx-image contain">
        <img src={image} alt="..." />
      </div>
      <span className="p-2 text-3xl cursor-pointer" onClick={handleClick}>
        <i className="fa-solid fa-download"></i>
      </span>
    </div>
  );
}

export default ImageSingle;
