import {Loader} from "@/components/ui/loader";
import {MedicalCardPreview} from "@/components/ui/medical-card-preview";
import {useMedicalInfo} from "@/hooks/useMedicalInfo";
import {router, useFocusEffect} from "expo-router";
import {JSX, useCallback} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";


/**
 * @description
 * This component is the preview screen of the app.
 * It displays the user's medical information in a card format.
 * The user's medical information is loaded from persistent storage when the component is focused.
 *
 * @return {JSX.Element} The preview screen component.
 */
export default function Preview(): JSX.Element {
    const {medicalInfo, isLoading, load} = useMedicalInfo();
    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load]),
    );

    if (isLoading) {
        return <Loader title="" label=""/>;
    }

    return (
        <View style={[styles.safeArea, {paddingTop: insets.top}]}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Aperçu du widget</Text>
                <Text style={styles.subtitle}>
                    Voici ce que l&apos;urgentiste verra sur l&apos;écran verrouillé.
                </Text>

                <MedicalCardPreview data={medicalInfo}/>

                <Pressable
                    style={styles.button}
                    onPress={() => router.push("/profile")}
                >
                    <Text style={styles.buttonText}>Modifier les infos</Text>
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
    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111",
    },
    subtitle: {
        fontSize: 16,
        color: "#444",
    },
    button: {
        marginTop: 12,
        backgroundColor: "#111",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
