import { createSlice } from "@reduxjs/toolkit";
import { TypeSignature } from "@utils/ROLE";
import { sendRapportSevice } from "@features/rapportFeatures/RapportFeatureAPI";

interface InitialState {
    signatureClient: string;
    signatureTechnicien: string

    // traitement des reponse asynchrone
    res?: Record<string, string>,
    loading?: boolean,
    error?: Record<string, string> | string
}

const initialState: InitialState = {
    signatureClient: "",
    signatureTechnicien: "",
}

const rapport = createSlice({
    name: "Rapport-intervention",
    initialState,
    reducers: {
        setSignature: (state, action) => {
            switch (action.payload.type) {
                case TypeSignature.CLIENT:
                    state.signatureClient = action.payload.data
                    break;
                case TypeSignature.TECHNICIEN:
                    state.signatureTechnicien = action.payload.data
                    break;  
                default:
                    break;
            }
        },
        resetResponse: (state) => {
            state.res = undefined
            state.loading = false
            state.error =  undefined
        }
    },
    extraReducers(builder) {
        builder.addCase(sendRapportSevice.fulfilled, (state, action) => {
           state.loading = false
           state.error = ""
           state.res = action.payload
        }).addCase(sendRapportSevice.pending, state => {
           state.loading = true
           state.error = ""
           state.res = undefined
        }).addCase(sendRapportSevice.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})

export const {setSignature,resetResponse} = rapport.actions

export default rapport.reducer