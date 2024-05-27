import { useParams } from "react-router-dom";
import Intervention from "@features/intervention/Intervention";

export default function ApresIntervention() {
  const { id } = useParams();
  return (
    <Intervention
      title="APRES INTERVENTION"
      description={false}
      type="after"
      materielId={id as string}
    />
  );
}
