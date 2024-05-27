import PageLayout from "@widgets/Bov2/PageLayout";
import MyDataTable from "@components/MyDataTable";
import { RAPPORT_COLUMNS } from "@components/columns/Rapport";
import { useGetRapportIntervention } from "@pages/Bo/admin/rapport/rapportBoAPI";
import { useEffect } from "react";
import { TYPE } from "@shared/utils/const";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { setList } from "@entities/backofficev2/dashboardv2Slice";

function Rapport() {
  const { response, isloading } = useGetRapportIntervention();
  const { listRapport } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (response) {
      dispatch(setList({ type: TYPE.RAPPORT, response: response }));
    }
  }, [response])
  return (
    <PageLayout title="Liste des rapports d'interventions">
      <MyDataTable columns={RAPPORT_COLUMNS} data={listRapport} loading={isloading} />
    </PageLayout>
  );
}

export default Rapport;
