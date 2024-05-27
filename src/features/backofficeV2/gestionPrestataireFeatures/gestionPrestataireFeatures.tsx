import Button from  "@widgets/button/Button";
import Input from  "@widgets/form/Input";
import LoadingComponent from  "@widgets/loading/LoadingComponent";
import { useHandlePrestataire } from "./hooks";
import Error from "@components/Error";
import { useAppSelector } from "@app/hooks/App";

function GestionPrestataireFeatures() {
  const { loading, error, handleChange, HandleSubmit, resetState } =
    useHandlePrestataire();
  const {orgInfo, loadingUpdate}  = useAppSelector(state => state.gestionPrestataire)
  return (
    <>
      {error && <Error error={error} />}
      <div className="col-12">
        <Input label="Nom de l'organisation">
          <input
            type="text"
            className="w-full"
            placeholder="wifix"
            name="organizationName"
            value={orgInfo?.name || ""}
            onChange={handleChange}
            style={{paddingLeft: 45}}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-user"></i>
          </div>
        </Input>
      </div>
      {loading || loadingUpdate ? (
        <LoadingComponent />
      ) : (
        <>
          <Button textColor="white" color="blue" onClick={HandleSubmit}>
            Enregister
          </Button>
          <Button
            textColor="white"
            color="danger"
            onClick={() => resetState()}
          >
            Annuler
          </Button>
        </>
      )}
    </>
  );
}

export default GestionPrestataireFeatures;
