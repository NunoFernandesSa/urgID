export type EmergencyContact = {
  name: string;
  phone: string;
};

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
    | "unknown"
    | null;
  allergies: string[]; // ['arachide', 'pénicilline']
  treatments: string[]; // ['insuline', 'Lamictal']
  emergencyContacts: EmergencyContact[];
  isOrganDonor: boolean; // oui / non
};

export const emptyMedicalInfo: MedicalInfo = {
  id: "",
  name: "",
  lastName: "",
  age: "",
  bloodType: null,
  allergies: [],
  treatments: [],
  emergencyContacts: [
    { name: "", phone: "" },
    { name: "", phone: "" },
  ],
  isOrganDonor: false,
};
