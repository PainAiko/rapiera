import Card from  "@widgets/card/Card";
import CardBody from  "@widgets/card/CardBody";
import Cardheader from  "@widgets/card/CardHeader";
import { useAppSelector } from "@app/hooks/App";
import LoadingComponent from  "@widgets/loading/LoadingComponent";

function Consigne() {
  const consigne = useAppSelector(state => state.homePage.consigne)
  return (
    <Card>
      <Cardheader title="Consignes" />
      <CardBody>
        {consigne ? consigne : <LoadingComponent /> }
      </CardBody>
    </Card>
  );
}

export default Consigne;
