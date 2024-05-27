import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "@config/API/CONST";

export const loginAuth = createAsyncThunk(
  "login",  async (credentials:  { email: string; password: string }) => {
    try {
      const res = await login(credentials);
      return res.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
)