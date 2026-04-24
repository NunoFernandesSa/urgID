import {Loader} from "@/components/ui/loader";
import {useMedicalInfo} from "@/hooks/useMedicalInfo";
import {router, useFocusEffect} from "expo-router";
import {JSX, useCallback} from "react";
import {Linking, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {MedicalEmergencyCard} from "@/components/ui/medical-emergency-card";

export default function Emergency(): JSX.Element {
    const {medicalInfo, isLoading, load} = useMedicalInfo();
    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load]),
    );

    const openAndroidSettings = async () => {
        await Linking.openSettings();
    };

    if (isLoading) {
        return <Loader title="" label=""/>;
    }

    return (
        <View style={[styles.safeArea, {paddingTop: insets.top}]}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <Text style={styles.kicker}>Urgence médicale</Text>
                    <Text style={styles.title}>Accès rapide</Text>
                    <Text style={styles.subtitle}>
                        Cette page résume les infos importantes et t&apos;aide à les rendre accessibles sur Android.
                    </Text>
                </View>

                <MedicalEmergencyCard data={medicalInfo}/>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>À faire sur Android</Text>
                    <Text style={styles.infoText}>
                        Ouvre les réglages de sécurité du téléphone, puis ajoute les infos médicales et les contacts
                        d&apos;urgence dans la section prévue à cet effet.
                    </Text>
                </View>

                <Pressable style={styles.primaryButton} onPress={openAndroidSettings}>
                    <Text style={styles.primaryButtonText}>Ouvrir les réglages Android</Text>
                </Pressable>

                <Pressable style={styles.secondaryButton} onPress={() => router.push("/profile")}>
                    <Text style={styles.secondaryButtonText}>Modifier les infos</Text>
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
        gap: 16,
        flexGrow: 1,
    },
    hero: {
        backgroundColor: "#111827",
        borderRadius: 24,
        padding: 18,
        gap: 10,
    },
    kicker: {
        color: "#A7F3D0",
        fontSize: 13,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },
    title: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "900",
    },
    subtitle: {
        color: "#D1D5DB",
        fontSize: 15,
        lineHeight: 22,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    infoBox: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        gap: 8,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
    },
    infoText: {
        fontSize: 15,
        lineHeight: 22,
        color: "#4B5563",
    },
    primaryButton: {
        backgroundColor: "#B00020",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
    secondaryButton: {
        backgroundColor: "#fff",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5DB",
    },
    secondaryButtonText: {
        color: "#111827",
        fontSize: 16,
        fontWeight: "800",
    },
});