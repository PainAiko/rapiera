import { gql } from "@apollo/client";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkTech, initializeIntervention } from "@config/API/CONST";
import { MaterielForBE } from "./Model";

export const GET_TECH_INTERVENTION = gql`
  query CheckTech($id: Int!) {
  checkuser(interventionId: $id) {
    success
    message
    interventionId
    idTech
    emailTech
    society
    mailAdminPrestataire
  }
}
`;



export const checkTechService = async (data: {
  email: string;
  society: string;
}) => {
  let response, error;

  try {
    const res = await checkTech(data);

    if (res.status === 200) {
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

export type Data = {
  interventionId: number
  consigne: string;
  siteName: string;
  techId: number;
  materials: MaterielForBE[];
};




export const initialize = createAsyncThunk(
  "initializer-checker",async (credentials: Data) => {
    try {
      const res = await initializeIntervention(credentials)
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

