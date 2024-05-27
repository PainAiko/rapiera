import { FormEvent } from "react";
import Button from  "@widgets/button/Button";

function ForgotPassWordFeature() {
  return (
    <form className="wfx-forgot-form">
      <div className="text-center">
        <h1 className="font-semi-bold text-blue">Mot de passe oublié</h1>
      </div>
      <div>
        <div className="wfx-form">
          <label>Votre email </label>
          <input
            type="text"
            className="w-full font-normal"
            placeholder="example@example.com"
            value="example@example.com"
            onChange={() => {}}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          color="blue"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            console.log("window.location.href='./profil-technicien.html'");
          }}
        >
          Réinitialiser votre mot de passe
        </Button>
      </div>
    </form>
  );
}

export default ForgotPassWordFeature;
