import { MONTHS } from "./const";

export function genererDateDepuisHeure(heureString: string): Date {
    const [heures, minutes] = heureString.split(':').map(Number);

    const date = new Date();
    date.setHours(heures, minutes, 0, 0);

    return date;
}

export function formaterDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    return date.toLocaleString('fr-FR', options);
}

export const extractDateTime = (date:string) => {
    const dateObj = new Date(date);

    // Obtient les composants d'heure
    const heures = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Formate l'heure
    return `${heures.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const timeToMySQLDate = (time: string, date: Date = new Date()): string => {
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0); // Réglez les heures et les minutes, et réinitialisez les secondes et les millisecondes à 0
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

export function formaterDateForMysql(ancienneDate: string): string {
    const dateISO = ancienneDate.split('/').reverse().join('-') + 'T' + ancienneDate.slice(11);
    
    const date = new Date(dateISO);

    const years = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const secondes = date.getSeconds().toString().padStart(2, '0');

    return `${years}-${month}-${day} ${hours}:${minutes}:${secondes}`;
}

export const formatDateForRapport = (inputDate: string, onlyDate: boolean = false): string => {
  
    const dateObject = new Date(inputDate);
    
    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
  
    return `${!onlyDate ? "Créé le": "" } ${day} ${MONTHS[month]} ${year} à ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

export function verifierOrdreHeures(heureString1: string, heureString2: string): boolean {
    const date1 = new Date();
    const date2 = new Date();

    const [heures1, minutes1] = heureString1.split(':').map(Number);
    const [heures2, minutes2] = heureString2.split(':').map(Number);

    date1.setHours(heures1, minutes1, 0, 0);
    date2.setHours(heures2, minutes2, 0, 0);

    // Comparaison des dates
    if (date1.getTime() > date2.getTime()) {
        return false
    }
    return true
}