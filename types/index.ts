export type MedicalInfo = {
  id: string; // identifiant unique
  name: string; // prénom
  lastName: string; // nom
  age?: string; // ou date de naissance
  bloodType?:
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-"
    | "unknown";
  allergies: string[]; // ['arachide', 'pénicilline']
  treatments: string[]; // ['insuline', 'Lamictal']
  emergencyContacts: {
    name: string;
    phone: string;
  }[];
  isOrganDonor: boolean; // oui / non
};
