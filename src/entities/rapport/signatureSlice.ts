import { createSlice } from "@reduxjs/toolkit";

const signature = createSlice({
    name: "signature",
    initialState: {
        showModal: false,
        type: ""
    },
    reducers: {
        show: (state, action) => {
            state.showModal = true
            state.type = action.payload.type
        },
        hide: (state) => {
            state.showModal = false
            state.type = ""
        }
    }
})

export const {show, hide} = signature.actions

export default signature.reducer