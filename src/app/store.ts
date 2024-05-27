import { configureStore } from "@reduxjs/toolkit";
import mapFeatureSlice from "@features/mapFeatures/mapFeatureSlice";
import signatureSlice from "@entities/rapport/signatureSlice";
import interventionSlice from "@pages/Bo/admin/intervention/interventionSlice";
import homeSlice from "@entities/home/homeSlice";
import GestionUserSlice from "@entities/backofficev2/GestionUserSlice";
import stateslice from "./stateslice";
import gestionPrestataireSlice from "@entities/backofficev2/gestionPrestataireSlice";
import auth from "@entities/login/loginSlice";
import photoInteventionSlice from "@entities/photoIntervention/photoInteventionSlice";
import checkSlice from "@entities/initialiseIntervention/interventionCheckSlice";
import changeMacAddressSlice from "@entities/changeAddressMac/changeMacAddressSlice";
import rapportSlice from "@entities/rapport/rapportSlice";
import dashboardv2Slice from "@entities/backofficev2/dashboardv2Slice";
import listInterventionSlice from "@entities/backofficev2/listInterventionSlice";
import interventionTerminer from "@entities/backofficev2/interventionTerminer";
import technicienSlice from "@entities/profil/technicienSlice";
import logSlice from "@entities/backofficev2/logSlice";
import notificationCall from "@entities/backofficev2/notificationCall";

const store = configureStore({
    reducer: {
        rootState: stateslice,
        mapAppareil: mapFeatureSlice,
        signature: signatureSlice,
        interventionBo: interventionSlice,
        homePage: homeSlice,
        gestionUser: GestionUserSlice,
        gestionPrestataire: gestionPrestataireSlice,
        auth: auth,
        photoIntervention: photoInteventionSlice,
        checkTech: checkSlice,
        changementAddressMac: changeMacAddressSlice,
        rapportIntervention: rapportSlice,
        dashboard:dashboardv2Slice,
        listInterventionSlice,
        interventionTerminer,
        technicienSlice,
        logSlice,
        notificationCall
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store