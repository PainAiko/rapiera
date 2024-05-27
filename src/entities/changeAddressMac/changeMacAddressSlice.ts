import { createSlice } from "@reduxjs/toolkit";
import { updateMacAddress } from "@pages/changeMacAddress/changeMacAddressAPI";
import { InitialStateBuilder } from "../initialiseIntervention/interventionCheckSlice";
import { popup } from "@utils/popupSwealert";

const initialState: InitialStateBuilder = {
    res: null,
    loading: false,
    error: null,
    toggle: false
}

const changementAdresseMac = createSlice({
    name: "changement-mac-address",
    initialState,
    reducers: {
        resetState: (state) => {
            state.res = null
        }
    },
    extraReducers(builder) {
        builder.addCase(updateMacAddress.fulfilled, (state, action) => {
            state.loading = false
            state.res = action.payload
            state.error = null
            popup("success", "Changement effectuer.", 1500, "left")
        })
        .addCase(updateMacAddress.pending, (state) => {
            state.res = null
            state.loading = true
        })
        .addCase(updateMacAddress.rejected, (state, action) => {
            state.loading = false
            state.error = <string>action.error.message
        })
    },
})

export const {resetState} = changementAdresseMac.actions

export default changementAdresseMac.reducer