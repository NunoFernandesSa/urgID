import { useMedicalInfo } from "@/hooks/useMedicalInfo";
import { EmergencyContact, emptyMedicalInfo, MedicalInfo } from "@/types";
import { Picker } from "@react-native-picker/picker";

import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BLOOD_TYPE_OPTIONS = [
  { label: "Non renseigné", value: null },
  { label: "Inconnu", value: "unknown" },
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
] as const;

export default function Profile() {
  const { medicalInfo, save, isLoading } = useMedicalInfo();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<MedicalInfo>(emptyMedicalInfo);

  useEffect(() => {
    if (medicalInfo) {
      setForm(medicalInfo);
    }
  }, [medicalInfo]);

  const updateField = <K extends keyof MedicalInfo>(
    key: K,
    value: MedicalInfo[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
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

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Profil médical</Text>
        <Text style={styles.subtitle}>
          Remplis les infos d&apos;urgence les plus importantes.
        </Text>

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => updateField("name", text)}
          placeholder="Léa"
        />

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={form.lastName}
          onChangeText={(text) => updateField("lastName", text)}
          placeholder="Martin"
        />

        <Text style={styles.label}>Âge / Date de naissance</Text>
        <TextInput
          style={styles.input}
          value={form.age ?? ""}
          onChangeText={(text) => updateField("age", text)}
          placeholder="7 ans"
        />

        <Text style={styles.label}>Groupe sanguin</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.bloodType}
            onValueChange={(value) =>
              updateField("bloodType", value as MedicalInfo["bloodType"])
            }
            style={styles.picker}
          >
            {BLOOD_TYPE_OPTIONS.map((option) => (
              <Picker.Item
                key={String(option.value)}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Donneur d&apos;organes</Text>
          <Switch
            value={form.isOrganDonor}
            onValueChange={(value) => updateField("isOrganDonor", value)}
          />
        </View>

        <Text style={styles.sectionTitle}>Allergies</Text>
        {form.allergies.map((item, index) => (
          <View key={`allergy-${index}`} style={styles.listRow}>
            <TextInput
              style={[styles.input, styles.flex]}
              value={item}
              onChangeText={(text) => updateAllergy(index, text)}
              placeholder="Arachide"
            />
            <Pressable
              onPress={() => removeAllergy(index)}
              style={styles.smallButton}
            >
              <Text style={styles.smallButtonText}>X</Text>
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.secondaryButton} onPress={addAllergy}>
          <Text style={styles.secondaryButtonText}>+ Ajouter une allergie</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Traitements</Text>
        {form.treatments.map((item, index) => (
          <View key={`treatment-${index}`} style={styles.listRow}>
            <TextInput
              style={[styles.input, styles.flex]}
              value={item}
              onChangeText={(text) => updateTreatment(index, text)}
              placeholder="Insuline"
            />
            <Pressable
              onPress={() => removeTreatment(index)}
              style={styles.smallButton}
            >
              <Text style={styles.smallButtonText}>X</Text>
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.secondaryButton} onPress={addTreatment}>
          <Text style={styles.secondaryButtonText}>
            + Ajouter un traitement
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Contacts d&apos;urgence</Text>
        {form.emergencyContacts.map((contact, index) => (
          <View key={`contact-${index}`} style={styles.contactBlock}>
            <Text style={styles.label}>Contact {index + 1}</Text>
            <TextInput
              style={styles.input}
              value={contact.name}
              onChangeText={(text) => updateContact(index, "name", text)}
              placeholder="Nom"
            />
            <TextInput
              style={styles.input}
              value={contact.phone}
              onChangeText={(text) => updateContact(index, "phone", text)}
              placeholder="Téléphone"
              keyboardType="phone-pad"
            />
          </View>
        ))}

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
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flex: {
    flex: 1,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    height: 56,
    width: "100%",
  },
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#b00020",
    alignItems: "center",
    justifyContent: "center",
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#eaeaea",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111",
    fontWeight: "700",
  },
  contactBlock: {
    gap: 8,
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
