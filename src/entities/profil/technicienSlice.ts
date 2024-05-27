import { createSlice } from "@reduxjs/toolkit";
import { updateTechnicienInfo } from "@features/profil/profilAPI";

interface InitialState {
  res: null | Record<string, string>;
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  res: null,
  loading: false,
  error: "",
};

const technicienSlice = createSlice({
  name: "technicien-info",
  initialState,
  reducers: {
    resetTechInfo: (state) => {
      state.res = null;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateTechnicienInfo.fulfilled, (state, action) => {
        (state.loading = false), (state.res = action.payload);
        state.error = "";
      })
      .addCase(updateTechnicienInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTechnicienInfo.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      });
  },
});

export const {resetTechInfo} = technicienSlice.actions

export default technicienSlice.reducer;
