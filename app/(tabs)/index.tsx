import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { JSX } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Renders the home screen component for the application.
 *
 * This component displays a simple "Home" text within a SafeAreaView,
 * adapting the text color based on the current color scheme (light or dark).
 *
 * @returns A JSX element representing the home screen.
 */
export default function HomeScreen(): JSX.Element {
  const colorScheme = useColorScheme();

  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <SafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
