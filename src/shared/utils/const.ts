export const CAUSEINCIDENT = [
    {
        title: "Matériel réseau Wifirst en panne(Switch,AP,Wibox)",
        value: 0,
      },
      { title: "Matériel Noodo en panne", value: 1 },
      {
        title: "Matériel Chromecast, TV ou Serveur IPTV Wifirst en panne",
        value: 2,
      },
      { title: "Modem utilisateur hors service", value: 3 },
      { title: "Panne sur l'accès WAN / Internet", value: 4 },
      {
        title: "Dégradation, alteration ou vol de l'infra Wifirst",
        value: 5,
      },
      {
        title: "Cablage cuivre ou fibre endommagé ou défectueux",
        value: 6,
      },
      {
        title: "Erreur de brassage/cablage par un technicien Wifirst",
        value: 7,
      },
      { title: "Problème sur l'infrastructure réseau client", value: 8 },
      { title: "Résolution après reboot", value: 9 },
      { title: "Problème éléctrique", value: 10 },
      {
        title: "Utilisation au dlà des capacité de l'infrastructure",
        value: 11,
      },
      {
        title: "Trou de couverture radio/Défaut post-déploiement",
        value: 12,
      },
      {
        title: "Problème de configuration ou Bug sur l'infra Wifirst",
        value: 13,
      },
      { title: "Besoin client non pris en charge par Wifirst", value: 14 },
      {
        title:
          "Problème déja resolu sans action de Wifirst ou du technicien",
        value: 15,
      },
      {
        title: "Autres problème de responsabilité Wifirst - A préciser",
        value: 16,
      },
      {
        title: "Autres problème de responsabilité Client - A préciser",
        value: 17,
      },
]

export const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
  'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

export enum TYPE {
  USER = "user",
  PRESTATAIRE = "prestataire",
  INTERVENTION = "intervention",
  RAPPORT = "rapport",
}

export enum LINKSIDE_BAR {
  INTERVENTION="intervention",
  TERMINE="intervention-terminer",
  RAPPORT="rapport",
  G_USER="gestion-user",
  G_PRESTATAIRE="gestion-prestataire",
  HISTORY="log"
} 

export const SIDE_BAR_NAVIGATION = [
  {
    link: `/dashboard/${LINKSIDE_BAR.INTERVENTION}`,
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Interventions en cours",
  },
  {
    link: `/dashboard/${LINKSIDE_BAR.TERMINE}`,
    icon: "fa-solid fa-list-check",
    title: "Interventions terminées",
  },
  {
    link: `/dashboard/${LINKSIDE_BAR.RAPPORT}`,
    icon: "fa-solid fa-clipboard-list",
    title: "Liste des rapports d'interventions",
  },
  {
    link: `/dashboard/${LINKSIDE_BAR.G_USER}`,
    icon: "fa-solid fa-users-gear",
    title: "Gestion des utilisateurs",
  },
  {
    link: `/dashboard/${LINKSIDE_BAR.G_PRESTATAIRE}`,
    icon: "fa-solid fa-handshake",
    title: "Gestion des pestataires",
  },
  {
    link: `/dashboard/${LINKSIDE_BAR.HISTORY}`,
    icon: "fa-solid fa-clock-rotate-left",
    title: "Historique des utilisateurs",
  },
]

export enum ImageConfig {
  maxWidth=300,
  maxHeight=300,
  type="JPEG",
  quality=100,
  rotation=0,
  output="file"
}

export const RAPPORT_ERROR_MESSAGE = "Cette intervention dispose déjà d'un rapport."
// export const RAPPORT_ERROR_MESSAGE = "Aucun administrateur n'est attribué à cette intervention, ou cette intervention dispose déjà d'un rapport. Veuillez patienter jusqu'à ce qu'un administrateur prenne en charge la validation de l'intervention."
export const INTERVENTION_TECHNICIEN_ERROR = "Vous n'avez pas l'autorisation d'effectuer cette intervention"
export const ASSIGNATION_INTERVENTION_SUCCESS="L'intervention vous est maintenant attribuée"
export const CONFIRM_TO_TAKE_INTERVENTION_CHARGE="Êtes-vous sur de vouloir devenir propriétaire de cette intervention ?"
export const PHOTO_SUPP_SUCCESS="Les photos ont bien été téléchargées."
export const RAPPORT_SUCCESS="Le rapport d'intervention a bien été déposé"
export const RAPPORT_PDF_FOOTER_TAB="Merci de transmettre toutes les photos prises pendant l'intervention et permettant de la documenter (coffret, AP, équipements, emplacement d'un test de couverture,...) en clicquant sur \"Pièces Jointes\" avant de terminer le rapport."
export const ADDRESS_SIGN_IN_RAPPORT_PDF="26 rue de Berri - 75008 Paris - Tél. : 01 76 74 00 40 - S.A.S AU CAPITAL DE 16.076.00,00 € APE : 6190 Z - TVA Intracommunautaire : FR 72441 757 614 - Siret : 441 757 614 0058"
export const PROFIL_DEFAULT_IMAGE="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1704890263~exp=1704890863~hmac=97ef86bdfd711a5771f358591447d40751ce5216687ecd4479b91ebb54a31b70"