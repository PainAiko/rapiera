import { ActivityUser } from "@features/log/Modal";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLogNextPage } from "@shared/config/API/CONST";
import axios from "axios";

interface InitialState {
    logs: ActivityUser[],
    next_page: number | null
}


const initialState: InitialState = {
    logs: [],
    next_page: null
}

export const nextpage = createAsyncThunk("log_next_page", async (page: number) => {
    try {
        const res = await getLogNextPage(`${page}`);
        return res.data.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw new Error(e.response?.data.message);
        } else {
          throw new Error("Une erreur inattendue s'est produite.");
        }
      }
})


const logSlice = createSlice({
    name: "log-user-slice",
    initialState,
    reducers: {
        setLog: (state,action) => {
            state.logs = action.payload
        },
        setNextPage: (state, action) => {
            state.next_page = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(nextpage.fulfilled, (state, action) => {
            state.logs = [...state.logs, ...action.payload.data]
            if(action.payload.next_page_url) {
                state.next_page = state.next_page as number + 1
            }else{
                state.next_page = null
            }
        })
    },
})

export const {setLog,setNextPage} = logSlice.actions

export default logSlice.reducer