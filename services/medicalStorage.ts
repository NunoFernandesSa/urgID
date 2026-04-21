import { MedicalInfo } from "@/types";
import * as SecureStore from "expo-secure-store";

const MEDICAL_INFO_KEY = "medical_info";

export async function saveMedicalInfo(info: MedicalInfo): Promise<void> {
  await SecureStore.setItemAsync(MEDICAL_INFO_KEY, JSON.stringify(info));
}

export async function loadMedicalInfo(): Promise<MedicalInfo | null> {
  const raw = await SecureStore.getItemAsync(MEDICAL_INFO_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as MedicalInfo;
  } catch {
    return null;
  }
}

export async function deleteMedicalInfo(): Promise<void> {
  await SecureStore.deleteItemAsync(MEDICAL_INFO_KEY);
}

export async function hasMedicalInfo(): Promise<boolean> {
  const raw = await SecureStore.getItemAsync(MEDICAL_INFO_KEY);
  return !!raw;
}
