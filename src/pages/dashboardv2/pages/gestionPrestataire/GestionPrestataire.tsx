import PageLayout from "@widgets/Bov2/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/App";
import { COLUMNS } from "@utils/tableau";
import GestionPrestataireFeatures from "@features/backofficeV2/gestionPrestataireFeatures/gestionPrestataireFeatures";
import { useUpdateListPrestataire } from "@features/backofficeV2/gestionPrestataireFeatures/hooks";
import MyDataTable from "@components/MyDataTable";
import { PRESTATAIRE_COLUMNS } from "@components/columns/gestionPrestataire";
import ActionButton, { ActionButtonLayout } from "@widgets/Bov2/ActionButton";
import { setOrgInfo } from "@entities/backofficev2/gestionPrestataireSlice";

function GestionPrestataire() {
  const { list,loading, update } = useAppSelector((state) => state.gestionPrestataire);
  const { handleDelete } = useUpdateListPrestataire();
const dispatch = useAppDispatch()
  const columns = [
    ...PRESTATAIRE_COLUMNS,
    {
      name: COLUMNS.actions,
      cell: (row: { [key: string]: string; }) => (
        <ActionButtonLayout>
          <ActionButton onClick={() => {
            dispatch(setOrgInfo({
              id: row.Id,
              name: row.Nom
            }))
          }} >
          <i className="fa-solid fa-edit text-blue"></i>
          </ActionButton>
          <ActionButton onClick={() => handleDelete(row)}>
          <i className="fa-solid fa-trash text-danger"></i>
          </ActionButton>
        </ActionButtonLayout>
      ),
    },
  ]

  return (
    <PageLayout title="Liste des prestataires">
      <div className="col-12 col-xl-8 list">
        <MyDataTable columns={columns} data={list} loading={loading} />
      </div>
      <div className="col-12 col-xl-4 detail">
        <div className="detail__head">
          <h2> {update ? "Modifier" : "Création de nouveau"} Prestataire</h2>
        </div>
        <div className="detail__content">
          <div className="wfx-row ">
            <GestionPrestataireFeatures />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default GestionPrestataire;
