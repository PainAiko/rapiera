import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchBySuperAdmin, searchBySuperAdminNextPage } from "@config/API/CONST";



export const search = createAsyncThunk<
  { [key: string]: string | [] },
  { query: string; page?: string }
>("search-members", async (creadentials: { query: string }) => {
  try {
    const res = await searchBySuperAdmin(creadentials.query);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    } else {
      throw new Error("Une erreur inattendue s'est produite.");
    }
  }
});

export const searchNext = createAsyncThunk<
  { [key: string]: string | [] },
  { query: string, page: string }
>("search-members-next", async (creadentials: { query: string, page: string }) => {
  try {
    const res = await searchBySuperAdminNextPage(creadentials.query, creadentials.page);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    } else {
      throw new Error("Une erreur inattendue s'est produite.");
    }
  }
});

