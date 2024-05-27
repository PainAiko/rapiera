import { useParams } from "react-router-dom";
import Intervention from "@features/intervention/Intervention";

export default function AvantIntervention() {
  const { id } = useParams();
  return (
    <Intervention
      title="AVANT INTERVENTION"
      description={false}
      type="before"
      materielId={id as string}
    />
  );
}
