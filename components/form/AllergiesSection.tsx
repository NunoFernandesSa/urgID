import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  allergies: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export default function AllergiesSection({
  allergies,
  onChange,
  onAdd,
  onRemove,
}: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>Allergies</Text>
      {allergies.map((item, index) => (
        <View key={`allergy-${index}`} style={styles.listRow}>
          <TextInput
            style={[styles.input, styles.flex]}
            value={item}
            onChangeText={(text) => onChange(index, text)}
            placeholder="Arachide"
          />
          <Pressable onPress={() => onRemove(index)} style={styles.smallButton}>
            <Text style={styles.smallButtonText}>X</Text>
          </Pressable>
        </View>
      ))}
      <Pressable style={styles.secondaryButton} onPress={onAdd}>
        <Text style={styles.secondaryButtonText}>+ Ajouter une allergie</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
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
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flex: {
    flex: 1,
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
});
