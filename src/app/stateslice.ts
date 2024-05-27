import { createSlice } from "@reduxjs/toolkit";
import { token } from "@utils/getToken";

const stateSlice = createSlice({
    name: "root-state",
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        isConnected: (state) => {
            if (token()) {
                state.isAuthenticated = true
            } else {
                state.isAuthenticated = false
            }
        }
    }
})

export const {isConnected} = stateSlice.actions

export default stateSlice.reducer