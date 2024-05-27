import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getGraphqlId } from "@utils/getToken";
import { Data } from "@pages/rapport/Model";
import { checkIfAdminAssigned } from "../../pages/home/HomeAPI";
interface InitialState {
  interventionId: string | number;
  interventionIdGraphql: string | number;
  consigne: string;
  isTechnicianChangeMaterial: boolean;

  res?: Data;
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  interventionId: localStorage.getItem("interventionId")
    ? (localStorage.getItem("interventionId") as string)
    : "",
  interventionIdGraphql: getGraphqlId(),
  consigne: "",
  isTechnicianChangeMaterial: false,
  loading: false,
};

const homeSlice = createSlice({
  name: "home-page",
  initialState,
  reducers: {
    setState: (state, actions) => {
      actions.payload.token && Cookies.set("accessGraph", actions.payload.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      state.consigne = actions.payload.consigne;
      state.interventionId = localStorage.getItem("interventionId")
        ? localStorage.getItem("interventionId")
        : actions.payload.interventionId;
      state.interventionIdGraphql = localStorage.getItem(
        "interventionIdGraphql"
      )
        ? localStorage.getItem("interventionIdGraphql")
        : actions.payload.interventionIdGraphql;
    },
    setIsMaterialChange: (state) => {
      state.isTechnicianChangeMaterial = !state.isTechnicianChangeMaterial;
    },
    resetRes: (state) => {
      state.res= undefined
      state.error=""
      state.loading=false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkIfAdminAssigned.fulfilled, (state, action) => {
        state.res = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(checkIfAdminAssigned.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIfAdminAssigned.rejected, (state, action) => {
        state.error = action.error as string;
        state.loading = false;
      });
  },
});

export const { setState, setIsMaterialChange,resetRes } = homeSlice.actions;

export default homeSlice.reducer;
