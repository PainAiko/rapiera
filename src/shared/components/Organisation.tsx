import {  ChangeEvent, useEffect, useState } from "react";
import Input from  "@widgets/form/Input";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { setForm, setOrganizationListe } from  "@entities/backofficev2/GestionUserSlice";
import { useGetAllOrganisationService } from "@shared/config/API/getAPI";
import { getRole } from "@shared/utils/getToken";
import { ROLE } from "@shared/utils/ROLE";

function Organisation({tab, disable}: {tab: number, disable?: boolean}) {
    const {organizationListe, organizationName, updateAnUser} = useAppSelector(state => state.gestionUser)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState<string>("");
  const [showlistOrg, setShowListOrg] = useState(false)
  const { response: organisation, isloading } =
    useGetAllOrganisationService();
  
  const [filteredOptions, setFilteredOptions] = useState<
    { [key: string]: string | number }[]
  >([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setInputValue(value);
    if(value) {
      setShowListOrg(true)
      // Filtrer les options en fonction de la valeur d'entrée
      const filtered = [...organizationListe as { [key: string]: string }[]]?.filter(
        (option) =>{
          return option.name.toLowerCase().includes(value.toLowerCase()) &&
          (tab === 2 || updateAnUser ? true :option.admin_id === null )}
      );
      setFilteredOptions(filtered);
    } else {
      setShowListOrg(false)
    }
  };

  const handleClick = (org: {[key:string]: string | number}) => {
    dispatch(setForm({"organizationName": org}))
    setShowListOrg(false)
    setInputValue(org.name as string)
    const filtered = [...organizationListe as { [key: string]: string }[]].filter(
        (option) =>
          option.name.toLowerCase().includes(typeof org.name === "string" ? org.name.toLowerCase() : "") &&
          (tab === 2 || updateAnUser ? true : option.admin_id === null )
      );
  
      setFilteredOptions(filtered);
    }
  // lifecycle 
  useEffect(() => {
    if(!updateAnUser && organizationName && getRole() === ROLE.ADMIN_ORGANIZATION ) {
      setInputValue(organizationName.name as string)
    }
    if(updateAnUser && organizationName) {
      setInputValue(organizationName.name as string)
    }
  }, [updateAnUser, organizationName])

  useEffect(() => {
    if(organisation.data?.length > 0) {
      dispatch(setOrganizationListe(organisation.data));
    }
  }, [organisation.data])
  return (
    <div className="col-12">
      <Input label="Nom de l'organisation">
        <input
          type="text"
          className="w-full"
          placeholder="Saisir le nom de l'organisation"
          name="organizationName"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disable || isloading}
          style={{paddingLeft: 45}}
        />
        <div className="prepend-icon">
          <i className="fa-solid fa-building"></i>
        </div>
      </Input>
      {showlistOrg && (
        <div className="pg-home-dash">
          <ul className="wfx-list-collapse">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleClick(option)} >{option.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Organisation;
