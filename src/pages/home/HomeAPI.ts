import { gql } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInterventionInfo } from "@shared/config/API/CONST";
import axios from "axios";

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

export const GET_INTERVENTION = gql`
  query GET_INTERVENTION_INFO($interventionId: Int!, $emailTech: String!) {
    intervention(interventionId: $interventionId, emailTech: $emailTech) {
      success
      message
      interventionId
      token
      consigne
      map {
      siteName
      batiment {
        etage
        materials {
          id
          name
          macAddress
        }
      }
    }
    }
  }
`;


export const checkIfAdminAssigned = createAsyncThunk(
  "check-admin-assigned",
  async (credential: string) => {
    try {
      const res = await getInterventionInfo(credential);

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

export const GET_SITE = gql`
query getSite($interventionId: Int!) {
  findSite(interventionId:  $interventionId) {    
    name
    id
    interventionId
    consigne
    devices {
      id
      label
      main_mac
    }
    levelmaps {
      level
      name
      positions {
        map {
          width
          height
          dataURL
        }
      }
      devices {
        label
        id
        position {
          x
          y
        }
      }
    }
  }
}
`