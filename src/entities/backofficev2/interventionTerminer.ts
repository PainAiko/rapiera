import { createSlice } from "@reduxjs/toolkit";
import { COLUMNSV2 } from "@utils/tableau";
import { formatDateForRapport } from "@utils/DateTime";
import { InterventionParent } from "@config/API/getAPI";


interface Photo {
    id: number;
    name: string;
    size: number;
    type: string;
    path: string;
  }
  
 export interface CompteRendu {
    id: number;
    intervention_id: number;
    compte_rendu: string;
    created_at: string;
    updated_at: string;
    photos: Photo[];
  }

interface InitialState {
  list: {
    id: string;
    admin_id: string | null;
    compteRendu?: CompteRendu,
    meet: string | null
    adminOnCall: string
    [COLUMNSV2.SITE]: string;
    [COLUMNSV2.ID]: number;
    [COLUMNSV2.TECHNICIEN]: number;
    [COLUMNSV2.ADMIN_ASSIGNED]: string;
    [COLUMNSV2.NUMBER_MATERIELS]: number;
    [COLUMNSV2.DATE]: string;
  }[];
  showModalCompteRendu: boolean,
  compteRenduInfo?: {
    site: string,
    interventionId: string,
    adminName: string,
    compteRendu: CompteRendu
  }
}

const initialState: InitialState = {
  list: [],
  showModalCompteRendu: false
};

const interventionTerminer = createSlice({
  name: "intervention-list-terminer",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload?.map((value: InterventionParent) => {
        return {
          id: value.id,
          admin_id: value.admin_id,
          compteRendu: value.compte_rendu,
          meet: value.techMeetLink,
          adminOnCall: value.adminAtPhone,
          [COLUMNSV2.SITE]: value.site_name,
          [COLUMNSV2.ID]: value.intervention_id_graphql,
          [COLUMNSV2.TECHNICIEN]: value.technicien_responsable.name,
          [COLUMNSV2.ADMIN_ASSIGNED]: value.admin as string,
          [COLUMNSV2.NUMBER_MATERIELS]: value.materials_count,
          [COLUMNSV2.DATE]: formatDateForRapport(value.created_at),
        };
      });
    },
    toggleModalCompteRendu: (state) => {
      state.showModalCompteRendu = !state.showModalCompteRendu
    },
    addCompteRenduInfo: (state, action) => {
      state.compteRenduInfo = action.payload
    }
  },
});

export const { setList,toggleModalCompteRendu, addCompteRenduInfo } = interventionTerminer.actions;

export default interventionTerminer.reducer;
