import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";
import axios from "axios";
import { getFileNameFromUrl } from "./serialize";
import logoWifirst from "../assets/images/wifirst-logo.png";
// import bobdesk from "../assets/images/logo-bobdesk.png"
import { BeforeAfterImages } from "@pages/rapport/Model";
import { formaterDate } from "./DateTime";
import { ADDRESS_SIGN_IN_RAPPORT_PDF, RAPPORT_PDF_FOOTER_TAB } from "./const";

export interface Header {
  numIntervention: string;
  siteName: string;
  address: string;
  intitule: string;
}
export interface Detail {
  description: string;
  plusDetail: string;
  cause: string;
  resolu: string;
  reintervention: string;
}

export interface Other {
  change: string;
  addressMacAvant: { materiel: string; addressMac: string }[];
  addresMacApres: { materiel: string; addressMac: string }[];
  technicienName: string;
  adminName: string;
  adminOncall?: string;
  heureArrive: string;
  heureDepart: string;
}
export interface DataToPdf {
  header: Header;
  detail: Detail;
  other: Other;
}

export interface MaterielImage {
  loin: string;
  pres: string;
  cablage: string;
  addressMac: string;
}

export type Materiel = {
  name: string;
  image: {
    avant: MaterielImage;
    apres: MaterielImage;
  };
};

export const exportPageToPDF = (
  rapportDetail: DataToPdf,
  materiel: Materiel[],
  photoSup: MaterielImage,
  signatureClient: string,
  signatureTechnicien: string
) => {
  // Créer un nouveau document jsPDF
  const doc = new jsPDF({
    format: "a4",
    orientation: "portrait",
  });

  // Fonction pour ajouter une photo avec coordonnées dynamiques
  const addPhoto = (image: MaterielImage, title: string, startY: number) => {
    // Définir la police et la couleur du texte
    doc.setFont("Helvetica", "");
    doc.setTextColor(0); // Utilisez 0 pour le noir au lieu de "#000000"

    // Ajouter le titre
    doc.text(title, 15, startY);

    // Les images avec coordonnées dynamiques
    const imageWidth = 45;
    const imageHeight = 45;
    const margin = 5;
    const imagesPerRow = 4;
    const spaceBetweenRows = 10;

    let currentY = startY + 10; // Ajuster le décalage initial
    let currentX = 10;

    const photo: { [key: string]: string } = {
      1: "pres",
      2: "cablage",
      3: "addressMac",
      0: "loin",
    };

    // Boucle ajoutée pour la démonstration, pour ajouter plusieurs images
    for (let i = 0; i < imagesPerRow; i++) {
      // Vérifier si la hauteur maximale est atteinte
      // if (currentY + imageHeight > doc.internal.pageSize.getHeight() - margin) {
      //   doc.addPage();
      //   currentY = margin; // Réinitialisation de Y sur la nouvelle page
      //   currentX = 15; // Réinitialisation de X à la marge gauche sur la nouvelle page
      // }

      // Ajouter l'image à la position actuelle
      if (
        image[photo[i] as keyof MaterielImage] &&
        image[photo[i] as keyof MaterielImage] !== ""
      ) {
        doc.addImage(
          image[photo[i] as keyof MaterielImage],
          "JPEG",
          currentX,
          currentY,
          imageWidth,
          imageHeight
        );
      }

      // Déplacer la position X pour la prochaine image
      currentX += imageWidth + margin;

      // Si une ligne est complète, réinitialiser X et augmenter Y
      if ((i + 1) % imagesPerRow === 0) {
        currentX = 15;
        currentY += imageHeight + spaceBetweenRows;
      }
    }
  };

  // le header du pdf avec le logo
  doc.addImage(logoWifirst, "PNG", 5, 5, 50, 50);

  doc.setFont("Helvetica", "bold");
  const largeurPage = doc.internal.pageSize.getWidth();
  const titre = "Rapport d'intervention";
  // Calcul des coordonnées pour centrer le texte horizontalement
  const largeurTexte = doc.getStringUnitWidth(titre);
  const x = (largeurPage - largeurTexte) / 2;
  doc.text(titre, x, 55, { align: "center" });

  let tableHeight = 60;

  // Configuration du tableau
  const tableConfig: UserOptions = {
    margin: { top: 20 }, // Marge supérieure
    styles: { halign: "left" }, // Alignement du texte à gauche
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Styles de l'en-tête
    bodyStyles: { textColor: 0 }, // Styles du corps du tableau
  };

  const tableData = [
    [
      "N° Intervention",
      `${rapportDetail.header.numIntervention}`,
      "ID du site",
      `${rapportDetail.header.siteName}`,
    ],
    [
      "Adresse du site",
      { colspan: 3, content: `${rapportDetail.header.address}` },
    ],
    ["Intitulé", { colspan: 3, content: `${rapportDetail.header.intitule}` }],
  ];

  autoTable(doc, {
    ...tableConfig,
    body: tableData,
    startY: tableHeight,
  });

  tableHeight = (doc as any).autoTable.previous.finalY + 10;

  const table2Data = [
    [
      "Description en détail des tâches réalisées lors de l'intervention",
      { colspan: 3, content: `${rapportDetail.detail.description}` },
    ],
    [
      "Cause de l'incident",
      { colspan: 3, content: `${rapportDetail.detail.cause}` },
    ],
    [
      "Plus de détails sur l'origine du problème",
      { colspan: 3, content: `${rapportDetail.detail.plusDetail}` },
    ],
    [
      "L'incident a-t-il été résolu?",
      { colspan: 3, content: `${rapportDetail.detail.resolu}` },
    ],
    [
      "Réintervention nécessaire?",
      { colspan: 3, content: `${rapportDetail.detail.reintervention}` },
    ],
  ];

  autoTable(doc, {
    ...tableConfig,
    body: table2Data,
    startY: tableHeight,
  });

  tableHeight = (doc as any).autoTable.previous.finalY + 10;

  const table3Data = [
    [
      "Le matériel a-t-il été remplacé?",
      { colspan: 3, content: `${rapportDetail.other.change}` },
    ],
    [
      "Adresse MAC ancien équipements (préciser lesquels si plusieurs)",
      { colspan: 3, content: rapportDetail.other.addressMacAvant.join(" ") },
    ],
    [
      "Adresse MAC nouvel équipements (préciser lesquels si plusieurs)",
      { colspan: 3, content: rapportDetail.other.addresMacApres.join(" ") },
    ],
    [
      "Nom de l'intervenant",
      { colspan: 3, content: `${rapportDetail.other.technicienName}` },
    ],
    [
      "Nom de l'administrateur WIFIRST",
      { colspan: 3, content: `${rapportDetail.other.adminName}` },
    ],
    [
      "Nom de l'administrateur WIFIRST au téléphone",
      { colspan: 3, content: `${rapportDetail.other.adminOncall}` },
    ],
    ["Heure d'arrivée", `${rapportDetail.other.heureArrive}`],
    ["Heure de départ", `${rapportDetail.other.heureDepart}`],
  ];

  autoTable(doc, {
    ...tableConfig,
    body: table3Data,
    startY: tableHeight,
  });

  tableHeight = (doc as any).autoTable.previous.finalY + 10;

  if (Math.ceil(tableHeight) > 272) {
    doc.addPage();
    tableHeight = 10;
  }

  doc.setFontSize(12);
  doc.setFont("Helvetica", "");
  doc.text(RAPPORT_PDF_FOOTER_TAB, 15, tableHeight, { maxWidth: 185 });

  const textDimensions = doc.getTextDimensions(RAPPORT_PDF_FOOTER_TAB, {
    maxWidth: 185,
  });

  tableHeight = tableHeight + textDimensions.h + 10;

  if (tableHeight + 75 > Math.round(doc.internal.pageSize.getHeight())) {
    doc.addPage();
    tableHeight = 10;
  }
  // doc.addPage();
  if (materiel?.length > 0) {
    for (let i = 0; i < materiel.length; i++) {
      if (tableHeight+75 > Math.round(doc.internal.pageSize.getHeight())) {
        doc.addPage();
        tableHeight = 10;
      }
      doc.setFont("Helvetica", "bold");
      doc.setTextColor("#730fc3");
      doc.text(materiel[i].name, 15, tableHeight);

      tableHeight += 5;
      addPhoto(
        materiel[i].image.avant,
        "Photo avant intervention",
        tableHeight
      );
      tableHeight += 67;
      if (
        materiel[i].image.apres.loin !== "" ||
        materiel[i].image.apres.pres !== "" ||
        materiel[i].image.apres.cablage !== "" ||
        materiel[i].image.apres.addressMac !== ""
      ) {
        if (tableHeight > Math.round(doc.internal.pageSize.getHeight())) {
          doc.addPage();
          tableHeight = 10;
        }
        addPhoto(
          materiel[i].image.apres,
          "Photo après intervention",
          tableHeight
        );
        tableHeight += 67;
      }
      if (tableHeight > Math.round(doc.internal.pageSize.getHeight())) {
        doc.addPage();
        tableHeight = 10;
      }
      if (materiel[i + 1]) {
        doc.setFont("Helvetica", "bold");
        doc.setTextColor("#730fc3");
        doc.text(`${materiel[i + 1]?.name}`, 15, tableHeight+5);

        tableHeight += 10;
        if (tableHeight+67 > Math.round(doc.internal.pageSize.getHeight())) {
          doc.addPage();
          tableHeight = 10;
        }
        addPhoto(
          materiel[i + 1].image.avant,
          "Photo avant intervention",
          tableHeight
        );
        tableHeight += 75;
        if (
          materiel[i + 1].image.apres.loin !== "" ||
          materiel[i + 1].image.apres.pres !== "" ||
          materiel[i + 1].image.apres.cablage !== "" ||
          materiel[i + 1].image.apres.addressMac !== ""
        ) {
          if (
            tableHeight+67 >
            Math.round(doc.internal.pageSize.getHeight())
          ) {
            doc.addPage();
            tableHeight = 10;
          }
          addPhoto(
            materiel[i + 1].image.apres,
            "Photo après intervention",
            tableHeight
          );
          tableHeight += 67;
        }

        i = i + 1;
      }
      // doc.addPage();
    }
  }
  if (tableHeight > Math.round(doc.internal.pageSize.getHeight())) {
    doc.addPage();
    tableHeight = 10;
  }
  if(photoSup?.loin !== "") {
    addPhoto(photoSup, "Photo supplémentaire", tableHeight+5); 
    tableHeight+=67
  }

  if (tableHeight+67 > Math.round(doc.internal.pageSize.getHeight())) {
    doc.addPage();
    tableHeight = 10;
  }

  tableHeight+=5
  doc.text("Signature client", 45, tableHeight);
  doc.text("Signature intervenant", 120, tableHeight);
  tableHeight+=5
  doc.addImage(signatureClient, "PNG", 37, tableHeight, 50, 50);
  doc.addImage(signatureTechnicien, "PNG", 111, tableHeight, 50, 50);
  tableHeight+=60
  if (tableHeight+35 > Math.round(doc.internal.pageSize.getHeight())) {
    doc.addPage();
    tableHeight = 10;
  }
  doc.text("Signé par le client", 45, tableHeight);
  doc.text(`Signé par ${rapportDetail.other.technicienName}`, 120, tableHeight);
  tableHeight+=5
  doc.text(`le ${formaterDate(new Date())}`, 45, tableHeight);
  doc.text(`le ${formaterDate(new Date())}`, 120, tableHeight);
  tableHeight+=37


  const addressSign = doc.getTextDimensions(ADDRESS_SIGN_IN_RAPPORT_PDF, {
    maxWidth: 185,
  });
  if(tableHeight+addressSign.h+10 >= Math.round(doc.internal.pageSize.getHeight())){
    doc.addPage();
    tableHeight = 10;
  }
  doc.text(
    ADDRESS_SIGN_IN_RAPPORT_PDF,
    15,
    tableHeight,
    { maxWidth: 185 }
  );

  doc.save("rapport.pdf");
  return doc.output("blob");
};

const getImageToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const uint8Array = new Uint8Array(response.data);
    return btoa(
      uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

export const imageToBase64 = async (
  images: BeforeAfterImages
): Promise<MaterielImage> => {
  try {
    return {
      loin: await getImageToBase64(images?.loin.path),
      pres: await getImageToBase64(images?.pres.path),
      cablage: await getImageToBase64(images?.cablage.path),
      addressMac: await getImageToBase64(images?.macAddress.path),
    };
  } catch (error) {
    return {
      loin: "",
      pres: "",
      cablage: "",
      addressMac: "",
    };
  }
};

export const downloadImage = async (
  image: string,
  isPdf: boolean = false,
  nomDufichier?: string
) => {
  try {
    const res = await axios.get(image as string, { responseType: "blob" });

    // Crée une URL à partir du blob
    const blobUrl = URL.createObjectURL(res.data);

    // Crée un élément <a> pour le téléchargement
    const link = document.createElement("a");
    link.href = blobUrl;
    if (isPdf) {
      link.download = `${nomDufichier}.pdf`;
    } else {
      link.download = getFileNameFromUrl(image); // Nom du fichier de téléchargement (optionnel)
    }

    // Ajoute le lien au document
    document.body.appendChild(link);

    // Déclenche le téléchargement
    link.click();

    // Nettoie après le téléchargement
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data.message;
    } else {
      return "Une erreur inattendue s'est produite.";
    }
  }
};
