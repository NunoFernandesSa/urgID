import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function Loader({
  title = "Carte médicale",
  label = "Chargement sécurisé...",
}) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.badge} />
        <Text style={styles.title}>{title}</Text>
        <ActivityIndicator size="large" color="#b00020" />
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  card: {
    width: 220,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    gap: 12,
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#b00020",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  label: {
    fontSize: 15,
    color: "#555",
  },
});
