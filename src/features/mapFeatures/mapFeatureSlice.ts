import {createSlice} from "@reduxjs/toolkit"
import { TYPE } from "@utils/ROLE"
import { LevelMaps, SearchListDevices } from "./Model"
import { serializeLevelMaps } from "@shared/utils/serialize"
interface InitialState {
    showModal: boolean
    title: string
    materielId: string
    interventionType: string
    materiels: {[key:string]: string | boolean}[]
    levelMaps: LevelMaps[],
    levelToShow?: LevelMaps
    listSearch: SearchListDevices[]
    actualLevel: number,
    deviceSearch?: string
}

const initialState: InitialState = {
    showModal: false,
    title: "",
    materielId: "",
    interventionType: "",
    materiels: [],
    levelMaps: [],
    listSearch: [],
    actualLevel: 0
}

const mapFeatureSlice = createSlice({
    name: "map-appareil",
    initialState, 
    reducers: {
        show: (state, action) => {
            state.showModal = true
            state.title = action.payload.title
            state.materielId = action.payload.materielId
        },
        hide: (state) => {
            state.showModal = false
        },
        setMateriels: (state, action) => {
            state.materiels = (action.payload as [])?.map<{[key: string] : string | boolean}>(materiel => ({
                ...materiel as object, 
                photoAvant: false,
                photoApres: false,
                changeMacAddress: false,}))
        },
        setInterventionType: (state, action) => {
            state.interventionType = action.payload
        },
        finishIntervention: (state, action) => {
            switch (action.payload.type) {
                case TYPE.BEFORE:
                    state.materiels = state.materiels.map<{[key: string]: string | boolean}>((materiel) => {
                        return materiel.id == action.payload.id ? ({...materiel, photoAvant: true}) :  materiel
                    })
                    break;
                case TYPE.AFTER:
                    state.materiels = state.materiels.map<{[key: string]: string| boolean}>(materiel => {
                        return materiel.id == action.payload.id ? ({...materiel, photoApres: true}) :  materiel
                    })
                    break;
                case TYPE.MACADDRESS:
                    state.materiels = state.materiels.map<{[key: string]: string| boolean}>(materiel => {
                        return materiel.id == action.payload.id ? ({...materiel, changeMacAddress: true}) :  materiel
                    })
                    break;
            }
        },
        setLevelMaps: (state, action) => {
            state.levelMaps = action.payload
        },
        setLevelToShow: (state, action) => {
            state.actualLevel = action.payload.level ? action.payload.level : 0
            state.levelToShow = state.levelMaps.find((map) => map.level === action.payload.level)
            state.deviceSearch = action.payload.id ? action.payload.id : ""
        },
        setListSearch: (state) => {
            state.listSearch = serializeLevelMaps(state.levelMaps)
        }
    }
})

export const { show, hide,setLevelToShow,setMateriels,setListSearch,setLevelMaps,setInterventionType,finishIntervention } = mapFeatureSlice.actions

export default mapFeatureSlice.reducer