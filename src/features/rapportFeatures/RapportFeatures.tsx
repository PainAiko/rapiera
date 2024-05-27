import TextareaField from "@widgets/form/TextareaField";
import CheckboxField from "@widgets/form/CheckboxField";
import SelectField from "@widgets/form/SelectField";
import Input from "@widgets/form/Input";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  getGraphqlId,
  getInterventionId,
  getUserConnectedId,
  getUserConnectedName,
} from "@utils/getToken";
import { useGetInterventionInfo } from "@pages/rapport/rapportAPI";
import { sendRapportSevice } from "./RapportFeatureAPI";
import { Data } from "@pages/rapport/Model";
import {
  extractDateTime,
  timeToMySQLDate,
  verifierOrdreHeures,
} from "@utils/DateTime";
import { resetResponse } from "@entities/rapport/rapportSlice";
import { validateForm } from "@utils/Validator";
import { FormStates } from "./Model";
import { CAUSEINCIDENT } from "@utils/const";
import { popup } from "@shared/utils/popupSwealert";
import { useAutoCompleteAdmin, useHandleFormRapport } from "./hooks";
import SendRapportButton from "./ui/SendRapportButton";
import SignatureCanvas from "./ui/SignatureCanvas";
function RapportFeatures() {
  const { materiels } = useAppSelector((state) => state.mapAppareil);
  const { interventionId } = useAppSelector((state) => state.homePage);
  const { signatureClient, signatureTechnicien, error } = useAppSelector(
    (state) => state.rapportIntervention
  );
  const selectOption = materiels
    .map((_value, index) => ({ title: `${index + 1}`, value: index + 1 }))
    .concat({ title: `0`, value: 0 })
    .sort((a, b) => a.value - b.value);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const { list, admin, choose, handleChange, handleSelected } =
    useAutoCompleteAdmin({ searchAdmin: setSelectedAdmin });
  const {
    // state
    adminOnCall,
    description,
    plus,
    incident,
    incidentCause,
    reintervention,
    materialChange,
    heureArrive,
    heureDepart,
    // setState
    setAdminOnCall,
    setIncident,
    setReintervention,
    setMaterialChange,
    setIncidentCause,
    setHeureArrive,
    // handleChange
    handleTextareaChange,
    handleTextareaPlusChange,
    getHeureArrive,
    getHeureDepart,
  } = useHandleFormRapport();
  const [interventionData, setInterventionData] = useState<Data | null>(null);

  const dispatch = useAppDispatch();
  const [FormError, setFormError] = useState("");
  const { response: info } = useGetInterventionInfo(interventionId as string);

  // formulaire data
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (
      !validateForm<FormStates>({
        description,
        plus,
        incident,
        reintervention,
        materialChange,
        incidentCause,
        heureArrive,
        heureDepart,
        adminOnCall,
      })
    ) {
      setFormError("Tous les champs sont obligatoires.");
      return;
    }

    if (!verifierOrdreHeures(heureArrive, heureDepart)) {
      setFormError("Vérifiez les heures que vous avez insérées.");
      return;
    }
    const theIncident = Object.keys(incident).filter((key) => incident[key]);
    const theReintervention = Object.keys(reintervention).filter(
      (key) => reintervention[key]
    );
    const theAdmin = list?.find((value) => value.name === selectedAdmin);

    const data: Record<string, string | number> = {
      techId: getUserConnectedId(),
      adminId: theAdmin?.id
        ? (theAdmin?.id as string)
        : (info?.interventionParent.admin_id as string),
      description,
      detailPlus: plus,
      isResolved: theIncident[0] === "Oui" ? 1 : 0,
      isNeccessaryReIntervention: theReintervention[0] === "Oui" ? 1 : 0,
      causeIncident: incidentCause?.title as string,
      arrivalDate: timeToMySQLDate(heureArrive) as string,
      finishedDate: timeToMySQLDate(heureDepart) as string,
      numberMaterialChanged: materialChange?.value as number,
      adminAtPhone: adminOnCall,
    };

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, `${data[key]}`);
    }

    dispatch(
      sendRapportSevice({
        interventionId: getInterventionId(),
        idGraphql: getGraphqlId(),
        siteName: info?.interventionParent.siteName as string,
        data: formData,
        dataForPdf: data,
        interventionData: interventionData as Data,
        signatureClient,
        signatureTechnicien,
        adminName: (theAdmin?.name as string)
          ? (theAdmin?.name as string)
          : (info?.interventionParent.admin as string),
        adminOnCallName: adminOnCall,
      })
    );
  };

  // lifecycles
  // post api
  useEffect(() => {
    return () => {
      dispatch(resetResponse());
    };
  }, [dispatch]);

  // get api
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetResponse());
    if (info) {
      setSelectedAdmin(
        info?.interventionParent.admin
          ? (info?.interventionParent.admin as string)
          : ""
      );
      setHeureArrive(extractDateTime(info.interventionParent.created_at));
      setInterventionData(info);
    }
  }, [info, dispatch]);

  // error
  useEffect(() => {
    if (error || FormError) {
      popup("error", (error as string) || FormError, 5000, "left");
    }
  }, [error, FormError]);

  return (
    <form onSubmit={handleSubmit}>
      {/* <!-- nom intervenant start  --> */}
      <Input label="Nom de l’intervenant (vous)">
        <input
          type="text"
          className="w-full border border-red-500"
          defaultValue={getUserConnectedName()}
          disabled
        />
      </Input>
      {/* <!-- nom intervenant end  --> */}

      {/* <!-- nom admin wifirst start  --> */}
      <Input label="Nom de l'administrateur Wifirst">
        <input
          type="text"
          className="w-full"
          value={selectedAdmin}
          onChange={handleChange}
        />
      </Input>
      {choose && (
        <div className="pg-home-dash">
          <ul className="wfx-list-collapse">
            {admin?.map((option) => (
              <li key={option.id} onClick={() => handleSelected(option.name)}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <!-- nom admin wifirst end  --> */}

      {/* <!-- nom admin wifirst au telephone start  --> */}
      <Input label="Nom de l'administrateur Wifirst au téléphone">
        <input
          type="text"
          className="w-full border border-red-500"
          value={adminOnCall}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAdminOnCall(e.target.value)
          }
        />
      </Input>
      {/* <!-- nom admin wifirst au telephone end  --> */}

      {/* <!-- nom description en detail start  --> */}
      <TextareaField
        label="Description en detail des tâches réalisées lors de
      l'intervention"
        value={description}
        onChange={handleTextareaChange}
      />
      {/* <!-- nom description en detail end  --> */}

      {/* <!-- nom details sur l`&apos;`origin start  --> */}
      <TextareaField
        label="Plus de détails sur l'origine du problème"
        value={plus}
        onChange={handleTextareaPlusChange}
      />
      {/* <!-- nom details sur l`&apos;`origin end  --> */}

      {/* <!-- nom insident start  --> */}
      <CheckboxField
        label="L'incident a-t-il été résolu?"
        options={["Oui", "Non"]}
        chooseOne={true}
        checkboxClassName="d-flex align-items-center"
        choose={setIncident}
      />
      {/* <!-- nom insident end  --> */}

      {/* <!-- nom insident start  --> */}
      <CheckboxField
        label="Réintervention nécéssaire"
        options={["Oui", "Non"]}
        checkboxClassName="d-flex align-items-center"
        chooseOne={true}
        choose={setReintervention}
      />
      {/* <!-- nom insident end  --> */}
      {/* 
  <!-- nom nombe d`&apos;`equipement changé start  --> */}
      <SelectField
        label="Combien d'équipement avez-vous changé ?"
        options={selectOption}
        getvalue={
          setMaterialChange as Dispatch<
            SetStateAction<{ title: string; value: string | number }>
          >
        }
      />
      {/* <!-- nom nombe d`&apos;`equipement changé end  --> */}

      {/* <!-- cause incident start  --> */}
      <SelectField
        label="Quelle est la cause de l'incident"
        options={CAUSEINCIDENT}
        getvalue={
          setIncidentCause as Dispatch<
            SetStateAction<{ title: string; value: string | number }>
          >
        }
      />
      {/* <!-- cause incident end  --> */}

      {/* <!-- heure d`&apos;`arrivée start  --> */}
      <Input label="Heure d'arrivée">
        <input
          type="time"
          className="w-full"
          value={heureArrive}
          onChange={getHeureArrive}
        />
      </Input>
      {/* <!-- heure d`&apos;`arrivée end  --> */}

      {/* <!-- Heure de départ start  --> */}
      <Input label="Heure de départ">
        <input
          type="time"
          className="w-full"
          value={heureDepart}
          onChange={getHeureDepart}
        />
      </Input>
      {/* <!-- Heure de départ end  --> */}

      <SignatureCanvas />

      <SendRapportButton />
    </form>
  );
}

export default RapportFeatures;
