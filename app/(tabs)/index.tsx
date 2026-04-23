import {JSX, useMemo} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useMedicalInfo} from "@/hooks/useMedicalInfo";
import {Loader} from "@/components/ui/loader";
import {router} from "expo-router";

/**
 * Renders the home screen component.
 *
 * @return {JSX.Element} The home screen component.
 */
export default function HomeScreen(): JSX.Element {
    const {medicalInfo, isLoading} = useMedicalInfo();
    const insets = useSafeAreaInsets();


    const hasData = useMemo(() => {
        return !!(
            medicalInfo?.name ||
            medicalInfo?.lastName ||
            medicalInfo?.bloodType ||
            medicalInfo?.allergies?.length ||
            medicalInfo?.treatments?.length ||
            medicalInfo?.emergencyContacts?.some((c) => c.name || c.phone)
        );
    }, [medicalInfo]);

    if (isLoading) {
        return (
            <Loader title={"Chargement..."}/>
        );
    }

    return (
        <View style={[styles.safeArea, {paddingTop: insets.top}]}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.subtitle}>
                        Ta carte médicale d&apos;urgence, accessible en un coup d&apos;œil.
                    </Text>
                </View>
                
                {!hasData ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>Aucune fiche enregistrée</Text>
                        <Text style={styles.emptyText}>
                            Commence par remplir ton profil médical pour générer l&apos;aperçu et
                            le widget.
                        </Text>

                        <Pressable
                            style={styles.primaryButton}
                            onPress={() => router.push("/profile")}
                        >
                            <Text style={styles.primaryButtonText}>Créer ma fiche</Text>
                        </Pressable>
                    </View>
                ) : (
                    <>
                        <View style={styles.card}>
                            <Text style={styles.cardLabel}>Carte médicale</Text>
                            <Text style={styles.cardName}>
                                {medicalInfo.name} {medicalInfo.lastName}
                            </Text>
                            <Text style={styles.cardLine}>
                                Groupe sanguin : {medicalInfo.bloodType || "Non renseigné"}
                            </Text>
                            <Text style={styles.cardLine}>
                                Allergies : {medicalInfo.allergies?.length || 0}
                            </Text>
                            <Text style={styles.cardLine}>
                                Traitements : {medicalInfo.treatments?.length || 0}
                            </Text>
                            <Text style={styles.cardLine}>
                                Contacts d&apos;urgence : {medicalInfo.emergencyContacts?.length || 0}
                            </Text>
                        </View>

                        <View style={styles.actions}>
                            <Pressable
                                style={styles.secondaryButton}
                                onPress={() => router.push("/profile")}
                            >
                                <Text style={styles.secondaryButtonText}>Modifier</Text>
                            </Pressable>

                            <Pressable
                                style={styles.primaryButton}
                                onPress={() => router.push("/preview")}
                            >
                                <Text style={styles.primaryButtonText}>Voir la carte</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

// ----- Styles ----- //
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    container: {
        padding: 20,
        gap: 16,
        flexGrow: 1,
    },
    header: {
        gap: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#111",
    },
    subtitle: {
        fontSize: 16,
        color: "#444",
        lineHeight: 22,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        borderWidth: 1,
        borderColor: "#e6e6e6",
        gap: 8,
    },
    cardLabel: {
        fontSize: 14,
        fontWeight: "800",
        color: "#b00020",
        textTransform: "uppercase",
    },
    cardName: {
        fontSize: 26,
        fontWeight: "800",
        color: "#111",
    },
    cardLine: {
        fontSize: 16,
        color: "#222",
    },
    actions: {
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        width: "100%",
    },
    secondaryButtonText: {
        color: "#111",
        fontSize: 15,
        fontWeight: "700",
    },
    primaryButton: {
        backgroundColor: "#111",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        width: "100%",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    emptyCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#e6e6e6",
        gap: 10,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111",
    },
    emptyText: {
        fontSize: 15,
        color: "#555",
        lineHeight: 22,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#333",
    },
});
