import { Dispatch, SetStateAction } from "react";

export type InitialState = {
    loin: File | undefined | string;
    pres: File | undefined | string;
    cablage: File | undefined | string;
    macAddress: File | undefined | string;
  };


  export interface FileObject {
    id: number;
    name: string;
    size: number;
    type: string;
    path: string;
    description?: string
  }
  
  
 export  type TypeImage = "loin" | "pres" | "cablage" | "macAddress" | undefined;
  
 export  type Desc = {
    desc1: string;
    desc2: string;
    desc3: string;
    desc4: string;
  };
  
 export type HandlerArgs = {
    images: [InitialState, Dispatch<SetStateAction<InitialState>>];
    types: [TypeImage, Dispatch<SetStateAction<TypeImage>>];
    desc: [Desc, Dispatch<SetStateAction<Desc>>];
    description: boolean;
    materielId: string;
  };