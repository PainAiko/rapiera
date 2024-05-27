import { createSlice } from "@reduxjs/toolkit";
import { deleteOrganizationService, updateOrganizationService } from "@pages/Bo/admin/gestionPrestataire/gestionPrestataireAPI";

interface InitialState {
    list: {[key:string]: string} []
    show: boolean;
    update: boolean
    orgInfo?: {
        id?: string;
        name: string
    }

    res?: Record<string, string>
    loading: boolean,
    loadingUpdate: boolean,

    error?: string
}

const initialState: InitialState = {
    list: [],
    show: false,
    loading: false,
    update: false,
    loadingUpdate: false
}

const gestionPrestataire = createSlice({
    name: "gestion-prestataire",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload?.map((item: {[key: string]: string}) => ({
                "Id": item.id,
                "Nom": item.name,
              }))
        },
        toggleModal: (state) => {
            state.show = !state.show
        },
        supprimerOrg: (state, action) => {
            state.list = state.list?.filter(org => org.Id != action.payload.id)
        },
        //TODO: efffacer 
        updateList: (state, action) => {
            state.list = [{
                "Id": action.payload.id,
                "Nom": action.payload.name,
            },
            ...state.list as {[key:string]: string} []
        ]
        },

        setOrgInfo:(state, action) => {
            state.update = true
            state.orgInfo = {
                id: action.payload.id,
                name: action.payload.name
            }
        },
        changeName: (state,action) => {
            state.orgInfo = {
                ...state.orgInfo,
                name: action.payload
            }
        },
        reset: (state) => {
            state.res = undefined
            state.loading=false
            state.error=""
            state.orgInfo = undefined
        }
    },
    // effacer
    extraReducers(builder) {
        builder.addCase(deleteOrganizationService.fulfilled, (state,action) => {
            state.res = action.payload?.message
            state.list = state.list?.filter(org => org.Id != `${action.payload?.id}`)
            state.error = ""
        })
        .addCase(deleteOrganizationService.pending, state => {
            state.res = undefined
        })
        .addCase(deleteOrganizationService.rejected, (state, action) => {
            state.error = action.error.message as string
        })
// update organization
        .addCase(updateOrganizationService.fulfilled, (state,action) => {
            state.loadingUpdate = false
            state.error = ""
            state.update = false
            state.res = action.payload?.message
            state.list = state.list?.map(org => {
                if(org.Id == action.payload?.orgInfo.id) {
                    return {
                        "Id": action.payload?.orgInfo.id,
                        "Nom": action.payload?.orgInfo.organizationName,
                    }
                }
                return org
            })
        })
        .addCase(updateOrganizationService.pending, state => {
            state.loadingUpdate = true
        })
        .addCase(updateOrganizationService.rejected, (state, action) => {
            state.error = action.error.message as string
            state.loadingUpdate = false
        })
    },
})

export const {setList,toggleModal,supprimerOrg,updateList, reset,setOrgInfo,changeName} = gestionPrestataire.actions

export default gestionPrestataire.reducer


