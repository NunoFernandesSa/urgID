import AllergiesSection from "@/components/form/AllergiesSection";
import BloodTypeField from "@/components/form/BloodTypeField";
import EmergencyContactsSection from "@/components/form/EmergencyContactsSection";
import PersonalInfoSection from "@/components/form/PersonalInfoSection";
import TreatmentsSection from "@/components/form/TreatmentsSection";
import { Loader } from "@/components/ui/loader";
import { useMedicalInfo } from "@/hooks/useMedicalInfo";
import { EmergencyContact, emptyMedicalInfo, MedicalInfo } from "@/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const { medicalInfo, save, isLoading } = useMedicalInfo();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<MedicalInfo>(emptyMedicalInfo);

  useEffect(() => {
    if (medicalInfo) {
      setForm(medicalInfo);
    }
  }, [medicalInfo]);

  // ----- Update field method ----- //
  const updateField = <K extends keyof MedicalInfo>(
    key: K,
    value: MedicalInfo[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  // ---- Emergency contact ----- //
  const addContact = () => {
    setForm((current) => ({
      ...current,
      emergencyContacts: [
        ...current.emergencyContacts,
        { name: "", phone: "" },
      ],
    }));
  };
  const updateContact = (
    index: number,
    key: keyof EmergencyContact,
    value: string,
  ) => {
    setForm((current) => {
      const contacts = [...current.emergencyContacts];
      contacts[index] = { ...contacts[index], [key]: value };
      return { ...current, emergencyContacts: contacts };
    });
  };

  // ----- Allergy ----- //
  const addAllergy = () => {
    setForm((current) => ({
      ...current,
      allergies: [...current.allergies, ""],
    }));
  };
  const updateAllergy = (index: number, value: string) => {
    setForm((current) => {
      const allergies = [...current.allergies];
      allergies[index] = value;
      return { ...current, allergies };
    });
  };
  const removeAllergy = (index: number) => {
    setForm((current) => ({
      ...current,
      allergies: current.allergies.filter((_, i) => i !== index),
    }));
  };

  // ----- Treatment ----- //
  const addTreatment = () => {
    setForm((current) => ({
      ...current,
      treatments: [...current.treatments, ""],
    }));
  };
  const updateTreatment = (index: number, value: string) => {
    setForm((current) => {
      const treatments = [...current.treatments];
      treatments[index] = value;
      return { ...current, treatments };
    });
  };
  const removeTreatment = (index: number) => {
    setForm((current) => ({
      ...current,
      treatments: current.treatments.filter((_, i) => i !== index),
    }));
  };

  // ----- handleSave method ----- //
  const handleSave = async () => {
    const cleanedForm: MedicalInfo = {
      ...form,
      allergies: form.allergies.filter(Boolean),
      treatments: form.treatments.filter(Boolean),
      emergencyContacts: form.emergencyContacts.filter(
        (c) => c.name.trim() || c.phone.trim(),
      ),
    };

    await save(cleanedForm);
    router.push("/preview");
  };

  // ----- Loading Screen ----- //
  if (isLoading) {
    return <Loader title="" label="" />;
  }

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.heading}>Profil médical</Text>
        <Text style={styles.subtitle}>
          Remplis les infos d&apos;urgence les plus importantes.
        </Text>

        {/* Personal info */}
        <PersonalInfoSection {...form} onChange={updateField} />

        {/* Blood Type */}
        <BloodTypeField
          bloodType={form.bloodType}
          onChange={(value) => updateField("bloodType", value)}
        />

        {/* Organ donor */}
        <View style={styles.row}>
          <Text style={styles.label}>Donneur d&apos;organes</Text>
          <Switch
            value={form.isOrganDonor}
            onValueChange={(value) => updateField("isOrganDonor", value)}
          />
        </View>

        {/* Allergies */}
        <AllergiesSection
          allergies={form.allergies}
          onChange={updateAllergy}
          onAdd={addAllergy}
          onRemove={removeAllergy}
        />

        {/* ----- Treatments ----- */}
        <TreatmentsSection
          treatments={form.treatments}
          onChange={updateTreatment}
          onAdd={addTreatment}
          onRemove={removeTreatment}
        />

        {/* ----- Emergency Contact ----- */}
        <EmergencyContactsSection
          contacts={form.emergencyContacts}
          onChange={updateContact}
          onAddContact={addContact}
        />

        {/* ----- Submit button ----- */}
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    padding: 20,
    gap: 12,
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
