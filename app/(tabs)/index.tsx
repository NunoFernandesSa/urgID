import {router, useFocusEffect} from "expo-router";
import {useCallback, useMemo} from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useMedicalInfo} from "@/hooks/useMedicalInfo";
import StatPill from "@/components/ui/stat-pill";
import ActionCard from "@/components/ui/action-card";
import {Loader} from "@/components/ui/loader";


export default function Home() {
    const {medicalInfo, isLoading, load} = useMedicalInfo();
    const insets = useSafeAreaInsets();

    // ----- Effect for load data ----- //
    useFocusEffect(
        useCallback((): void => {
            load();
        }, [load])
    );

    // ----- has data ----- //
    const hasData: boolean = useMemo(() => {
        return !!(
            medicalInfo?.name ||
            medicalInfo?.lastName ||
            medicalInfo?.bloodType ||
            medicalInfo?.allergies?.length ||
            medicalInfo?.treatments?.length ||
            medicalInfo?.emergencyContacts?.some((c) => c.name || c.phone)
        );
    }, [medicalInfo]);

    // ----- if Loading show Loader ----- //
    if (isLoading) {
        return (
            <Loader title={"Chargement..."}/>
        );
    }

    return (
        <View style={[styles.safeArea, {paddingTop: insets.top}]}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <View style={styles.heroTopRow}>
                        <View>
                            <Text style={styles.heroKicker}>Carte médicale</Text>
                            <Text style={styles.heroTitle}>Dashboard</Text>
                        </View>

                        <View style={styles.statusBadge}>
                            <View
                                style={[
                                    styles.statusDot,
                                    hasData ? styles.statusDotOk : styles.statusDotWarn,
                                ]}
                            />
                            <Text style={styles.statusText}>
                                {hasData ? "Prête" : "À compléter"}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.heroText}>
                        Tout ce qui compte en cas d&apos;urgence, dans une interface simple et rapide.
                    </Text>

                    <View style={styles.statsRow}>
                        <StatPill label="Allergies" value={medicalInfo.allergies?.length || 0}/>
                        <StatPill label="Traitements" value={medicalInfo.treatments?.length || 0}/>
                        <StatPill
                            label="Contacts"
                            value={medicalInfo.emergencyContacts?.length || 0}
                        />
                    </View>
                </View>

                {!hasData ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>Commence ta fiche</Text>
                        <Text style={styles.emptyText}>
                            Remplis ton profil médical pour générer l&apos;aperçu, les contacts et la carte
                            d&apos;urgence.
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
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryHeader}>
                                <View>
                                    <Text style={styles.summaryLabel}>Profil actif</Text>
                                    <Text style={styles.summaryName}>
                                        {medicalInfo.name} {medicalInfo.lastName}
                                    </Text>
                                </View>

                                <View style={styles.bloodBadge}>
                                    <Text style={styles.bloodBadgeText}>
                                        {medicalInfo.bloodType || "—"}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.summaryGrid}>
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryItemLabel}>Âge</Text>
                                    <Text style={styles.summaryItemValue}>{medicalInfo.age || "—"}</Text>
                                </View>

                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryItemLabel}>Donneur</Text>
                                    <Text style={styles.summaryItemValue}>
                                        {medicalInfo.isOrganDonor ? "Oui" : "Non"}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.actionsGrid}>
                            <ActionCard
                                title="Modifier"
                                subtitle="Mettre à jour le profil médical"
                                onPress={() => router.push("/profile")}
                                tone="light"
                            />
                            <ActionCard
                                title="Aperçu"
                                subtitle="Voir le rendu widget"
                                onPress={() => router.push("/preview")}
                                tone="dark"
                            />
                        </View>

                        <Pressable
                            style={styles.primaryButton}
                            onPress={() => router.push("/preview")}
                        >
                            <Text style={styles.primaryButtonText}>Voir la carte complète</Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

// ----- Styles ---- //
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
    hero: {
        backgroundColor: "#111827",
        borderRadius: 24,
        padding: 18,
        gap: 14,
    },
    heroTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    heroKicker: {
        color: "#A7F3D0",
        fontSize: 13,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },
    heroTitle: {
        color: "#fff",
        fontSize: 34,
        fontWeight: "900",
        marginTop: 2,
    },
    heroText: {
        color: "#D1D5DB",
        fontSize: 15,
        lineHeight: 22,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(255,255,255,0.08)",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    statusDotOk: {
        backgroundColor: "#34D399",
    },
    statusDotWarn: {
        backgroundColor: "#FBBF24",
    },
    statusText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
    },
    pill: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 18,
        paddingVertical: 14,
        alignItems: "center",
        gap: 3,
    },
    pillValue: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "900",
    },
    pillLabel: {
        color: "#CBD5E1",
        fontSize: 12,
        fontWeight: "600",
    },
    summaryCard: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
        gap: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    summaryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    summaryLabel: {
        fontSize: 13,
        color: "#6B7280",
        fontWeight: "700",
        textTransform: "uppercase",
    },
    summaryName: {
        fontSize: 24,
        fontWeight: "900",
        color: "#111827",
        marginTop: 4,
    },
    bloodBadge: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
    },
    bloodBadgeText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
    },
    summaryGrid: {
        flexDirection: "row",
        gap: 12,
    },
    summaryItem: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        borderRadius: 16,
        padding: 14,
        gap: 6,
    },
    summaryItemLabel: {
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "700",
    },
    summaryItemValue: {
        color: "#111827",
        fontSize: 18,
        fontWeight: "900",
    },
    actionsGrid: {
        flexDirection: "row",
        gap: 12,
    },

    primaryButton: {
        backgroundColor: "#111827",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
    emptyCard: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 20,
        gap: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#111827",
    },
    emptyText: {
        fontSize: 15,
        lineHeight: 22,
        color: "#4B5563",
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
