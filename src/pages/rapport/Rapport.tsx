import Header from  "@widgets/Header";

import RapportFeatures from "@features/rapportFeatures/RapportFeatures";
import Main from  "@widgets/Main";
import Signature from "@features/rapportFeatures/signature";
import { Link } from "react-router-dom";

export default function Rapport() {
  return (
    <>
      <Header>
      <Link to="/" className="go-home">
          <div className="wfx-image hover:bg-green hover:text-white">
            <i className="fa-solid fa-chevron-left relative text-3xl top-3.5 left-5"></i>
          </div>
        </Link>
        <div className="title w-full">
          <h1>Votre Rapport</h1>
        </div>
      </Header>
      <Main>
        <RapportFeatures />
        <Signature />
      </Main>
    </>
  );
}
