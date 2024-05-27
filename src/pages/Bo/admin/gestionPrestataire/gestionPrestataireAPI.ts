import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrganization, deleteOrganisation, updateOrganization } from "@config/API/CONST";


export const createOrganizationService = async (data: {
  [key: string]: string;
}) => {
  let response, error;

  try {
    const res = await createOrganization(data);
    if (res.status === 201) {
      response = res.data;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = e.response?.data.message;
    } else {
      error = "Une erreur inattendue s'est produite.";
    }
  }

  return [response, error];
};

export const deleteOrganizationService = createAsyncThunk(
  "delete-organisation",
  async (credential: number) => {
    try {
      const res = await deleteOrganisation(credential);
      if (res.status === 200 || res.status === 201) {
        return {message: res.data.message, id: credential};
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
)

export const updateOrganizationService = createAsyncThunk(
  "update-organisation",
  async (credential: {[key: string]: string}) => {
    try {
      const res = await updateOrganization(credential);
      if (res.status === 200 || res.status === 201) {
        return {message: res.data.message, orgInfo: credential};
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
)
