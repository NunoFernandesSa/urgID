import {MedicalInfo} from "@/types";
import {StyleSheet, Text, View} from "react-native";

type Props = {
    data: MedicalInfo;
};

export function MedicalEmergencyCard({data}: Props) {
    const allergiesText =
        data.allergies.length > 0
            ? data.allergies.join(", ")
            : "Aucune";

    const treatmentsText =
        data.treatments.length > 0
            ? data.treatments.join(", ")
            : "Aucun";

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.kicker}>Urgence médicale</Text>
                <Text style={styles.name}>
                    {data.name} {data.lastName}
                </Text>
                <Text style={styles.subline}>
                    {data.age + " ans" || "Âge non renseigné"} • Groupe sanguin :{" "}
                    {data.bloodType || "Non renseigné"}
                </Text>
            </View>

            <View style={styles.grid}>
                <View style={styles.box}>
                    <Text style={styles.label}>Allergies</Text>
                    <Text style={styles.value}>{allergiesText}</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.label}>Traitements</Text>
                    <Text style={styles.value}>{treatmentsText}</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.label}>Donneur d&apos;organes</Text>
                    <Text style={styles.value}>
                        {data.isOrganDonor ? "Oui" : "Non"}
                    </Text>
                </View>
            </View>

            <View style={styles.contactsSection}>
                <Text style={styles.sectionTitle}>Contacts d&apos;urgence</Text>

                {data.emergencyContacts.length > 0 ? (
                    data.emergencyContacts.map((contact, index) => (
                        <View key={`${contact.name}-${index}`} style={styles.contactRow}>
                            <Text style={styles.contactIndex}>Contact {index + 1}</Text>
                            <Text style={styles.contactName}>
                                {contact.name || "Nom non renseigné"}
                            </Text>
                            <Text style={styles.contactPhone}>
                                {contact.phone || "Téléphone non renseigné"}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>Aucun contact d&apos;urgence</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        gap: 16,
    },
    header: {
        gap: 6,
    },
    kicker: {
        color: "#B00020",
        fontSize: 13,
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },
    name: {
        fontSize: 28,
        fontWeight: "900",
        color: "#111827",
    },
    subline: {
        fontSize: 15,
        color: "#4B5563",
        lineHeight: 22,
        fontWeight: "bold",
    },
    grid: {
        gap: 10,
    },
    box: {
        backgroundColor: "#F9FAFB",
        borderRadius: 16,
        padding: 14,
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: "800",
        color: "#6B7280",
        textTransform: "uppercase",
    },
    value: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        lineHeight: 22,
    },
    contactsSection: {
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#111827",
    },
    contactRow: {
        backgroundColor: "#F3F4F6",
        borderRadius: 16,
        padding: 14,
        gap: 4,
    },
    contactIndex: {
        fontSize: 12,
        fontWeight: "800",
        color: "#6B7280",
        textTransform: "uppercase",
    },
    contactName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
    },
    contactPhone: {
        fontSize: 15,
        fontWeight: "700",
        color: "#B00020",
    },
    emptyText: {
        fontSize: 15,
        color: "#6B7280",
    },
});