import { AdditionalPhotos, Data } from "@pages/rapport/Model";
import { Materiel, MaterielImage, imageToBase64 } from "./genererPDF";
import { COLUMNS } from "./tableau";
import { Device, MaterielForBE } from "@features/initialiseIntervention/Model";
import { LevelMaps, SearchListDevices } from "@features/mapFeatures/Model";
import { FileObject } from "@features/intervention/PhotoIntervention/Model";

export type Photo = {pres?: FileObject, loin?: FileObject, cablage?: FileObject, macAddress?: FileObject}

export function additionnalPhotoSerializer (data: {[key: string]: FileObject}) {
  let serialize: Photo = {}
  const match: {[key: string]: string} = {
    photo_1: "loin",
    photo_2: "pres",
    photo_3: "cablage",
    photo_4: "macAddress"
  }
  Object.keys(data).forEach((key) => {
    const { id, name, size, type, path,description } = data[key];
    serialize[match[key] as keyof Photo ] = { id, name, size, type, path,description };
  });
  return serialize
}

export function serializeLevelMaps(levelMaps: LevelMaps[]): SearchListDevices[] {
  const serializedData: SearchListDevices[] = [];

  levelMaps.forEach(levelMap => {
      levelMap.devices.forEach(device => {
          serializedData.push({
              id: device.id,
              name: device.label,
              level: levelMap.level,
              namelevel: levelMap.name
          });
      });
  });

  return serializedData;
}

export const materielSerializer = (devices: Device[]): MaterielForBE[] => {
  return devices.map(device => {
    return {
      id: device.id,
      name: device.label,
      macAddress: device.main_mac
    }
  })
}

export const filterData = (data: {[key: string]: string}): {[key: string]: string} => {
    // Utiliser Object.entries pour obtenir un tableau des paires clé-valeur
    const filteredEntries = Object.entries(data)
      .filter(([,value]) => value !== undefined && value !== "");
  
    // Utiliser Object.fromEntries pour créer un nouvel objet à partir du tableau filtré
    const filteredData = Object.fromEntries(filteredEntries) as {[key: string]: string};
  
    return filteredData;
  };

export const extractPageFromUrl = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    const pageParam = parsedUrl.searchParams.get("page");
    return pageParam;
  } catch (error) {
    return null;
  }
};

export function countMaterielsWtihPhotos(materiels: { [key: string]: string | boolean }[]): number {
  const count = materiels.filter(
    (materiel) => materiel.photoAvant || materiel.photoApres || materiel.changeMacAddress
  ).length;

  return count;
}

export function getFileNameFromUrl(url: string): string {
  try {
    const urlObject = new URL(url);
    const pathSegments = urlObject.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  } catch (error) {
    return "";
  }
}

export const userListSerializer = (data: {[key: string]: string}[]) => {
  return data?.map(
    (value: { [key: string]: string }) => {
      return {
        id: value.id,
        email: value.email,
        meetLink: value.meetLink,
        [COLUMNS.name]: value.name,
        [COLUMNS.role]: value.role ? (value.role == "technician" ? "technicien" : value.role) : value.role ,
        [COLUMNS.organisation]: value.organization
          ? value.organization
          : value.groupe,
      };
    }
  )
}

export const imageInterventionSerializer = async (data: Data): Promise<Materiel[]> => {
  const materialsPromises = (data.materials || []).map(async (item): Promise<Materiel> => {
    const avantImages = await imageToBase64(item.before_images);
    const apresImages = await imageToBase64(item.after_images);

    return {
      name: item.name,
      image: {
        avant: {
          loin: avantImages.loin,
          pres: avantImages.pres,
          cablage: avantImages.cablage,
          addressMac: avantImages.addressMac
        },
        apres: {
          loin: apresImages.loin,
          pres: apresImages.pres,
          cablage: apresImages.cablage,
          addressMac: apresImages.addressMac
        }
      }
    };
  });

  return Promise.all(materialsPromises);
};

 export const photoSuppSerializer = async  (data: AdditionalPhotos): Promise<MaterielImage> => {
  return await imageToBase64({
    loin: data["photo_1"],
    pres: data["photo_2"],
    cablage: data["photo_3"],
    macAddress: data["photo_4"]
  })
 }
