import { ChangeEvent, useEffect, useState } from "react";
import Input from  "@widgets/form/Input";
import { getRole } from "@utils/getToken";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { setForm } from  "@entities/backofficev2/GestionUserSlice";
import Organisation from "@components/Organisation";
import { ROLE } from "@utils/ROLE";

function CreateFormulaire({ isOrg = 0 }: { isOrg: number }) {
  const { nom, email, password, meetLink, updateAnUser } =
    useAppSelector((state) => state.gestionUser);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState("");

  // handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch(setForm({ [name]: value }));
  };

  useEffect(() => {
    const r = getRole();
    if (r) {
      setRole(r);
    }
  }, []);
  
  return (
    <>
    {/* nom */}
      <div className="col-12">
        <Input label="Nom">
          <input
            type="text"
            className="w-full"
            placeholder="Jane Doe"
            name="nom"
            value={nom ? nom : ""}
            onChange={handleInputChange}
            style={{paddingLeft: 45}}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-user"></i>
          </div>
        </Input>
      </div>
      {/* email */}
      <div className={`col-12`}>
        <Input label="Email">
          <input
            type="email"
            className="w-full"
            placeholder="exemple@exemple.com"
            name="email"
            value={email ? email : ""}
            onChange={handleInputChange}
            style={{paddingLeft: 45}}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
        </Input>
      </div>
      {/* meet link */}
      {
        isOrg === 2 && updateAnUser  && <div className={`col-12`}>
        <Input label="Meet">
          <input
            type="text"
            className="w-full"
            placeholder="https://meet.google.com/oba-idtj-pshe"
            name="meetLink"
            value={meetLink ? meetLink : ""}
            onChange={handleInputChange}
            style={{paddingLeft: 45}}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
        </Input>
      </div>
      }
      {/* organisation */}
      {
        isOrg !== 0 &&  <Organisation tab={isOrg} disable={role === ROLE.ADMIN_ORGANIZATION} />
      }
     
      {/* password */}
      <div className="col-12">
        <Input label="Mot de passe">
          <input
            type="password"
            className="w-full"
            placeholder="Saisir le mot de passe"
            name="password"
            value={password ? password : ""}
            onChange={handleInputChange}
            style={{paddingLeft: 45}}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-key"></i>
          </div>
        </Input>
      </div>
    </>
  );
}

export default CreateFormulaire;
