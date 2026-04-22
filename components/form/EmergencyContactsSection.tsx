/**
 * @License : MIT
 * @Author : Nuno F.
 * @Date : 2026-04-22
 */

// ----- Expo / React ----- //
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
// ----- Types ----- //
import { EmergencyContact } from "@/types";

// ----- Props Types ----- //
type Props = {
  contacts: EmergencyContact[];
  onChange: (index: number, key: keyof EmergencyContact, value: string) => void;
  onAddContact: () => void;
};

/**
 * EmergencyContactsSection renders a list of emergency contact inputs and an “add” button.
 *
 * Props:
 * - contacts: Array of emergency contacts to display.
 * - onChange: Callback fired when a contact field changes.
 * - onAddContact: Callback fired when the user wants to add a new contact.
 *
 */
export default function EmergencyContactsSection({
  contacts,
  onChange,
  onAddContact,
}: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>Contacts d&apos;urgence</Text>

      {contacts.map((contact, index) => (
        <View key={`contact-${index}`} style={styles.contactBlock}>
          <Text style={styles.label}>Contact {index + 1}</Text>

          <TextInput
            style={styles.input}
            value={contact.name}
            onChangeText={(text) => onChange(index, "name", text)}
            placeholder="Nom"
          />
          <TextInput
            style={styles.input}
            value={contact.phone}
            onChangeText={(text) => onAddContact}
            placeholder="Téléphone"
            keyboardType="phone-pad"
          />
        </View>
      ))}

      <Pressable style={styles.secondaryButton} onPress={onAddContact}>
        <Text style={styles.secondaryButtonText}>
          + Ajouter un contact d&apos;urgence
        </Text>
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
  contactBlock: {
    gap: 8,
    marginTop: 8,
  },
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
