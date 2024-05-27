import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AdditionalPhotos,
  Data as InterventionData,
} from "@pages/rapport/Model";
import { getUserConnectedName } from "@utils/getToken";
import { exportPageToPDF } from "@utils/genererPDF";
import {
  imageInterventionSerializer,
  photoSuppSerializer,
} from "@utils/serialize";
import { sendRapport } from "@config/API/CONST";

export interface Data {
  data: FormData;
  idGraphql: string,
  siteName: string,
  dataForPdf: Record<string, string | number>;
  interventionData: InterventionData;
  signatureClient: string;
  signatureTechnicien: string;
  interventionId: string | number;
  adminName: string;
  adminOnCallName: string
}



export const sendRapportSevice = createAsyncThunk(
  "send-rapport",
  async (credentials: Data) => {
    credentials.data.append("rapportFile", exportPageToPDF(
      {
        header: {
          numIntervention: credentials.idGraphql as string,
          siteName: credentials.siteName,
          address: "",
          intitule: "",
        },
        detail: {
          description: credentials.dataForPdf.description as string,
          plusDetail: credentials.dataForPdf.detailPlus as string,
          cause: credentials.dataForPdf.causeIncident as string,
          resolu: (credentials.dataForPdf.isResolved as string) == "1" ? "Oui" : "Non",
          reintervention: (credentials.dataForPdf
            .isNeccessaryReIntervenetion as string) == "1" ? "Oui" : "Non",
        },
        other: {
          change: (credentials.dataForPdf.numberMaterialChanged as string) == "0" ? "Non" : "Oui",
          addressMacAvant: [],
          addresMacApres: [],
          technicienName: getUserConnectedName(),
          adminName: credentials.adminName,
          adminOncall: credentials.adminOnCallName,
          heureArrive: credentials.dataForPdf.arrivalDate as string,
          heureDepart: credentials.dataForPdf.finishedDate as string,
        },
      },
      await imageInterventionSerializer(credentials.interventionData),
      await photoSuppSerializer(
        credentials.interventionData?.interventionParent
          .additionnalPhoto as AdditionalPhotos
      ),
      credentials.signatureClient,
      credentials.signatureTechnicien
    ));
    try {
      const res = await sendRapport(credentials);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }
);
