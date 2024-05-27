import { useAppSelector, useAppDispatch } from '@app/hooks/App';
import { show } from '@entities/rapport/signatureSlice';
import { TypeSignature } from '@shared/utils/ROLE';
import Button from '@widgets/button/Button';
import { FormEvent } from 'react'

type Props = {}

export default function SignatureCanvas({}: Props) {
    const { signatureClient, signatureTechnicien } =
    useAppSelector((state) => state.rapportIntervention);
    const dispatch = useAppDispatch();
  return <div className="wfx-card">
  <div className="wfx-card__header">
    <h2>Signature</h2>
  </div>
  <div
    className={`wfx-card__content ${
      signatureClient || signatureTechnicien ? "wfx-row" : ""
    }`}
  >
    {signatureClient ? (
      <div className="p-3 col-12 col-md-6">
        <img
          className="h-72"
          src={signatureClient}
          alt="Signature"
          style={{ objectFit: "contain" }}
        />
        <Button
          addClassName="w-full"
          color="green"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            dispatch(show({ type: TypeSignature.CLIENT }));
          }}
        >
          Modifier signature client
        </Button>
      </div>
    ) : (
      <div className="signature mb-3 col-12 col-md-6">
        {" "}
        <Button
          addClassName="w-full py-5"
          color="green"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            dispatch(show({ type: TypeSignature.CLIENT }));
          }}
        >
          Signature client
        </Button>
      </div>
    )}

    {signatureTechnicien ? (
      <div className="p-3 text-end col-12 col-md-6">
        <img
          className="h-72"
          src={signatureTechnicien}
          alt="Signature"
          style={{ objectFit: "contain" }}
        />
        <Button
          addClassName="w-full"
          color="green"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            dispatch(show({ type: TypeSignature.TECHNICIEN }));
          }}
        >
          Modifier signature intervenant
        </Button>
      </div>
    ) : (
      <div className="signature mb-3 col-12 col-md-6">
        {" "}
        <Button
          addClassName="w-full py-5"
          color="green"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            dispatch(show({ type: TypeSignature.TECHNICIEN }));
          }}
        >
          Signature intervenant
        </Button>
      </div>
    )}
  </div>
</div>
}