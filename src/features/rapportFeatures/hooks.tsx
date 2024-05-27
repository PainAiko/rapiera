import { useGetAllAdminService } from "@pages/rapport/rapportAPI";
import { CAUSEINCIDENT } from "@shared/utils/const";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

// type Props = {};

export function useHandleFormRapport() {
  const [adminOnCall, setAdminOnCall] = useState("");
  const [description, setDescription] = useState("");
  const [plus, setPlus] = useState("");
  const [incident, setIncident] = useState<
    Record<string, string | boolean | number>
  >({});
  const [reintervention, setReintervention] = useState<
    Record<string, string | boolean | number>
  >({});
  const [materialChange, setMaterialChange] = useState<{
    title: string;
    value: string | number;
  }>({
    title: "0",
    value: 0,
  });
  const [incidentCause, setIncidentCause] = useState<{
    title: string;
    value: string | number;
  }>(CAUSEINCIDENT[0]);
  const [heureArrive, setHeureArrive] = useState("");
  const [heureDepart, setHeureDepart] = useState("");
  const handleTextareaChange = (newValue: string) => {
    setDescription(newValue);
  };
  const handleTextareaPlusChange = (newValue: string) => {
    setPlus(newValue);
  };

  const getHeureArrive = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHeureArrive(value);
  };

  const getHeureDepart = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHeureDepart(value);
  };

  return {
    // state
    adminOnCall,
    description,
    plus,
    incident,
    reintervention,
    materialChange,
    incidentCause,
    heureArrive,
    heureDepart,
    // setState
    setAdminOnCall,
    setIncident,
    setReintervention,
    setMaterialChange,
    setIncidentCause,
    setHeureArrive,
    // handleState
    handleTextareaChange,
    handleTextareaPlusChange,
    getHeureArrive,
    getHeureDepart,
  };
}

export const useAutoCompleteAdmin = ({
  searchAdmin,
}: {
  searchAdmin: (value: SetStateAction<string>) => void;
}) => {
  const { response } = useGetAllAdminService();
  const [list, setList] = useState<Record<string, string>[]>([]);
  const [admin, setAdmin] = useState<Record<string, string>[]>([]);
  const [choose, setChoose] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    searchAdmin(value.toLowerCase());
    if (value) {
      setAdmin(
        list?.filter((v) => v.name.toLowerCase().includes(value.toLowerCase()))
      );
      setChoose(true);
    } else {
      setAdmin([]);
    }
  };

  const handleSelected = (value: string) => {
    searchAdmin(value);
    setChoose(false);
  };

  useEffect(() => {
    if (response) {
      setList(
        response.data?.map((value: Record<string, string>) => {
          return {
            id: value.id,
            name: value.name,
          };
        })
      );
    }
  }, [response]);

  return {
    admin,
    choose,
    list,
    handleSelected,
    handleChange,
  };
};
