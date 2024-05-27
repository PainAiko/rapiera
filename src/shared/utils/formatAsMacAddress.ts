
export const formatAsMacAddress = (value: string): string => {
    // Enlever tous les caractères non hexadécimaux
    const cleanedValue = value.replace(/[^0-9a-fA-F]/g, '');
  
    // Ajouter automatiquement les deux-points (:) après chaque paire de caractères
    const formattedValue = cleanedValue
      .replace(/(.{2})/g, "$1:")
      .slice(0, 17);
  
    // Supprimer le dernier deux-points s'il n'y a pas assez de caractères
    return formattedValue.endsWith(":") && cleanedValue.length % 2 === 0
      ? formattedValue.slice(0, -1)
      : formattedValue;
  };
  

export const isValidMacAddress = (value: string): boolean => {
    // Expression régulière pour vérifier si la chaîne ressemble à une adresse MAC valide
    const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  
    // Vérifie si la chaîne correspond à l'expression régulière
    return macAddressRegex.test(value);
  };