export interface RapportFile {
    id: number;
    name: string;
    size: number;
    type: string;
    path: string;
  }
  
export interface InterventionDetail {
    id: number;
    description: string;
    intervention_id: number;
    detail_plus: string;
    created_at: string;
    technician_name: string;
    site_name: string;
    rapport_file: RapportFile;
  }