import Header from  "@widgets/Header";
import { Link } from "react-router-dom";
import Main from  "@widgets/Main";
import PhotoIntervention from "./PhotoIntervention/PhotoIntervention";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { setInterventionType } from "../mapFeatures/mapFeatureSlice";
import { useGetPhotoIntervention } from "./PhotoIntervention/photoInterventionAPI";
import { setPhoto } from  "@entities/photoIntervention/photoInteventionSlice";
import LoadingPages from  "@widgets/loading/LoadingPages";
import { Material } from "@pages/rapport/Model";

type Props = PropsWithChildren<{
  title?: string;
  description: boolean;
  type: string;
  materielId?: string;
}>;

const Intervention: FunctionComponent<Props> = ({
  title,
  description = false,
  type,
  materielId,
}) => {
  const { interventionId } = useAppSelector((state) => state.homePage);
  const { response, isloading } = useGetPhotoIntervention(
    interventionId as string,
    materielId as string
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (response) {
      dispatch(setPhoto(type === "additional" ? response : (response as Material)[`${type}_images` as keyof Material]));
    }
    dispatch(setInterventionType(type));
  }, [dispatch, isloading, response, type]);
  return (
    <>
      <div className="wfx-page-intervention">
        <Header>
          <Link to="/" className="prev">
            <div className="wfx-image hover:bg-green hover:text-white">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
          </Link>
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="chat">
            <a href="#">
              <div className="wfx-image"></div>
            </a>
          </div>
        </Header>

        {isloading ? (
          <LoadingPages />
        ) : (
          <Main>
            <PhotoIntervention
              typePhoto={type}
              title="Ajouter des photos"
              description={description}
              materielId={materielId as string}
            >
              <p className="fs-italic">Merci de bien cadrer les photos</p>
            </PhotoIntervention>
          </Main>
        )}
      </div>
    </>
  );
};

export default Intervention;
