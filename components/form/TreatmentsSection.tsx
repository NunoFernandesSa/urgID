/**
 * @License : MIT
 * @Author : Nuno F.
 * @Date : 2026-04-22
 */

// ----- Expo / React ----- //
import React, { JSX } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// ----- Props Types ----- //
type Props = {
  treatments: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

/**
 * TreatmentsSection renders a dynamic list of treatment text inputs.
 * Users can edit, add, or remove treatments; changes are propagated via the provided callbacks.
 *
 * @param {string[]} treatments - Array of treatment names to display.
 * @param {(index: number, value: string) => void} onChange - Callback fired when a treatment text changes.
 * @param {() => void} onAdd - Callback fired when the “add treatment” button is pressed.
 * @param {(index: number) => void} onRemove - Callback fired when a treatment is removed.
 * @returns {JSX.Element} The treatments section UI.
 */
export default function TreatmentsSection({
  treatments,
  onChange,
  onAdd,
  onRemove,
}: Props): JSX.Element {
  return (
    <>
      <Text style={styles.sectionTitle}>Traitements</Text>
      {treatments.map((item, index) => (
        <View key={`treatment-${index}`} style={styles.listRow}>
          <TextInput
            style={[styles.input, styles.flex]}
            value={item}
            onChangeText={(text) => onChange(index, text)}
            placeholder="Insuline"
          />
          <Pressable onPress={() => onRemove(index)} style={styles.smallButton}>
            <Text style={styles.smallButtonText}>X</Text>
          </Pressable>
        </View>
      ))}
      <Pressable style={styles.secondaryButton} onPress={onAdd}>
        <Text style={styles.secondaryButtonText}>+ Ajouter un traitement</Text>
      </Pressable>
    </>
  );
}

// ----- Styles ----- //
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
