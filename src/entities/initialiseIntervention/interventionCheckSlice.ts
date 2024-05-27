import { createSlice } from "@reduxjs/toolkit";
import { initialize } from "@features/initialiseIntervention/interventionCheckTechAPI";

export interface InitialStateBuilder {
    loading: boolean,
    res: null | Record<string, object | number | string>
    error: null |  string
    toggle: boolean
}

const initialState: InitialStateBuilder = {
    loading: false,
    res: null,
    error: null,
    toggle: true
}

const checkSlice = createSlice({
    name: "check-tech-intervention",
    initialState,
    reducers: { 
        toggleModal: (state) => {
            state.toggle = !state.toggle
        }
    },
    extraReducers(builder) {
        builder.addCase(initialize.fulfilled, (state, action) => {
            state.loading = false
            state.res = action.payload
            state.error = null
        })
        .addCase(initialize.pending, (state) => {
            state.res = null
            state.loading= true
        })
        .addCase(initialize.rejected, (state, action) => {
            state.loading = false
            state.error = <string>action.error.message
        })
    },
})

export const {toggleModal} = checkSlice.actions
export default checkSlice.reducer