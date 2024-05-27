import Header from  "@widgets/Header";
import Main from  "@widgets/Main";
import ModifyMacAddressFeatures from "@features/changeMacAddressFeatures/ModifyMacAddressFeatures"
import {Link, useParams} from "react-router-dom"
import { useAppSelector } from "@app/hooks/App";
import { useGetPhotoIntervention } from "@features/intervention/PhotoIntervention/photoInterventionAPI";
import LoadingPages from  "@widgets/loading/LoadingPages";
import Error from "@components/Error";
import { Material } from "@pages/rapport/Model";

export default function ChangeMacAddress() {
  const {interventionId} = useAppSelector(state => state.homePage)
  const {id} = useParams()

  const {response, isloading} = useGetPhotoIntervention(interventionId as string,
    id as string)

  const { error} = useAppSelector(state => state.changementAddressMac)

  return <div className="wfx-page-intervention">
  <Header>
      <Link to="/" className="prev">
        <div className="wfx-image hover:bg-green hover:text-white">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </Link>
      <div className="title">
        <h1>ADRESSE MAC Switch</h1>
      </div>
      <div className="chat">
        <a href="#">
          <div className="wfx-image"></div>
        </a>
      </div>
    </Header>
  {
    isloading ? <LoadingPages /> : <div className="wfx-page-intervention">
    <Main>
    <div className="wfx-page-intervention__content">
      {
        error && <Error error={error} />
      }
      <ModifyMacAddressFeatures address={(response as Material)?.mac_address as string} materielId={id as string} />
    </div>
    </Main>
  </div>
  }
  </div>
}