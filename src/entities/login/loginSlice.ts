import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAuth } from "@features/Login/LoginAPI";
import { LocalData, setItemLocalStorage } from "@utils/getToken";

interface InitialState {
    ok: boolean;
    error: string
    loading: boolean,
    role: string
}

const initialState: InitialState = {
    ok: false,
    error: "",
    loading: false,
    role: ""
}

const auth = createSlice({
    name: "login",
    initialState,
    reducers: {
        reset: (state) => {
            state.ok = false
            state.error = ""
            state.role = ""
            state.loading = false
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAuth.fulfilled, (state, action: PayloadAction<LocalData>) => {
            setItemLocalStorage(action.payload);
            state.ok = true
            state.role = action.payload.role
            state.loading = false
        })
        .addCase(loginAuth.rejected, (state, action) => {
            state.error = action.error.message as string
            state.loading = false
        })
        .addCase(loginAuth.pending, (state) => {
            state.loading = true
        })
    },
})

export const {reset} = auth.actions

export default auth.reducer