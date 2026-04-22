/**
 * @License : MIT
 * @Author : Nuno F.
 * @Date : 2026-04-22
 */

// ----- Expo / React ----- //
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// ----- Types ----- //
import { MedicalInfo } from "@/types";
// ----- Constants ----- //
import { BLOOD_TYPE_OPTIONS } from "@/constants/theme";

// ----- Props ----- //
type Props = {
  bloodType: string | null | undefined;
  onChange: (value: MedicalInfo["bloodType"]) => void;
};

/**
 * BloodTypeField
 *
 * Renders a labeled picker for selecting the user's blood type.
 *
 * Props:
 * - bloodType: The currently selected blood type value (string | null | undefined).
 * - onChange: Callback fired when the picker value changes, receives the new blood type.
 *
 * The component presents a list of predefined blood type options and updates
 * the parent state via the onChange handler.
 */
export default function BloodTypeField({ bloodType, onChange }: Props) {
  return (
    <>
      <Text style={styles.label}>Groupe sanguin</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={bloodType}
          onValueChange={(value) => onChange(value as MedicalInfo["bloodType"])}
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
    </>
  );
}

// ----- Styles ----- //
const styles = StyleSheet.create({
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
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
});
