import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { loginAuth } from "./LoginAPI";

interface LoginForm {
    email: string;
    password: string;
  }
  

export function useHandlerLogin<T extends LoginForm>({
  form,
  setForm,
  setError,
}: {
  form: T;
  setForm: Dispatch<SetStateAction<T>>;
  setError: Dispatch<SetStateAction<string | null>>;
}) {
  const {
    ok,
    loading,
    error: serverError,
    role,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prevData: T) => ({
      ...prevData,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    dispatch(loginAuth({ email: form.email, password: form.password }));
  };


  return {
    ok,
    serverError,
    role,
    handleInputChange,
    handleSubmit,
    loading
  }
}
