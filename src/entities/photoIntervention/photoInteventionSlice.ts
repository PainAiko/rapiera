import { createSlice } from "@reduxjs/toolkit";
import { sendPhoto, sendPhotosupplementaire } from "@features/intervention/PhotoIntervention/photoInterventionAPI";
import { popup } from "@utils/popupSwealert";
import { FileObject } from "@features/intervention/PhotoIntervention/Model";
import { PHOTO_SUPP_SUCCESS } from "@shared/utils/const";

interface InitialState {
  photos?: Record<string, FileObject>;
  loading: boolean;
  ok: boolean;
}

const initialState: InitialState = {
  photos: {},
  loading: false,
  ok: false,
};

const photoIntervention = createSlice({
  name: "photo-intervention",
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photos = action.payload;
    },
    reset: (state) => {
      (state.ok = false), (state.photos = {});
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendPhoto.fulfilled, (state, action) => {
        popup("success", `${action.payload.message}`, 1500, "left"); 
        state.ok = true;
        state.loading = false;
      })
      .addCase(sendPhoto.pending, (state) => {
        state.ok = false;
        state.loading = true;
      })
      .addCase(sendPhoto.rejected, (state, action) => {
        popup("error", `${action.error.message as string}`, 1500, "left");
        state.loading = false;
        state.ok = false;
      })
      .addCase(sendPhotosupplementaire.fulfilled, (state) => {
        popup("success", PHOTO_SUPP_SUCCESS, 1500, "left");
        state.ok = true;
        state.loading = false;
      })
      .addCase(sendPhotosupplementaire.pending, (state) => {
        state.ok = false;
        state.loading = true;
      })
      .addCase(sendPhotosupplementaire.rejected, (state, action) => {
        popup("error", `${action.error.message as string}`, 1500, "left");
        state.loading = false;
        state.ok = false;
      });
  },
});

export const { setPhoto, reset } = photoIntervention.actions;

export default photoIntervention.reducer;