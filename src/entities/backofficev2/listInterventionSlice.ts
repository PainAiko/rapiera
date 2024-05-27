import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  assignedAdminToIntervention,
  finishingIntervention,
  getInterventionAdmin,
} from "@config/API/CONST";
import { getRole } from "@shared/utils/getToken";
import { ROLE } from "@shared/utils/ROLE";

export const assignedInterventionToAdmin = createAsyncThunk(
  "assigned-to-admin",
  async (credential: { id: string; adminId: string; adminName?: string }) => {
    try {
      const res = await assignedAdminToIntervention(
        credential.id,
        credential.adminId
      );

      return {
        ...res.data,
        id: credential?.id,
        adminName: credential.adminName,
        adminId: credential.adminId,
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
);

export const interventionService = createAsyncThunk(
  "intervention-details",
  async (credential: string) => {
    try {
      const res = await getInterventionAdmin(credential);

      return res.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
);

export const finishedIntervention = createAsyncThunk(
  "finishing-intervention",
  async (credentials: { id: string; data: FormData }) => {
    try {
      const res = await finishingIntervention(credentials.id, credentials.data);

      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
);

interface InitialState {
  showModal: boolean;
  showCompteRendu: boolean;
  materilesDetails?: {
    interventionGraphId: string;
    admin?: string;
    interventionId: string;
    id: string;
    idMateriel: string;
    siteName: string;
  };
  loading: boolean;
  res: { id: string; name: string; material_id: string }[];
  resFinished?: Record<string, string>;
  resAssign?: Record<string, string>;
  error: string;
  materialsConfirmer: string[];
  has_rapport: boolean;
  interventionId?: string;
}

const initialState: InitialState = {
  showModal: false,
  showCompteRendu: false,
  loading: false,
  res: [],
  error: "",
  materialsConfirmer: [],
  has_rapport: false,
};

const listInterventionSlice = createSlice({
  name: "intervenetion-slice-v2",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = true;
      state.materilesDetails = {
        interventionGraphId: action.payload.interventionGraphId,
        admin: action.payload.admin,
        interventionId: action.payload.interventionId,
        id: action.payload.id,
        idMateriel: action.payload.idMateriel,
        siteName: action.payload.siteName,
      };
    },
    hideModal: (state) => {
      state.showModal = false;
      if (getRole() !== ROLE.ADMIN_ORGANIZATION) {
        state.materialsConfirmer.push(
          `${state.materilesDetails?.idMateriel as string}`
        );
        state.materilesDetails = undefined;
      }
    },
    toggleCompteRendu: (state) => {
      state.showCompteRendu = !state.showCompteRendu;
    },
    setInterventionId: (state, action) => {
      state.interventionId = action.payload;
    },
    resetAssignRes: (state) => {
      state.resAssign = undefined;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(interventionService.fulfilled, (state, action) => {
        state.loading = false;
        state.res = action.payload.materiels;
        state.has_rapport = action.payload.intervention.has_rapport;
      })
      .addCase(interventionService.pending, (state) => {
        state.loading = true;
        state.materialsConfirmer = [];
      })
      .addCase(interventionService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // terminer une intervention
      .addCase(finishedIntervention.fulfilled, (state, action) => {
        state.resFinished = action.payload;
        state.loading = false;
        state.materialsConfirmer = [];
        state.showCompteRendu = false;
      })
      .addCase(finishedIntervention.pending, (state) => {
        state.loading = true;
      })
      .addCase(finishedIntervention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      // assigner un intervention a un admin
      .addCase(assignedInterventionToAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.resAssign = action.payload;
      })
      .addCase(assignedInterventionToAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignedInterventionToAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const {
  showModal,
  resetAssignRes,
  hideModal,
  toggleCompteRendu,
  setInterventionId,
} = listInterventionSlice.actions;

export default listInterventionSlice.reducer;
