import { ChangeEvent, FormEvent, useState } from "react";
import Button from  "@widgets/button/Button";
import Input from  "@widgets/form/Input";
import {
  formatAsMacAddress,
  isValidMacAddress,
} from "@utils/formatAsMacAddress";
import Swal from "sweetalert2";
import { popup } from "@utils/popupSwealert";
import { ROLE } from "@utils/ROLE";
import { getRole } from "@utils/getToken";

function ChangeAddressMacIntervention() {
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    old: "",
    new: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = formatAsMacAddress(value);
    setInputValue({ ...inputValue, [name]: formattedValue });
  };

  const handleclick = (e: FormEvent) => {
    e.preventDefault();
    if (
      !isValidMacAddress(inputValue.new) ||
      !isValidMacAddress(inputValue.old)
    ) {
      setError("Adresse mac invalide");
      return;
    }
    setError("")
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      title: `Changement d'adresse Mac`,
      text: "Êtes vous sur de vouloir transférer ce changement de MAC vers Ogre ?",
      position: "center",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setInputValue({
            old: "",
            new: "",
        })
        popup("success", `Envoyer`)
        return;
      }
    });
  };

  return (
    <div className="wfx-row">
      {error && (
        <div className="text-center">
          <div className="text-red-600">{error}</div>
        </div>
      )}
      <div className="col-lg-4 col-sm-6 col-12">
        <Input label="Ancienne" labelClass="font-semi-bold">
          <input
            type="text"
            name="old"
            className="w-full bg-blue text-white text-center"
            placeholder="04:18:d6:6c:ce:26"
            value={inputValue.old}
            onChange={handleChange}
          />
        </Input>
      </div>
      <div className="col-lg-4 col-sm-6 col-12">
        <Input label="Nouvelle" labelClass="font-semi-bold">
          <input
            type="text"
            name="new"
            className="w-full bg-blue text-white text-center"
            placeholder="04:18:d6:6c:ce:26"
            value={inputValue.new}
            onChange={handleChange}
          />
        </Input>
      </div>
      {
        (getRole() === ROLE.ADMIN || getRole() === ROLE.SUPER_ADMIN) && <div className="col-lg-4 col-md-12 col-sm-6 col-12">
        <div className="d-flex justify-content-center align-items-center h-full mt-2">
          <Button color="green" addClassName="w-70" onClick={handleclick}>
            Transferer vers OGRE
          </Button>
        </div>
      </div>
      }
    </div>
  );
}

export default ChangeAddressMacIntervention;
