interface Photo {
  id: number;
  name: string;
  size: number;
  type: string;
  path: string;
  description: string;
}

export interface AdditionalPhotos {
  photo_1: Photo;
  photo_2: Photo;
  photo_3: Photo;
  photo_4: Photo;
}

interface InterventionParent {
  idGrapQl: number;
  techId: number;
  rapporFile: null;
  created_at: string;
  siteName: string;
  admin: string |  null;  
  admin_id: string |  null;
  additionnalPhoto: AdditionalPhotos;
}

export interface BeforeAfterImages {
  pres: Photo;
  macAddress: Photo;
  cablage: Photo;
  loin: Photo;
}

interface Tech {
  id: number;
  name: string;
}

export interface Material {
  id: number;
  id_graphql: string;
  name: string;
  mac_address: string;
  status: string;
  created_at: string;
  updated_at: string;
  material_id: number;
  tech: Tech;
  before_images: BeforeAfterImages;
  after_images: BeforeAfterImages;
}

export interface Data {
  interventionParent: InterventionParent;
  materials: Material[];
}
