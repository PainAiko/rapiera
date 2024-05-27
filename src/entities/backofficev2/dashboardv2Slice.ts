import { createSlice } from "@reduxjs/toolkit";
import { COLUMNSV2 } from "@utils/tableau";
import { InterventionDetail } from "@pages/Bo/admin/rapport/Modal";
import { TYPE } from "@utils/const";
import { InterventionParent } from "@config/API/getAPI";
import { userListSerializer } from "@utils/serialize";
import { formatDateForRapport } from "@utils/DateTime";

interface InitialState {
  showSidebar: boolean;
  listRapport: [];
  listIntervention: {
    id: string;
    admin_id: string | null;
    meet: string |  null;
    adminOnCall: string;
    [COLUMNSV2.SITE]: string;
    [COLUMNSV2.ID]: number;
    [COLUMNSV2.TECHNICIEN]: number;
    [COLUMNSV2.ADMIN_ASSIGNED]: string | {title: string, value: number}[];
    [COLUMNSV2.NUMBER_MATERIELS]: number;
    [COLUMNSV2.DATE]: string;
  }[];
  gestionUserList: Record<string, string>[];
  gestionPrestataireList: Record<string, string>[];
  loading: boolean;
}

const initialState: InitialState = {
  showSidebar: true,
  listRapport: [],
  listIntervention: [],
  gestionUserList: [],
  gestionPrestataireList: [],
  loading: false,
};

const dashboardv2 = createSlice({
  name: "dashboard-v2",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setList: (state, action) => {
      switch (action.payload.type) {
        case TYPE.RAPPORT:
          state.listRapport = action.payload.response?.map(
            (value: InterventionDetail) => {
              return {
                [COLUMNSV2.CREELE]: formatDateForRapport(
                  value.created_at,
                  true
                ),
                [COLUMNSV2.ID]: `${value.intervention_id}`,
                [COLUMNSV2.SITE]: value.site_name,
                [COLUMNSV2.TECHNICIEN]: value.technician_name,
                rapport: value.rapport_file,
              };
            }
          );
          break;
        case TYPE.INTERVENTION:
          state.listIntervention = action.payload.response?.map(
            (value: InterventionParent) => {
              return {
                id: value.id,
                admin_id: value.admin_id,
                meet: value.techMeetLink,
                adminOncall: value.adminAtPhone,
                [COLUMNSV2.SITE]: value.site_name,
                [COLUMNSV2.ID]: value.intervention_id_graphql,
                [COLUMNSV2.TECHNICIEN]: value.technicien_responsable.name,
                [COLUMNSV2.ADMIN_ASSIGNED]: value.admin,
                [COLUMNSV2.NUMBER_MATERIELS]: value.materials_count,
                [COLUMNSV2.DATE]: formatDateForRapport(value.created_at),
              };
            }
          );
          break;
        case TYPE.USER:
          state.gestionUserList = userListSerializer(action.payload.response);
          break;
        case TYPE.PRESTATAIRE:
          state.gestionPrestataireList = action.payload.response?.map(
            (item: { [key: string]: string }) => ({
              Id: item.id,
              Nom: item.name,
            })
          );
          break;
        default:
          break;
      }
    },
    loadData: (state, action) => {
      state.loading = action.payload;
    },
    finishIntervention: (state, action) => {
      state.listIntervention = state.listIntervention.filter((value) => {
        return value.id != action.payload;
      });
    },
    updateListIntervention: (state, action) => {
      state.listIntervention = state.listIntervention.map((value) => {
        if(value.id === action.payload.id) {
          return {
            ...value,
            [COLUMNSV2.ADMIN_ASSIGNED]: action.payload.adminName,
            admin_id: action.payload.adminId
          }
        }
        return value
      })
    },
    setAdminList: (state, action) => {
      state.listIntervention = state.listIntervention.map(value => {
        return {
          ...value,
          [COLUMNSV2.ADMIN_ASSIGNED]: value[COLUMNSV2.ADMIN_ASSIGNED] ? value[COLUMNSV2.ADMIN_ASSIGNED] : action.payload
        }
      })
    }
  },
});

export const { toggleSideBar, setList, loadData, finishIntervention,setAdminList, updateListIntervention } =
  dashboardv2.actions;

export default dashboardv2.reducer;
