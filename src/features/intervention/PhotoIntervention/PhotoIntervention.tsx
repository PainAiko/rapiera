import Card from "@widgets/card/Card";
import Cardheader from "@widgets/card/CardHeader";
import CardBody from "@widgets/card/CardBody";
import CardFooter from "@widgets/card/CardFooter";
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Input from "@widgets/form/Input";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import PhotoLayout from "@components/PhotoLayout";
import { Desc, InitialState, TypeImage } from "./Model";
import { usePhotoInterventionHandler } from "./hooks";
import { useAppDispatch } from "@app/hooks/App";
import { finishIntervention } from "@features/mapFeatures/mapFeatureSlice";
import Upload from "@shared/components/Upload";

type Props = PropsWithChildren<{
  title?: string;
  description: boolean;
  materielId: string;
  typePhoto: string;
}>;

const PhotoIntervention: FunctionComponent<Props> = ({
  title,
  description = false,
  materielId,
  children,
  typePhoto,
}) => {
  const [images, setImages] = useState<InitialState>({
    loin: undefined,
    pres: undefined,
    cablage: undefined,
    macAddress: undefined,
  });
  const [type, setType] = useState<TypeImage>();
  const [desc, setDesc] = useState<Desc>({
    desc1: "",
    desc2: "",
    desc3: "",
    desc4: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    ok,
    fileInputRef,
    loading,
    photos,
    handleSubmit,
    handleChange,
    getFile,
    triggerFileInput,
    showImage,
  } = usePhotoInterventionHandler({
    images: [images, setImages],
    types: [type, setType],
    desc: [desc, setDesc],
    description,
    materielId,
  });

  useEffect(() => {
    if (photos) {
      setImages({
        loin: photos.loin?.path,
        pres: photos.pres?.path,
        cablage: photos.cablage?.path,
        macAddress: photos.macAddress?.path,
      });
    }
    if (description) {
      setDesc({
        desc1: photos?.loin?.description as string,
        desc2: photos?.pres?.description as string,
        desc3: photos?.cablage?.description as string,
        desc4: photos?.macAddress?.description as string,
      });
    }
    if (ok) {
      dispatch(finishIntervention({ type: typePhoto, id: materielId }));
      navigate("/");
    }
  }, [navigate, ok, photos]);

  return (
    <div className="wfx-page-intervention__content">
      <Upload acceptTypeFile="image/*" refInput={fileInputRef} caputre="environment" onChange={getFile} />
      <Card addClassName="br_none">
        <Cardheader title={title}>{children}</Cardheader>
        <CardBody>
          <div className="wfx-row">
            <div className="flex flex-col col-12 col-lg-6 col-md-6">
              <PhotoLayout onClick={() => triggerFileInput("loin")}>
                {images.loin ? (
                  <img
                    src={showImage(images.loin)}
                    alt="Aperçu de la photo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  "Photo de loin"
                )}
              </PhotoLayout>
              {description && (
                <Input>
                  <input
                    type="text"
                    name="desc1"
                    value={desc.desc1 || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="description"
                  />
                </Input>
              )}
            </div>
            <div className="flex flex-col col-12 col-lg-6 col-md-6">
              <PhotoLayout onClick={() => triggerFileInput("pres")}>
                {images.pres ? (
                  <img
                    src={showImage(images.pres)}
                    alt="Aperçu de la photo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  "Photo de près"
                )}
              </PhotoLayout>
              {description && (
                <Input>
                  <input
                    type="text"
                    name="desc2"
                    value={desc.desc2 || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="description"
                  />
                </Input>
              )}
            </div>

            <div className="flex flex-col col-12 col-lg-6 col-md-6">
              <PhotoLayout onClick={() => triggerFileInput("cablage")}>
                {images.cablage ? (
                  <img
                    src={showImage(images.cablage)}
                    alt="Aperçu de la photo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  "Photo du cablage"
                )}
              </PhotoLayout>
              {description && (
                <Input>
                  <input
                    type="text"
                    name="desc3"
                    value={desc.desc3 || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="description"
                  />
                </Input>
              )}
            </div>

            <div className="flex flex-col col-12 col-lg-6 col-md-6">
              <PhotoLayout onClick={() => triggerFileInput("macAddress")}>
                {images.macAddress ? (
                  <img
                    src={showImage(images.macAddress)}
                    alt="Aperçu de la photo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <>
                    N de serie/<strong>MAC</strong>
                  </>
                )}
              </PhotoLayout>
              {description && (
                <Input>
                  <input
                    type="text"
                    name="desc4"
                    value={desc.desc4 || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="description"
                  />
                </Input>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter>
          {loading ? (
            <LoadingComponent />
          ) : (
            <div
              className="wfx-btn wfx-btn-blue text-white"
              onClick={handleSubmit}
            >
              Continuer
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhotoIntervention;
