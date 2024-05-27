import { FileObject } from "@features/intervention/PhotoIntervention/Model";

export type ImageFile = {
    loin: FileObject;
    pres: FileObject;
    cablage: FileObject;
    macAddress: FileObject;
  };

  export interface MaterielData {
    id: number;
    name: string;
    mac_address: string;
    material_id: string;
    status: string;
  }