import { NotificationData } from "@features/notificationCallFeatures/model"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getNotificationCallNextPage } from "@shared/config/API/CONST"
import axios from "axios"

interface InitialState {
    notifications: NotificationData[]
    next_page: number | null
    newNotification: number
}

const initialState: InitialState = {
    notifications: [],
    next_page: null,
    newNotification: 0
}

export const notificationNextpage = createAsyncThunk("log_next_page", async (page: number) => {
    try {
        const res = await getNotificationCallNextPage(`${page}`);
        return res.data.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw new Error(e.response?.data.message);
        } else {
          throw new Error("Une erreur inattendue s'est produite.");
        }
      }
})

const notificationCall = createSlice({
    name: "notification-call",
    initialState,
    reducers: {
        incriseNotification: (state) => {
            state.newNotification++
        },
        resetNotification: (state) => {
            state.newNotification = 0
        },
        decriseNotification: (state) => {
            state.newNotification--
        },
        setNotifications: (state,action) => {
            state.notifications = action.payload
        },
        setNextNotificationPage: (state, action) => {
            state.next_page = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(notificationNextpage.fulfilled, (state, action) => {
            state.notifications = [...state.notifications, ...action.payload.data]
            if(action.payload.next_page_url) {
                state.next_page = state.next_page as number + 1
            }else{
                state.next_page = null
            }
        })
    },
})

export const {incriseNotification, resetNotification,decriseNotification,setNotifications,setNextNotificationPage} = notificationCall.actions

export default notificationCall.reducer