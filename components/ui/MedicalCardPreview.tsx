/**
 * @License : MIT
 * @Author : Nuno F.
 * @Date : 2026-04-22
 */

// ----- Expo / React ----- //
import { StyleSheet, Text, View } from "react-native";
// ----- Expo / React ----- //
import { MedicalInfo } from "@/types";

// ----- Props types ----- //
type Props = {
  data: MedicalInfo;
};

/**
 * Renders a preview card displaying essential medical information.
 * @param data - The medical data to display, including name, age, allergies, treatments, emergency contacts, and organ donor status.
 */
export function MedicalCardPreview({ data }: Props) {
  const allergiesText =
    data.allergies.length > 0
      ? data.allergies.join(", ")
      : "Aucune allergie renseignée";

  const treatmentsText =
    data.treatments.length > 0
      ? data.treatments.join(", ")
      : "Aucun traitement renseigné";

  const contact1 = data.emergencyContacts?.[0];
  const contact2 = data.emergencyContacts?.[1];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Carte médicale</Text>

      <Text style={styles.name}>
        {data.name} {data.lastName}
      </Text>

      <Text style={styles.line}>Âge : {data.age || "-"}</Text>
      <Text style={styles.line}>
        Groupe sanguin : {data.bloodType || "unknown"}
      </Text>

      <Text style={styles.sectionTitle}>Allergies</Text>
      <Text style={styles.sectionText}>{allergiesText}</Text>

      <Text style={styles.sectionTitle}>Traitements</Text>
      <Text style={styles.sectionText}>{treatmentsText}</Text>

      <Text style={styles.sectionTitle}>Contacts d&apos;urgence</Text>
      <Text style={styles.sectionText}>
        1. {contact1?.name || "-"}{" "}
        {contact1?.phone ? `(${contact1.phone})` : ""}
      </Text>
      <Text style={styles.sectionText}>
        2. {contact2?.name || "-"}{" "}
        {contact2?.phone ? `(${contact2.phone})` : ""}
      </Text>

      <Text style={styles.donor}>
        Donneur d&apos;organes : {data.isOrganDonor ? "Oui" : "Non"}
      </Text>
    </View>
  );
}

// ----- Styles ----- //
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "#111",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#b00020",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },
  line: {
    fontSize: 16,
    color: "#222",
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  sectionText: {
    fontSize: 15,
    color: "#222",
  },
  donor: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
});
