import { PropsWithChildren } from "react";
import { downloadImage } from "../../utils/genererPDF";

type Props = PropsWithChildren<{
  title: string;
  images?: string[];
}>;

function ListPhotoIntervention({ title, children, images }: Props) {
  const handleclick = () => {
    if(images) {
      Promise.all(images.map(async (image) => {
        await downloadImage(image)
      }))
    }
  };
  return (
    <div className="pg-intervention__item mb-5">
      <div className="wfx-card br-none no-border">
        <div className="wfx-card__header">
          <h3 className="font-bold">
            {title}
            <span className="pl-2 cursor-pointer" onClick={handleclick}>
              <i className="fa-solid fa-download"></i>
            </span>
          </h3>
        </div>
        <div className="wfx-card__content">{children}</div>
      </div>
    </div>
  );
}

export default ListPhotoIntervention;
