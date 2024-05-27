import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { resetResponse } from "@entities/rapport/rapportSlice";
import { RAPPORT_SUCCESS } from "@shared/utils/const";
import { popup } from "@shared/utils/popupSwealert";
import Button from "@widgets/button/Button";
import LoadingComponent from "@widgets/loading/LoadingComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function SendRapportButton({}: Props) {
  const { res, loading } = useAppSelector((state) => state.rapportIntervention);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (res) {
      popup("success", RAPPORT_SUCCESS, 2000, "left");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    return () => {
      dispatch(resetResponse());
    };
  }, [dispatch, navigate, res]);
  return (
    <div className="py-5">
      {loading ? (
        <LoadingComponent />
      ) : (
        <Button textColor="white" color="blue" addClassName=" w-full py-5">
          Créer le rapport
        </Button>
      )}
    </div>
  );
}
