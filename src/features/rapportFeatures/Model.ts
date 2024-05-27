export type FormStates = {
  selectedAdmin?: string;
  adminOnCall?: string
  description: string;
  plus: string;
  incident: Record<string, string | boolean | number>;
  reintervention: Record<string, string | boolean | number>;
  materialChange?: { title: string; value: string | number };
  incidentCause?: { title: string; value: string | number };
  heureArrive: string;
  heureDepart: string;
};


export type Admin = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};
