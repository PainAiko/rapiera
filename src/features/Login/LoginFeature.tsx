import { useEffect, useState } from "react";
import Button from  "@widgets/button/Button";
import { Link, useNavigate } from "react-router-dom";
import LoadingComponent from  "@widgets/loading/LoadingComponent";
import { useHandlerLogin } from "./hooks";
import { isConnected } from "@app/stateslice";
import { ROLE } from "@utils/ROLE";
import { reset } from  "@entities/photoIntervention/photoInteventionSlice";
import { useAppDispatch } from "@app/hooks/App";
import { FormattedMessage, useIntl } from "react-intl";

export type FormLogin = { email: string; password: string };

function LoginFeature() {
  // state
  const [form, setForm] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const intl = useIntl()

  const {handleInputChange, handleSubmit, loading,serverError,ok,role} = useHandlerLogin({form, setForm, setError})

  useEffect(() => {
    const redirecte = {
      [ROLE.TECHNICIAN]: () => navigate("/technicien/profil"),
      [ROLE.ADMIN]: () => navigate("/dashboard"),
      [ROLE.ADMIN_ORGANIZATION]: () => navigate("/dashboard"),
      [ROLE.SUPER_ADMIN]: () => navigate("/dashboard"),
    };
    if (serverError) {
      setError(serverError);
    }
    if (ok) {
      dispatch(isConnected())

      redirecte[role === "technician" ? "technicien" : role as keyof typeof redirecte]();
    }
    return () => {
      dispatch(reset())
    }
  }, [dispatch, navigate, ok, role, serverError, setError])
  return (
    <form className="wfx-login-form">
      <div className="text-center">
        <h1 className="font-semi-bold text-blue">Authentification</h1>
      </div>
      <div className="text-center">
        <div className="text-red-600">{error ? error : null}</div>
      </div>
      <div>
        <div className="wfx-form">
          <label>Votre email </label>
          <input
            type="text"
            name="email"
            className="w-full font-normal"
            placeholder="example@example.com"
            value={form.email}
            onChange={handleInputChange}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
        </div>
        <div className="wfx-form">
          <label>Votre mot de passe</label>
          <input
            type="password"
            name="password"
            className="w-full font-normal"
            placeholder="Saisir votre mot de passe"
            value={form.password}
            onChange={handleInputChange}
          />
          <div className="prepend-icon">
            <i className="fa-solid fa-key"></i>
          </div>
        </div>
        <div className="d-flex justify-content-end text-primary">
          <Link
            to="/mot-de-passe-oublie"
            className="text-decoration-underline"
          >
            {intl.formatMessage({id:"FORGOT.PASSWORD"})}
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {loading ? (
          <LoadingComponent />
        ) : (
          <Button color="blue" addClassName="w-50" onClick={handleSubmit}>
             <FormattedMessage id="LOGIN" />
          </Button>
        )}
      </div>
    </form>
  );
}

export default LoginFeature;
