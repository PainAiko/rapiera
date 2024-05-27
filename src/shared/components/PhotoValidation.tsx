import { PropsWithChildren, useState, useEffect } from "react";
import ImageIntervention from "./listPhotoIntervention/ImageIntervention";
import ListPhotoIntervention from "./listPhotoIntervention/ListPhotoIntervention";
import { CheckboxSingle } from  "@widgets/form/ChexkBoxSingle";
import { FileObject } from "@features/intervention/PhotoIntervention/Model";


type TypePhoto = "avant" | "après"

type Props = PropsWithChildren<{
    labelSelectionAll?: string;
    images?: FileObject[];
    type: TypePhoto
  }>;
  
  const PhotoValidation = ({ labelSelectionAll,type, images }: Props) => {
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [checkList, setCheckList] = useState<{ [key: string]: boolean }>({});
    const [listImage, setListImage] = useState<string[]>([])
  
    const handlecheckAllList = () => {
      setCheckAll((p) => !p);
      setCheckList((prevCheckList) => {
        const updatedCheckList: { [key: string]: boolean } = {};
        for (const key in prevCheckList) {
          updatedCheckList[key] = !checkAll;
        }
        return updatedCheckList;
      });
    };
  
    useEffect(() => {
      if(images) {
        images.map((image, index) => {
          setCheckList((p) => ({ ...p, [`${image}${index}`]: false }));
        });
        setListImage(images.map((value: FileObject) => {
          return value?.path
        }))
      }
    }, [images]);
  
    return (
      <ListPhotoIntervention title={`Photos ${type} intervention à valider`} images={listImage}>
        <div className="wfx-form">
          <CheckboxSingle
            option={labelSelectionAll}
            checked={checkAll}
            onChange={handlecheckAllList}
          />
        </div>
        <div className="wfx-row w-full">
          {images?.map((image, index) => (
            <ImageIntervention key={index} image={image?.path}>
              <div className="wfx-form">
                <CheckboxSingle
                  checkboxClassName="justify-content-center"
                  checked={
                    typeof checkList[`${image}${index}`] === "undefined"
                      ? false
                      : checkList[`${image}${index}`]
                  }
                  onChange={() => {
                    if(checkList[`${image}${index}`]) {
                      setCheckAll(false)
                    }
                    setCheckList({
                      ...checkList,
                      [`${image}${index}`]: !checkList[`${image}${index}`],
                    });
                  }}
                />
              </div>
            </ImageIntervention>
          ))}
        </div>
      </ListPhotoIntervention>
    );
  };


  export default PhotoValidation