import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { changeMacAddress } from "@config/API/CONST";

export interface Data {
        oldMacAddress: string,
        newMacAddress: string
        interventionId: string | number,
        materialId: string | number
}



export const updateMacAddress = createAsyncThunk(
    "change-mac-address", async (credentials: Data) => {
        try {
            const res = await changeMacAddress(credentials)
             return res.data
          } catch (e) {
            if (axios.isAxiosError(e)) {
              throw new Error(e.response?.data.message);
            } else {
              throw new Error("Une erreur inattendue s'est produite.");
            }
          }
    }
)