import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const colorScheme = useColorScheme();

  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <SafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>Profile</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
