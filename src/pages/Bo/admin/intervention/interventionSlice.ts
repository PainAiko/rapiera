import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    comfiramationModal: boolean
}

const initialState: InitialState = {
    comfiramationModal: false
}

const interventionSlice = createSlice({
    name: "intervention-photo-bo",
    initialState, 
    reducers: {
        toggleComfirmationModal: (state) => {
            state.comfiramationModal = !state.comfiramationModal
        }
    }
})

export const {toggleComfirmationModal} = interventionSlice.actions

export default interventionSlice.reducer