import {
  deleteMedicalInfo,
  loadMedicalInfo,
  saveMedicalInfo,
} from "@/services/medicalStorage";
import { emptyMedicalInfo, MedicalInfo } from "@/types";

import { useCallback, useEffect, useState } from "react";

export function useMedicalInfo() {
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>(emptyMedicalInfo);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    const data = await loadMedicalInfo();
    setMedicalInfo(data ?? emptyMedicalInfo);
    setIsLoading(false);
  }, []);

  const save = useCallback(async (info: MedicalInfo) => {
    await saveMedicalInfo(info);
    setMedicalInfo(info);
  }, []);

  const update = useCallback((patch: Partial<MedicalInfo>) => {
    setMedicalInfo((current) => ({
      ...current,
      ...patch,
    }));
  }, []);

  const reset = useCallback(async () => {
    await deleteMedicalInfo();
    setMedicalInfo(emptyMedicalInfo);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    medicalInfo,
    isLoading,
    load,
    save,
    update,
    reset,
    setMedicalInfo,
  };
}
