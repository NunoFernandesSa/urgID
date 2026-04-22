import { MedicalInfo } from "@/types";
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

type Props = {
  name: string;
  lastName: string;
  age?: string | undefined;
  onChange: <K extends keyof MedicalInfo>(
    key: K,
    value: MedicalInfo[K],
  ) => void;
};

export default function PersonalInfoSection({
  name,
  lastName,
  age,
  onChange,
}: Props) {
  return (
    <>
      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => onChange("name", text)}
        placeholder="Léa"
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => onChange("lastName", text)}
        placeholder="Martin"
      />

      <Text style={styles.label}>Âge / Date de naissance</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => onChange("age", text)}
        placeholder="30"
      />
    </>
  );
}

// ---- Styles ---- //
const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "700",
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
});
