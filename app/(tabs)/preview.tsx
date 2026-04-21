import { Loader } from "@/components/ui/loader";
import { MedicalCardPreview } from "@/components/ui/MedicalCardPreview";
import { useMedicalInfo } from "@/hooks/useMedicalInfo";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Preview() {
  const { medicalInfo, isLoading, load } = useMedicalInfo();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Aperçu du widget</Text>
        <Text style={styles.subtitle}>
          Voici ce que l&apos;urgentiste verra sur l&apos;écran verrouillé.
        </Text>

        <MedicalCardPreview data={medicalInfo} />

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
