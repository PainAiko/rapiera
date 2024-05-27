import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "@config/API";
import { host } from "@config/API/endpoints";
import axios from "axios";

const pagination = (page: string) =>  instance.get(`${host.base_url_account}/users?page=${page}`);

export const nextOrPrev = createAsyncThunk(
    "pagination",
    async (credentials: string) => {
        try {
            const res = await pagination(credentials)

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