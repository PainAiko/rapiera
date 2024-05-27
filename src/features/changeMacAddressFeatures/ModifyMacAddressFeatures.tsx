import { useState, ChangeEvent, useEffect } from "react";
import { formatAsMacAddress } from "@utils/formatAsMacAddress";
import Card from  "@widgets/card/Card";
import CardBody from  "@widgets/card/CardBody";
import Input from  "@widgets/form/Input";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import LoadingComponent from  "@widgets/loading/LoadingComponent";
import { updateMacAddress } from "@pages/changeMacAddress/changeMacAddressAPI";
import { TYPE } from "@utils/ROLE";
import { useNavigate } from "react-router-dom";
import { finishIntervention } from "../mapFeatures/mapFeatureSlice";

export default function ModifyMacAddressFeatures({
  address,
  materielId
}: {
  address: string;
  materielId: string;
}) {
  const [newAddress, setNewAddress] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatAsMacAddress(value);
    setNewAddress(formattedValue);
  };
  const dispatch = useAppDispatch()
  const { res, loading } = useAppSelector((state) => state.changementAddressMac);
  const {interventionId} = useAppSelector(state => state.homePage)
  const navigate = useNavigate()


  const handleSubmit = () => {
    dispatch(updateMacAddress({newMacAddress: newAddress, oldMacAddress: address, interventionId,materialId: materielId}))
    dispatch(finishIntervention({type: TYPE.MACADDRESS, id: materielId}))
  }

  useEffect(() => {
    if(res) {
      navigate("/")
    }
  }, [navigate, res])
  return (
    <>
      <form>
        <Card addClassName="br-none">
          <CardBody>
            <Input label="Ancienne Adresse MAC">
              <input
                type="text"
                name="address"
                className="w-full"
                value={address}
                disabled={true}
              />
            </Input>
            <Input label="Nouvelle Adresse MAC">
              <input
                type="text"
                name="new-address"
                className="w-full"
                value={newAddress}
                onChange={handleChange}
              />
            </Input>
            {loading ? (
              <div className="wfx-card__footer">
                <LoadingComponent />
              </div>
            ) : (
              <div className="wfx-card__footer" onClick={handleSubmit}>
                <div className="wfx-btn wfx-btn-blue text-white">Continuer</div>
              </div>
            )}
          </CardBody>
        </Card>
      </form>
    </>
  );
}
